import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { ProjectCard } from '@/components/projects';
import { Button } from '@/components/ui';
import { fetchProfile, fetchRepositories } from '@/lib/github';
import { ArrowRight, Github, Star, ExternalLink, Code, Brain, Shield, Server } from 'lucide-react';
import Link from 'next/link';
import type { NormalizedRepository } from '@/types';
import { FEATURED_REPOS, PROFILE, getCuratedProject, skillGroups } from '@/lib/portfolio';

const skillIcons = { security: Shield, ai: Brain, backend: Server, frontend: Code, devops: Server, fundamentals: Code } as const;

// Home page previews the first four skill groups.
const skillPreview = skillGroups.slice(0, 4);

export const metadata: Metadata = {
  title: 'Vishwa Kokkireni — Security, AI/ML & Backend Engineering',
  description: `${PROFILE.name}: ${PROFILE.summary}`,
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
  const featuredRepos = FEATURED_REPOS
    .map((name) => repositories.find((r) => r.name.toLowerCase() === name))
    .filter((r): r is NormalizedRepository => r !== undefined);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16" id="main-content">
        {/* Hero Section */}
        <section className="section container-main" aria-labelledby="hero-heading">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-soft text-accent text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2 rounded-full bg-accent animate-pulse" aria-hidden="true" />
              Open to internships & collaborations
            </div>
            <h1 id="hero-heading" className="text-display-lg font-medium text-foreground text-balance">
              I build systems that{' '}
              <span className="text-accent">watch networks</span>
              {' '}and flag what&apos;s wrong.
            </h1>
            <p className="mt-6 text-body-lg text-muted-foreground max-w-2xl">
              I&apos;m {PROFILE.name}, a Computer Science Engineering student working where cybersecurity, machine
              learning, and backend engineering meet: edge security appliances, ML intrusion detection, and
              AI-assisted exam proctoring, built end-to-end with tests, CI and Docker.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/projects" className="btn-primary inline-flex items-center gap-2 text-base px-6 py-3">
                  View Projects
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href={PROFILE.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-outline inline-flex items-center gap-2 text-base px-6 py-3">
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
                  Case studies of the systems I've built, from edge security appliances to exam proctoring.
                </p>
              </div>
              <Link href="/projects" className="btn-ghost inline-flex items-center gap-2">
                  All Projects
                  <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
                </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredRepos.map((repo) => {
                const curated = getCuratedProject(repo.name);
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
              Technologies I use across my projects. Highlighted skills are used in a public repo.
            </p>
          </header>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {skillPreview.map(({ category, title, skills }) => {
              const Icon = skillIcons[category];
              return (
              <div key={title} className="card-base">
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="h-6 w-6 text-accent" aria-hidden="true" />
                  <h3 className="text-heading-sm font-semibold text-foreground">{title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.slice(0, 6).map((skill) => (
                    <span
                      key={skill.name}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        skill.usedIn
                          ? 'bg-accent-soft text-accent'
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      {skill.name}
                      {skill.usedIn && (
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-label={`Used in ${skill.usedIn.join(', ')}`} title={`Used in ${skill.usedIn.join(', ')}`} />
                      )}
                    </span>
                  ))}
                </div>
              </div>
              );
            })}
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
              I&apos;m open to internships, research, and collaborations in Security Engineering, AI/ML, and Backend Development.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href={`mailto:${PROFILE.email}`} className="btn-primary inline-flex items-center gap-2 text-base px-6 py-3">
                Get in Touch
                <ArrowRight className="h-4 w-4 ml-2" aria-hidden="true" />
              </Link>
              <Link href={PROFILE.linkedinUrl} target="_blank" rel="noopener noreferrer" className="btn-outline inline-flex items-center gap-2 text-base px-6 py-3">
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