import type { NormalizedRepository } from '@/types';
import { GitHubRawRepository, normalizeRepository } from './normalize';
import { getCuratedProject } from '@/lib/portfolio';

// Browser-side fetch of the current public repos, so the static site reflects
// repos created or deleted since the last build. Unauthenticated: GitHub allows
// 60 requests/hour per visitor IP, plenty for one fetch per page view.

const PER_PAGE = 100;
const MAX_PAGES = 5;

/** Fill in descriptions GitHub doesn't have from the curated case studies. */
export function withCuratedDescriptions(repos: NormalizedRepository[]): NormalizedRepository[] {
  return repos.map((repo) => ({
    ...repo,
    description: repo.description || getCuratedProject(repo.name)?.summary || null,
  }));
}

// One request per page view, shared by every component that asks for it.
const inflight = new Map<string, Promise<NormalizedRepository[]>>();

export function fetchLiveRepositories(username: string): Promise<NormalizedRepository[]> {
  let request = inflight.get(username);
  if (!request) {
    request = loadRepositories(username);
    inflight.set(username, request);
    request.catch(() => inflight.delete(username));
  }
  return request;
}

async function loadRepositories(username: string): Promise<NormalizedRepository[]> {
  const repos: NormalizedRepository[] = [];

  for (let page = 1; page <= MAX_PAGES; page++) {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=${PER_PAGE}&page=${page}&sort=updated&direction=desc&type=public`,
      { headers: { Accept: 'application/vnd.github+json' } }
    );
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const raw: GitHubRawRepository[] = await response.json();
    repos.push(...raw.filter((r) => !r.private).map(normalizeRepository));
    if (raw.length < PER_PAGE) break;
  }

  return withCuratedDescriptions(repos);
}
