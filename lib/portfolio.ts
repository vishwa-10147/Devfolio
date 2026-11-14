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
  project_p: {
    repository: 'vishwa-10147/project_p',
    featured: false,
    displayTitle: 'EmpowerHer',
    summary:
      'A privacy-preserving AI platform that helps women entrepreneurs in India validate business ideas, find government schemes and funding, and protect their ideas with real cryptography.',
    problem:
      'Women entrepreneurs in India face scattered information on schemes and loans, little market data, and real risk in sharing an unprotected business idea. EmpowerHer brings validation, schemes, funding tools and document checks into one place, and is built so that sensitive figures and ideas can stay private even from the server.',
    roleAndContribution:
      'Designed and built the Django backend, the privacy and cryptography layer, the scheme recommender, OCR document checks, the multilingual assistant, CI and the project report.',
    architecture:
      'Django 5.2 + Django REST Framework serving server-rendered templates and plain JavaScript (no build step), installable as a PWA with offline pages. SQLite by default or PostgreSQL via DATABASE_URL. A rule-based + TF-IDF recommender explains why each of 25 curated schemes fits. Loan affordability is checked with Paillier homomorphic encryption, so the server computes on income it never sees; the Idea Vault is end-to-end encrypted in the browser (WebCrypto AES-256-GCM, PBKDF2) and uses Pedersen commitments with Fiat–Shamir zero-knowledge proofs to prove ownership without revealing the idea. RapidOCR validates PAN, Aadhaar, GSTIN, Udyam and IFSC with checksums and masked, Fernet-encrypted storage. The assistant answers in 7 Indian languages by text or voice.',
    technologies: ['Python', 'Django', 'Django REST Framework', 'PostgreSQL', 'Paillier HE', 'Zero-knowledge proofs', 'WebCrypto', 'scikit-learn', 'RapidOCR', 'PWA', 'Docker', 'GitHub Actions'],
    verifiedResults:
      '127 automated tests at 85% coverage, run in CI on both SQLite and PostgreSQL, plus a Docker build smoke test and Django production checks.',
    documentationUrl: `${repoUrl('project_p')}#readme`,
    status: 'Complete; production config passes check --deploy but not yet deployed to a public server',
    futureWork:
      'Register as a DigiLocker partner to switch on live document confirmation, extend the multilingual interface beyond the assistant, and deploy publicly.',
  },
  campusgpt: {
    repository: 'vishwa-10147/CampusGPT',
    featured: false,
    displayTitle: 'CampusGPT',
    summary:
      'A ChatGPT-style assistant for a college that answers from institutional documents and website pages using retrieval-augmented generation, with a source citation on every answer.',
    problem:
      'Students and staff hunt across PDFs, notices and web pages for policies, calendars and regulations, and a general chatbot will confidently make answers up. CampusGPT grounds every answer in the institution\'s own content and shows exactly where it came from.',
    roleAndContribution:
      'Designed and built the RAG pipeline, ingestion and scraping, the FastAPI backend with authentication, the React chat interface and the test suites.',
    architecture:
      'React 18 + TypeScript frontend streams answers over SSE from a FastAPI backend. Documents (PDF, TXT, MD) and scraped college web pages (robots.txt-compliant) go through a scrape → chunk → embed → store pipeline using nomic-embed-text (768-dim) into PostgreSQL 16 with a pgvector HNSW index. Queries retrieve the top-k chunks by cosine similarity and pass them to a pluggable LLM provider (Ollama locally, or OpenAI / Anthropic). Uploads are private to their owner; website pages and admin-shared files are public. JWT in HttpOnly cookies with Argon2id and rotating refresh tokens, email verification and per-account / per-IP rate limits. Alembic migrations and Docker Compose.',
    technologies: ['Python', 'FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'pgvector', 'Ollama', 'RAG', 'Docker', 'pytest', 'Vitest', 'Playwright'],
    verifiedResults:
      'Backend tests run against a separate test database; frontend unit tests with Vitest; Playwright end-to-end tests cover student and admin flows against the running app.',
    documentationUrl: `${repoUrl('CampusGPT')}#readme`,
    status: 'Phase 1 complete (chat, RAG, ingestion, auth, admin dashboard)',
    futureWork: 'Modular ingestion, advanced search and document versioning, then configurable roles and department-level data separation.',
  },
  whatsappautomation: {
    repository: 'vishwa-10147/WhatsAppAutomation',
    featured: false,
    displayTitle: 'WhatsApp Automation Platform',
    summary:
      'A multi-tenant platform for messaging through the official WhatsApp Business Cloud API, with contact and conversation management, scheduling and a visual workflow engine.',
    problem:
      'Small businesses run customer conversations on WhatsApp by hand, while most automation tools rely on unofficial clients that risk a ban. This platform uses Meta\'s official Cloud API and lets several organizations automate messaging safely from one deployment.',
    roleAndContribution: 'Designed the architecture and built the multi-tenant backend, WhatsApp integration, workflow data model and the React dashboard shell.',
    architecture:
      'React 18 + TypeScript (Vite, Tailwind, TanStack Query) talks to a FastAPI backend on PostgreSQL 16, with Redis and Celery workers for queued sends and scheduled jobs, deployed with Docker Compose and Nginx. Organization-scoped JWTs with admin / member / viewer roles. A provider abstraction swaps between a mock and the Cloud API; WhatsApp credentials are Fernet-encrypted at rest. Webhooks are verified and processed for inbound messages and delivery status. Workflows are versioned node/edge graphs with node-level execution tracking, cron and one-time schedules, and idempotency keys for safe retries.',
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Celery', 'React', 'TypeScript', 'WhatsApp Cloud API', 'Docker', 'Nginx'],
    documentationUrl: `${repoUrl('WhatsAppAutomation')}#readme`,
    status: 'In development: foundation, WhatsApp integration and workflow data layer complete',
    futureWork: 'Workflow execution engine, a React Flow visual editor, and the contacts and inbox UI.',
  },
  repopilot: {
    repository: 'vishwa-10147/RepoPilot',
    featured: false,
    displayTitle: 'RepoPilot',
    summary:
      'A local, read-only command-line auditor that scores a repository\'s health and readiness and tells you what to fix first, without running its code or touching the network.',
    problem:
      'Before sharing or shipping a project it is easy to miss a missing licence, a committed .env file, a leaked private key or untested code. RepoPilot checks for these in seconds and is safe to run on any folder because it never executes or modifies anything.',
    roleAndContribution: 'Designed and built the scanner, checks, scoring model, CLI, terminal UI, JSON reporting, tests and CI.',
    architecture:
      'A Python 3.11+ package with `repopilot` CLI and a keyboard-driven TUI. An iterative scanner respects ignore lists, contains symlinks and enforces file-size and file-count limits. Checks cover documentation, project structure, security and configuration (environment files, private-key markers, conservative credential heuristics, tracked sensitive files) and Git hygiene. The score is max(0, 100 − Σ penalties), from 2 for optional hygiene up to 25 for private-key indicators. Output is Rich text or a versioned JSON report that never includes secret values, and a .repopilot.toml can set a minimum score for CI exit codes.',
    technologies: ['Python', 'Rich', 'TUI', 'pytest', 'Docker', 'GitHub Actions'],
    verifiedResults: 'Unit tests cover the scanner, checks, scoring, configuration, reporter and CLI, run in GitHub Actions.',
    documentationUrl: `${repoUrl('RepoPilot')}#readme`,
    status: 'v1.0.0 released',
  },
  buildpulse: {
    repository: 'vishwa-10147/BUILDPULSE',
    featured: false,
    displayTitle: 'CODEFORGE (BuildPulse)',
    summary:
      'An engineering-intelligence platform that tracks the health of C++ projects build after build, combining a collector CLI, a FastAPI backend and a React dashboard.',
    problem:
      'Build times creep up, warnings pile up and test coverage slips slowly enough that no single build looks wrong. CODEFORGE records every build and turns it into a transparent health score, trends and insights so regressions are visible early.',
    roleAndContribution:
      'Built the platform across the collector, backend, health-score engine and dashboard; the repository also includes work merged from a collaborator.',
    architecture:
      'A `codeforge` collector CLI analyzes a repository (git, build, tests, static analysis, complexity, benchmarks, dependencies, architecture) and uploads a build_report.json. A FastAPI backend with SQLAlchemy and Alembic (PostgreSQL or SQLite) ingests reports and computes a weighted Engineering Health Score across six categories (build 15%, code quality 20%, testing 20%, performance 15%, maintainability 15%, architecture 15%), graded EXCELLENT to CRITICAL. Weights are configurable per project and stored with each score so formula changes never reinterpret old results. A React + TypeScript + Vite dashboard shows health history, trends, insights and architecture analysis.',
    technologies: ['Python', 'FastAPI', 'SQLAlchemy', 'Alembic', 'PostgreSQL', 'React', 'TypeScript', 'Vite', 'Tailwind CSS', 'C++ / CMake', 'pytest', 'Ruff'],
    verifiedResults:
      'An end-to-end evaluation script replays sample C++ release histories through the collector and a temporary API and prints the resulting health trend. Backend and collector have pytest suites with Ruff linting.',
    documentationUrl: `${repoUrl('BUILDPULSE')}#readme`,
    status: 'Working prototype',
  },
  sentinelaudit: {
    repository: 'vishwa-10147/SentinelAudit',
    featured: false,
    displayTitle: 'SentinelAudit',
    summary:
      'An AI-powered network security audit service for Indian SMEs: a lightweight agent scans the network and a professional PDF audit report is generated and emailed automatically.',
    problem:
      'Small Indian businesses with 20–200 employees (clinics, manufacturers, CA firms) rarely have a security team and cannot afford enterprise tools or consultant audits. SentinelAudit aims to deliver a consultant-style report in minutes, monthly, at a fraction of the cost.',
    roleAndContribution: 'Defined the product and pricing, and built the detection agent, the FastAPI backend, report generation and the React frontend.',
    architecture:
      'A Python agent captures traffic with Scapy, groups packets into flows and extracts features. The detection engine combines Isolation Forest anomaly detection, behavioral fingerprinting and a risk engine that scores each device and maps findings to MITRE ATT&CK. A FastAPI backend (SQLAlchemy, JWT auth, Razorpay payments) processes scans, Celery + Redis run background work, and WeasyPrint renders Jinja2 templates into PDF reports that are emailed to the customer. React + Vite + Tailwind frontend.',
    technologies: ['Python', 'FastAPI', 'Scapy', 'Scikit-learn', 'Celery', 'Redis', 'SQLite / PostgreSQL', 'WeasyPrint', 'Razorpay', 'React', 'Tailwind CSS'],
    documentationUrl: `${repoUrl('SentinelAudit')}#readme`,
    status: 'In development: detection engine, API and report generation built; not yet offered to customers',
    futureWork: 'Pilot with a first SME customer, move to PostgreSQL, and automate monthly scans and report delivery.',
  },
  stock: {
    repository: 'vishwa-10147/Stock',
    featured: false,
    displayTitle: 'StockPulse AI',
    summary:
      'An Indian stock-market prediction platform for NIFTY50 and SENSEX that combines deep-learning, gradient-boosting and news-sentiment models into BUY / SELL / HOLD signals, with backtesting and paper trading.',
    problem:
      'Retail traders get either raw charts or opaque tips. StockPulse explores whether an ensemble of models over price, macroeconomic and sentiment data can produce signals that come with confidence, stop-loss, target and risk, and lets you test them before risking money.',
    roleAndContribution: 'Built the data ingestion, feature engineering, model training and ensemble, backtesting and paper-trading engine, API and dashboard.',
    architecture:
      'Ingestion scripts pull 15 years of daily OHLCV for ^NSEI and ^BSESN, FRED macroeconomic series and RSS news sentiment. Features include RSI, MACD, EMA/SMA, ATR and Bollinger Bands. An ensemble of LSTM, a Transformer-style sequence model, XGBoost and a FinBERT sentiment adapter predicts 1-, 5- and 10-day horizons, trained GPU-aware with walk-forward validation. A FastAPI backend (PostgreSQL, Redis, WebSockets) serves predictions, backtests, a paper-trading simulator and retraining; a React dashboard uses TradingView Lightweight Charts.',
    technologies: ['Python', 'FastAPI', 'PyTorch', 'XGBoost', 'FinBERT', 'PostgreSQL', 'Redis', 'WebSockets', 'React', 'TradingView Charts', 'Docker', 'Render'],
    documentationUrl: `${repoUrl('Stock')}#readme`,
    status: 'Working prototype; deployment configured for Render. For research and learning, not financial advice',
  },
  pcae: {
    repository: 'vishwa-10147/PCAE',
    featured: false,
    displayTitle: 'PCAE — Predictive Cyber Attack Engine',
    summary:
      'A machine-learning system that predicts the probability of a cyber attack on each network asset from telemetry, vulnerability and incident history, and shows the hotspots on a dashboard.',
    problem:
      'Security teams usually learn about an attack after it starts. PCAE asks a forward-looking question instead: which assets are most likely to be attacked in the next window, so patching and monitoring can be prioritized.',
    roleAndContribution: 'Built the synthetic data generator, feature engineering, XGBoost model with SHAP explanations, the FastAPI service and the Streamlit dashboard.',
    architecture:
      'A synthetic generator produces netflow, incident and asset-inventory data. Features are built per asset per one-hour window: static (OS, open ports, CVE count, patch age, criticality), temporal (unique source IPs, failed logins, SSH and HTTP error counts, bytes, connection entropy, port-scan indicators, past attacks) and derived trends and rolling statistics. An XGBoost classifier, evaluated with AUC-ROC and AUC-PR for imbalanced data, outputs attack probabilities explained with SHAP. A FastAPI service exposes per-asset and batch predictions; a Streamlit dashboard visualizes hotspots and suggested mitigations.',
    technologies: ['Python', 'XGBoost', 'SHAP', 'Pandas', 'FastAPI', 'Streamlit'],
    documentationUrl: `${repoUrl('PCAE')}#readme`,
    status: 'Hackathon prototype on synthetic data',
    futureWork: 'Train on public datasets such as CICIDS2017 and UNSW-NB15, add sequence models and SIEM integration, and containerize.',
  },
  nfc_digital: {
    repository: 'vishwa-10147/NFC_Digital',
    featured: false,
    displayTitle: 'TapPromo',
    summary:
      'A platform for digital promotion cards that customers open by tapping an NFC tag or scanning a QR code, with no app install, plus analytics on views, button taps and coupon claims.',
    problem:
      'Paper flyers and business cards cannot be updated or measured. TapPromo gives every product or business a shareable, editable card and shows the owner how people actually interact with it.',
    roleAndContribution: 'Designed and built the full stack: Express API, database schema, card editor and wizard, public card pages and analytics.',
    architecture:
      'An npm-workspaces monorepo: an Express + TypeScript API with Prisma on PostgreSQL 16, and a React + Vite + Tailwind web app served on one origin. Each card has a permanent public URL that is encoded into a server-generated QR code and can be written to a physical NFC tag (browsers cannot do phone-to-phone NFC, so the design is explicit about this). A 7-step creation wizard with live preview and 12 templates, brands, coupons and action buttons. Per-card analytics over 7/30/90 days, plan limits, an admin console and session auth with SHA-256-hashed httpOnly cookies.',
    technologies: ['TypeScript', 'Node.js', 'Express', 'Prisma', 'PostgreSQL', 'React', 'Vite', 'Tailwind CSS', 'Docker'],
    documentationUrl: `${repoUrl('NFC_Digital')}#readme`,
    status: 'Feature-complete for local use; not yet deployed',
  },
  tastyfoods: {
    repository: 'vishwa-10147/TastyFoods',
    featured: false,
    displayTitle: 'TastyFoods',
    summary:
      'A multi-restaurant evolution of FoodOrder: several restaurants run ordering, kitchen flow and payments from one deployment, with WhatsApp order updates and customer reviews.',
    problem:
      'After FoodOrder worked for one restaurant, the next need was hosting several restaurants on one backend, each with its own menu, staff, custom domain and customer notifications.',
    roleAndContribution: 'Extended the FoodOrder backend to multiple restaurants and built the WhatsApp integration, explore pages, admin tools and deployment setup.',
    architecture:
      'Node.js / Express on PostgreSQL with Socket.IO for live updates across customer, management, kitchen display and outside-screen views. Restaurants are tenants with their own menus (including CSV import), users and outlet status, and can be served from custom domains. Razorpay payments with webhook verification, loyalty points and coupon previews, and post-payment star reviews that update ratings live. Order placed / ready / completed messages go out through the WhatsApp Cloud API. Audit logs, rate limiting and a kiosk-printing launcher for counters; deployment configured for Render.',
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'Socket.IO', 'Razorpay', 'WhatsApp Cloud API', 'HTML/CSS/JS', 'Render'],
    documentationUrl: `${repoUrl('TastyFoods')}#readme`,
    status: 'Production deployment configured on Render with custom restaurant domains',
  },
  aadityam: {
    repository: 'vishwa-10147/aadityam',
    featured: false,
    displayTitle: 'Aadityam',
    summary:
      'A mobile-first ordering app for a counter-pickup food court: customers order and pay online, then watch a token number move to Ready.',
    problem:
      'A food court with no tables does not need table management; it needs fast ordering, trustworthy payments and a clear way to tell customers their food is ready.',
    roleAndContribution: 'Built the Express API, Razorpay payment flow, the React customer app and the admin console.',
    architecture:
      'Node.js + Express API on SQLite with JWT-protected admin routes and image uploads; React + Tailwind frontend with a customer app and an admin console. The server recalculates every total from the database rather than trusting browser prices, creates a matching Razorpay order, and verifies the payment signature with HMAC-SHA256 before marking an order paid. Orders move Placed → Preparing → Ready → Picked up. Admins manage the menu (photos, veg/non-veg, availability), categories, tax rate and an "accepting orders" switch.',
    technologies: ['Node.js', 'Express', 'SQLite', 'React', 'Tailwind CSS', 'Razorpay', 'JWT', 'Render'],
    documentationUrl: `${repoUrl('aadityam')}#readme`,
    status: 'Complete; deployment configured for Render',
  },
  interio: {
    repository: 'vishwa-10147/interio',
    featured: false,
    displayTitle: 'Verrant — Cinematic Interior Studio',
    summary:
      'A cinematic marketing site for an interior design studio, where a procedurally built 3D villa morphs from blueprint wireframe to finished building as you scroll.',
    problem:
      'Interior studios sell an experience, and a static gallery does not convey it. The brief was a front end that feels like a film while staying fast, responsive and accessible.',
    roleAndContribution: 'Designed and built the front end, including the procedural 3D scene and scroll choreography.',
    architecture:
      'Next.js 15 + React 18 + TypeScript. The villa is built procedurally in Three.js via React Three Fiber and drei (no external model): a scroll-driven wireframe-to-solid morph, orbiting camera, parallax mouse look, swaying trees, dust particles and soft contact shadows. Lenis smooth scroll is synced with GSAP ScrollTrigger, and Framer Motion handles reveals. Sections (portfolio, services, process timeline, testimonials, consultation form) read from local arrays so a CMS can be plugged in later. Respects prefers-reduced-motion; deployed via GitHub Pages workflow.',
    technologies: ['Next.js 15', 'React', 'TypeScript', 'Three.js', 'React Three Fiber', 'GSAP', 'Framer Motion', 'Lenis', 'Tailwind CSS'],
    documentationUrl: `${repoUrl('interio')}#readme`,
    status: 'Front-end complete; CMS, database and consultation backend intentionally out of scope',
    futureWork: 'Swap in a real villa model and project photography, and persist consultation bookings through an API route.',
  },
  v47: {
    repository: 'vishwa-10147/V47',
    featured: false,
    displayTitle: 'V47 Studio',
    summary:
      'A motion-driven studio website with a custom Three.js hero scene and a canvas network visualization, built as plain static files with no build step.',
    problem:
      'A digital-products studio needed a premium site that would load anywhere, host on GitHub Pages for free, and still feel interactive.',
    roleAndContribution: 'Designed and built the site, its 3D hero scene, ecosystem visualization and interactions.',
    architecture:
      'Static HTML, CSS and JavaScript. An ES-module Three.js hero ("V47 Digital Core") loads from a CDN and degrades gracefully if it fails; a Canvas 2D graph visualizes the studio\'s ecosystem. Custom cursor, scroll reveals, process stepper and tilt effects, disabled on touch devices and under prefers-reduced-motion. The contact form posts to a Google Sheets endpoint. Includes a case-study page for the Interio project.',
    technologies: ['JavaScript', 'Three.js', 'Canvas 2D', 'HTML', 'CSS', 'Google Sheets', 'GitHub Pages'],
    documentationUrl: `${repoUrl('V47')}#readme`,
    status: 'Complete',
  },
  neondrift: {
    repository: 'vishwa-10147/NeonDrift',
    featured: false,
    displayTitle: 'NeonDrift',
    summary: 'A third-person 3D collectible platformer built in Unity 6, made while learning the engine.',
    problem: 'A hands-on project to learn Unity\'s workflow: scenes, prefabs, physics triggers, the Input System, VFX and audio.',
    roleAndContribution: 'Built and configured the level in Unity 6, starting from Unity\'s Get Started 3D template.',
    architecture:
      'Unity 6 project with a third-person controller on the Input System. Collectibles rotate and bob, trigger particle effects on pickup and update an on-screen counter; a respawn script resets the player after a fall; motion-driven audio follows the player\'s movement. Organized into scenes, prefabs, materials, skyboxes, VFX and UI.',
    technologies: ['Unity 6', 'C#', 'Input System', 'TextMesh Pro', 'VFX'],
    documentationUrl: `${repoUrl('NeonDrift')}`,
    status: 'Learning project',
  },
  sentinelhealth: {
    repository: 'vishwa-10147/SentinelHealth',
    featured: false,
    displayTitle: 'Sentinel Health',
    summary: 'A lightweight full-stack dashboard for logging weight and calories and tracking progress toward a target weight.',
    problem: 'Most fitness apps are heavy and ad-driven. This is a small, self-hosted tracker that shows only the numbers that matter for a weight goal.',
    roleAndContribution: 'Built the Node.js server, the JSON data store and the dashboard.',
    architecture:
      'A single Node.js server serves a static HTML/CSS/JS dashboard and persists entries to a JSON file. Daily weight and calorie logs feed metrics for calorie balance, weekly deficit and progress toward the target, with weight, calorie and weekly-balance charts and editable goal settings.',
    technologies: ['Node.js', 'JavaScript', 'HTML', 'CSS', 'JSON storage'],
    documentationUrl: `${repoUrl('SentinelHealth')}#readme`,
    status: 'Complete (personal project)',
  },
  'foodorder-app': {
    repository: 'vishwa-10147/FoodOrder-app',
    featured: false,
    displayTitle: 'FoodOrder POS (Desktop)',
    summary: 'A planned Electron desktop point-of-sale client for the FoodOrder restaurant backend.',
    problem: 'Counter staff work better with a dedicated desktop app (receipt printing, offline-tolerant UI, auto-updates) than with a browser tab.',
    roleAndContribution: 'Set up the project structure and dependency stack.',
    architecture:
      'Planned: Electron shell (main, preload, IPC, auto-updater) around a React 19 + TypeScript + Vite app using MUI, TanStack Query, Zustand and a Socket.IO client, with API modules for orders, menu, inventory, customers, staff, coupons and reports.',
    technologies: ['Electron', 'React', 'TypeScript', 'Vite', 'MUI', 'Socket.IO'],
    documentationUrl: `${repoUrl('FoodOrder-app')}`,
    status: 'Scaffold only: structure and dependencies in place, implementation not started',
  },
};

/**
 * Repos never shown on the site: the GitHub profile README and empty repos.
 * Remove a name here once that repo has real content (and add a case study).
 */
export const HIDDEN_REPOS = ['vishwa-10147', 'empower-her', 'example'];

export function isHiddenRepo(repoName: string): boolean {
  return HIDDEN_REPOS.includes(repoName.toLowerCase());
}

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
