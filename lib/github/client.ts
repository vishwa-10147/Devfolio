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

const GITHUB_API_BASE = 'https://api.github.com';
const DEFAULT_PER_PAGE = 100;
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const profileCache = new Map<string, CacheEntry<GitHubProfile>>();
const repositoriesCache = new Map<string, CacheEntry<NormalizedRepository[]>>();

function getCacheKey(username: string, suffix: string = ''): string {
  return `${username}:${suffix}`;
}

function isCacheValid(entry: CacheEntry<unknown>): boolean {
  return Date.now() - entry.timestamp < CACHE_DURATION;
}

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs: number = 10000
): Promise<Response> {
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
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (response.status === 403) {
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
    const errorText = await response.text().catch(() => 'Unknown error');
    throw new GitHubApiError(
      `GitHub API error: ${response.status} ${response.statusText}`,
      response.status,
      'API_ERROR'
    );
  }

  return response.json();
}

export async function fetchProfile(username: string): Promise<GitHubProfile> {
  const cacheKey = getCacheKey(username, 'profile');
  const cached = profileCache.get(cacheKey);

  if (cached && isCacheValid(cached)) {
    return cached.data;
  }

  const response = await fetchWithTimeout(
    `${GITHUB_API_BASE}/users/${username}`,
    { headers: getAuthHeaders() }
  );

  const rawProfile = await handleResponse<GitHubRawProfile>(response);
  const profile = normalizeProfile(rawProfile);

  profileCache.set(cacheKey, { data: profile, timestamp: Date.now() });
  return profile;
}

export async function fetchRepositories(username: string): Promise<NormalizedRepository[]> {
  const cacheKey = getCacheKey(username, 'repositories');
  const cached = repositoriesCache.get(cacheKey);

  if (cached && isCacheValid(cached)) {
    return cached.data;
  }

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
      break;
    }

    const normalized = rawRepos.map(normalizeRepository);
    allRepos.push(...normalized);

    if (rawRepos.length < DEFAULT_PER_PAGE) {
      hasMore = false;
    } else {
      page++;
    }
  }

  repositoriesCache.set(cacheKey, { data: allRepos, timestamp: Date.now() });
  return allRepos;
}

export async function fetchRepository(username: string, repoName: string): Promise<NormalizedRepository | null> {
  const cacheKey = getCacheKey(username, `repo:${repoName}`);
  const cached = repositoriesCache.get(cacheKey);

  if (cached && isCacheValid(cached) && cached.data.length === 1) {
    return cached.data[0];
  }

  try {
    const response = await fetchWithTimeout(
      `${GITHUB_API_BASE}/repos/${username}/${repoName}`,
      { headers: getAuthHeaders() }
    );

    const rawRepo = await handleResponse<GitHubRawRepository>(response);
    const repo = normalizeRepository(rawRepo);

    repositoriesCache.set(cacheKey, { data: [repo], timestamp: Date.now() });
    return repo;
  } catch (error) {
    if (isNotFoundError(error)) {
      return null;
    }
    throw error;
  }
}

export function clearCache(username?: string): void {
  if (username) {
    const prefix = getCacheKey(username);
    for (const key of profileCache.keys()) {
      if (key.startsWith(prefix)) profileCache.delete(key);
    }
    for (const key of repositoriesCache.keys()) {
      if (key.startsWith(prefix)) repositoriesCache.delete(key);
    }
  } else {
    profileCache.clear();
    repositoriesCache.clear();
  }
}

export function getCacheStats(): { profileCacheSize: number; repositoriesCacheSize: number } {
  return {
    profileCacheSize: profileCache.size,
    repositoriesCacheSize: repositoriesCache.size,
  };
}