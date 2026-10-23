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
    featured: false,
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
    featured: false,
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
    featured: false,
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
    featured: false,
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
    featured: false,
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
    featured: false,
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
  'iot-ids-ml-dashboard': {
    repository: 'vishwa-10147/iot-ids-ml-dashboard',
    featured: true,
    displayTitle: 'IoT IDS + SOC Dashboard',
    summary:
      'A multi-level machine-learning intrusion detection system for IoT networks, with a SOC-style dashboard, automated tickets and PDF reports.',
    problem:
      'IoT networks are full of devices that cannot run their own security software. This project watches their traffic instead, classifies attacks with machine learning, and turns detections into SOC-style tickets and reports an analyst can act on.',
    roleAndContribution:
      'Built the capture pipeline, flow generator, rule-based labeling, ML prediction and fusion scoring, ticketing, PDF reporting and the Streamlit dashboard.',
    architecture:
      'Kali Linux captures traffic with tshark and hands it to a Windows SOC pipeline through a VMware shared folder. A flow generator, rule-based labeling and an ML prediction engine feed a fusion scoring engine that combines ML confidence with heuristics. Incidents become P1–P4 tickets (OPEN → INVESTIGATING → RESOLVED), shown on a Streamlit dashboard with a network graph, health monitor and one-click PDF reports.',
    technologies: ['Python', 'Scikit-learn', 'Streamlit', 'tshark', 'Kali Linux', 'VMware', 'TON_IoT', 'pytest'],
    verifiedResults:
      'Three detection modes: TON_IoT dataset benchmarking, live packet-level classification and flow-level behavioral analysis. Specialized labeling rules for brute force, port scans and DNS tunneling.',
    documentationUrl: `${repoUrl('iot-ids-ml-dashboard')}#readme`,
    status: 'Complete (lab / research use)',
  },
  neurovision: {
    repository: 'vishwa-10147/neurovision',
    featured: true,
    displayTitle: 'NeuroVision',
    summary:
      'An interactive web platform for building, training and looking inside real neural networks in synchronized 2D and 3D views, using measured values, not decorative animation.',
    problem:
      'Neural-network visualizations usually show illustrative animations rather than what a model actually computes. NeuroVision shows real activations, weights, gradients and training metrics, for small networks you design and for real ONNX models you import.',
    roleAndContribution:
      'Designed and built the full stack (React/Three.js frontend, FastAPI backend, PyTorch training jobs, safe ONNX import and a Python SDK) and wrote the accompanying research paper.',
    architecture:
      'React + TypeScript frontend with an SVG 2D renderer and a Three.js 3D renderer sharing one Zustand store and one graph schema. A FastAPI backend serves REST and WebSocket events, runs seeded PyTorch training jobs, imports ONNX models safely and executes them in an isolated ONNX Runtime worker. JSON Schema contracts are mirrored in Pydantic and Zod. A one-file Python SDK streams metrics and activations from your own training script, with two-way run controls (pause, resume, checkpoint, change learning rate).',
    technologies: ['React', 'TypeScript', 'Three.js', 'Zustand', 'FastAPI', 'PyTorch', 'ONNX Runtime', 'WebSockets', 'Vitest', 'Pytest'],
    verifiedResults:
      'Milestones 0–7 complete: Architecture Studio, 3D explorer, live training, ONNX import and execution, CNN feature maps and attention heads, plus per-layer training-health alerts. Accompanied by a written research paper.',
    documentationUrl: `${repoUrl('neurovision')}#readme`,
    status: 'Active development; Learning Mode, saved projects and deployment planned',
  },
  cpl: {
    repository: 'vishwa-10147/CPL',
    featured: true,
    displayTitle: 'CPL — Confidence-Guided Predictive Localization',
    summary:
      'A research framework that forecasts autonomous-vehicle localization risk 2.5 seconds ahead and recommends actions before localization fails.',
    problem:
      'Adaptive sensor fusion reacts to localization degradation after it happens. CPL moves localization from reactive estimation to predictive risk management, using the last 10 seconds of kinematics and sensor-confidence features.',
    roleAndContribution:
      'Research and implementation (third paper in the SCI → CAMSF → CPL series), under the guidance of Dr. P. Poornima, Department of CSE, MGIT.',
    architecture:
      'A 20-step window (10 s at 2 Hz) of 15 features (kinematics, sensor confidence, localization quality and temporal trends) feeds a multi-head temporal model that predicts the next 5 steps of relative trajectory, speed, uncertainty and reliability. Persistence, LSTM, GRU and Temporal Transformer predictors are compared. A rule-based Dynamic Risk Assessment Engine scores each future step LOW/MEDIUM/HIGH and a decision-support layer recommends actions. Scene-level, leakage-free 70/15/15 splits.',
    technologies: ['Python', 'PyTorch', 'Temporal Transformer', 'LSTM / GRU', 'nuScenes', 'Jupyter'],
    verifiedResults:
      'On 2,060 test sequences from unseen scenes, the Temporal Transformer reaches 2.83 m 2D position RMSE, a 72.3% reduction against the persistence baseline (and 6.0% vs. LSTM, 2.9% vs. GRU). Note: kinematics are real nuScenes ego poses; sensor-confidence features are simulated on top of them.',
    documentationUrl: `${repoUrl('CPL')}#readme`,
    status: 'Research project with paper',
  },
  pld: {
    repository: 'vishwa-10147/PLD',
    featured: true,
    displayTitle: 'PLD — Predictive Localization Dashboard',
    summary:
      'An interactive research dashboard that replays KITTI drives frame by frame and shows every stage of confidence-driven adaptive sensor fusion live.',
    problem:
      'Sensor-fusion research is hard to inspect from static plots. PLD makes the whole pipeline visible as a drive plays back, as the interactive companion to the SCI, CAMSF and CPL research series.',
    roleAndContribution: 'Designed and built the replay engine, fusion pipeline modules, dashboard panels, tests and offline evaluation.',
    architecture:
      'KITTI Raw or Odometry replay → sensor metrics → quality & SCI → adaptive weights → adaptive covariance → EKF predict/update → localization features → Random Forest reliability model → Streamlit dashboard. Panels cover the camera feed, sensor confidence, health gauges, telemetry, fusion diagnostics and GPS vs. EKF tracks, with replay controls and CSV export. An offline script compares the engine with a fixed-weight EKF and writes figures and a PDF report.',
    technologies: ['Python', 'Streamlit', 'Extended Kalman Filter', 'Scikit-learn', 'KITTI', 'pytest'],
    documentationUrl: `${repoUrl('PLD')}#readme`,
    status: 'Complete',
  },
  camsf: {
    repository: 'vishwa-10147/CAMSF',
    featured: true,
    displayTitle: 'CAMSF — Adaptive Multi-Sensor Fusion',
    summary:
      'A localization framework that estimates how reliable each sensor (camera, GPS, IMU) is, frame by frame, and uses that to decide how much each one influences the position estimate.',
    problem:
      "Standard EKF fusion trusts every sensor equally and permanently, so a degraded GPS or blurred camera drags the estimate off course. CAMSF scales each sensor's influence by its measured confidence and handles GPS outages explicitly.",
    roleAndContribution:
      'Research and implementation (second paper in the SCI → CAMSF → CPL series), under the guidance of Dr. P. Poornima, Department of CSE, MGIT.',
    architecture:
      'Per-frame sensor quality assessment (7 camera image-quality metrics, GPS stability/satellite/accuracy scores, IMU smoothness and angular stability) produces a Sensor Confidence Index and normalized adaptive weights. A Confidence-Driven Adaptive EKF (CDA-EKF) scales measurement and process noise by confidence, falls back to IMU dead-reckoning during GPS outages and uses a Joseph-form covariance update. Reliability is predicted from 37 leakage-free pre-fusion features with leave-one-drive-out cross-validation.',
    technologies: ['Python', 'Extended Kalman Filter', 'Scikit-learn', 'OpenCV', 'KITTI', 'Jupyter'],
    verifiedResults:
      'On 9 KITTI drives (2,472 frames, with seeded GPS degradation), the adaptive EKF beats the fixed-noise baseline in 8 of 9 drives, by up to 15.8% RMSE on the drive with the longest GPS outage; pooled RMSE 2.89 m vs. 2.94 m. The trajectory stays continuous through every outage. Random Forest reliability prediction: RMSE 1.76 m, R² 0.42.',
    documentationUrl: `${repoUrl('CAMSF')}#readme`,
    status: 'Research project with paper',
  },
  sci: {
    repository: 'vishwa-10147/SCI',
    featured: true,
    displayTitle: 'SCI — Sensor Confidence Index',
    summary:
      'A framework that scores GPS, IMU and camera quality on every frame and turns those scores into adaptive fusion weights for autonomous-vehicle perception.',
    problem:
      "GPS suffers multipath and satellite loss, IMUs drift and cameras blur, yet conventional EKF fusion assumes every sensor is equally and permanently reliable. SCI measures each sensor's quality frame by frame.",
    roleAndContribution:
      'Research and implementation (first paper in the SCI → CAMSF → CPL series), under the guidance of Dr. P. Poornima, Department of CSE, MGIT.',
    architecture:
      'KITTI Raw GPS, IMU and camera data are validated, then scored with Sensor Quality Metrics (5 GPS, 3 IMU, 4 camera). Weighted sums give each sensor a confidence in [0, 1]; adaptive weights w = C / ΣC scale the measurement covariance of an adaptive EKF, which is evaluated against a standard EKF across a 13-notebook pipeline.',
    technologies: ['Python', 'Jupyter', 'Extended Kalman Filter', 'NumPy', 'OpenCV', 'KITTI'],
    verifiedResults:
      'All 9 synchronized KITTI drives validated with 0 missing frames. Sensor confidences and weights respond as intended (e.g. camera weight drops during visual degradation). Error metrics did not yet beat the standard EKF, because the reference was not independent and no degradation was injected; both issues are fixed in the follow-up, CAMSF.',
    documentationUrl: `${repoUrl('SCI')}#readme`,
    status: 'Research project with paper; superseded by CAMSF',
  },
  epaper: {
    repository: 'vishwa-10147/epaper',
    featured: true,
    displayTitle: 'E-Paper',
    summary:
      'A static, page-flip digital newspaper reader: publishing a new edition is just adding page images to a folder and pushing to GitHub.',
    problem:
      'Small publications need a simple way to put their daily paper online without running a backend or database.',
    roleAndContribution: 'Built the reader, the admin page, the manifest build script and the GitHub Actions deployment.',
    architecture:
      "A single-page HTML/CSS/JS reader loads data/issues.json and drives a page-flip viewer. Each edition is a dated folder of numbered page images. A Node script scans the folders and regenerates the manifest, and a GitHub Actions workflow rebuilds and redeploys to GitHub Pages on every push. A /manage admin page uses the browser's folder access to add or edit editions locally.",
    technologies: ['JavaScript', 'HTML', 'CSS', 'Node.js', 'GitHub Actions', 'GitHub Pages'],
    demoUrl: 'https://vishwa-10147.github.io/epaper/',
    documentationUrl: `${repoUrl('epaper')}#readme`,
    status: 'Live on GitHub Pages',
  },
  progresspulse: {
    repository: 'vishwa-10147/ProgressPulse',
    featured: true,
    displayTitle: 'ProgressPulse',
    summary:
      'A role-based educational platform for administrators, teachers and students, covering progress tracking, document sharing, assessments and an in-browser code editor.',
    problem:
      'Students, teachers and administrators often juggle separate tools for grades, documents and practice. ProgressPulse brings them into one platform with a dashboard for each role.',
    roleAndContribution: 'Built the PHP/MySQL application, role-based dashboards, document sharing and email-verified registration.',
    architecture:
      'PHP backend on MySQL with session-based logins for three roles. Admins manage students and teachers; teachers upload documents and track student progress; students see grades, GPA and attendance, download documents and submit replies, and practice in a code editor with correct-answer tracking. Registration uses PHPMailer email verification.',
    technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS', 'PHPMailer'],
    documentationUrl: `${repoUrl('ProgressPulse')}#readme`,
    status: 'Complete; documented in an accompanying paper',
  },
};

/** Repos shown on the home page, in order (lowercase names). */
export const FEATURED_REPOS = [
  'iot-ids-ml-dashboard',
  'neurovision',
  'cpl',
  'pld',
  'camsf',
  'sci',
  'epaper',
  'progresspulse',
];

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
