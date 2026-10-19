import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { Card } from '@/components/ui';
import { Calendar, MapPin, Mail, Github, Linkedin, Twitter, Award, BookOpen, Briefcase, Code2, Heart } from 'lucide-react';

const experience = [
  {
    role: 'Senior Software Engineer',
    company: 'Tech Company',
    location: 'San Francisco, CA (Remote)',
    startDate: '2022-01',
    endDate: 'Present',
    description: [
      'Lead backend architecture for AI-powered products serving 10M+ users',
      'Designed and implemented RAG-based LLM applications with 99.9% uptime',
      'Built security-first development practices reducing vulnerabilities by 80%',
      'Mentored 5+ engineers and established code review standards',
    ],
    technologies: ['Go', 'Python', 'Kubernetes', 'PostgreSQL', 'Redis', 'LLMs'],
  },
  {
    role: 'Software Engineer',
    company: 'Startup Inc.',
    location: 'New York, NY',
    startDate: '2019-06',
    endDate: '2021-12',
    description: [
      'Built full-stack applications using React, Node.js, and TypeScript',
      'Implemented CI/CD pipelines reducing deployment time by 70%',
      'Designed RESTful APIs and GraphQL schemas for mobile and web clients',
      'Led migration from monolith to microservices architecture',
    ],
    technologies: ['React', 'Node.js', 'TypeScript', 'GraphQL', 'Docker', 'AWS'],
  },
];

const education = [
  {
    degree: 'M.S. Computer Science',
    institution: 'Stanford University',
    location: 'Stanford, CA',
    startDate: '2017-09',
    endDate: '2019-06',
    description: 'Focus: Artificial Intelligence, Machine Learning, Security',
  },
  {
    degree: 'B.S. Computer Engineering',
    institution: 'University of California, Berkeley',
    location: 'Berkeley, CA',
    startDate: '2013-09',
    endDate: '2017-06',
    description: 'Focus: Systems Programming, Computer Architecture, Cryptography',
  },
];

const publications = [
  {
    title: 'Efficient Fine-tuning of Large Language Models for Domain Adaptation',
    venue: 'NeurIPS Workshop on Efficient NLP',
    date: '2023-12',
    url: 'https://arxiv.org/abs/xxxx.xxxxx',
    authors: ['Author Name', 'Co-author'],
  },
  {
    title: 'Automated Threat Detection in Microservice Architectures',
    venue: 'USENIX Security Symposium',
    date: '2022-08',
    url: 'https://www.usenix.org/conference/usenixsecurity22',
    authors: ['Author Name', 'Co-author'],
  },
];

const interests = [
  { name: 'AI Safety & Alignment', icon: Heart },
  { name: 'Open Source Contribution', icon: Github },
  { name: 'Technical Writing', icon: BookOpen },
  { name: 'Security Research', icon: Code2 },
  { name: 'Mentoring & Teaching', icon: Award },
];

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about my background, experience, education, and research interests.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16" id="main-content">
        <section className="section container-main" aria-labelledby="about-heading">
          <header className="mb-12 max-w-3xl">
            <h1 id="about-heading" className="text-display-md font-medium text-foreground">
              About Me
            </h1>
            <p className="mt-4 text-body-lg text-muted-foreground">
              Software engineer building intelligent systems at the intersection of AI/ML, cybersecurity,
              and full-stack engineering. Passionate about creating secure, scalable, and maintainable software.
            </p>
          </header>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <Card variant="elevated" className="sticky top-24">
                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 blur-xl" />
                    <div className="relative rounded-full border-4 border-border bg-surface p-1">
                      <div className="rounded-full bg-gradient-to-br from-muted to-surface-elevated aspect-square flex items-center justify-center">
                        <Code2 className="h-16 w-16 text-accent" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                  <h2 className="text-heading-lg font-semibold text-foreground">Software Engineer</h2>
                  <p className="mt-1 text-body text-accent">AI/ML • Security • Full-Stack</p>
                  <div className="mt-6 flex items-center justify-center gap-4">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="GitHub">
                      <Github className="h-5 w-5" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="LinkedIn">
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Twitter">
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a href="mailto:hello@example.com" className="text-muted-foreground hover:text-accent transition-colors" aria-label="Email">
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-border space-y-4">
                  <div className="flex items-center gap-3 text-body-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    <span className="text-foreground">San Francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-3 text-body-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    <span className="text-foreground">Open to opportunities</span>
                  </div>
                  <div className="flex items-center gap-3 text-body-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    <span className="text-foreground">hello@example.com</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Experience & Education */}
            <div className="lg:col-span-2 space-y-8">
              <section aria-labelledby="experience-heading">
                <h2 id="experience-heading" className="text-heading-xl font-semibold text-foreground flex items-center gap-3">
                  <Briefcase className="h-6 w-6 text-accent" aria-hidden="true" />
                  Experience
                </h2>
                <div className="mt-6 space-y-6">
                  {experience.map((job, index) => (
                    <Card key={index} variant="elevated">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div>
                          <h3 className="text-heading-md font-semibold text-foreground">{job.role}</h3>
                          <p className="mt-1 text-body text-accent">{job.company}</p>
                          <p className="mt-1 text-body-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                            {job.location}
                          </p>
                        </div>
                        <div className="text-body-sm text-muted-foreground whitespace-nowrap">
                          {new Date(job.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                          {' '}–{' '}
                          {job.endDate === 'Present' ? (
                            'Present'
                          ) : (
                            new Date(job.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                          )}
                        </div>
                      </div>
                      <ul className="mt-4 space-y-2" role="list">
                        {job.description.map((desc, i) => (
                          <li key={i} className="text-body text-muted-foreground flex items-start gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" aria-hidden="true" />
                            {desc}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {job.technologies.map((tech) => (
                          <span key={tech} className="px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              </section>

              <section aria-labelledby="education-heading">
                <h2 id="education-heading" className="text-heading-xl font-semibold text-foreground flex items-center gap-3">
                  <BookOpen className="h-6 w-6 text-accent" aria-hidden="true" />
                  Education
                </h2>
                <div className="mt-6 space-y-4">
                  {education.map((edu, index) => (
                    <Card key={index} variant="default">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div>
                          <h3 className="text-heading-md font-semibold text-foreground">{edu.degree}</h3>
                          <p className="mt-1 text-body text-accent">{edu.institution}</p>
                          {edu.description && <p className="mt-1 text-body-sm text-muted-foreground">{edu.description}</p>}
                          <p className="mt-1 text-body-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                            {edu.location}
                          </p>
                        </div>
                        <div className="text-body-sm text-muted-foreground whitespace-nowrap">
                          {new Date(edu.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                          {' '}–{' '}
                          {new Date(edu.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </section>

              <section aria-labelledby="publications-heading">
                <h2 id="publications-heading" className="text-heading-xl font-semibold text-foreground flex items-center gap-3">
                  <Award className="h-6 w-6 text-accent" aria-hidden="true" />
                  Publications & Research
                </h2>
                <div className="mt-6 space-y-4">
                  {publications.map((pub, index) => (
                    <Card key={index} variant="default">
                      <h3 className="text-heading-sm font-semibold text-foreground">{pub.title}</h3>
                      <p className="mt-1 text-body-sm text-muted-foreground">{pub.venue}</p>
                      <p className="mt-1 text-body-sm text-muted-foreground">{pub.authors.join(', ')}</p>
                      <div className="mt-3 flex items-center gap-3">
                        <time className="text-body-sm text-muted-foreground">
                          {new Date(pub.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </time>
                        {pub.url && (
                          <a href={pub.url} target="_blank" rel="noopener noreferrer" className="text-body-sm text-accent hover:underline">
                            View Publication
                          </a>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </section>

        {/* Interests */}
        <section className="section-sm container-main bg-surface/50" aria-labelledby="interests-heading">
          <header className="mb-8 text-center">
            <h2 id="interests-heading" className="text-heading-xl font-semibold text-foreground">
              Interests & Values
            </h2>
            <p className="mt-1 text-body text-muted-foreground">
              What drives me outside of day-to-day engineering work.
            </p>
          </header>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {interests.map((interest) => (
              <Card key={interest.name} variant="elevated" className="text-center p-6">
                <interest.icon className="h-10 w-10 text-accent mx-auto mb-4" aria-hidden="true" />
                <h3 className="text-heading-sm font-semibold text-foreground">{interest.name}</h3>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}