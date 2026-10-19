import { describe, it, expect } from 'vitest';
import { normalizeProfile, normalizeRepository } from '@/lib/github/normalize';
import type { GitHubRawProfile, GitHubRawRepository } from '@/lib/github/normalize';

describe('normalizeProfile', () => {
  const rawProfile: GitHubRawProfile = {
    login: 'testuser',
    name: 'Test User',
    bio: 'Software engineer',
    avatar_url: 'https://avatars.githubusercontent.com/u/123',
    html_url: 'https://github.com/testuser',
    public_repos: 42,
    followers: 100,
    following: 50,
    created_at: '2020-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
  };

  it('normalizes profile correctly', () => {
    const normalized = normalizeProfile(rawProfile);

    expect(normalized.login).toBe('testuser');
    expect(normalized.name).toBe('Test User');
    expect(normalized.bio).toBe('Software engineer');
    expect(normalized.avatarUrl).toBe('https://avatars.githubusercontent.com/u/123');
    expect(normalized.htmlUrl).toBe('https://github.com/testuser');
    expect(normalized.publicRepos).toBe(42);
    expect(normalized.followers).toBe(100);
    expect(normalized.following).toBe(50);
    expect(normalized.createdAt).toBe('2020-01-01T00:00:00Z');
    expect(normalized.updatedAt).toBe('2024-01-01T00:00:00Z');
  });

  it('handles null optional fields', () => {
    const rawWithNulls: GitHubRawProfile = {
      ...rawProfile,
      name: null,
      bio: null,
    };

    const normalized = normalizeProfile(rawWithNulls);
    expect(normalized.name).toBeNull();
    expect(normalized.bio).toBeNull();
  });
});

describe('normalizeRepository', () => {
  const rawRepo: GitHubRawRepository = {
    id: 123456,
    name: 'test-repo',
    full_name: 'testuser/test-repo',
    description: 'A test repository',
    html_url: 'https://github.com/testuser/test-repo',
    homepage: 'https://test-repo.example.com',
    language: 'TypeScript',
    topics: ['typescript', 'react', 'portfolio'],
    stargazers_count: 100,
    forks_count: 25,
    open_issues_count: 5,
    fork: false,
    archived: false,
    private: false,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2024-01-15T00:00:00Z',
    pushed_at: '2024-01-10T00:00:00Z',
    default_branch: 'main',
  };

  it('normalizes repository correctly', () => {
    const normalized = normalizeRepository(rawRepo);

    expect(normalized.id).toBe(123456);
    expect(normalized.name).toBe('test-repo');
    expect(normalized.fullName).toBe('testuser/test-repo');
    expect(normalized.description).toBe('A test repository');
    expect(normalized.htmlUrl).toBe('https://github.com/testuser/test-repo');
    expect(normalized.homepage).toBe('https://test-repo.example.com');
    expect(normalized.language).toBe('TypeScript');
    expect(normalized.topics).toEqual(['typescript', 'react', 'portfolio']);
    expect(normalized.stars).toBe(100);
    expect(normalized.forks).toBe(25);
    expect(normalized.openIssues).toBe(5);
    expect(normalized.isFork).toBe(false);
    expect(normalized.isArchived).toBe(false);
    expect(normalized.isPrivate).toBe(false);
    expect(normalized.createdAt).toBe('2023-01-01T00:00:00Z');
    expect(normalized.updatedAt).toBe('2024-01-15T00:00:00Z');
    expect(normalized.pushedAt).toBe('2024-01-10T00:00:00Z');
    expect(normalized.defaultBranch).toBe('main');
  });

  it('handles null optional fields', () => {
    const rawWithNulls: GitHubRawRepository = {
      ...rawRepo,
      description: null,
      homepage: null,
      language: null,
      topics: [],
      pushed_at: null,
      default_branch: null,
    };

    const normalized = normalizeRepository(rawWithNulls);
    expect(normalized.description).toBeNull();
    expect(normalized.homepage).toBeNull();
    expect(normalized.language).toBeNull();
    expect(normalized.topics).toEqual([]);
    expect(normalized.pushedAt).toBeNull();
    expect(normalized.defaultBranch).toBeNull();
  });

  it('handles missing topics array', () => {
    const rawWithoutTopics = { ...rawRepo };
    delete (rawWithoutTopics as any).topics;

    const normalized = normalizeRepository(rawWithoutTopics as GitHubRawRepository);
    expect(normalized.topics).toEqual([]);
  });

  it('handles fork and archived flags', () => {
    const forkedRepo = { ...rawRepo, fork: true };
    const archivedRepo = { ...rawRepo, archived: true };

    expect(normalizeRepository(forkedRepo).isFork).toBe(true);
    expect(normalizeRepository(archivedRepo).isArchived).toBe(true);
  });
});