import type { CuratedProject } from '@/types';

// Portfolio content, sourced from the GitHub profile README and project READMEs
// at github.com/vishwa-10147. Keep claims here backed by what those repos show.

export const PROFILE = {
  name: 'Vishwa Kokkireni',
  title: 'Security-focused AI/ML & Backend Engineer',
  githubUsername: 'vishwa-10147',
  githubUrl: 'https://github.com/vishwa-10147',
  linkedinUrl: 'https://www.linkedin.com/in/vishwa-kokkireni-7081152ba/',
  email: 'vishwakokkireni@gmail.com',
  altEmail: 'vishwa9821@gmail.com',
  avatarUrl: 'https://avatars.githubusercontent.com/u/210499489?v=4',
  tagline: 'I build systems that watch networks, flag what\'s wrong, and stay up while doing it.',
  summary:
    'Computer Science Engineering student working where cybersecurity, machine learning, and backend engineering meet.',
};

const repoUrl = (name: string) => `${PROFILE.githubUrl}/${name}`;

/** Curated case studies, keyed by lowercase repository name. */
export const curatedProjects: Record<string, CuratedProject> = {
  examsentiinel: {
    repository: 'vishwa-10147/ExamSentiinel',
    featured: true,
    displayTitle: 'ExamSentinel',
    summary:
      'A self-hostable platform for proctored exams and coding assessments, where AI surfaces integrity signals and humans make every final decision.',
    problem:
      'Online exams need integrity checks, coding questions need a safe way to run untrusted code, and students need practice between exams. ExamSentinel puts exams, proctoring, human review, a judged practice platform and contests into one system that can run on a single campus server without internet access during exams.',
    roleAndContribution:
      'Designed and built the platform end-to-end: Next.js frontend, FastAPI backend, judging pipeline, proctoring signals, deployment kits and CI.',
    architecture:
      'Next.js 14 client (Monaco editor, in-browser BlazeFace, WebRTC) talking to a FastAPI REST + WebSocket backend. Services handle judging, grading and risk scoring; AI services run YOLO11n for phone/extra-person detection and faster-whisper for interview transcription. Untrusted code runs in an isolated Piston sandbox. PostgreSQL and Redis, packaged with Docker Compose.',
    technologies: ['Next.js', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'YOLO11n', 'BlazeFace', 'Piston', 'Playwright', 'pytest'],
    verifiedResults:
      '116 DSA problems across 16 topics plus 11 SQL problems with hidden tests and editorials. Judging queue load-tested with 500 simultaneous submissions. Exams, proctoring, review, practice, contests, interviews and SSO are covered by automated tests.',
    documentationUrl: `${repoUrl('ExamSentiinel')}#readme`,
    status: 'Implemented and tested; campus server kit rehearsed locally, not yet deployed to a real campus or AWS',
    futureWork: 'Run the campus kit on a real campus server, deploy to AWS, and expose item-response-theory scoring through the API and UI.',
  },
  sentineledgeai: {
    repository: 'vishwa-10147/SentinelEdgeAI',
    featured: true,
    displayTitle: 'SentinelEdgeAI',
    summary:
      'An on-premises, AI-driven edge security appliance for real-time network monitoring, anomaly detection and automated response.',
    problem:
      'Small and medium networks rarely have a SOC or cloud security stack. SentinelEdgeAI runs fully on-premises on low-cost edge hardware, so traffic never has to leave the network to be analyzed.',
    roleAndContribution:
      'Designed and built the capture pipeline, feature extraction, detection models, enforcement hooks and the FastAPI backend.',
    architecture:
      'Split across a Raspberry Pi 5 (capture & enforcement) and an NVIDIA Jetson Orin Nano (inference). Packets are aggregated into 5-tuple flows with 24 statistical features each, then scored by Isolation Forest, Z-score baselining, per-device behavioral fingerprinting and drift detection, fused into a 0–100 risk score. Findings map to MITRE ATT&CK and drive tiered responses (alert → block → quarantine) via nftables/iptables, dry-run by default with rollback guards. SQLite persistence; FastAPI REST + WebSocket APIs.',
    technologies: ['Python', 'FastAPI', 'Scikit-learn', 'Scapy', 'Zeek', 'Suricata', 'SQLite', 'React', 'Streamlit', 'Docker', 'GitHub Actions'],
    verifiedResults:
      'Signed model artifacts and CI smoke checks with Bandit and pip-audit for safe deployments.',
    documentationUrl: `${repoUrl('SentinelEdgeAI')}#readme`,
    status: 'Active development',
    futureWork: 'React UI for the SOC dashboard, encrypted storage and role-based access control.',
  },
  classroomguard: {
    repository: 'vishwa-10147/ClassroomGuard',
    featured: true,
    displayTitle: 'ClassroomGuard',
    summary:
      'AI-assisted exam-hall monitoring that detects mobile phones and unpermitted calculators on classroom CCTV and alerts invigilators in real time.',
    problem:
      'Invigilators cannot watch every seat at once. ClassroomGuard watches the cameras and prompts a person to check, with an annotated evidence frame. It supports invigilators rather than replacing them; an alert is never proof on its own.',
    roleAndContribution:
      'Designed and built the AI engine, API, web dashboard, mobile app and on-premises deployment tooling.',
    architecture:
      'IP cameras stream over RTSP to a stateless AI engine (YOLO detector + YOLOv8m-pose, ByteTrack, PyTorch/CUDA) that assigns each object to the nearest tracked person, confirms it over time, and posts detections to a FastAPI API. The API is the only component that touches PostgreSQL; Redis and Celery handle retention and camera health. Alerts reach a React dashboard and an Expo mobile app over WebSocket, behind Caddy for on-premises HTTPS.',
    technologies: ['Python', 'FastAPI', 'PyTorch', 'YOLO', 'OpenCV', 'PostgreSQL', 'Redis', 'Celery', 'React', 'TypeScript', 'Expo', 'Docker'],
    documentationUrl: `${repoUrl('ClassroomGuard')}#readme`,
    status: 'Active development',
  },
  sentinelx: {
    repository: 'vishwa-10147/SentinelX',
    featured: true,
    displayTitle: 'SentinelX',
    summary:
      'An autonomous AI security engineer that goes past the alert: it investigates threats, reproduces them safely, and generates and validates defenses before a human approves deployment.',
    problem:
      'An alert like "DNS Tunneling Detected, score 0.92" doesn\'t explain why, whether the behavior can be reproduced, what rule should be written, or whether that rule is safe to deploy. SentinelX connects detection, investigation, experimentation, defense engineering and validation.',
    roleAndContribution:
      'Designed the detection → investigation → reproduction → defense → validation workflow and built the detection layer, agent tooling and sandbox.',
    architecture:
      'Four layers: a detection layer fusing packet-level ML, flow-level ML and rule scores (T = 0.4P + 0.4F + 0.2R); an AI security agent on NVIDIA Nemotron and Nebius that works only through explicit tools; a Docker security sandbox for controlled reproduction; and a defense & validation stage that generates, tests and evaluates rules before human approval.',
    technologies: ['Python', 'NVIDIA Nemotron', 'Nebius', 'Docker', 'Machine Learning'],
    documentationUrl: `${repoUrl('SentinelX')}#readme`,
    status: 'Active development',
  },
  sentinelids: {
    repository: 'vishwa-10147/SentinelIDS',
    featured: true,
    displayTitle: 'SentinelIDS',
    summary:
      'Machine-learning intrusion detection for IoT and virtualized lab networks, with fusion scoring, a SOC dashboard and PDF incident reports.',
    problem:
      'IoT and lab networks need visibility into attacks without enterprise tooling. SentinelIDS was tested against Kali Linux attacks on Metasploitable targets in a controlled VMware lab.',
    roleAndContribution:
      'Built the feature extraction, packet and flow ML pipeline, fusion risk engine and the Streamlit SOC dashboard.',
    architecture:
      'Live VMware lab traffic or dataset input feeds packet feature extraction. Packet-level and flow-level ML detectors plus rule-based heuristics feed a weighted fusion risk engine, which produces incident logs, prioritized SOC tickets, a Streamlit dashboard and PDF reports. ARP data drives device inventory.',
    technologies: ['Python', 'Scikit-learn', 'Streamlit', 'VMware', 'Wireshark', 'Nmap', 'Kali Linux'],
    documentationUrl: `${repoUrl('SentinelIDS')}#readme`,
    status: 'Complete (academic / authorized lab use)',
  },
  foodorder: {
    repository: 'vishwa-10147/FoodOrder',
    featured: true,
    displayTitle: 'FoodOrder',
    summary:
      'A real-time restaurant platform: customers order and track from their table while staff run tables, menu and kitchen flow from one live dashboard.',
    problem:
      'Restaurants juggle orders, tables and the kitchen across separate tools. FoodOrder runs ordering and operations from a single backend with every screen kept in sync.',
    roleAndContribution: 'Built the Node.js backend, real-time sync, payments and the client and management interfaces.',
    architecture:
      'Node.js / Express 5 backend on PostgreSQL. Socket.IO pushes menu and order state to every connected screen. Table lifecycle (free → ordering → occupied) and kitchen stages (new → preparing → ready → delivered). Razorpay payments, rate limiting and a health endpoint.',
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'Socket.IO', 'Razorpay', 'HTML/CSS/JS'],
    demoUrl: 'https://foodorder-2dy8.onrender.com/client.html#order',
    documentationUrl: `${repoUrl('FoodOrder')}#readme`,
    status: 'Live demo deployed on Render',
  },
  'aegisz-health': {
    repository: 'vishwa-10147/AEGISZ-Health',
    featured: false,
    displayTitle: 'AEGISZ-Health',
    summary:
      'A quantum-safe, federated electronic health record exchange that keeps patient data at its origin hospital until a transfer is authorized.',
    problem:
      'Centralized health-record databases are honeypots, and data stolen today could be decrypted by future quantum computers. AEGISZ-Health keeps data federated and protects transfers with post-quantum cryptography.',
    roleAndContribution: 'Built the federated backend, cryptography layer, security ledger and clinical dashboards.',
    architecture:
      'A 6-hospital federated mesh plus a global security ledger (7 PostgreSQL databases in Docker). FHIR payloads are wrapped with ML-KEM (Kyber) and signed with ML-DSA (Dilithium) via liboqs. A SHA-256 hash chain makes access logs tamper-evident, a "break glass" protocol allows audited emergency access, and request-velocity anomaly detection freezes compromised accounts.',
    technologies: ['Python', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'liboqs', 'React', 'TypeScript', 'Docker'],
    documentationUrl: `${repoUrl('AEGISZ-Health')}#readme`,
    status: 'Prototype with synthetic FHIR data',
  },
  devfolio: {
    repository: 'vishwa-10147/Devfolio',
    featured: false,
    displayTitle: 'Devfolio',
    summary: 'This portfolio: a GitHub-powered developer site built with Next.js, React, TypeScript and Tailwind CSS.',
    problem: 'Keeping a portfolio in sync with GitHub by hand goes stale quickly. Devfolio pulls public repositories from the GitHub API on each build.',
    roleAndContribution: 'Design, development and deployment.',
    architecture:
      'Next.js 14 App Router with Server Components for data fetching. GitHub REST API with an on-disk cache, ETag revalidation and stale-on-error fallback. Tailwind CSS with a dark-first design system.',
    technologies: ['Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS', 'GitHub REST API', 'Vitest'],
    demoUrl: '/',
    documentationUrl: `${repoUrl('Devfolio')}#readme`,
    status: 'Active development',
  },
};

/** Repos shown on the home page, in order (lowercase names). */
export const FEATURED_REPOS = ['examsentiinel', 'sentineledgeai', 'classroomguard', 'sentinelx', 'sentinelids', 'foodorder'];

export function getCuratedProject(repoName: string): CuratedProject | undefined {
  return curatedProjects[repoName.toLowerCase()];
}

export interface SkillGroup {
  category: 'security' | 'ai' | 'backend' | 'frontend' | 'devops' | 'fundamentals';
  title: string;
  description: string;
  skills: { name: string; usedIn?: string[] }[];
}

/** Skills, each linked to the repos that use it where there is one. */
export const skillGroups: SkillGroup[] = [
  {
    category: 'security',
    title: 'Security & Networking',
    description: 'Network monitoring, intrusion detection and automated response.',
    skills: [
      { name: 'IDS/IPS & flow analysis', usedIn: ['SentinelEdgeAI', 'SentinelIDS', 'SentinelX'] },
      { name: 'Packet inspection (Scapy, Wireshark)', usedIn: ['SentinelEdgeAI', 'SentinelIDS'] },
      { name: 'Zeek & Suricata', usedIn: ['SentinelEdgeAI'] },
      { name: 'nftables / iptables enforcement', usedIn: ['SentinelEdgeAI'] },
      { name: 'MITRE ATT&CK mapping', usedIn: ['SentinelEdgeAI'] },
      { name: 'Vulnerability assessment & Nmap', usedIn: ['SentinelIDS'] },
      { name: 'Post-quantum cryptography (ML-KEM, ML-DSA)', usedIn: ['AEGISZ-Health'] },
      { name: 'SIEM fundamentals' },
      { name: 'TCP/IP, DNS, HTTP/S' },
    ],
  },
  {
    category: 'ai',
    title: 'AI / ML',
    description: 'Anomaly detection, computer vision and LLM-based agents.',
    skills: [
      { name: 'Scikit-learn, NumPy, Pandas', usedIn: ['SentinelEdgeAI', 'SentinelIDS'] },
      { name: 'Anomaly detection (Isolation Forest, baselining)', usedIn: ['SentinelEdgeAI'] },
      { name: 'Behavioral profiling & drift detection', usedIn: ['SentinelEdgeAI'] },
      { name: 'Computer vision (YOLO, BlazeFace, pose)', usedIn: ['ClassroomGuard', 'ExamSentiinel'] },
      { name: 'Speech-to-text (Whisper)', usedIn: ['ExamSentiinel'] },
      { name: 'Agentic AI (NVIDIA Nemotron)', usedIn: ['SentinelX'] },
      { name: 'RAG & prompt engineering' },
    ],
  },
  {
    category: 'backend',
    title: 'Backend',
    description: 'APIs, real-time systems and data stores.',
    skills: [
      { name: 'FastAPI', usedIn: ['ExamSentiinel', 'SentinelEdgeAI', 'ClassroomGuard', 'AEGISZ-Health'] },
      { name: 'Node.js & Express', usedIn: ['FoodOrder'] },
      { name: 'REST & WebSocket APIs', usedIn: ['SentinelEdgeAI', 'ClassroomGuard', 'ExamSentiinel'] },
      { name: 'Socket.IO', usedIn: ['FoodOrder'] },
      { name: 'PostgreSQL', usedIn: ['ExamSentiinel', 'ClassroomGuard', 'FoodOrder', 'AEGISZ-Health'] },
      { name: 'Redis & Celery', usedIn: ['ClassroomGuard', 'ExamSentiinel'] },
      { name: 'SQLAlchemy, Alembic, Pydantic', usedIn: ['ClassroomGuard', 'BUILDPULSE'] },
      { name: 'JWT & OIDC auth', usedIn: ['ExamSentiinel', 'ClassroomGuard'] },
      { name: 'PHP & MySQL', usedIn: ['ProgressPulse'] },
    ],
  },
  {
    category: 'frontend',
    title: 'Frontend',
    description: 'Dashboards and web apps for the systems above.',
    skills: [
      { name: 'TypeScript', usedIn: ['ExamSentiinel', 'ClassroomGuard', 'Devfolio'] },
      { name: 'React', usedIn: ['ClassroomGuard', 'AEGISZ-Health'] },
      { name: 'Next.js', usedIn: ['ExamSentiinel', 'Devfolio'] },
      { name: 'Tailwind CSS', usedIn: ['ClassroomGuard', 'Devfolio'] },
      { name: 'React Native (Expo)', usedIn: ['ClassroomGuard'] },
      { name: 'Streamlit dashboards', usedIn: ['SentinelIDS', 'SentinelEdgeAI'] },
    ],
  },
  {
    category: 'devops',
    title: 'DevOps & Quality',
    description: 'Shipping and testing: the boring-but-important parts.',
    skills: [
      { name: 'Docker & Compose', usedIn: ['ExamSentiinel', 'ClassroomGuard', 'AEGISZ-Health'] },
      { name: 'GitHub Actions CI', usedIn: ['ExamSentiinel', 'SentinelEdgeAI', 'ClassroomGuard'] },
      { name: 'pytest & Playwright', usedIn: ['ExamSentiinel'] },
      { name: 'Bandit & pip-audit', usedIn: ['SentinelEdgeAI'] },
      { name: 'Edge hardware (Raspberry Pi, Jetson)', usedIn: ['SentinelEdgeAI'] },
      { name: 'Linux, systemd & VMware labs', usedIn: ['SentinelEdgeAI', 'SentinelIDS'] },
    ],
  },
  {
    category: 'fundamentals',
    title: 'CS Fundamentals',
    description: 'Core computer science coursework.',
    skills: [
      { name: 'Data Structures & Algorithms' },
      { name: 'Operating Systems' },
      { name: 'Computer Networks' },
      { name: 'Object-Oriented Programming' },
      { name: 'System Design' },
    ],
  },
];
