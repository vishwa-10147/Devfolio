import { Metadata } from 'next';
import Image from 'next/image';
import { Header, Footer } from '@/components/layout';
import { Card } from '@/components/ui';
import { PROFILE } from '@/lib/portfolio';
import { Calendar, Mail, Github, Linkedin, GraduationCap, BookOpen, Briefcase, Code2, Shield, Brain, Server, TestTube2, ExternalLink } from 'lucide-react';

// Content sourced from the GitHub profile README (github.com/vishwa-10147).

const { githubUrl: GITHUB_URL, linkedinUrl: LINKEDIN_URL, email: EMAIL, avatarUrl: AVATAR_URL } = PROFILE;

const currentWork = [
  'Building edge AI security appliances and ML-based intrusion detection for IoT and lab networks',
  'Building a self-hostable exam & coding-assessment platform with AI-assisted proctoring',
  'Caring about the boring-but-important parts: tests, CI, Docker, security audits, and documentation',
  'Open to internships and collaborations in Security Engineering, AI/ML, and Backend Development',
];

const projects = [
  {
    name: 'SentinelEdgeAI',
    tagline: 'AI-Powered Edge Security Appliance',
    url: `${GITHUB_URL}/SentinelEdgeAI`,
    summary:
      'On-premises network defense for small and medium networks, split across a Raspberry Pi 5 (capture & enforcement) and an NVIDIA Jetson Orin Nano (inference).',
    highlights: [
      'Packet capture → 5-tuple flow building → 24 statistical features per flow',
      'Isolation Forest, Z-score baselining, behavioral fingerprinting and drift detection fused into a 0–100 risk score',
      'MITRE ATT&CK mapping and tiered automated response (alert → block → quarantine) via nftables/iptables',
      'FastAPI REST + WebSocket APIs, signed model artifacts, CI with Bandit and pip-audit',
    ],
    technologies: ['Python', 'FastAPI', 'Scikit-learn', 'Scapy', 'Zeek', 'Suricata', 'React', 'Docker'],
  },
  {
    name: 'ExamSentinel',
    tagline: 'Proctored Exams & Coding Assessments',
    url: `${GITHUB_URL}/ExamSentiinel`,
    summary:
      'A self-hostable platform for institutions to run online exams and coding contests, where AI surfaces signals and humans make the call.',
    highlights: [
      'Exam builder (MCQ, short answer, essay, coding, SQL) with timed sessions, auto-save and leaderboards',
      'Proctoring via browser telemetry plus webcam analysis (YOLO11n, BlazeFace) feeding an advisory risk score',
      '116 DSA + 11 SQL practice problems with a Monaco editor and an isolated Piston sandbox',
      'Live WebRTC interviews with faster-whisper transcription, OIDC SSO and role-based access',
    ],
    technologies: ['Next.js', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'Playwright'],
  },
  {
    name: 'SentinelIDS',
    tagline: 'ML Intrusion Detection for IoT Labs',
    url: `${GITHUB_URL}/SentinelIDS`,
    summary:
      'Intrusion detection for IoT and virtualized lab networks, tested against Kali Linux attacks on Metasploitable targets.',
    highlights: [
      'Live capture from VMware lab traffic plus dataset-based evaluation',
      'Fusion scoring across packet-level ML, flow-level ML and a rule-based risk engine',
      'Streamlit SOC dashboard, prioritized SOC tickets, device inventory and PDF incident reports',
    ],
    technologies: ['Python', 'Scikit-learn', 'Streamlit', 'VMware', 'Wireshark', 'Nmap', 'Kali Linux'],
  },
  {
    name: 'FoodOrder',
    tagline: 'Real-Time Restaurant Operations',
    url: `${GITHUB_URL}/FoodOrder`,
    summary:
      'Customers order and track from their table; staff run tables, menu and kitchen flow from one live dashboard.',
    highlights: [
      'Socket.IO pushes menu and order updates to every connected screen',
      'Table lifecycle and kitchen stages (new → preparing → ready → delivered)',
      'Razorpay payments, rate limiting and health checks',
    ],
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'Socket.IO', 'Razorpay'],
  },
  {
    name: 'ProgressPulse',
    tagline: 'Role-Based Learning Platform',
    url: `${GITHUB_URL}/ProgressPulse`,
    summary:
      'Separate dashboards for admins, teachers and students covering progress tracking, document sharing, assessments and an in-browser code editor.',
    highlights: [],
    technologies: ['PHP', 'MySQL', 'JavaScript', 'PHPMailer'],
  },
];

const skillAreas = [
  {
    area: 'Security & Networking',
    skills: 'IDS/IPS, network traffic & flow analysis, packet inspection, Wireshark, Nmap, Scapy, Zeek, Suricata, nftables/iptables, SIEM fundamentals, MITRE ATT&CK, vulnerability assessment, TCP/IP, DNS, HTTP/S',
  },
  {
    area: 'AI / ML',
    skills: 'Scikit-learn, NumPy, Pandas, anomaly detection (Isolation Forest, statistical baselining), behavioral profiling, computer vision (YOLO, BlazeFace), speech-to-text (Whisper), RAG, agentic AI, prompt engineering',
  },
  {
    area: 'Backend',
    skills: 'REST & WebSocket APIs, FastAPI, Express, SQLAlchemy, Alembic, Pydantic, JWT & OIDC auth, Socket.IO, Streamlit dashboards',
  },
  {
    area: 'DevOps & Quality',
    skills: 'Docker & Compose, GitHub Actions, systemd, pytest, Playwright, Bandit, pip-audit, VMware lab environments',
  },
  {
    area: 'CS Fundamentals',
    skills: 'Data Structures & Algorithms, Operating Systems, Computer Networks, OOP, System Design',
  },
];

const focusAreas = [
  { name: 'Security Engineering', icon: Shield },
  { name: 'AI / ML', icon: Brain },
  { name: 'Backend Development', icon: Server },
  { name: 'Testing, CI & Audits', icon: TestTube2 },
];

export const metadata: Metadata = {
  title: 'About',
  description: 'Vishwa Kokkireni — Computer Science Engineering student and security-focused AI/ML & backend engineer.',
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
              I&apos;m a Computer Science Engineering student working where cybersecurity, machine learning, and
              backend engineering meet. Most of what I build is end-to-end: capturing traffic or user signals,
              turning them into features, running detection models, and surfacing the results through APIs and
              dashboards that a human can act on.
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
                      <Image
                        src={AVATAR_URL}
                        alt="Vishwa Kokkireni"
                        width={120}
                        height={120}
                        className="rounded-full aspect-square object-cover"
                        priority
                      />
                    </div>
                  </div>
                  <h2 className="text-heading-lg font-semibold text-foreground">Vishwa Kokkireni</h2>
                  <p className="mt-1 text-body text-accent">Security-focused AI/ML & Backend Engineer</p>
                  <div className="mt-6 flex items-center justify-center gap-4">
                    <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="GitHub">
                      <Github className="h-5 w-5" />
                    </a>
                    <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors" aria-label="LinkedIn">
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a href={`mailto:${EMAIL}`} className="text-muted-foreground hover:text-accent transition-colors" aria-label="Email">
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-border space-y-4">
                  <div className="flex items-center gap-3 text-body-sm">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    <span className="text-foreground">Computer Science Engineering Student</span>
                  </div>
                  <div className="flex items-center gap-3 text-body-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    <span className="text-foreground">Open to internships & collaborations</span>
                  </div>
                  <div className="flex items-center gap-3 text-body-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    <a href={`mailto:${EMAIL}`} className="text-foreground hover:text-accent transition-colors break-all">{EMAIL}</a>
                  </div>
                </div>
              </Card>
            </div>

            <div className="lg:col-span-2 space-y-8">
              <section aria-labelledby="current-heading">
                <h2 id="current-heading" className="text-heading-xl font-semibold text-foreground flex items-center gap-3">
                  <Briefcase className="h-6 w-6 text-accent" aria-hidden="true" />
                  What I&apos;m Working On
                </h2>
                <Card variant="elevated" className="mt-6">
                  <ul className="space-y-2" role="list">
                    {currentWork.map((item) => (
                      <li key={item} className="text-body text-muted-foreground flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </section>

              <section aria-labelledby="projects-heading">
                <h2 id="projects-heading" className="text-heading-xl font-semibold text-foreground flex items-center gap-3">
                  <Code2 className="h-6 w-6 text-accent" aria-hidden="true" />
                  Highlighted Projects
                </h2>
                <div className="mt-6 space-y-6">
                  {projects.map((project) => (
                    <Card key={project.name} variant="elevated">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div>
                          <h3 className="text-heading-md font-semibold text-foreground">{project.name}</h3>
                          <p className="mt-1 text-body text-accent">{project.tagline}</p>
                        </div>
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-body-sm text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-1 whitespace-nowrap"
                          aria-label={`View ${project.name} on GitHub`}
                        >
                          View on GitHub
                          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      </div>
                      <p className="mt-3 text-body text-muted-foreground">{project.summary}</p>
                      {project.highlights.length > 0 && (
                        <ul className="mt-4 space-y-2" role="list">
                          {project.highlights.map((highlight) => (
                            <li key={highlight} className="text-body text-muted-foreground flex items-start gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" aria-hidden="true" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
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
                  <GraduationCap className="h-6 w-6 text-accent" aria-hidden="true" />
                  Education
                </h2>
                <div className="mt-6 space-y-4">
                  <Card variant="default">
                    <h3 className="text-heading-md font-semibold text-foreground">Computer Science Engineering</h3>
                    <p className="mt-1 text-body text-accent">Undergraduate · In progress</p>
                    <p className="mt-1 text-body-sm text-muted-foreground">
                      Coursework: Data Structures & Algorithms, Operating Systems, Computer Networks, OOP, System Design
                    </p>
                  </Card>
                </div>
              </section>

              <section aria-labelledby="skills-heading">
                <h2 id="skills-heading" className="text-heading-xl font-semibold text-foreground flex items-center gap-3">
                  <BookOpen className="h-6 w-6 text-accent" aria-hidden="true" />
                  Skills by Area
                </h2>
                <div className="mt-6 space-y-4">
                  {skillAreas.map(({ area, skills }) => (
                    <Card key={area} variant="default">
                      <h3 className="text-heading-sm font-semibold text-foreground">{area}</h3>
                      <p className="mt-1 text-body-sm text-muted-foreground">{skills}</p>
                    </Card>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </section>

        {/* Focus areas */}
        <section className="section-sm container-main bg-surface/50" aria-labelledby="focus-heading">
          <header className="mb-8 text-center">
            <h2 id="focus-heading" className="text-heading-xl font-semibold text-foreground">
              Open To
            </h2>
            <p className="mt-1 text-body text-muted-foreground">
              Internships, research, and collaborations in these areas.
            </p>
          </header>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {focusAreas.map((focus) => (
              <Card key={focus.name} variant="elevated" className="text-center p-6">
                <focus.icon className="h-10 w-10 text-accent mx-auto mb-4" aria-hidden="true" />
                <h3 className="text-heading-sm font-semibold text-foreground">{focus.name}</h3>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
