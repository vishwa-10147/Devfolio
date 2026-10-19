import {
  GitHubProfile,
  GitHubRepository,
  NormalizedRepository,
} from '@/types';
import {
  GitHubRawProfile,
  GitHubRawRepository,
  normalizeProfile,
  normalizeRepository,
} from './normalize';
import {
  GitHubApiError,
  GitHubRateLimitError,
  GitHubNetworkError,
  GitHubNotFoundError,
  isNotFoundError,
} from './errors';
import fs from 'fs/promises';
import { rmSync } from 'fs';
import path from 'path';

const GITHUB_API_BASE = 'https://api.github.com';
const DEFAULT_PER_PAGE = 100;
const CACHE_DURATION = 1000 * 60 * 60 * 24; // 24 hours
const CACHE_DIR = path.join(process.cwd(), '.cache', 'github');

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  etag?: string | undefined;
}

interface CacheFile {
  profile?: CacheEntry<GitHubProfile>;
  repositories?: CacheEntry<NormalizedRepository[]>;
  repositoriesByName?: Record<string, CacheEntry<NormalizedRepository>>;
}

// In-memory layer in front of the file cache, so repeated reads within a
// process don't hit the disk and the cache still works on read-only filesystems.
const memoryCache = new Map<string, CacheFile>();

function getCacheFilePath(username: string): string {
  // Usernames reach this from request input, so keep them out of path traversal.
  const safeName = username.toLowerCase().replace(/[^a-z0-9-]/g, '_');
  return path.join(CACHE_DIR, `${safeName}.json`);
}

async function readCache(username: string): Promise<CacheFile> {
  const inMemory = memoryCache.get(username);
  if (inMemory) {
    return inMemory;
  }

  try {
    const content = await fs.readFile(getCacheFilePath(username), 'utf-8');
    const cache: CacheFile = JSON.parse(content);
    memoryCache.set(username, cache);
    return cache;
  } catch {
    return {};
  }
}

async function updateCache(username: string, update: (cache: CacheFile) => void): Promise<void> {
  const cache = { ...(await readCache(username)) };
  update(cache);
  memoryCache.set(username, cache);

  // Persisting is best-effort: a failed write (e.g. read-only serverless
  // filesystem) must not discard data that was fetched successfully.
  try {
    await fs.mkdir(CACHE_DIR, { recursive: true });
    await fs.writeFile(getCacheFilePath(username), JSON.stringify(cache, null, 2));
  } catch (error) {
    console.warn('Failed to persist GitHub cache:', error);
  }
}

function isCacheValid(entry: CacheEntry<unknown>): boolean {
  return Date.now() - entry.timestamp < CACHE_DURATION;
}

// Set once GitHub rejects GITHUB_TOKEN (expired/revoked), so later requests
// go out unauthenticated instead of failing every time.
let tokenRejected = false;

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs: number = 10000
): Promise<Response> {
  const response = await fetchOnce(url, options, timeoutMs);

  const headers = { ...(options.headers as Record<string, string> | undefined) };
  if (response.status === 401 && headers.Authorization) {
    tokenRejected = true;
    console.warn('GITHUB_TOKEN was rejected by GitHub (expired or revoked?); retrying without authentication.');
    delete headers.Authorization;
    return fetchOnce(url, { ...options, headers }, timeoutMs);
  }

  return response;
}

async function fetchOnce(url: string, options: RequestInit, timeoutMs: number): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'Devfolio/1.0',
        ...options.headers,
      },
    });
    return response;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new GitHubNetworkError('Request timeout', error);
    }
    throw new GitHubNetworkError('Network error', error instanceof Error ? error : new Error(String(error)));
  } finally {
    clearTimeout(timeoutId);
  }
}

function getAuthHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  if (token && !tokenRejected) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
}

function isRateLimited(response: Response): boolean {
  return (
    (response.status === 403 || response.status === 429) &&
    (response.headers.get('X-RateLimit-Remaining') === '0' || response.headers.has('Retry-After'))
  );
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (response.status === 401) {
    throw new GitHubApiError('GitHub API authentication failed', 401, 'UNAUTHORIZED');
  }

  if (isRateLimited(response)) {
    const retryAfter = response.headers.get('Retry-After');
    const resetTime = response.headers.get('X-RateLimit-Reset');
    let waitSeconds = 60;

    if (retryAfter) {
      waitSeconds = parseInt(retryAfter, 10);
    } else if (resetTime) {
      waitSeconds = Math.max(0, Math.floor((parseInt(resetTime, 10) * 1000 - Date.now()) / 1000));
    }

    throw new GitHubRateLimitError(waitSeconds);
  }

  if (response.status === 404) {
    throw new GitHubNotFoundError('Resource');
  }

  if (!response.ok) {
    throw new GitHubApiError(
      `GitHub API error: ${response.status} ${response.statusText}`,
      response.status,
      'API_ERROR'
    );
  }

  return response.json();
}

/**
 * Fetches with a conditional request. Returns null on 304 Not Modified, which
 * GitHub does not count against the rate limit.
 */
async function fetchWithETag<T>(
  url: string,
  etag: string | undefined
): Promise<{ data: T; etag: string | undefined } | null> {
  const response = await fetchWithTimeout(url, {
    headers: {
      ...getAuthHeaders(),
      ...(etag ? { 'If-None-Match': etag } : {}),
    },
  });

  if (response.status === 304) {
    return null;
  }

  const data = await handleResponse<T>(response);
  return { data, etag: response.headers.get('ETag') || undefined };
}

export async function fetchProfile(username: string): Promise<GitHubProfile | null> {
  if (!username) {
    return null;
  }

  const cache = await readCache(username);
  if (cache.profile && isCacheValid(cache.profile)) {
    return cache.profile.data;
  }

  try {
    const result = await fetchWithETag<GitHubRawProfile>(
      `${GITHUB_API_BASE}/users/${username}`,
      cache.profile?.etag
    );

    const profile = result ? normalizeProfile(result.data) : cache.profile?.data;
    if (!profile) {
      return null;
    }

    await updateCache(username, (c) => {
      c.profile = { data: profile, timestamp: Date.now(), etag: result ? result.etag : c.profile?.etag };
    });

    return profile;
  } catch (error) {
    if (isNotFoundError(error)) {
      return null;
    }
    // On error, serve stale cache if available
    if (cache.profile) {
      return cache.profile.data;
    }
    throw error;
  }
}

export async function fetchRepositories(username: string): Promise<NormalizedRepository[]> {
  if (!username) {
    return [];
  }

  const cache = await readCache(username);
  if (cache.repositories && isCacheValid(cache.repositories)) {
    return cache.repositories.data;
  }

  try {
    const allRepos: NormalizedRepository[] = [];
    let page = 1;
    let hasMore = true;

    while (hasMore) {
      const response = await fetchWithTimeout(
        `${GITHUB_API_BASE}/users/${username}/repos?per_page=${DEFAULT_PER_PAGE}&page=${page}&sort=updated&direction=desc&type=public`,
        { headers: getAuthHeaders() }
      );

      const rawRepos = await handleResponse<GitHubRawRepository[]>(response);

      if (rawRepos.length === 0) {
        hasMore = false;
      } else {
        const normalized = rawRepos.map(normalizeRepository);
        allRepos.push(...normalized);

        if (rawRepos.length < DEFAULT_PER_PAGE) {
          hasMore = false;
        } else {
          page++;
        }
      }
    }

    await updateCache(username, (c) => {
      c.repositories = { data: allRepos, timestamp: Date.now() };
    });

    return allRepos;
  } catch (error) {
    if (isNotFoundError(error)) {
      return [];
    }
    // On error, serve stale cache if available
    if (cache.repositories) {
      return cache.repositories.data;
    }
    throw error;
  }
}

export async function fetchRepository(username: string, repoName: string): Promise<NormalizedRepository | null> {
  const cache = await readCache(username);
  const cacheKey = `repo:${repoName}`;
  const cached = cache.repositoriesByName?.[cacheKey];

  if (cached && isCacheValid(cached)) {
    return cached.data;
  }

  try {
    const result = await fetchWithETag<GitHubRawRepository>(
      `${GITHUB_API_BASE}/repos/${username}/${repoName}`,
      cached?.etag
    );

    const repo = result ? normalizeRepository(result.data) : cached?.data;
    if (!repo) {
      return null;
    }

    await updateCache(username, (c) => {
      c.repositoriesByName = {
        ...c.repositoriesByName,
        [cacheKey]: { data: repo, timestamp: Date.now(), etag: result ? result.etag : cached?.etag },
      };
    });

    return repo;
  } catch (error) {
    if (isNotFoundError(error)) {
      return null;
    }
    if (cached) {
      return cached.data;
    }
    throw error;
  }
}

export function clearCache(username?: string): void {
  try {
    if (username) {
      memoryCache.delete(username);
      rmSync(getCacheFilePath(username), { force: true });
    } else {
      memoryCache.clear();
      rmSync(CACHE_DIR, { recursive: true, force: true });
    }
  } catch (error) {
    console.warn('Failed to clear GitHub file cache:', error);
  }
}

export function getCacheStats(): { profileCacheSize: number; repositoriesCacheSize: number } {
  let profileCacheSize = 0;
  let repositoriesCacheSize = 0;

  for (const cache of memoryCache.values()) {
    if (cache.profile) profileCacheSize++;
    if (cache.repositories) repositoriesCacheSize++;
    repositoriesCacheSize += Object.keys(cache.repositoriesByName ?? {}).length;
  }

  return { profileCacheSize, repositoriesCacheSize };
}
