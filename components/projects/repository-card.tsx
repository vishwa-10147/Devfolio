'use client';

import { cn, formatRelativeTime, getLanguageColor } from '@/lib/utils';
import { Card, Badge } from '@/components/ui';
import { Github, Star, GitFork, ExternalLink } from 'lucide-react';
import type { NormalizedRepository } from '@/types';

interface RepositoryCardProps {
  repository: NormalizedRepository;
  featured?: boolean;
  onClick?: () => void;
}

export function RepositoryCard({ repository, featured = false, onClick }: RepositoryCardProps) {
  const { name, description, htmlUrl, homepage, language, topics, stars, forks, updatedAt, isFork, isArchived } = repository;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <Card
      variant="elevated"
      hover={!!onClick}
      className={cn('relative', featured && 'ring-1 ring-accent/30')}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
      aria-label={onClick ? `View ${name} repository` : undefined}
    >
      {featured && (
        <div className="absolute -top-2 -right-2">
          <Badge variant="success" className="text-xs">
            Featured
          </Badge>
        </div>
      )}

      {(isFork || isArchived) && (
        <div className="absolute -top-2 -left-2 flex gap-1">
          {isFork && (
            <Badge variant="outline" className="text-xs">
              Fork
            </Badge>
          )}
          {isArchived && (
            <Badge variant="warning" className="text-xs">
              Archived
            </Badge>
          )}
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Github className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <h3 className="font-semibold text-heading-sm text-foreground truncate">
              {name}
            </h3>
          </div>

          {description && (
            <p className="text-body-sm text-muted-foreground mb-4 line-clamp-2">
              {description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3 mb-4">
            {language && (
              <span
                className={cn('inline-flex items-center gap-1.5 text-xs font-medium', getLanguageColor(language))}
              >
                <span className="relative flex h-2 w-2 rounded-full" aria-hidden="true" />
                {language}
              </span>
            )}

            {topics.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {topics.slice(0, 4).map((topic) => (
                  <Badge key={topic} variant="outline" className="text-xs">
                    {topic}
                  </Badge>
                ))}
                {topics.length > 4 && (
                  <Badge variant="outline" className="text-xs text-muted-foreground">
                    +{topics.length - 4}
                  </Badge>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 text-body-sm text-muted-foreground">
            <span className="flex items-center gap-1.5" aria-label={`${stars} stars`}>
              <Star className="h-3.5 w-3.5" aria-hidden="true" />
              {stars.toLocaleString()}
            </span>
            <span className="flex items-center gap-1.5" aria-label={`${forks} forks`}>
              <GitFork className="h-3.5 w-3.5" aria-hidden="true" />
              {forks.toLocaleString()}
            </span>
            <time dateTime={updatedAt} aria-label={`Last updated ${formatRelativeTime(updatedAt)}`}>
              Updated {formatRelativeTime(updatedAt)}
            </time>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {homepage && (
            <a
              href={homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground transition-colors hover:text-accent"
              aria-label={`View live demo for ${name}`}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
          <a
            href={htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-muted-foreground transition-colors hover:text-accent"
            aria-label={`View ${name} on GitHub`}
            onClick={(e) => e.stopPropagation()}
          >
            <Github className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </Card>
  );
}