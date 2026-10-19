'use client';

import { cn, getLanguageColor } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { NormalizedRepository, CuratedProject } from '@/types';

interface ProjectCardProps {
  repository: NormalizedRepository;
  curated?: Partial<CuratedProject>;
  featured?: boolean;
}

export function ProjectCard({ repository, curated, featured = false }: ProjectCardProps) {
  const { name, description, htmlUrl, homepage, language, topics, stars, forks, updatedAt } = repository;
  const displayTitle = curated?.displayTitle || name;
  const summary = curated?.summary || description;

  const baseStyles = 'rounded-lg border border-border bg-surface p-6 transition-all duration-300';
  const elevatedStyles = 'rounded-xl bg-surface-elevated shadow-elevation-1 hover:border-accent/40 hover:shadow-elevation-3';

  return (
    <div className={cn(baseStyles, elevatedStyles, 'relative overflow-hidden', featured && 'ring-1 ring-accent/30')}>
      {featured && (
        <div className="absolute top-4 right-4 z-10">
          <Badge variant="success">Featured</Badge>
        </div>
      )}

      <div className="h-48 relative bg-gradient-to-br from-accent/10 via-surface to-surface-elevated">
        {curated?.screenshots?.[0] && (
          <img
            src={curated.screenshots[0]}
            alt={`Screenshot of ${displayTitle}`}
            className="absolute inset-0 w-full h-full object-cover opacity-20"
            aria-hidden="true"
          />
        )}
        <div className="absolute inset-0 flex items-end p-6">
          <div className="w-full">
            {language && (
              <span className={cn('inline-block mb-3', getLanguageColor(language))}>
                {language}
              </span>
            )}
            <h3 className="text-heading-lg font-semibold text-foreground mb-2">{displayTitle}</h3>
            {summary && (
              <p className="text-body text-muted-foreground line-clamp-2 max-w-2xl">{summary}</p>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {topics.slice(0, 5).map((topic) => (
            <Badge key={topic} variant="outline" className="text-xs">
              {topic}
            </Badge>
          ))}
          {topics.length > 5 && (
            <Badge variant="outline" className="text-xs text-muted-foreground">
              +{topics.length - 5} more
            </Badge>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-6 text-body-sm text-muted-foreground">
          <span className="flex items-center gap-1.5" aria-label={`${stars} stars`}>
            <Github className="h-3.5 w-3.5" aria-hidden="true" />
            {stars.toLocaleString()}
          </span>
          <span className="flex items-center gap-1.5" aria-label={`${forks} forks`}>
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            {forks.toLocaleString()}
          </span>
          <time dateTime={updatedAt} aria-label={`Last updated`}>
            Updated {new Date(updatedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </time>
        </div>

        <div className="flex items-center gap-3">
          {homepage && (
            <Link
              href={homepage}
              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View live demo for ${displayTitle}`}
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Live Demo
            </Link>
          )}
          <Link
            href={curated ? `/projects/${repository.name}` : htmlUrl}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            target={!curated ? '_blank' : undefined}
            rel={!curated ? 'noopener noreferrer' : undefined}
            aria-label={curated ? `View case study for ${displayTitle}` : `View ${name} on GitHub`}
          >
            {curated ? 'Case Study' : 'View Code'}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}