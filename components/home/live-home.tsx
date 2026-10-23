'use client';

import { Github, Star, ExternalLink } from 'lucide-react';
import { ProjectCard } from '@/components/projects';
import { useLiveRepositories } from '@/hooks/use-live-repositories';
import { FEATURED_REPOS, getCuratedProject } from '@/lib/portfolio';
import type { NormalizedRepository } from '@/types';

export function LiveRepoStats({ initialRepositories, followers }: { initialRepositories: NormalizedRepository[]; followers: number }) {
  const { repositories } = useLiveRepositories(initialRepositories);

  return (
    <div className="mt-12 flex flex-wrap items-center gap-8 text-body-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <Star className="h-4 w-4 text-accent" aria-hidden="true" />
        <span>{repositories.reduce((sum, r) => sum + r.stars, 0).toLocaleString()} total stars</span>
      </div>
      <div className="flex items-center gap-2">
        <Github className="h-4 w-4" aria-hidden="true" />
        <span>{repositories.length} public repos</span>
      </div>
      <div className="flex items-center gap-2">
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
        <span>{followers} followers</span>
      </div>
    </div>
  );
}

/** Featured cards, dropping any featured repo that has since been deleted or made private. */
export function LiveFeaturedProjects({ initialRepositories }: { initialRepositories: NormalizedRepository[] }) {
  const { repositories } = useLiveRepositories(initialRepositories);

  const featured = FEATURED_REPOS
    .map((name) => repositories.find((r) => r.name.toLowerCase() === name))
    .filter((r): r is NormalizedRepository => r !== undefined);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {featured.map((repo) => (
        <ProjectCard key={repo.id} repository={repo} curated={getCuratedProject(repo.name)} featured />
      ))}
    </div>
  );
}
