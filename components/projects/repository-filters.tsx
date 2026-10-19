'use client';

import { useState, useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Button, Input, Badge } from '@/components/ui';
import { Search, Filter, X, ChevronDown, Loader2 } from 'lucide-react';
import type { NormalizedRepository } from '@/types';

interface RepositoryFilters {
  search: string;
  languages: string[];
  topics: string[];
  featuredOnly: boolean;
  excludeForks: boolean;
  excludeArchived: boolean;
  sortBy: 'updated' | 'stars' | 'name' | 'created';
  sortOrder: 'asc' | 'desc';
}

const initialFilters: RepositoryFilters = {
  search: '',
  languages: [],
  topics: [],
  featuredOnly: false,
  excludeForks: true,
  excludeArchived: true,
  sortBy: 'updated',
  sortOrder: 'desc',
};

export function RepositoryFiltersPanel({
  repositories,
  featuredRepos,
  onFiltersChange,
  loading,
}: {
  repositories: NormalizedRepository[];
  featuredRepos: string[];
  onFiltersChange: (filters: RepositoryFilters) => void;
  loading?: boolean;
}) {
  const [filters, setFilters] = useState<RepositoryFilters>(initialFilters);
  const [expanded, setExpanded] = useState(false);

  const allLanguages = useMemo(() => {
    const langs = new Set<string>();
    repositories.forEach((repo) => {
      if (repo.language) langs.add(repo.language);
    });
    return Array.from(langs).sort();
  }, [repositories]);

  const allTopics = useMemo(() => {
    const topics = new Set<string>();
    repositories.forEach((repo) => {
      repo.topics.forEach((t) => topics.add(t));
    });
    return Array.from(topics).sort();
  }, [repositories]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.search) count++;
    if (filters.languages.length) count += filters.languages.length;
    if (filters.topics.length) count += filters.topics.length;
    if (filters.featuredOnly) count++;
    if (!filters.excludeForks) count++;
    if (!filters.excludeArchived) count++;
    if (filters.sortBy !== 'updated' || filters.sortOrder !== 'desc') count++;
    return count;
  }, [filters]);

  const handleChange = useCallback((newFilters: Partial<RepositoryFilters>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    onFiltersChange(updated);
  }, [filters, onFiltersChange]);

  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
    onFiltersChange(initialFilters);
  }, [onFiltersChange]);

  const toggleLanguage = useCallback((lang: string) => {
    handleChange({
      languages: filters.languages.includes(lang)
        ? filters.languages.filter((l) => l !== lang)
        : [...filters.languages, lang],
    });
  }, [filters.languages, handleChange]);

  const toggleTopic = useCallback((topic: string) => {
    handleChange({
      topics: filters.topics.includes(topic)
        ? filters.topics.filter((t) => t !== topic)
        : [...filters.topics, topic],
    });
  }, [filters.topics, handleChange]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
          <Input
            placeholder="Search repositories..."
            value={filters.search}
            onChange={(e) => handleChange({ search: e.target.value })}
            className="pl-10"
            aria-label="Search repositories by name or description"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setExpanded(!expanded)}
          className="whitespace-nowrap"
          aria-expanded={expanded}
        >
          <Filter className="h-4 w-4 mr-2" aria-hidden="true" />
          Filters
          {activeFilterCount > 0 && (
            <Badge variant="primary" className="ml-2">
              {activeFilterCount}
            </Badge>
          )}
          <ChevronDown className={cn('h-4 w-4 ml-2 transition-transform', expanded && 'rotate-180')} aria-hidden="true" />
        </Button>
        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-1" aria-hidden="true" />
            Clear
          </Button>
        )}
      </div>

      {expanded && (
        <div className="space-y-6 animate-slide-down">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Languages</label>
            <div className="flex flex-wrap gap-2">
              {allLanguages.map((lang) => (
                <Button
                  key={lang}
                  variant={filters.languages.includes(lang) ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => toggleLanguage(lang)}
                  className="h-8"
                >
                  {lang}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Topics</label>
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
              {allTopics.map((topic) => (
                <Button
                  key={topic}
                  variant={filters.topics.includes(topic) ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => toggleTopic(topic)}
                  className="h-8"
                >
                  {topic}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-medium text-foreground">Options</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.featuredOnly}
                  onChange={(e) => handleChange({ featuredOnly: e.target.checked })}
                  className="rounded border-border text-accent focus:ring-accent"
                  aria-label="Show only featured projects"
                />
                <span className="text-body-sm text-foreground">Featured only</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.excludeForks}
                  onChange={(e) => handleChange({ excludeForks: e.target.checked })}
                  className="rounded border-border text-accent focus:ring-accent"
                  aria-label="Exclude forked repositories"
                />
                <span className="text-body-sm text-foreground">Exclude forks</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.excludeArchived}
                  onChange={(e) => handleChange({ excludeArchived: e.target.checked })}
                  className="rounded border-border text-accent focus:ring-accent"
                  aria-label="Exclude archived repositories"
                />
                <span className="text-body-sm text-foreground">Exclude archived</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Sort by</label>
            <div className="flex items-center gap-4">
              <select
                value={filters.sortBy}
                onChange={(e) => handleChange({ sortBy: e.target.value as RepositoryFilters['sortBy'] })}
                className="input-base flex-1 max-w-xs"
                aria-label="Sort repositories by"
              >
                <option value="updated">Recently updated</option>
                <option value="stars">Most stars</option>
                <option value="name">Name (A-Z)</option>
                <option value="created">Oldest first</option>
              </select>
              <select
                value={filters.sortOrder}
                onChange={(e) => handleChange({ sortOrder: e.target.value as RepositoryFilters['sortOrder'] })}
                className="input-base max-w-xs"
                aria-label="Sort order"
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-accent" aria-hidden="true" />
          <span className="ml-2 text-body-sm text-muted-foreground">Loading repositories...</span>
        </div>
      )}
    </div>
  );
}