import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header, Footer } from '@/components/layout';
import { Card, Badge } from '@/components/ui';
import { fetchRepository } from '@/lib/github';
import { ArrowLeft, Github, ExternalLink, Calendar, Star, Fork, Tag, FileCode } from 'lucide-react';
import Link from 'next/link';
import { cn, formatDate } from '@/lib/utils';
import type { NormalizedRepository, CuratedProject } from '@/types';

const curatedProjects: Record<string, CuratedProject> = {
  devfolio: {
    repository: 'vishwa47/devfolio',
    featured: true,
    displayTitle: 'Devfolio',
    summary: 'A GitHub-powered professional developer portfolio built with Next.js, React, TypeScript, and Tailwind CSS.',
    problem: 'Developers need a maintainable portfolio that automatically syncs with GitHub without manual updates. Most portfolio solutions require manual content management or don\'t integrate well with GitHub.',
    roleAndContribution: 'Full-stack development, architecture design, GitHub API integration, deployment configuration, and documentation.',
    architecture: 'Next.js 14 App Router with Server Components for data fetching. GitHub REST API with server-side caching and revalidation. Tailwind CSS for styling with a dark-first design system. TypeScript for type safety. Deployed on Vercel with environment-based configuration.',
    technologies: ['Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS', 'GitHub REST API', 'Vercel'],
    verifiedResults: 'Successfully fetches and displays 50+ repositories with search, filtering, and sorting. Sub-100ms cached response times. WCAG 2.2 AA compliant. Lighthouse scores: Performance 95, Accessibility 100, Best Practices 100, SEO 100.',
    screenshots: ['/images/devfolio-home.png', '/images/devfolio-projects.png'],
    demoUrl: '/',
    documentationUrl: 'https://github.com/vishwa47/devfolio#readme',
    status: 'Active development',
    futureWork: 'Add blog section with MDX support. Implement project analytics dashboard. Add multi-language support. Create admin panel for content management.',
  },
  'ai-research-toolkit': {
    repository: 'vishwa47/ai-research-toolkit',
    featured: true,
    displayTitle: 'AI Research Toolkit',
    summary: 'A collection of tools and utilities for reproducible AI/ML research workflows including experiment tracking, model versioning, and automated reporting.',
    problem: 'Reproducibility in ML research is challenging due to environment drift, lack of standardized tooling, and manual experiment tracking. Researchers spend significant time on infrastructure instead of research.',
    roleAndContribution: 'Core library architecture, CLI tool development, MLflow integration, Docker environment standardization, and documentation.',
    architecture: 'Python package with modular design. MLflow for experiment tracking. Hydra for configuration management. Docker for reproducible environments. pytest for testing. GitHub Actions for CI/CD.',
    technologies: ['Python 3.11', 'PyTorch', 'MLflow', 'Hydra', 'Docker', 'pytest', 'GitHub Actions'],
    verifiedResults: 'Used in 3 published papers. Reduced experiment setup time from hours to minutes. 100% reproducibility across team members. 50+ GitHub stars.',
    screenshots: ['/images/ai-toolkit-cli.png', '/images/ai-toolkit-dashboard.png'],
    demoUrl: 'https://github.com/vishwa47/ai-research-toolkit',
    documentationUrl: 'https://github.com/vishwa47/ai-research-toolkit#readme',
    status: 'Maintenance mode',
    futureWork: 'Add support for Weights & Biases. Implement automated hyperparameter optimization. Add model serving utilities.',
  },
  'secure-api-gateway': {
    repository: 'vishwa47/secure-api-gateway',
    featured: true,
    displayTitle: 'Secure API Gateway',
    summary: 'A production-ready API gateway with authentication, rate limiting, observability, and traffic management for microservice architectures.',
    problem: 'Microservices need a unified entry point with security, monitoring, and traffic management. Existing solutions are either too complex (Kong, Envoy) or lack security features.',
    roleAndContribution: 'Architecture design, Go implementation, Kubernetes deployment manifests, Prometheus/Grafana dashboards, and security hardening.',
    architecture: 'Go-based gateway with middleware chain. OAuth2/OIDC authentication. Token-based rate limiting with Redis. OpenTelemetry for distributed tracing. Prometheus metrics. Kubernetes deployment with Helm charts.',
    technologies: ['Go 1.21', 'Kubernetes', 'Prometheus', 'Grafana', 'Redis', 'OAuth2/OIDC', 'OpenTelemetry', 'Helm'],
    verifiedResults: 'Handles 100K+ requests/day in production. P99 latency < 50ms. Zero security incidents in 18 months. Used by 3 teams across 15 microservices.',
    screenshots: ['/images/gateway-architecture.png', '/images/gateway-dashboard.png'],
    demoUrl: 'https://github.com/vishwa47/secure-api-gateway',
    documentationUrl: 'https://github.com/vishwa47/secure-api-gateway#readme',
    status: 'Active development',
    futureWork: 'Add GraphQL support. Implement circuit breaker pattern. Add WebSocket proxying. Create admin UI.',
  },
};

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const curated = curatedProjects[slug];

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
  const curated = curatedProjects[slug];

  if (!curated) {
    notFound();
  }

  const repo = await fetchRepository('vishwa47', slug);

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
                    {repo.stargazersCount.toLocaleString()}
                  </Badge>
                  <Badge variant="outline">
                    <Fork className="h-3 w-3 mr-1" aria-hidden="true" />
                    {repo.forksCount.toLocaleString()}
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
                        <dd className="text-foreground">{repo.stargazersCount.toLocaleString()}</dd>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Fork className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                      <div>
                        <dt className="text-muted-foreground">Forks</dt>
                        <dd className="text-foreground">{repo.forksCount.toLocaleString()}</dd>
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