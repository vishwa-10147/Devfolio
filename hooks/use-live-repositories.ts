'use client';

import { useEffect, useState } from 'react';
import { fetchLiveRepositories } from '@/lib/github/live';
import { PROFILE } from '@/lib/portfolio';
import type { NormalizedRepository } from '@/types';

/**
 * Starts with the repos baked in at build time, then swaps in the live list
 * from GitHub. If the live fetch fails (offline, rate limit), the build-time
 * list stays, so the page never gets worse than the static version.
 */
export function useLiveRepositories(initial: NormalizedRepository[]) {
  const [repositories, setRepositories] = useState(initial);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetchLiveRepositories(PROFILE.githubUsername)
      .then((live) => {
        if (cancelled) return;
        setRepositories(live);
        setIsLive(true);
      })
      .catch(() => {
        // Keep the build-time data.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { repositories, isLive };
}
