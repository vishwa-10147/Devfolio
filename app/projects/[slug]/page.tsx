import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header, Footer } from '@/components/layout';
import { Card, Badge } from '@/components/ui';
import { fetchRepository } from '@/lib/github';
import { ArrowLeft, Github, ExternalLink, Calendar, Star, GitFork, Tag, FileCode } from 'lucide-react';
import Link from 'next/link';
import { cn, formatDate } from '@/lib/utils';
import { curatedProjects, getCuratedProject } from '@/lib/portfolio';

// Static export: pre-render one page per case study, using the repo's real name
// so it matches the links built from GitHub data.
export function generateStaticParams() {
  return Object.values(curatedProjects).map((project) => ({
    slug: project.repository.split('/')[1],
  }));
}

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const curated = getCuratedProject(slug);

  if (!curated) {
    return { title: 'Project Not Found' };
  }

  return {
    title: curated.displayTitle || slug,
    description: curated.summary,
    openGraph: {
      title: curated.displayTitle || slug,
      description: curated.summary,
      type: 'article',
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const curated = getCuratedProject(slug);

  if (!curated) {
    notFound();
  }

  const [owner, repoName] = curated.repository.split('/');
  const repo = await fetchRepository(owner, repoName);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16" id="main-content">
        <article className="container-main">
          {/* Breadcrumb */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-body-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/projects" className="hover:text-foreground transition-colors">Projects</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground" aria-current="page">
                {curated.displayTitle || slug}
              </li>
            </ol>
          </nav>

          {/* Hero */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              {curated.featured && <Badge variant="success">Featured Project</Badge>}
              {repo && (
                <>
                  <Badge variant="outline">
                    <FileCode className="h-3 w-3 mr-1" aria-hidden="true" />
                    {repo.language || 'Unknown'}
                  </Badge>
                  <Badge variant="outline">
                    <Star className="h-3 w-3 mr-1" aria-hidden="true" />
                    {repo.stars.toLocaleString()}
                  </Badge>
                  <Badge variant="outline">
                    <GitFork className="h-3 w-3 mr-1" aria-hidden="true" />
                    {repo.forks.toLocaleString()}
                  </Badge>
                </>
              )}
            </div>

            <h1 className="text-display-md font-medium text-foreground mb-4">
              {curated.displayTitle || slug}
            </h1>

            <p className="text-body-lg text-muted-foreground max-w-3xl">
              {curated.summary}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              {curated.demoUrl && (
                <Link
                  href={curated.demoUrl}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  Live Demo
                </Link>
              )}
              {curated.documentationUrl && (
                <Link
                  href={curated.documentationUrl}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-border bg-transparent font-medium hover:bg-secondary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileCode className="h-4 w-4" aria-hidden="true" />
                  Documentation
                </Link>
              )}
              {repo && (
                <Link
                  href={repo.htmlUrl}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-border bg-transparent font-medium hover:bg-secondary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  View Source
                </Link>
              )}
            </div>
          </header>

          {/* Screenshots */}
          {curated.screenshots && curated.screenshots.length > 0 && (
            <section className="mb-12" aria-labelledby="screenshots-heading">
              <h2 id="screenshots-heading" className="sr-only">Screenshots</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {curated.screenshots.map((screenshot, index) => (
                  <div key={index} className="rounded-lg border border-border overflow-hidden bg-surface">
                    <img
                      src={screenshot}
                      alt={`Screenshot ${index + 1} of ${curated.displayTitle || slug}`}
                      className="w-full h-auto"
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Content Sections */}
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              <section className="card-elevated p-8" aria-labelledby="problem-heading">
                <h2 id="problem-heading" className="text-heading-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  Problem & Context
                </h2>
                <p className="text-body text-muted-foreground">{curated.problem}</p>
              </section>

              <section className="card-elevated p-8" aria-labelledby="role-heading">
                <h2 id="role-heading" className="text-heading-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                  My Role & Contribution
                </h2>
                <p className="text-body text-muted-foreground">{curated.roleAndContribution}</p>
              </section>

              {curated.architecture && (
                <section className="card-elevated p-8" aria-labelledby="architecture-heading">
                  <h2 id="architecture-heading" className="text-heading-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    Architecture & Design Decisions
                  </h2>
                  <p className="text-body text-muted-foreground">{curated.architecture}</p>
                </section>
              )}

              {curated.verifiedResults && (
                <section className="card-elevated p-8" aria-labelledby="results-heading">
                  <h2 id="results-heading" className="text-heading-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    Verified Results
                  </h2>
                  <p className="text-body text-muted-foreground">{curated.verifiedResults}</p>
                </section>
              )}

              {curated.futureWork && (
                <section className="card-elevated p-8" aria-labelledby="future-heading">
                  <h2 id="future-heading" className="text-heading-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    Future Work
                  </h2>
                  <p className="text-body text-muted-foreground">{curated.futureWork}</p>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <Card variant="elevated" className="p-6 sticky top-24">
                <h3 className="text-heading-sm font-semibold text-foreground mb-4">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {curated.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </Card>

              {repo && (
                <Card variant="elevated" className="p-6 sticky top-24">
                  <h3 className="text-heading-sm font-semibold text-foreground mb-4">Repository Info</h3>
                  <dl className="space-y-4 text-body-sm">
                    <div className="flex items-center gap-3">
                      <Github className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                      <div>
                        <dt className="text-muted-foreground">Repository</dt>
                        <dd className="text-foreground font-medium">{repo.fullName}</dd>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                      <div>
                        <dt className="text-muted-foreground">Created</dt>
                        <dd className="text-foreground">{formatDate(repo.createdAt)}</dd>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                      <div>
                        <dt className="text-muted-foreground">Last Updated</dt>
                        <dd className="text-foreground">{formatDate(repo.updatedAt)}</dd>
                      </div>
                    </div>
                    {repo.homepage && (
                      <div className="flex items-center gap-3">
                        <ExternalLink className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                        <div>
                          <dt className="text-muted-foreground">Homepage</dt>
                          <dd className="text-foreground">
                            <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="link">
                              {repo.homepage}
                            </a>
                          </dd>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <Tag className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                      <div>
                        <dt className="text-muted-foreground">Topics</dt>
                        <dd className="text-foreground">
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {repo.topics.slice(0, 8).map((topic) => (
                              <Badge key={topic} variant="outline" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                            {repo.topics.length > 8 && (
                              <Badge variant="outline" className="text-xs text-muted-foreground">
                                +{repo.topics.length - 8} more
                              </Badge>
                            )}
                          </div>
                        </dd>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Star className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                      <div>
                        <dt className="text-muted-foreground">Stars</dt>
                        <dd className="text-foreground">{repo.stars.toLocaleString()}</dd>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <GitFork className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                      <div>
                        <dt className="text-muted-foreground">Forks</dt>
                        <dd className="text-foreground">{repo.forks.toLocaleString()}</dd>
                      </div>
                    </div>
                    {repo.isFork && (
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-xs">Fork</Badge>
                      </div>
                    )}
                    {repo.isArchived && (
                      <div className="flex items-center gap-3">
                        <Badge variant="warning" className="text-xs">Archived</Badge>
                      </div>
                    )}
                  </dl>
                </Card>
              )}

              <Card variant="elevated" className="p-6 sticky top-24">
                <h3 className="text-heading-sm font-semibold text-foreground mb-4">Status</h3>
                <div className="space-y-3">
                  <div>
                    <dt className="text-body-sm text-muted-foreground">Current Status</dt>
                    <dd className="text-body text-foreground">{curated.status || 'Unknown'}</dd>
                  </div>
                  {curated.futureWork && (
                    <div>
                      <dt className="text-body-sm text-muted-foreground">Planned Improvements</dt>
                      <dd className="text-body text-muted-foreground">{curated.futureWork}</dd>
                    </div>
                  )}
                </div>
              </Card>
            </aside>
          </div>

          {/* Back to projects */}
          <div className="mt-12 pt-8 border-t border-border">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Projects
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}