import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { ProjectCard } from '@/components/projects';
import { Button } from '@/components/ui';
import { fetchProfile, fetchRepositories } from '@/lib/github';
import { ArrowRight, Github, Star, ExternalLink, Code, Brain, Shield, Server } from 'lucide-react';
import Link from 'next/link';
import type { NormalizedRepository, CuratedProject } from '@/types';

const FEATURED_REPOS = ['devfolio', 'ai-research-toolkit', 'secure-api-gateway'];

const curatedProjects: Record<string, Partial<CuratedProject>> = {
  devfolio: {
    displayTitle: 'Devfolio',
    summary: 'A GitHub-powered professional developer portfolio built with Next.js, React, TypeScript, and Tailwind CSS.',
    problem: 'Developers need a maintainable portfolio that automatically syncs with GitHub without manual updates.',
    roleAndContribution: 'Full-stack development, architecture, and deployment.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'GitHub API'],
    demoUrl: '/',
  },
  'ai-research-toolkit': {
    displayTitle: 'AI Research Toolkit',
    summary: 'A collection of tools and utilities for reproducible AI/ML research workflows.',
    problem: 'Reproducibility in ML research is challenging due to environment drift and lack of standardized tooling.',
    roleAndContribution: 'Core library development, CLI tools, and documentation.',
    technologies: ['Python', 'PyTorch', 'MLflow', 'Docker'],
  },
  'secure-api-gateway': {
    displayTitle: 'Secure API Gateway',
    summary: 'A production-ready API gateway with authentication, rate limiting, and observability.',
    problem: 'Microservices need a unified entry point with security, monitoring, and traffic management.',
    roleAndContribution: 'Architecture design, Go implementation, and Kubernetes deployment.',
    technologies: ['Go', 'Kubernetes', 'Prometheus', 'OAuth2/OIDC'],
  },
};

const skillCategories = [
  {
    category: 'AI/ML & GenAI',
    icon: Brain,
    skills: [
      { name: 'Large Language Models', verified: true },
      { name: 'RAG Systems', verified: true },
      { name: 'Prompt Engineering', verified: true },
      { name: 'MLOps & Model Deployment', verified: true },
      { name: 'Computer Vision', verified: false },
      { name: 'ML Experiment Tracking', verified: true },
    ],
  },
  {
    category: 'Cybersecurity',
    icon: Shield,
    skills: [
      { name: 'Application Security', verified: true },
      { name: 'Threat Modeling (STRIDE)', verified: true },
      { name: 'Secure Code Review', verified: true },
      { name: 'Vulnerability Assessment', verified: true },
      { name: 'DevSecOps', verified: true },
      { name: 'Compliance (SOC2, ISO27001)', verified: false },
    ],
  },
  {
    category: 'Full-Stack Engineering',
    icon: Code,
    skills: [
      { name: 'Next.js & React', verified: true },
      { name: 'TypeScript', verified: true },
      { name: 'Node.js & Go', verified: true },
      { name: 'PostgreSQL & Redis', verified: true },
      { name: 'GraphQL & REST APIs', verified: true },
      { name: 'Testing (Vitest, Playwright)', verified: true },
    ],
  },
  {
    category: 'DevOps & Cloud',
    icon: Server,
    skills: [
      { name: 'Kubernetes', verified: true },
      { name: 'Docker', verified: true },
      { name: 'CI/CD (GitHub Actions)', verified: true },
      { name: 'Infrastructure as Code (Terraform)', verified: true },
      { name: 'Observability (Prometheus, Grafana)', verified: true },
      { name: 'AWS / GCP', verified: true },
    ],
  },
];

export const metadata: Metadata = {
  title: 'Building Intelligent Systems',
  description: 'Professional portfolio of a software engineer focused on AI/ML, GenAI, cybersecurity, full-stack engineering, and research.',
};

async function getData() {
  const username = process.env.GITHUB_USERNAME;

  if (!username) {
    return { profile: null, repositories: [] as NormalizedRepository[] };
  }

  try {
    const [profile, repositories] = await Promise.all([
      fetchProfile(username),
      fetchRepositories(username),
    ]);
    return { profile, repositories };
  } catch {
    return { profile: null, repositories: [] as NormalizedRepository[] };
  }
}

export default async function HomePage() {
  const { profile, repositories } = await getData();
  const featuredRepos = repositories.filter((r) => FEATURED_REPOS.includes(r.name.toLowerCase()));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16" id="main-content">
        {/* Hero Section */}
        <section className="section container-main" aria-labelledby="hero-heading">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-soft text-accent text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
              Open to opportunities
            </div>
            <h1 id="hero-heading" className="text-display-lg font-medium text-foreground text-balance">
              Building intelligent{' '}
              <span className="text-accent">systems</span>
              {' '}that solve real problems.
            </h1>
            <p className="mt-6 text-body-lg text-muted-foreground max-w-2xl">
              Software engineer specializing in AI/ML, GenAI, cybersecurity, and full-stack engineering.
              I build production-grade systems with a focus on security, scalability, and developer experience.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/projects" className="btn-primary inline-flex items-center gap-2 text-base px-6 py-3">
                  View Projects
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href="https://github.com/vishwa-10147" target="_blank" rel="noopener noreferrer" className="btn-outline inline-flex items-center gap-2 text-base px-6 py-3">
                  <Github className="h-4 w-4 mr-2" aria-hidden="true" />
                  GitHub
                </Link>
                <Link href="/about" className="btn-ghost inline-flex items-center gap-2 text-base px-6 py-3">
                  About Me
                </Link>
            </div>

            {profile && (
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
                  <span>{profile.followers} followers</span>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Featured Projects */}
        {featuredRepos.length > 0 && (
          <section className="section container-main" aria-labelledby="featured-heading">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 id="featured-heading" className="text-heading-xl font-semibold text-foreground">
                  Featured Projects
                </h2>
                <p className="mt-1 text-body text-muted-foreground">
                  Curated case studies for selected high-value projects.
                </p>
              </div>
              <Link href="/projects" className="btn-ghost inline-flex items-center gap-2">
                  All Projects
                  <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
                </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredRepos.map((repo) => {
                const curated = curatedProjects[repo.name.toLowerCase() as keyof typeof curatedProjects];
                return <ProjectCard key={repo.id} repository={repo} curated={curated} featured />;
              })}
            </div>
          </section>
        )}

        {/* Skills Preview */}
        <section className="section-sm container-main bg-surface/50" aria-labelledby="skills-heading">
          <header className="mb-8">
            <h2 id="skills-heading" className="text-heading-xl font-semibold text-foreground">
              Technical Skills
            </h2>
            <p className="mt-1 text-body text-muted-foreground">
              Technologies I work with regularly. Verified skills have production evidence.
            </p>
          </header>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {skillCategories.map(({ category, icon: Icon, skills }) => (
              <div key={category} className="card-base">
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
                  <h3 className="text-heading-sm font-semibold text-foreground">{category}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill.name}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        skill.verified
                          ? 'bg-accent-soft text-accent'
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      {skill.name}
                      {skill.verified && (
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-label="Verified" title="Verified" />
                      )}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/skills" className="btn-outline inline-flex items-center gap-2">
              View All Skills
            </Link>
          </div>
        </section>

        {/* Call to Action */}
        <section className="section container-main" aria-labelledby="cta-heading">
          <div className="card-elevated max-w-3xl mx-auto text-center p-10 md:p-16">
            <h2 id="cta-heading" className="text-heading-xl font-semibold text-foreground">
              Interested in working together?
            </h2>
            <p className="mt-4 text-body-lg text-muted-foreground max-w-lg mx-auto">
              I&apos;m always open to discussing new opportunities, interesting problems, or potential collaborations.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="mailto:vishwakokkireni@gmail.com" className="btn-primary inline-flex items-center gap-2 text-base px-6 py-3">
                Get in Touch
                <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
              </Link>
              <Link href="https://www.linkedin.com/in/vishwa-kokkireni-7081152ba/" target="_blank" rel="noopener noreferrer" className="btn-outline inline-flex items-center gap-2 text-base px-6 py-3">
                Connect on LinkedIn
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}