import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { Brain, Shield, Code, Server, Layers, Terminal } from 'lucide-react';
import { PROFILE, getCuratedProject, skillGroups } from '@/lib/portfolio';

const groupIcons = {
  security: Shield,
  ai: Brain,
  backend: Server,
  frontend: Layers,
  devops: Terminal,
  fundamentals: Code,
} as const;

export const metadata: Metadata = {
  title: 'Skills',
  description: 'Skills across security & networking, AI/ML, backend, frontend and DevOps, each linked to the projects that use them.',
};

function repoHref(repoName: string): string {
  return getCuratedProject(repoName) ? `/projects/${repoName}` : `${PROFILE.githubUrl}/${repoName}`;
}

function repoLabel(repoName: string): string {
  return getCuratedProject(repoName)?.displayTitle || repoName;
}

export default function SkillsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16" id="main-content">
        <section className="section container-main" aria-labelledby="skills-heading">
          <header className="mb-12 max-w-3xl">
            <h1 id="skills-heading" className="text-display-md font-medium text-foreground">
              Technical Skills
            </h1>
            <p className="mt-4 text-body-lg text-muted-foreground">
              What I work with, grouped by area. Where a skill is used in one of my public repositories, the
              project is linked so you can see it in practice.
            </p>
          </header>

          <div className="space-y-12">
            {skillGroups.map(({ category, title, description, skills }) => {
              const Icon = groupIcons[category];
              return (
                <section key={category} className="card-elevated p-8" aria-labelledby={`${category}-heading`}>
                  <div className="flex items-start gap-4 mb-6">
                    <div className="flex-shrink-0 p-3 rounded-lg bg-accent-soft text-accent">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 id={`${category}-heading`} className="text-heading-lg font-semibold text-foreground">
                        {title}
                      </h2>
                      <p className="mt-1 text-body text-muted-foreground">{description}</p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex flex-col gap-2 p-4 rounded-lg bg-surface border border-border transition-all hover:border-accent/30"
                      >
                        <span className="font-medium text-foreground">{skill.name}</span>
                        {skill.usedIn && (
                          <div className="flex flex-wrap items-center gap-1.5 text-caption text-muted-foreground">
                            <span>Used in</span>
                            {skill.usedIn.map((repo) => (
                              <a
                                key={repo}
                                href={repoHref(repo)}
                                className="px-2 py-0.5 rounded-full bg-accent-soft text-accent hover:underline"
                                {...(getCuratedProject(repo) ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                              >
                                {repoLabel(repo)}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
