'use client';

import { RepositoryList } from './repository-list';
import { useLiveRepositories } from '@/hooks/use-live-repositories';
import { PROFILE } from '@/lib/portfolio';
import type { NormalizedRepository } from '@/types';

interface LiveRepositoryListProps {
  initialRepositories: NormalizedRepository[];
  featuredRepos: string[];
  buildError?: string | null;
}

/** Repository list that refreshes from GitHub in the browser after load. */
export function LiveRepositoryList({ initialRepositories, featuredRepos, buildError }: LiveRepositoryListProps) {
  const { repositories, isLive } = useLiveRepositories(initialRepositories);

  // A build-time failure only matters if the live fetch hasn't recovered it.
  const error = isLive ? null : buildError;

  return (
    <>
      {repositories.length > 0 && (
        <p className="-mt-8 mb-8 text-body-sm text-muted-foreground">
          Showing {repositories.length} public repositories for {PROFILE.name}
          {isLive && <span className="ml-2 text-caption text-accent">● live from GitHub</span>}
        </p>
      )}
      <RepositoryList repositories={repositories} featuredRepos={featuredRepos} error={error} />
    </>
  );
}
