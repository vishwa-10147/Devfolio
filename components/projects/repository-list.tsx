'use client';

import { useMemo, useState, useEffect } from 'react';
import { RepositoryCard } from './repository-card';
import { RepositoryFiltersPanel, type RepositoryFilters } from './repository-filters';
import { cn } from '@/lib/utils';
import type { NormalizedRepository } from '@/types';

interface RepositoryListProps {
  repositories: NormalizedRepository[];
  featuredRepos: string[];
  loading?: boolean;
  error?: string | null;
}

export function RepositoryList({ repositories, featuredRepos, loading, error }: RepositoryListProps) {
  const [filters, setFilters] = useState<RepositoryFilters>({
    search: '',
    languages: [],
    topics: [],
    featuredOnly: false,
    excludeForks: true,
    excludeArchived: true,
    sortBy: 'updated',
    sortOrder: 'desc',
  });

  const filteredAndSorted = useMemo(() => {
    let result = repositories;

    if (filters.featuredOnly) {
      result = result.filter((repo) => featuredRepos.includes(repo.name));
    }

    if (filters.excludeForks) {
      result = result.filter((repo) => !repo.isFork);
    }

    if (filters.excludeArchived) {
      result = result.filter((repo) => !repo.isArchived);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (repo) =>
          repo.name.toLowerCase().includes(searchLower) ||
          repo.description?.toLowerCase().includes(searchLower) ||
          repo.topics.some((t) => t.toLowerCase().includes(searchLower))
      );
    }

    if (filters.languages.length > 0) {
      result = result.filter((repo) => repo.language && filters.languages.includes(repo.language));
    }

    if (filters.topics.length > 0) {
      result = result.filter((repo) =>
        filters.topics.some((t) => repo.topics.includes(t))
      );
    }

    result = [...result].sort((a, b) => {
      let aVal: string | number | Date;
      let bVal: string | number | Date;

      switch (filters.sortBy) {
        case 'stars':
          aVal = a.stars;
          bVal = b.stars;
          break;
        case 'name':
          aVal = a.name.toLowerCase();
          bVal = b.name.toLowerCase();
          break;
        case 'created':
          aVal = new Date(a.createdAt).getTime();
          bVal = new Date(b.createdAt).getTime();
          break;
        case 'updated':
        default:
          aVal = new Date(a.updatedAt).getTime();
          bVal = new Date(b.updatedAt).getTime();
          break;
      }

      if (aVal < bVal) return filters.sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return filters.sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  }, [repositories, featuredRepos, filters]);

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  if (error) {
    return (
      <div className="text-center py-12" role="alert">
        <p className="text-body text-destructive mb-4">Failed to load repositories</p>
        <p className="text-body-sm text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-busy="true">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="card-elevated animate-pulse">
            <div className="h-6 bg-muted rounded w-3/4 mb-4" />
            <div className="h-4 bg-muted rounded w-full mb-2" />
            <div className="h-4 bg-muted rounded w-2/3 mb-2" />
            <div className="h-4 bg-muted rounded w-1/3" />
          </div>
        ))}
      </div>
    );
  }

  if (filteredAndSorted.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-body text-muted-foreground mb-4">
          {repositories.length === 0 ? 'No repositories found.' : 'No repositories match your filters.'}
        </p>
        {repositories.length > 0 && (
          <button
            onClick={() => setFilters({ ...filters, search: '', languages: [], topics: [], featuredOnly: false })}
            className="text-accent hover:underline text-body-sm"
          >
            Clear all filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <RepositoryFiltersPanel
        repositories={repositories}
        featuredRepos={featuredRepos}
        onFiltersChange={handleFiltersChange}
        loading={loading}
      />

      <div className="flex items-center justify-between">
        <p className="text-body-sm text-muted-foreground">
          Showing {filteredAndSorted.length} of {repositories.length} repositories
        </p>
      </div>

      <div
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        role="list"
        aria-label="Repositories"
      >
        {filteredAndSorted.map((repo) => (
          <RepositoryCard
            key={repo.id}
            repository={repo}
            featured={featuredRepos.includes(repo.name)}
          />
        ))}
      </div>
    </div>
  );
}