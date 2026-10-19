import { GitHubProfile, NormalizedRepository } from '@/types';

export interface GitHubRawProfile {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export interface GitHubRawRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  fork: boolean;
  archived: boolean;
  private: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string | null;
  default_branch: string | null;
}

export function normalizeProfile(raw: GitHubRawProfile): GitHubProfile {
  return {
    login: raw.login,
    name: raw.name,
    bio: raw.bio,
    avatarUrl: raw.avatar_url,
    htmlUrl: raw.html_url,
    publicRepos: raw.public_repos,
    followers: raw.followers,
    following: raw.following,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
  };
}

export function normalizeRepository(raw: GitHubRawRepository): NormalizedRepository {
  return {
    id: raw.id,
    name: raw.name,
    fullName: raw.full_name,
    description: raw.description,
    htmlUrl: raw.html_url,
    homepage: raw.homepage,
    language: raw.language,
    topics: raw.topics ?? [],
    stars: raw.stargazers_count,
    forks: raw.forks_count,
    openIssues: raw.open_issues_count,
    isFork: raw.fork,
    isArchived: raw.archived,
    isPrivate: raw.private,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
    pushedAt: raw.pushed_at,
    defaultBranch: raw.default_branch,
  };
}