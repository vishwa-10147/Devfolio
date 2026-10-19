<div align="center">

# Devfolio

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge)](https://github.com/vishwa-kokkireni/devfolio/actions)
[![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=for-the-badge)](https://github.com/vishwa-kokkireni/devfolio/pulls)

**A professional, GitHub-powered developer portfolio that automatically syncs with your public repositories and showcases curated case studies.**

[🌐 Live Demo](https://devfolio.example.com) • [📖 Documentation](./docs) • [🐛 Report Bug](https://github.com/vishwa-kokkireni/devfolio/issues) • [✨ Request Feature](https://github.com/vishwa-kokkireni/devfolio/issues)

</div>

---

## Overview

Devfolio is a modern, accessible developer portfolio built with **Next.js 14 App Router**, **React 18**, **TypeScript**, and **Tailwind CSS**. It automatically fetches your public GitHub repositories via the REST API, provides powerful search/filter/sort capabilities, and lets you highlight selected projects with detailed, owner-verified case studies.

### ✨ Key Features

| Feature | Description |
|---------|-------------|
| 🔄 **Auto-Sync** | Fetches public GitHub repos on every build/deploy |
| 🔍 **Smart Search** | Filter by language, topic, stars, forks, name |
| ⭐ **Featured Projects** | Curated case studies with architecture, results, screenshots |
| 🎨 **Dark-First Design** | Violet/cyan accents, responsive, WCAG 2.2 AA |
| ⚡ **Performance** | Server Components, caching, optimized images |
| ♿ **Accessible** | Semantic HTML, keyboard nav, focus states, reduced motion |
| 🔒 **Secure** | Server-side API calls, no tokens in client bundle |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 14 (App Router, Server Components) |
| **Language** | TypeScript 5 (strict mode) |
| **UI** | React 18, Tailwind CSS 3, shadcn/ui primitives |
| **Data** | GitHub REST API (server-side, cached) |
| **Testing** | Vitest, React Testing Library |
| **Quality** | ESLint, Prettier, TypeScript strict |
| **Deploy** | Vercel (recommended) |

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ (LTS recommended)
- **npm** 9+ (or pnpm/yarn)
- **GitHub account** with public repositories

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/vishwa-kokkireni/devfolio.git
cd devfolio

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env.local
# Edit .env.local with your GitHub username

# 4. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### One-Click Start (Windows)

Double-click any of these files:
- `start-dev.bat` — Simple batch script
- `start-dev.ps1` — PowerShell with colored output & flags
- `Start-Devfolio.vbs` — Silent launcher

---

## ⚙️ Configuration

### Required Environment Variables

```env
# .env.local
GITHUB_USERNAME=your-github-username

# Optional: Higher API rate limits (server-side only)
GITHUB_TOKEN=ghp_xxxxxxxxxxxx
```

### Optional Variables

```env
# Production domain for SEO/social metadata
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_NAME=Your Name
```

> **Security**: Never commit `.env.local` or real tokens. Only `.env.example` is tracked.

---

## 📁 Project Structure

```text
devfolio/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage (Hero, Featured, Skills, CTA)
│   ├── projects/          # Repository explorer + detail pages
│   ├── skills/            # Technical skills by category
│   ├── about/             # Experience, education, publications
│   ├── api/health/        # Health check endpoint
│   ├── layout.tsx         # Root layout, fonts, metadata
│   └── globals.css        # Design system, Tailwind
├── components/
│   ├── ui/                # Reusable primitives (Button, Card, Badge)
│   ├── layout/            # Header, Footer
│   └── projects/          # RepositoryCard, ProjectCard, Filters
├── lib/
│   ├── github/            # GitHub API client, normalization, errors
│   └── utils.ts           # Helpers (cn, dates, formatting)
├── types/                 # TypeScript interfaces
├── public/                # Static assets (favicon, manifest, og-image)
├── .github/workflows/     # CI/CD (optional)
├── start-dev.bat          # Windows quick-start
├── start-dev.ps1          # PowerShell quick-start
├── Start-Devfolio.vbs     # Silent launcher
└── QUICKSTART.md          # Quick start guide
```

---

## 🧪 Quality Assurance

```bash
# Run all checks
npm run lint          # ESLint
npm run type-check    # TypeScript strict
npm test              # Vitest unit tests
npm run build         # Production build
```

| Check | Status |
|-------|--------|
| TypeScript | ✅ Strict mode, no `any` |
| ESLint | ✅ Next.js core-web-vitals |
| Tests | ✅ Vitest + RTL |
| Build | ✅ Production ready |
| A11y | ✅ WCAG 2.2 AA |

---

## 📦 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import in [Vercel](https://vercel.com/new)
3. Add Environment Variables:
   - `GITHUB_USERNAME` (required)
   - `GITHUB_TOKEN` (optional, for higher rate limits)
   - `NEXT_PUBLIC_SITE_URL` (your production domain)
4. Deploy

### Other Platforms

```bash
# Build standalone output
npm run build
# Output in .next/standalone/ for Docker/serverless
```

---

## 📖 Documentation

| Document | Description |
|----------|-------------|
| [`PROMPT.md`](./PROMPT.md) | Master implementation requirements |
| [`ARCHITECTURE.md`](./ARCHITECTURE.md) | Architecture, data flow, security |
| [`PLAN.md`](./PLAN.md) | Phased implementation plan |
| [`SKILL.md`](./SKILL.md) | Installed skill discovery guide |
| [`QUICKSTART.md`](./QUICKSTART.md) | Quick start for contributors |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

Please read our [Contributing Guidelines](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md).

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) — The React Framework for Production
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) — Beautifully designed components
- [Lucide Icons](https://lucide.dev/) — Clean, consistent icons
- [GitHub REST API](https://docs.github.com/en/rest) — Repository data source

---

<div align="center">

**Built with ❤️ by [Vishwa Kokkireni](https://www.linkedin.com/in/vishwa-kokkireni-7081152ba/)**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/vishwa-kokkireni)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/vishwa-kokkireni-7081152ba/)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:vishwakokkireni@gmail.com)

</div>