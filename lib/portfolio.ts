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
      'A self-hostable platform for proctored exams and coding assessments, in which AI surfaces integrity signals and human reviewers make every final decision.',
    problem:
      'Institutions running online exams need integrity checks, a safe way to execute untrusted code, and practice material between assessments. ExamSentinel consolidates exams, proctoring, human review, a judged practice platform and contests into a single system that can run on one campus server without internet access during exams.',
    roleAndContribution:
      'Designed and implemented the platform end to end: the Next.js frontend, FastAPI backend, judging pipeline, proctoring signals, deployment kits and CI.',
    architecture: [
      'Frontend: Next.js 14 with a Monaco code editor, in-browser BlazeFace face detection and WebRTC for live interviews.',
      'Backend: FastAPI REST and WebSocket services for judging, grading and risk scoring, backed by PostgreSQL and Redis.',
      'AI services: YOLO11n detects phones and additional people on camera; faster-whisper transcribes interviews.',
      'Code execution: untrusted submissions run in an isolated Piston sandbox.',
      'Deployment: Docker Compose, with a campus server kit for offline exam days.',
    ],
    technologies: ['Next.js', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'YOLO11n', 'BlazeFace', 'Piston', 'Playwright', 'pytest'],
    verifiedResults:
      '116 DSA problems across 16 topics and 11 SQL problems, each with hidden tests and editorials. The judging queue was load-tested with 500 simultaneous submissions. Exams, proctoring, review, practice, contests, interviews and SSO are covered by automated tests.',
    documentationUrl: `${repoUrl('ExamSentiinel')}#readme`,
    status: 'Implemented and tested · campus kit rehearsed locally; not yet deployed to a campus or AWS',
    futureWork:
      'Deploy the campus kit on a production campus server, launch on AWS, and expose item-response-theory scoring in the API and UI.',
  },
  sentineledgeai: {
    repository: 'vishwa-10147/SentinelEdgeAI',
    featured: true,
    displayTitle: 'SentinelEdgeAI',
    summary:
      'An on-premises, AI-driven edge security appliance for real-time network monitoring, anomaly detection and automated response.',
    problem:
      'Small and medium-sized networks rarely have a security operations team or a cloud security stack. SentinelEdgeAI runs entirely on low-cost edge hardware inside the network, so traffic never leaves the premises to be analyzed.',
    roleAndContribution:
      'Designed and implemented the capture pipeline, feature extraction, detection models, enforcement hooks and the FastAPI backend.',
    architecture: [
      'Hardware: a Raspberry Pi 5 handles capture and enforcement; an NVIDIA Jetson Orin Nano runs inference.',
      'Feature extraction: packets are aggregated into 5-tuple flows with 24 statistical features per flow.',
      'Detection: Isolation Forest, Z-score baselining, per-device behavioral fingerprinting and drift detection are fused into a 0–100 risk score.',
      'Response: findings are mapped to MITRE ATT&CK and drive tiered actions (alert, block, quarantine) through nftables/iptables, dry-run by default with rollback guards.',
      'Platform: FastAPI REST and WebSocket APIs with SQLite persistence.',
    ],
    technologies: ['Python', 'FastAPI', 'Scikit-learn', 'Scapy', 'Zeek', 'Suricata', 'SQLite', 'React', 'Streamlit', 'Docker', 'GitHub Actions'],
    verifiedResults:
      'Model artifacts are signed, and every change passes CI smoke checks with Bandit and pip-audit before deployment.',
    documentationUrl: `${repoUrl('SentinelEdgeAI')}#readme`,
    status: 'Active development',
    futureWork:
      'Ship the React SOC dashboard, add encrypted storage and introduce role-based access control.',
  },
  classroomguard: {
    repository: 'vishwa-10147/ClassroomGuard',
    featured: false,
    displayTitle: 'ClassroomGuard',
    summary:
      'AI-assisted exam-hall monitoring that detects mobile phones and unpermitted calculators on classroom CCTV and alerts invigilators in real time.',
    problem:
      'Invigilators cannot watch every seat at once. ClassroomGuard monitors the camera feeds and prompts a person to check, attaching an annotated evidence frame; it supports invigilators rather than replacing them, and an alert is never treated as proof on its own.',
    roleAndContribution:
      'Designed and implemented the AI engine, API, web dashboard, mobile app and on-premises deployment tooling.',
    architecture: [
      'Ingestion: IP cameras stream over RTSP to a stateless AI engine.',
      'Detection: a YOLO object detector and YOLOv8m-pose with ByteTrack (PyTorch/CUDA) assign each object to the nearest tracked person and confirm it over time.',
      'API: FastAPI is the only component with access to PostgreSQL; Redis and Celery handle retention and camera health.',
      'Clients: alerts reach a React dashboard and an Expo mobile app over WebSocket, served behind Caddy for on-premises HTTPS.',
    ],
    technologies: ['Python', 'FastAPI', 'PyTorch', 'YOLO', 'OpenCV', 'PostgreSQL', 'Redis', 'Celery', 'React', 'TypeScript', 'Expo', 'Docker'],
    verifiedResults:
      'End-to-end pipeline from camera stream to invigilator alert, including temporal confirmation to reduce false positives and evidence frames for human review.',
    documentationUrl: `${repoUrl('ClassroomGuard')}#readme`,
    status: 'Active development',
  },
  sentinelx: {
    repository: 'vishwa-10147/SentinelX',
    featured: false,
    displayTitle: 'SentinelX',
    summary:
      'An autonomous AI security engineer that investigates threats, reproduces them safely, and generates and validates defenses before a human approves deployment.',
    problem:
      'An alert such as "DNS Tunneling Detected, score 0.92" does not explain why it fired, whether the behavior is reproducible, what rule should be written, or whether that rule is safe to deploy. SentinelX connects detection, investigation, experimentation, defense engineering and validation in one workflow.',
    roleAndContribution:
      'Designed the detection, investigation, reproduction, defense and validation workflow, and implemented the detection layer, agent tooling and sandbox.',
    architecture: [
      'Detection layer: fuses packet-level ML, flow-level ML and rule scores (T = 0.4P + 0.4F + 0.2R).',
      'AI security agent: built on NVIDIA Nemotron and Nebius, acting only through explicit, auditable tools.',
      'Security sandbox: Docker environments for controlled reproduction of suspicious behavior.',
      'Defense and validation: generates, tests and evaluates detection rules, then holds them for human approval.',
    ],
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
      'IoT and lab networks need attack visibility without enterprise tooling. SentinelIDS was evaluated against Kali Linux attacks on Metasploitable targets in a controlled VMware lab.',
    roleAndContribution:
      'Implemented the feature extraction, packet- and flow-level ML pipeline, fusion risk engine and Streamlit SOC dashboard.',
    architecture: [
      'Input: live VMware lab traffic or benchmark datasets feed packet feature extraction.',
      'Detection: packet-level and flow-level ML detectors run alongside rule-based heuristics.',
      'Fusion: a weighted risk engine combines all signals into a single incident score.',
      'Output: incident logs, prioritized SOC tickets, a Streamlit dashboard, PDF reports and an ARP-based device inventory.',
    ],
    technologies: ['Python', 'Scikit-learn', 'Streamlit', 'VMware', 'Wireshark', 'Nmap', 'Kali Linux'],
    verifiedResults:
      'Detected attacks launched from Kali Linux against Metasploitable targets in an isolated lab, producing prioritized tickets and incident reports.',
    documentationUrl: `${repoUrl('SentinelIDS')}#readme`,
    status: 'Complete · academic and authorized lab use',
  },
  foodorder: {
    repository: 'vishwa-10147/FoodOrder',
    featured: true,
    displayTitle: 'FoodOrder',
    summary:
      'A real-time restaurant platform: customers order and track from their table while staff run tables, menu and kitchen flow from one live dashboard.',
    problem:
      'Restaurants typically manage orders, tables and the kitchen across separate tools. FoodOrder runs ordering and operations from a single backend, with every screen kept in sync.',
    roleAndContribution:
      'Implemented the Node.js backend, real-time synchronization, payments and the customer and management interfaces.',
    architecture: [
      'Backend: Node.js and Express 5 on PostgreSQL.',
      'Real time: Socket.IO pushes menu and order state to every connected screen.',
      'Workflow: table lifecycle (free, ordering, occupied) and kitchen stages (new, preparing, ready, delivered).',
      'Operations: Razorpay payments, rate limiting and a health endpoint.',
    ],
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'Socket.IO', 'Razorpay', 'HTML/CSS/JS'],
    verifiedResults:
      'Deployed as a public live demo on Render, covering the full flow from table order to payment and kitchen delivery.',
    demoUrl: 'https://foodorder-2dy8.onrender.com/client.html#order',
    documentationUrl: `${repoUrl('FoodOrder')}#readme`,
    status: 'Live · demo deployed on Render',
    futureWork:
      'Extended into the multi-restaurant TastyFoods platform.',
  },
  'aegisz-health': {
    repository: 'vishwa-10147/AEGISZ-Health',
    featured: false,
    displayTitle: 'AEGISZ-Health',
    summary:
      'A quantum-safe, federated electronic health record exchange that keeps patient data at its originating hospital until a transfer is authorized.',
    problem:
      'Centralized health-record databases are high-value targets, and data intercepted today could be decrypted by future quantum computers. AEGISZ-Health keeps records federated and protects every transfer with post-quantum cryptography.',
    roleAndContribution:
      'Implemented the federated backend, cryptography layer, security ledger and clinical dashboards.',
    architecture: [
      'Topology: a six-hospital federated mesh plus a global security ledger, running as seven PostgreSQL databases in Docker.',
      'Cryptography: FHIR payloads are encapsulated with ML-KEM (Kyber) and signed with ML-DSA (Dilithium) via liboqs.',
      'Auditability: a SHA-256 hash chain makes access logs tamper-evident, and a break-glass protocol allows audited emergency access.',
      'Threat response: request-velocity anomaly detection freezes compromised accounts.',
    ],
    technologies: ['Python', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'liboqs', 'React', 'TypeScript', 'Docker'],
    verifiedResults:
      'Working end-to-end exchange across six simulated hospitals using synthetic FHIR data, with post-quantum encryption and signatures on every transfer.',
    documentationUrl: `${repoUrl('AEGISZ-Health')}#readme`,
    status: 'Prototype · synthetic FHIR data',
  },
  devfolio: {
    repository: 'vishwa-10147/Devfolio',
    featured: false,
    displayTitle: 'Devfolio',
    summary:
      'A GitHub-powered developer portfolio built with Next.js, React, TypeScript and Tailwind CSS, and the site you are viewing.',
    problem:
      'A hand-maintained portfolio drifts out of date as projects change. Devfolio pulls public repositories from the GitHub API and pairs them with curated case studies, so the site stays current with minimal upkeep.',
    roleAndContribution:
      'Designed, implemented and deployed the site.',
    architecture: [
      'Framework: Next.js 14 App Router, statically exported for GitHub Pages.',
      'Data: GitHub REST API with an on-disk cache, ETag revalidation and stale-on-error fallback; a client-side refresh picks up repositories created after the last build.',
      'Content: curated case studies keyed by repository name, with summaries backfilling missing GitHub descriptions.',
      'Design: Tailwind CSS with a dark-first design system.',
    ],
    technologies: ['Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS', 'GitHub REST API', 'Vitest', 'GitHub Actions'],
    verifiedResults:
      'Automated deployment to GitHub Pages on every push, with unit tests for data normalization and utilities.',
    demoUrl: '/',
    documentationUrl: `${repoUrl('Devfolio')}#readme`,
    status: 'Live · GitHub Pages',
  },
  'iot-ids-ml-dashboard': {
    repository: 'vishwa-10147/iot-ids-ml-dashboard',
    featured: true,
    displayTitle: 'IoT IDS + SOC Dashboard',
    summary:
      'A multi-level machine-learning intrusion detection system for IoT networks, with a SOC-style dashboard, automated tickets and PDF reports.',
    problem:
      'IoT networks are full of devices that cannot run their own security software. This system monitors their traffic instead, classifies attacks with machine learning, and turns detections into SOC tickets and reports an analyst can act on.',
    roleAndContribution:
      'Implemented the capture pipeline, flow generator, rule-based labeling, ML prediction and fusion scoring, ticketing, PDF reporting and the Streamlit dashboard.',
    architecture: [
      'Capture: Kali Linux records traffic with tshark and hands it to a Windows SOC pipeline through a VMware shared folder.',
      'Analysis: a flow generator, rule-based labeling and an ML prediction engine feed a fusion engine that combines model confidence with heuristics.',
      'Incident management: detections become P1–P4 tickets that move through OPEN, INVESTIGATING and RESOLVED.',
      'Presentation: a Streamlit dashboard with a network graph, health monitor and one-click PDF reports.',
    ],
    technologies: ['Python', 'Scikit-learn', 'Streamlit', 'tshark', 'Kali Linux', 'VMware', 'TON_IoT', 'pytest'],
    verifiedResults:
      'Three detection modes: TON_IoT dataset benchmarking, live packet-level classification and flow-level behavioral analysis, with dedicated labeling rules for brute force, port scans and DNS tunneling.',
    documentationUrl: `${repoUrl('iot-ids-ml-dashboard')}#readme`,
    status: 'Complete · lab and research use',
  },
  neurovision: {
    repository: 'vishwa-10147/neurovision',
    featured: true,
    displayTitle: 'NeuroVision',
    summary:
      'An interactive platform for building, training and inspecting real neural networks in synchronized 2D and 3D views, driven by measured values rather than decorative animation.',
    problem:
      'Most neural-network visualizations show illustrative animations rather than what a model actually computes. NeuroVision displays real activations, weights, gradients and training metrics, both for small networks designed in the tool and for imported ONNX models.',
    roleAndContribution:
      'Designed and implemented the full stack (React/Three.js frontend, FastAPI backend, PyTorch training jobs, safe ONNX import and a Python SDK) and authored the accompanying research paper.',
    architecture: [
      'Frontend: React and TypeScript with an SVG 2D renderer and a Three.js 3D renderer sharing one Zustand store and one graph schema.',
      'Backend: FastAPI serves REST and WebSocket events and runs seeded PyTorch training jobs.',
      'Model import: ONNX models are validated on import and executed in an isolated ONNX Runtime worker.',
      'Contracts: JSON Schema definitions are mirrored in Pydantic and Zod.',
      'SDK: a single-file Python SDK streams metrics and activations from external training scripts, with two-way controls (pause, resume, checkpoint, adjust learning rate).',
    ],
    technologies: ['React', 'TypeScript', 'Three.js', 'Zustand', 'FastAPI', 'PyTorch', 'ONNX Runtime', 'WebSockets', 'Vitest', 'Pytest'],
    verifiedResults:
      'Milestones 0–7 delivered: Architecture Studio, 3D explorer, live training, ONNX import and execution, CNN feature maps and attention heads, and per-layer training-health alerts. Documented in an accompanying research paper.',
    documentationUrl: `${repoUrl('neurovision')}#readme`,
    status: 'Active development',
    futureWork:
      'Learning Mode, saved projects and a hosted deployment.',
  },
  cpl: {
    repository: 'vishwa-10147/CPL',
    featured: true,
    displayTitle: 'CPL: Confidence-Guided Predictive Localization',
    summary:
      'A research framework that forecasts autonomous-vehicle localization risk 2.5 seconds ahead and recommends actions before localization fails.',
    problem:
      'Adaptive sensor fusion reacts to localization degradation only after it occurs. CPL reframes localization as predictive risk management, using the preceding 10 seconds of kinematics and sensor-confidence features.',
    roleAndContribution:
      'Research and implementation for the third paper in the SCI → CAMSF → CPL series, under the guidance of Dr. P. Poornima, Department of CSE, MGIT.',
    architecture: [
      'Input: a 20-step window (10 s at 2 Hz) of 15 features covering kinematics, sensor confidence, localization quality and temporal trends.',
      'Model: a multi-head temporal model predicts the next five steps of relative trajectory, speed, uncertainty and reliability.',
      'Baselines: persistence, LSTM, GRU and Temporal Transformer predictors are compared.',
      'Decision support: a rule-based Dynamic Risk Assessment Engine rates each future step LOW, MEDIUM or HIGH and recommends actions.',
      'Evaluation: scene-level, leakage-free 70/15/15 splits.',
    ],
    technologies: ['Python', 'PyTorch', 'Temporal Transformer', 'LSTM / GRU', 'nuScenes', 'Jupyter'],
    verifiedResults:
      'On 2,060 test sequences from unseen scenes, the Temporal Transformer achieves 2.83 m 2D position RMSE: a 72.3% reduction against the persistence baseline, 6.0% against LSTM and 2.9% against GRU. Kinematics are real nuScenes ego poses; sensor-confidence features are simulated on top of them.',
    documentationUrl: `${repoUrl('CPL')}#readme`,
    status: 'Research · paper written',
  },
  pld: {
    repository: 'vishwa-10147/PLD',
    featured: true,
    displayTitle: 'PLD: Predictive Localization Dashboard',
    summary:
      'An interactive research dashboard that replays KITTI drives frame by frame and shows every stage of confidence-driven adaptive sensor fusion as it runs.',
    problem:
      'Sensor-fusion research is difficult to inspect through static plots. PLD makes the full pipeline observable during playback and serves as the interactive companion to the SCI, CAMSF and CPL research series.',
    roleAndContribution:
      'Designed and implemented the replay engine, fusion pipeline modules, dashboard panels, tests and offline evaluation.',
    architecture: [
      'Pipeline: KITTI Raw or Odometry replay → sensor metrics → quality and SCI → adaptive weights and covariance → EKF predict/update → Random Forest reliability model.',
      'Dashboard: Streamlit panels for camera feed, sensor confidence, health gauges, telemetry, fusion diagnostics and GPS vs. EKF tracks, with replay controls and CSV export.',
      'Evaluation: an offline script compares the adaptive engine with a fixed-weight EKF and produces figures and a PDF report.',
    ],
    technologies: ['Python', 'Streamlit', 'Extended Kalman Filter', 'Scikit-learn', 'KITTI', 'pytest'],
    verifiedResults:
      'Full frame-by-frame replay of KITTI drives through the adaptive fusion pipeline, with automated comparison reports against a fixed-weight EKF and a pytest suite.',
    documentationUrl: `${repoUrl('PLD')}#readme`,
    status: 'Complete',
  },
  camsf: {
    repository: 'vishwa-10147/CAMSF',
    featured: true,
    displayTitle: 'CAMSF: Adaptive Multi-Sensor Fusion',
    summary:
      'A localization framework that estimates the reliability of each sensor (camera, GPS, IMU) frame by frame and uses it to weight that sensor in the position estimate.',
    problem:
      'Standard EKF fusion trusts every sensor equally and permanently, so a degraded GPS or blurred camera pulls the estimate off course. CAMSF scales each sensor by its measured confidence and handles GPS outages explicitly.',
    roleAndContribution:
      'Research and implementation for the second paper in the SCI → CAMSF → CPL series, under the guidance of Dr. P. Poornima, Department of CSE, MGIT.',
    architecture: [
      'Sensor assessment: seven camera image-quality metrics, GPS stability, satellite and accuracy scores, and IMU smoothness and angular stability produce a Sensor Confidence Index.',
      'Fusion: a Confidence-Driven Adaptive EKF (CDA-EKF) scales measurement and process noise by confidence, using a Joseph-form covariance update.',
      'Resilience: the filter falls back to IMU dead-reckoning during GPS outages.',
      'Reliability prediction: 37 leakage-free pre-fusion features with leave-one-drive-out cross-validation.',
    ],
    technologies: ['Python', 'Extended Kalman Filter', 'Scikit-learn', 'OpenCV', 'KITTI', 'Jupyter'],
    verifiedResults:
      'Across 9 KITTI drives (2,472 frames, with seeded GPS degradation), the adaptive EKF outperforms the fixed-noise baseline on 8 of 9 drives, by up to 15.8% RMSE on the drive with the longest GPS outage (pooled RMSE 2.89 m vs. 2.94 m). The trajectory stays continuous through every outage. Random Forest reliability prediction: RMSE 1.76 m, R² 0.42.',
    documentationUrl: `${repoUrl('CAMSF')}#readme`,
    status: 'Research · paper written',
  },
  sci: {
    repository: 'vishwa-10147/SCI',
    featured: true,
    displayTitle: 'SCI: Sensor Confidence Index',
    summary:
      'A framework that scores GPS, IMU and camera quality on every frame and converts those scores into adaptive fusion weights for autonomous-vehicle perception.',
    problem:
      'GPS suffers from multipath and satellite loss, IMUs drift and cameras blur, yet conventional EKF fusion assumes every sensor is equally and permanently reliable. SCI measures each sensor\'s quality frame by frame.',
    roleAndContribution:
      'Research and implementation for the first paper in the SCI → CAMSF → CPL series, under the guidance of Dr. P. Poornima, Department of CSE, MGIT.',
    architecture: [
      'Data: synchronized KITTI Raw GPS, IMU and camera streams, validated before scoring.',
      'Quality metrics: 5 GPS, 3 IMU and 4 camera metrics combine into a per-sensor confidence in [0, 1].',
      'Fusion: adaptive weights w = C / ΣC scale the measurement covariance of an adaptive EKF.',
      'Evaluation: compared against a standard EKF across a 13-notebook pipeline.',
    ],
    technologies: ['Python', 'Jupyter', 'Extended Kalman Filter', 'NumPy', 'OpenCV', 'KITTI'],
    verifiedResults:
      'All 9 synchronized KITTI drives validated with zero missing frames, and confidences and weights respond as intended (for example, camera weight drops during visual degradation). Error metrics did not yet surpass the standard EKF because the reference was not independent and no degradation was injected; both limitations are resolved in the follow-up work, CAMSF.',
    documentationUrl: `${repoUrl('SCI')}#readme`,
    status: 'Research · paper written; superseded by CAMSF',
  },
  epaper: {
    repository: 'vishwa-10147/epaper',
    featured: true,
    displayTitle: 'E-Paper',
    summary:
      'A static, page-flip digital newspaper reader where publishing a new edition only requires adding page images to a folder and pushing to GitHub.',
    problem:
      'Small publications need a simple way to put their daily edition online without operating a backend or database.',
    roleAndContribution:
      'Implemented the reader, the admin page, the manifest build script and the GitHub Actions deployment.',
    architecture: [
      'Reader: a single-page HTML/CSS/JS app loads data/issues.json and drives a page-flip viewer.',
      'Content model: each edition is a dated folder of numbered page images.',
      'Build: a Node script scans the folders and regenerates the manifest; GitHub Actions rebuilds and redeploys to GitHub Pages on every push.',
      'Admin: a /manage page uses the browser\'s folder access API to add or edit editions locally.',
    ],
    technologies: ['JavaScript', 'HTML', 'CSS', 'Node.js', 'GitHub Actions', 'GitHub Pages'],
    verifiedResults:
      'Publicly deployed on GitHub Pages with zero server infrastructure; publishing an edition is a single push.',
    demoUrl: 'https://vishwa-10147.github.io/epaper/',
    documentationUrl: `${repoUrl('epaper')}#readme`,
    status: 'Live · GitHub Pages',
  },
  progresspulse: {
    repository: 'vishwa-10147/ProgressPulse',
    featured: true,
    displayTitle: 'ProgressPulse',
    summary:
      'A role-based educational platform for administrators, teachers and students, covering progress tracking, document sharing, assessments and an in-browser code editor.',
    problem:
      'Students, teachers and administrators often rely on separate tools for grades, documents and practice. ProgressPulse brings them into one platform with a dedicated dashboard for each role.',
    roleAndContribution:
      'Implemented the PHP/MySQL application, role-based dashboards, document sharing and email-verified registration.',
    architecture: [
      'Backend: PHP on MySQL with session-based authentication for three roles.',
      'Administrators: manage student and teacher accounts.',
      'Teachers: upload documents and track student progress.',
      'Students: view grades, GPA and attendance, download documents, submit replies and practice in a code editor with correct-answer tracking.',
      'Onboarding: registration is verified by email through PHPMailer.',
    ],
    technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS', 'PHPMailer'],
    verifiedResults:
      'Complete platform with three role-specific dashboards, documented in an accompanying paper.',
    documentationUrl: `${repoUrl('ProgressPulse')}#readme`,
    status: 'Complete',
  },
  project_p: {
    repository: 'vishwa-10147/project_p',
    featured: false,
    displayTitle: 'EmpowerHer',
    summary:
      'A privacy-preserving AI platform that helps women entrepreneurs in India validate business ideas, find government schemes and funding, and protect their ideas with applied cryptography.',
    problem:
      'Women entrepreneurs in India face fragmented information on schemes and loans, limited market data, and real risk in sharing an unprotected business idea. EmpowerHer brings validation, schemes, funding tools and document checks into one place, designed so that sensitive figures and ideas can remain private even from the server.',
    roleAndContribution:
      'Designed and implemented the Django backend, the privacy and cryptography layer, the scheme recommender, OCR document checks, the multilingual assistant, CI and the project report.',
    architecture: [
      'Platform: Django 5.2 and Django REST Framework with server-rendered templates, installable as a PWA with offline pages; SQLite or PostgreSQL.',
      'Recommendations: a rule-based and TF-IDF recommender explains why each of 25 curated schemes fits a user\'s profile.',
      'Private computation: loan affordability is evaluated with Paillier homomorphic encryption, so the server never sees income figures.',
      'Idea Vault: end-to-end encrypted in the browser (WebCrypto AES-256-GCM, PBKDF2), with Pedersen commitments and Fiat–Shamir zero-knowledge proofs of ownership.',
      'Documents: RapidOCR validates PAN, Aadhaar, GSTIN, Udyam and IFSC with checksums, masking and Fernet-encrypted storage.',
      'Assistant: answers in seven Indian languages by text or voice.',
    ],
    technologies: ['Python', 'Django', 'Django REST Framework', 'PostgreSQL', 'Paillier HE', 'Zero-knowledge proofs', 'WebCrypto', 'scikit-learn', 'RapidOCR', 'PWA', 'Docker', 'GitHub Actions'],
    verifiedResults:
      '127 automated tests at 85% coverage, run in CI on both SQLite and PostgreSQL, together with a Docker build smoke test and Django production checks.',
    documentationUrl: `${repoUrl('project_p')}#readme`,
    status: 'Complete · production-ready configuration; not yet publicly deployed',
    futureWork:
      'Register as a DigiLocker partner to enable live document confirmation, extend multilingual support beyond the assistant, and deploy publicly.',
  },
  campusgpt: {
    repository: 'vishwa-10147/CampusGPT',
    featured: false,
    displayTitle: 'CampusGPT',
    summary:
      'An institutional AI assistant that answers questions from a college\'s own documents and website using retrieval-augmented generation, with a source citation on every answer.',
    problem:
      'Students and staff search across PDFs, notices and web pages for policies, calendars and regulations, while general-purpose chatbots produce confident but unsupported answers. CampusGPT grounds every response in institutional content and shows exactly where it came from.',
    roleAndContribution:
      'Designed and implemented the RAG pipeline, ingestion and web scraping, the FastAPI backend with authentication, the React chat interface and the test suites.',
    architecture: [
      'Frontend: React 18 and TypeScript, streaming answers over server-sent events.',
      'Ingestion: PDFs, text files and robots.txt-compliant scrapes of the college website pass through a scrape → chunk → embed → store pipeline.',
      'Retrieval: nomic-embed-text (768-dim) embeddings in PostgreSQL 16 with a pgvector HNSW index; top-k chunks by cosine similarity.',
      'Generation: a pluggable LLM provider (Ollama locally, or OpenAI and Anthropic).',
      'Security: JWT in HttpOnly cookies, Argon2id hashing, rotating refresh tokens, email verification, per-account and per-IP rate limits, and owner-private uploads.',
    ],
    technologies: ['Python', 'FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'pgvector', 'Ollama', 'RAG', 'Docker', 'pytest', 'Vitest', 'Playwright'],
    verifiedResults:
      'Backend tests run against an isolated test database, frontend unit tests run in Vitest, and Playwright end-to-end tests cover student and administrator workflows against the running application.',
    documentationUrl: `${repoUrl('CampusGPT')}#readme`,
    status: 'Active development · Phase 1 complete',
    futureWork:
      'Modular ingestion, advanced search and document versioning, followed by configurable roles and department-level data separation.',
  },
  whatsappautomation: {
    repository: 'vishwa-10147/WhatsAppAutomation',
    featured: false,
    displayTitle: 'WhatsApp Automation Platform',
    summary:
      'A multi-tenant platform for messaging through the official WhatsApp Business Cloud API, with contact and conversation management, scheduling and a workflow engine.',
    problem:
      'Small businesses manage customer conversations on WhatsApp manually, and many automation tools depend on unofficial clients that risk account bans. This platform uses Meta\'s official Cloud API and allows multiple organizations to automate messaging from a single deployment.',
    roleAndContribution:
      'Designed the architecture and implemented the multi-tenant backend, WhatsApp integration, workflow data model and the React dashboard shell.',
    architecture: [
      'Frontend: React 18, TypeScript, Vite, Tailwind CSS and TanStack Query.',
      'Backend: FastAPI on PostgreSQL 16, with Redis and Celery workers for queued sends and scheduled jobs.',
      'Tenancy and access: organization-scoped JWTs with admin, member and viewer roles.',
      'Integration: a provider abstraction switches between a mock and the Cloud API; credentials are Fernet-encrypted at rest; webhooks are verified for inbound messages and delivery status.',
      'Workflows: versioned node/edge graphs with node-level execution tracking, cron and one-time schedules, and idempotency keys for safe retries.',
      'Deployment: Docker Compose behind Nginx.',
    ],
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Celery', 'React', 'TypeScript', 'WhatsApp Cloud API', 'Docker', 'Nginx'],
    verifiedResults:
      'Foundation, WhatsApp Cloud API integration and the workflow data layer are complete, with database migrations and health-checked containers.',
    documentationUrl: `${repoUrl('WhatsAppAutomation')}#readme`,
    status: 'Active development',
    futureWork:
      'Workflow execution engine, a React Flow visual editor, and the contacts and inbox interface.',
  },
  repopilot: {
    repository: 'vishwa-10147/RepoPilot',
    featured: false,
    displayTitle: 'RepoPilot',
    summary:
      'A local, read-only command-line auditor that scores a repository\'s health and readiness and prioritizes what to fix, without executing code or accessing the network.',
    problem:
      'Before a project is shared or shipped, it is easy to miss a missing licence, a committed .env file, a leaked private key or absent tests. RepoPilot detects these in seconds and is safe to run on any folder because it never executes or modifies anything.',
    roleAndContribution:
      'Designed and implemented the scanner, checks, scoring model, CLI, terminal UI, JSON reporting, tests and CI.',
    architecture: [
      'Interface: a Python 3.11+ package with a `repopilot` CLI and a keyboard-driven terminal UI.',
      'Scanner: iterative traversal that honours ignore lists, contains symlinks and enforces file-size and file-count limits.',
      'Checks: documentation, project structure, security and configuration (environment files, private-key markers, credential heuristics, tracked sensitive files) and Git hygiene.',
      'Scoring: max(0, 100 − Σ penalties), from 2 points for optional hygiene to 25 for private-key indicators.',
      'Reporting: Rich console output or a versioned JSON report that never includes secret values; a .repopilot.toml can enforce a minimum score in CI.',
    ],
    technologies: ['Python', 'Rich', 'TUI', 'pytest', 'Docker', 'GitHub Actions'],
    verifiedResults:
      'Released as v1.0.0. Unit tests cover the scanner, checks, scoring, configuration, reporter and CLI, and run in GitHub Actions on every change.',
    documentationUrl: `${repoUrl('RepoPilot')}#readme`,
    status: 'Complete · v1.0.0 released',
  },
  buildpulse: {
    repository: 'vishwa-10147/BUILDPULSE',
    featured: false,
    displayTitle: 'CODEFORGE (BuildPulse)',
    summary:
      'An engineering-intelligence platform that tracks the health of C++ projects across builds, combining a collector CLI, a FastAPI backend and a React dashboard.',
    problem:
      'Build times grow, warnings accumulate and test coverage declines gradually enough that no single build looks wrong. CODEFORGE records every build and converts it into a transparent health score, trends and insights so regressions surface early.',
    roleAndContribution:
      'Implemented the platform across the collector, backend, health-score engine and dashboard; the repository also includes contributions merged from a collaborator.',
    architecture: [
      'Collector: a `codeforge` CLI analyzes git history, build, tests, static analysis, complexity, benchmarks, dependencies and architecture, and uploads a build report.',
      'Backend: FastAPI with SQLAlchemy and Alembic on PostgreSQL or SQLite.',
      'Health score: six weighted categories (build 15%, code quality 20%, testing 20%, performance 15%, maintainability 15%, architecture 15%), graded from EXCELLENT to CRITICAL.',
      'Reproducibility: weights are configurable per project and stored with each score, so formula changes never reinterpret historical results.',
      'Dashboard: React, TypeScript and Vite views for health history, trends, insights and architecture analysis.',
    ],
    technologies: ['Python', 'FastAPI', 'SQLAlchemy', 'Alembic', 'PostgreSQL', 'React', 'TypeScript', 'Vite', 'Tailwind CSS', 'C++ / CMake', 'pytest', 'Ruff'],
    verifiedResults:
      'An end-to-end evaluation replays sample C++ release histories through the collector and API and reports the resulting health trend. Backend and collector are covered by pytest suites with Ruff linting.',
    documentationUrl: `${repoUrl('BUILDPULSE')}#readme`,
    status: 'Prototype',
  },
  sentinelaudit: {
    repository: 'vishwa-10147/SentinelAudit',
    featured: false,
    displayTitle: 'SentinelAudit',
    summary:
      'An AI-powered network security audit service for Indian SMEs: a lightweight agent scans the network, and a professional PDF audit report is generated and delivered automatically.',
    problem:
      'Indian businesses with 20–200 employees, such as clinics, manufacturers and accounting firms, rarely have a security team and cannot afford enterprise tools or consultant-led audits. SentinelAudit aims to deliver a consultant-grade report within minutes, on a monthly schedule, at a fraction of the cost.',
    roleAndContribution:
      'Defined the product and pricing model, and implemented the detection agent, FastAPI backend, report generation and React frontend.',
    architecture: [
      'Agent: captures traffic with Scapy, groups packets into flows and extracts features.',
      'Detection: Isolation Forest anomaly detection, behavioral fingerprinting and a per-device risk engine, with findings mapped to MITRE ATT&CK.',
      'Backend: FastAPI with SQLAlchemy, JWT authentication and Razorpay payments; Celery and Redis run background processing.',
      'Reporting: WeasyPrint renders Jinja2 templates into PDF reports that are emailed to the customer.',
      'Frontend: React, Vite and Tailwind CSS.',
    ],
    technologies: ['Python', 'FastAPI', 'Scapy', 'Scikit-learn', 'Celery', 'Redis', 'SQLite / PostgreSQL', 'WeasyPrint', 'Razorpay', 'React', 'Tailwind CSS'],
    verifiedResults:
      'Detection engine, API, payments and automated PDF report generation implemented, with tests for packet capture, detection and reporting.',
    documentationUrl: `${repoUrl('SentinelAudit')}#readme`,
    status: 'Active development · pre-launch',
    futureWork:
      'Pilot with a first SME customer, migrate to PostgreSQL and automate monthly scans and report delivery.',
  },
  stock: {
    repository: 'vishwa-10147/Stock',
    featured: false,
    displayTitle: 'StockPulse AI',
    summary:
      'A market-prediction platform for NIFTY 50 and SENSEX that combines deep-learning, gradient-boosting and news-sentiment models into BUY, SELL and HOLD signals, with backtesting and paper trading.',
    problem:
      'Retail investors typically see either raw charts or opaque tips. StockPulse investigates whether an ensemble over price, macroeconomic and sentiment data can produce signals with stated confidence, stop-loss, target and risk, and lets them be tested before any capital is committed.',
    roleAndContribution:
      'Implemented data ingestion, feature engineering, model training and the ensemble, the backtesting and paper-trading engine, the API and the dashboard.',
    architecture: [
      'Data: 15 years of daily OHLCV for ^NSEI and ^BSESN, FRED macroeconomic series and RSS news sentiment.',
      'Features: RSI, MACD, EMA/SMA, ATR and Bollinger Bands.',
      'Models: an ensemble of LSTM, a Transformer-style sequence model, XGBoost and a FinBERT sentiment adapter across 1-, 5- and 10-day horizons, trained GPU-aware with walk-forward validation.',
      'Backend: FastAPI with PostgreSQL, Redis and WebSockets serving predictions, backtests, paper trading and retraining.',
      'Frontend: React dashboard with TradingView Lightweight Charts.',
    ],
    technologies: ['Python', 'FastAPI', 'PyTorch', 'XGBoost', 'FinBERT', 'PostgreSQL', 'Redis', 'WebSockets', 'React', 'TradingView Charts', 'Docker', 'Render'],
    verifiedResults:
      'End-to-end pipeline from automated data download to ensemble inference, walk-forward validation, backtesting and paper trading, with deployment configured for Render.',
    documentationUrl: `${repoUrl('Stock')}#readme`,
    status: 'Prototype · research and learning use; not financial advice',
  },
  pcae: {
    repository: 'vishwa-10147/PCAE',
    featured: false,
    displayTitle: 'PCAE: Predictive Cyber Attack Engine',
    summary:
      'A machine-learning system that predicts the probability of a cyber attack on each network asset from telemetry, vulnerability and incident history, and highlights hotspots on a dashboard.',
    problem:
      'Security teams usually learn about an attack after it has started. PCAE asks a forward-looking question instead: which assets are most likely to be targeted in the next window, so patching and monitoring can be prioritized.',
    roleAndContribution:
      'Implemented the synthetic data generator, feature engineering, the XGBoost model with SHAP explanations, the FastAPI service and the Streamlit dashboard.',
    architecture: [
      'Data: a synthetic generator produces netflow, incident and asset-inventory datasets.',
      'Features: per asset per hour, combining static attributes (OS, open ports, CVE count, patch age, criticality), temporal signals (source IPs, failed logins, SSH and HTTP errors, connection entropy, port-scan indicators) and rolling trends.',
      'Model: an XGBoost classifier evaluated with AUC-ROC and AUC-PR for imbalanced data, with SHAP explanations for every prediction.',
      'Serving: a FastAPI service for per-asset and batch predictions, and a Streamlit dashboard for hotspots and suggested mitigations.',
    ],
    technologies: ['Python', 'XGBoost', 'SHAP', 'Pandas', 'FastAPI', 'Streamlit'],
    verifiedResults:
      'Complete pipeline from data generation to explainable per-asset attack probabilities, served through an API and dashboard.',
    documentationUrl: `${repoUrl('PCAE')}#readme`,
    status: 'Prototype · hackathon project on synthetic data',
    futureWork:
      'Train on public datasets such as CICIDS2017 and UNSW-NB15, add sequence models and SIEM integration, and containerize.',
  },
  nfc_digital: {
    repository: 'vishwa-10147/NFC_Digital',
    featured: false,
    displayTitle: 'TapPromo',
    summary:
      'A platform for digital promotion cards that customers open by tapping an NFC tag or scanning a QR code, with no app install, and analytics on views, button taps and coupon claims.',
    problem:
      'Printed flyers and business cards cannot be updated or measured. TapPromo gives every product or business an editable, shareable digital card and shows the owner how customers interact with it.',
    roleAndContribution:
      'Designed and implemented the full stack: Express API, database schema, card editor and creation wizard, public card pages and analytics.',
    architecture: [
      'Structure: an npm-workspaces monorepo with an Express and TypeScript API and a React, Vite and Tailwind web app served from one origin.',
      'Data: Prisma on PostgreSQL 16.',
      'Distribution: each card has a permanent public URL, encoded into a server-generated QR code and writable to a physical NFC tag.',
      'Authoring: a seven-step creation wizard with live preview, 12 templates, brands, coupons and action buttons.',
      'Insights and administration: per-card analytics over 7, 30 and 90 days, plan limits, an admin console and session authentication with hashed httpOnly cookies.',
    ],
    technologies: ['TypeScript', 'Node.js', 'Express', 'Prisma', 'PostgreSQL', 'React', 'Vite', 'Tailwind CSS', 'Docker'],
    verifiedResults:
      'Feature-complete product covering authentication, card creation, public pages, QR generation, analytics and administration.',
    documentationUrl: `${repoUrl('NFC_Digital')}#readme`,
    status: 'Complete · not yet deployed',
  },
  tastyfoods: {
    repository: 'vishwa-10147/TastyFoods',
    featured: false,
    displayTitle: 'TastyFoods',
    summary:
      'A multi-restaurant ordering platform, evolved from FoodOrder, that runs ordering, kitchen flow and payments for several restaurants from one deployment, with WhatsApp order updates and customer reviews.',
    problem:
      'Once FoodOrder worked for a single restaurant, the next requirement was to host several restaurants on one backend, each with its own menu, staff, custom domain and customer notifications.',
    roleAndContribution:
      'Extended the FoodOrder backend to support multiple restaurants and implemented the WhatsApp integration, discovery pages, administration tools and deployment configuration.',
    architecture: [
      'Backend: Node.js and Express on PostgreSQL, with Socket.IO for live updates across customer, management, kitchen and display screens.',
      'Multi-tenancy: each restaurant has its own menu (with CSV import), users, outlet status and optional custom domain.',
      'Payments and loyalty: Razorpay with webhook verification, loyalty points, coupons and post-payment star reviews that update ratings live.',
      'Notifications: order placed, ready and completed messages via the WhatsApp Cloud API.',
      'Operations: audit logs, rate limiting, kiosk printing for counters and deployment configured for Render.',
    ],
    technologies: ['Node.js', 'Express', 'PostgreSQL', 'Socket.IO', 'Razorpay', 'WhatsApp Cloud API', 'HTML/CSS/JS', 'Render'],
    verifiedResults:
      'Multi-restaurant platform with more than 50 API endpoints covering ordering, payments, menu and user management, administration and WhatsApp notifications.',
    documentationUrl: `${repoUrl('TastyFoods')}#readme`,
    status: 'Complete · production deployment configured on Render',
  },
  aadityam: {
    repository: 'vishwa-10147/aadityam',
    featured: false,
    displayTitle: 'Aadityam',
    summary:
      'A mobile-first ordering app for a counter-pickup food court: customers order and pay online, then follow a token number until their order is ready.',
    problem:
      'A food court without table service does not need table management. It needs fast ordering, trustworthy payments and a clear signal to customers when their food is ready.',
    roleAndContribution:
      'Implemented the Express API, Razorpay payment flow, the React customer app and the admin console.',
    architecture: [
      'Backend: Node.js and Express on SQLite, with JWT-protected admin routes and image uploads.',
      'Frontend: React and Tailwind CSS, with a customer app and an admin console.',
      'Payment integrity: the server recalculates every total from the database, creates a matching Razorpay order and verifies the payment signature with HMAC-SHA256 before marking an order paid.',
      'Order flow: Placed → Preparing → Ready → Picked up, controlled from the admin console.',
      'Administration: menu items with photos, dietary tags and availability, categories, tax rate and a switch to pause new orders.',
    ],
    technologies: ['Node.js', 'Express', 'SQLite', 'React', 'Tailwind CSS', 'Razorpay', 'JWT', 'Render'],
    verifiedResults:
      'Complete ordering and payment flow with server-side price validation and signature-verified payments, configured for deployment on Render.',
    documentationUrl: `${repoUrl('aadityam')}#readme`,
    status: 'Complete',
  },
  interio: {
    repository: 'vishwa-10147/interio',
    featured: false,
    displayTitle: 'Verrant: Cinematic Interior Studio',
    summary:
      'A cinematic marketing site for an interior design studio, in which a procedurally generated 3D villa transforms from blueprint wireframe to finished building as the visitor scrolls.',
    problem:
      'Interior studios sell an experience that a static gallery cannot convey. The goal was a front end with a cinematic feel that remains fast, responsive and accessible.',
    roleAndContribution:
      'Designed and implemented the front end, including the procedural 3D scene and the scroll choreography.',
    architecture: [
      'Framework: Next.js 15, React 18 and TypeScript.',
      '3D scene: a villa generated procedurally in Three.js through React Three Fiber and drei, with a scroll-driven wireframe-to-solid transition, orbiting camera, parallax, particles and soft shadows.',
      'Motion: Lenis smooth scrolling synchronized with GSAP ScrollTrigger, and Framer Motion reveals.',
      'Content: portfolio, services, process timeline, testimonials and consultation sections driven by data arrays, ready for a CMS.',
      'Accessibility: respects prefers-reduced-motion; deployed through a GitHub Pages workflow.',
    ],
    technologies: ['Next.js 15', 'React', 'TypeScript', 'Three.js', 'React Three Fiber', 'GSAP', 'Framer Motion', 'Lenis', 'Tailwind CSS'],
    verifiedResults:
      'Production build compiles cleanly to static pages, with the full scroll-driven 3D experience running without external model assets.',
    documentationUrl: `${repoUrl('interio')}#readme`,
    status: 'Complete · front end',
    futureWork:
      'Integrate a production villa model and photography, and persist consultation requests through an API.',
  },
  v47: {
    repository: 'vishwa-10147/V47',
    featured: false,
    displayTitle: 'V47 Studio',
    summary:
      'A motion-driven studio website with a custom Three.js hero scene and a canvas network visualization, built as static files with no build step.',
    problem:
      'A digital-products studio needed a premium website that loads anywhere, hosts on GitHub Pages at no cost, and still feels highly interactive.',
    roleAndContribution:
      'Designed and implemented the site, its 3D hero scene, the ecosystem visualization and all interactions.',
    architecture: [
      'Stack: static HTML, CSS and JavaScript with relative asset paths.',
      'Hero: an ES-module Three.js scene loaded from a CDN, degrading gracefully if it fails to load.',
      'Visualization: a Canvas 2D network graph of the studio ecosystem.',
      'Interactions: custom cursor, scroll reveals, process stepper and tilt effects, disabled on touch devices and under prefers-reduced-motion.',
      'Lead capture: the contact form submits to a Google Sheets endpoint.',
    ],
    technologies: ['JavaScript', 'Three.js', 'Canvas 2D', 'HTML', 'CSS', 'Google Sheets', 'GitHub Pages'],
    verifiedResults:
      'Static site with no build step or server, including a dedicated case-study page for the Verrant (Interio) project.',
    documentationUrl: `${repoUrl('V47')}#readme`,
    status: 'Complete',
  },
  neondrift: {
    repository: 'vishwa-10147/NeonDrift',
    featured: false,
    displayTitle: 'NeonDrift',
    summary:
      'A third-person 3D collectible platformer built in Unity 6.',
    problem:
      'A hands-on project to build practical experience with Unity\'s workflow: scenes, prefabs, physics triggers, the Input System, visual effects and audio.',
    roleAndContribution:
      'Built and configured the game in Unity 6, starting from Unity\'s Get Started 3D template.',
    architecture: [
      'Player: a third-person controller on Unity\'s Input System.',
      'Gameplay: collectibles rotate and bob, trigger particle effects on pickup and update an on-screen counter; a respawn system resets the player after a fall.',
      'Audio: motion-driven sound that follows the player\'s movement.',
      'Organization: scenes, prefabs, materials, skyboxes, VFX and UI kept in separate asset folders.',
    ],
    technologies: ['Unity 6', 'C#', 'Input System', 'TextMesh Pro', 'VFX'],
    verifiedResults:
      'Playable level with collectibles, effects, respawning and motion-driven audio.',
    documentationUrl: `${repoUrl('NeonDrift')}#readme`,
    status: 'Complete · learning project',
  },
  sentinelhealth: {
    repository: 'vishwa-10147/SentinelHealth',
    featured: false,
    displayTitle: 'Sentinel Health',
    summary:
      'A lightweight full-stack dashboard for logging weight and calories and tracking progress toward a target weight.',
    problem:
      'General fitness apps bury the few numbers that matter for a weight goal under unrelated features. Sentinel Health is a focused, self-hosted tracker built around calorie balance and progress to target.',
    roleAndContribution:
      'Implemented the Node.js server, the JSON data store and the dashboard.',
    architecture: [
      'Server: a single Node.js process serving a static HTML/CSS/JS dashboard.',
      'Storage: entries persisted to a JSON file.',
      'Metrics: daily weight and calorie logs drive calorie balance, weekly deficit and progress toward target.',
      'Visualization: weight, calorie and weekly-balance charts with editable goal settings.',
    ],
    technologies: ['Node.js', 'JavaScript', 'HTML', 'CSS', 'JSON storage'],
    verifiedResults:
      'Working tracker with persistent data, goal settings and trend charts.',
    documentationUrl: `${repoUrl('SentinelHealth')}#readme`,
    status: 'Complete',
  },
  'foodorder-app': {
    repository: 'vishwa-10147/FoodOrder-app',
    featured: false,
    displayTitle: 'FoodOrder POS (Desktop)',
    summary:
      'A planned Electron desktop point-of-sale client for the FoodOrder restaurant platform.',
    problem:
      'Counter staff benefit from a dedicated desktop application, with receipt printing, a resilient interface and automatic updates, rather than a browser tab.',
    roleAndContribution:
      'Defined the application structure and dependency stack.',
    architecture: [
      'Shell: Electron main process, preload script, IPC layer and auto-updater.',
      'Interface: React 19, TypeScript and Vite with MUI, TanStack Query and Zustand.',
      'Integration: a Socket.IO client and API modules for orders, menu, inventory, customers, staff, coupons and reports.',
    ],
    technologies: ['Electron', 'React', 'TypeScript', 'Vite', 'MUI', 'Socket.IO'],
    documentationUrl: `${repoUrl('FoodOrder-app')}#readme`,
    status: 'Planned · project scaffold in place; implementation not started',
    futureWork:
      'Implement order entry and kitchen sync against the FoodOrder API, then add receipt printing.',
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

/**
 * Projects on the resume (lowercase names). They are featured on the home page
 * and pinned to the top of the projects list; each group is ordered by the
 * date the repo was last modified.
 */
export const FEATURED_REPOS = [
  'sentineledgeai',
  'examsentiinel',
  'sentinelids',
  'foodorder',
  'progresspulse',
  'iot-ids-ml-dashboard',
  'neurovision',
  'cpl',
  'pld',
  'camsf',
  'sci',
  'epaper',
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
