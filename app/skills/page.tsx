import { Metadata } from 'next';
import { Header, Footer } from '@/components/layout';
import { Badge } from '@/components/ui';
import { Brain, Shield, Code, Server, Database, Terminal, Globe, Layers } from 'lucide-react';

const skillCategories = [
  {
    category: 'AI/ML & GenAI',
    icon: Brain,
    description: 'Building and deploying machine learning systems, with focus on LLMs and generative AI.',
    skills: [
      { name: 'Large Language Models (LLMs)', proficiency: 'expert', verified: true },
      { name: 'Retrieval-Augmented Generation (RAG)', proficiency: 'expert', verified: true },
      { name: 'Prompt Engineering & Optimization', proficiency: 'expert', verified: true },
      { name: 'MLOps & Model Deployment', proficiency: 'advanced', verified: true },
      { name: 'MLflow & Experiment Tracking', proficiency: 'advanced', verified: true },
      { name: 'Vector Databases (Pinecone, Weaviate)', proficiency: 'advanced', verified: true },
      { name: 'Fine-tuning & LoRA', proficiency: 'intermediate', verified: false },
      { name: 'Computer Vision (YOLO, SAM)', proficiency: 'intermediate', verified: false },
    ],
  },
  {
    category: 'Cybersecurity',
    icon: Shield,
    description: 'Application security, threat modeling, and secure development practices.',
    skills: [
      { name: 'Application Security (AppSec)', proficiency: 'expert', verified: true },
      { name: 'Threat Modeling (STRIDE, PASTA)', proficiency: 'expert', verified: true },
      { name: 'Secure Code Review', proficiency: 'expert', verified: true },
      { name: 'Vulnerability Assessment & Penetration Testing', proficiency: 'advanced', verified: true },
      { name: 'DevSecOps & Security Automation', proficiency: 'advanced', verified: true },
      { name: 'OWASP Top 10 Mitigation', proficiency: 'expert', verified: true },
      { name: 'Compliance (SOC2, ISO 27001, GDPR)', proficiency: 'intermediate', verified: false },
      { name: 'Supply Chain Security (SLSA, SBOM)', proficiency: 'intermediate', verified: false },
    ],
  },
  {
    category: 'Full-Stack Engineering',
    icon: Code,
    description: 'Modern web development with focus on TypeScript, React, and performant architectures.',
    skills: [
      { name: 'TypeScript', proficiency: 'expert', verified: true },
      { name: 'Next.js & React', proficiency: 'expert', verified: true },
      { name: 'Node.js', proficiency: 'expert', verified: true },
      { name: 'Go', proficiency: 'advanced', verified: true },
      { name: 'Python', proficiency: 'advanced', verified: true },
      { name: 'GraphQL (Apollo, Yoga)', proficiency: 'advanced', verified: true },
      { name: 'REST API Design', proficiency: 'expert', verified: true },
      { name: 'Testing (Vitest, Playwright, Jest)', proficiency: 'advanced', verified: true },
      { name: 'Web Performance Optimization', proficiency: 'advanced', verified: true },
      { name: 'Accessibility (WCAG 2.2 AA)', proficiency: 'advanced', verified: true },
    ],
  },
  {
    category: 'Databases & Data Engineering',
    icon: Database,
    description: 'Database design, optimization, and data pipeline development.',
    skills: [
      { name: 'PostgreSQL', proficiency: 'expert', verified: true },
      { name: 'Redis', proficiency: 'advanced', verified: true },
      { name: 'MongoDB', proficiency: 'intermediate', verified: true },
      { name: 'Data Modeling & Schema Design', proficiency: 'expert', verified: true },
      { name: 'Query Optimization', proficiency: 'advanced', verified: true },
      { name: 'ETL/ELT Pipelines', proficiency: 'intermediate', verified: true },
      { name: 'TimescaleDB / InfluxDB', proficiency: 'intermediate', verified: false },
    ],
  },
  {
    category: 'DevOps & Cloud',
    icon: Server,
    description: 'Infrastructure automation, container orchestration, and cloud-native architectures.',
    skills: [
      { name: 'Kubernetes (EKS, GKE, AKS)', proficiency: 'expert', verified: true },
      { name: 'Docker & Containerization', proficiency: 'expert', verified: true },
      { name: 'CI/CD (GitHub Actions, GitLab CI)', proficiency: 'expert', verified: true },
      { name: 'Terraform / OpenTofu', proficiency: 'advanced', verified: true },
      { name: 'AWS / GCP', proficiency: 'advanced', verified: true },
      { name: 'Observability (Prometheus, Grafana, Jaeger)', proficiency: 'advanced', verified: true },
      { name: 'GitOps (ArgoCD, Flux)', proficiency: 'intermediate', verified: true },
      { name: 'Service Mesh (Istio, Linkerd)', proficiency: 'intermediate', verified: false },
    ],
  },
  {
    category: 'Developer Tools & Practices',
    icon: Terminal,
    description: 'Tools and practices that improve developer productivity and code quality.',
    skills: [
      { name: 'Git & GitHub', proficiency: 'expert', verified: true },
      { name: 'Linux/Unix Systems', proficiency: 'advanced', verified: true },
      { name: 'VS Code & Neovim', proficiency: 'expert', verified: true },
      { name: 'Shell Scripting (Bash, Zsh)', proficiency: 'advanced', verified: true },
      { name: 'Architecture Decision Records (ADRs)', proficiency: 'advanced', verified: true },
      { name: 'Technical Writing & Documentation', proficiency: 'advanced', verified: true },
      { name: 'Mentoring & Code Review', proficiency: 'expert', verified: true },
    ],
  },
];

export const metadata: Metadata = {
  title: 'Skills',
  description: 'Technical skills across AI/ML, cybersecurity, full-stack engineering, databases, DevOps, and developer practices.',
};

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
              Technologies and practices I work with regularly. Skills marked as verified have production evidence
              through shipped projects, open-source contributions, or certifications.
            </p>
          </header>

          <div className="space-y-12">
            {skillCategories.map(({ category, icon: Icon, description, skills }) => (
              <section key={category} className="card-elevated p-8" aria-labelledby={`${category}-heading`}>
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 p-3 rounded-lg bg-accent-soft text-accent">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h2 id={`${category}-heading`} className="text-heading-lg font-semibold text-foreground">
                      {category}
                    </h2>
                    <p className="mt-1 text-body text-muted-foreground">{description}</p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="group flex items-center gap-3 p-4 rounded-lg bg-surface border border-border transition-all hover:border-accent/30"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground truncate">{skill.name}</span>
                          {skill.verified && (
                            <Badge variant="success" className="text-xs flex-shrink-0">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="mt-1.5 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent rounded-full transition-all duration-500 group-hover:opacity-100"
                            style={{
                              width:
                                skill.proficiency === 'expert'
                                  ? '100%'
                                  : skill.proficiency === 'advanced'
                                  ? '80%'
                                  : skill.proficiency === 'intermediate'
                                  ? '60%'
                                  : '40%',
                            }}
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                      <span className="text-caption text-muted-foreground whitespace-nowrap capitalize">
                        {skill.proficiency}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <section className="mt-12 card-base" aria-labelledby="legend-heading">
            <h2 id="legend-heading" className="text-heading-sm font-semibold text-foreground mb-4">
              Proficiency Legend
            </h2>
            <div className="grid gap-4 sm:grid-cols-4">
              {[
                { level: 'Expert', description: 'Deep expertise, can architect and teach', color: 'text-accent' },
                { level: 'Advanced', description: 'Strong practical experience, handles complex tasks', color: 'text-primary' },
                { level: 'Intermediate', description: 'Solid working knowledge, productive with guidance', color: 'text-amber-400' },
                { level: 'Beginner', description: 'Foundational knowledge, learning actively', color: 'text-muted-foreground' },
              ].map(({ level, description, color }) => (
                <div key={level} className="flex items-center gap-3 p-3 rounded-lg bg-surface border border-border">
                  <div className={`w-16 h-1.5 rounded-full bg-gradient-to-r ${color}`} aria-hidden="true" />
                  <div>
                    <div className="font-medium text-foreground">{level}</div>
                    <div className="text-body-sm text-muted-foreground">{description}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <h3 className="text-heading-sm font-semibold text-foreground mb-3">Verification Key</h3>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Badge variant="success">Verified</Badge>
                  <span className="text-body-sm text-muted-foreground">Production evidence available</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Learning</Badge>
                  <span className="text-body-sm text-muted-foreground">Actively developing proficiency</span>
                </div>
              </div>
            </div>
          </section>
        </section>
      </main>
      <Footer />
    </div>
  );
}