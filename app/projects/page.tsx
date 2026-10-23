import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { RepositoryList } from '@/components/projects';
import { fetchProfile, fetchRepositories } from '@/lib/github';
import { PROFILE, getCuratedProject } from '@/lib/portfolio';
import type { NormalizedRepository } from '@/types';

// Curated featured repositories - update with actual repo names
const FEATURED_REPOS = ['devfolio', 'ai-research-toolkit', 'secure-api-gateway'];

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
    const withDescriptions = repositories.map((repo) => ({
      ...repo,
      description: repo.description || getCuratedProject(repo.name)?.summary || null,
    }));
    return { profile, repositories: withDescriptions, error: null };
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
            {profile && (
              <p className="mt-4 text-body-sm text-muted-foreground">
                Showing {repositories.length} public repositories for {PROFILE.name}
              </p>
            )}
            {!profile && !error && (
              <p className="mt-4 text-body-sm text-muted-foreground">
                Configure <code>GITHUB_USERNAME</code> in your environment to display your GitHub repositories.
              </p>
            )}
          </header>

          <RepositoryList
            repositories={repositories}
            featuredRepos={FEATURED_REPOS}
            error={error}
          />
        </section>
      </main>
      <Footer />
    </div>
  );
}