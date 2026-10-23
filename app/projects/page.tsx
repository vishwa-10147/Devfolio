import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { LiveRepositoryList } from '@/components/projects';
import { fetchProfile, fetchRepositories } from '@/lib/github';
import { withCuratedDescriptions } from '@/lib/github/live';
import { FEATURED_REPOS } from '@/lib/portfolio';
import type { NormalizedRepository } from '@/types';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Browse all public GitHub repositories with search, filtering, and sorting capabilities.',
};

async function getData() {
  const username = process.env.GITHUB_USERNAME;

  if (!username) {
    return { profile: null, repositories: [] as NormalizedRepository[], error: 'GITHUB_USERNAME not configured' };
  }

  try {
    const [profile, repositories] = await Promise.all([
      fetchProfile(username),
      fetchRepositories(username),
    ]);
    // Many repos have no GitHub description; fall back to the curated summary.
    return { profile, repositories: withCuratedDescriptions(repositories), error: null };
  } catch (error) {
    console.error('Failed to fetch GitHub data:', error);
    return {
      profile: null,
      repositories: [] as NormalizedRepository[],
      error: error instanceof Error ? error.message : 'Failed to fetch repositories',
    };
  }
}

export default async function ProjectsPage() {
  const { profile, repositories, error } = await getData();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16" id="main-content">
        <section className="section container-main" aria-labelledby="projects-heading">
          <header className="mb-12">
            <h1 id="projects-heading" className="text-display-md font-medium text-foreground">
              Projects & Repositories
            </h1>
            <p className="mt-4 text-body-lg text-muted-foreground max-w-2xl">
              Explore my public GitHub repositories. Use the filters to find projects by language, topic, or sort by stars and recent activity.
            </p>
            {!profile && !error && (
              <p className="mt-4 text-body-sm text-muted-foreground">
                Configure <code>GITHUB_USERNAME</code> in your environment to display your GitHub repositories.
              </p>
            )}
          </header>

          <LiveRepositoryList
            initialRepositories={repositories}
            featuredRepos={FEATURED_REPOS}
            buildError={error}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}