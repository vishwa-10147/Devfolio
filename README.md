# GitHub-Powered Developer Portfolio

A professional, responsive developer portfolio that uses GitHub as its
primary source for public repository data and adds curated case studies
for selected projects.

> **Status:** Planning / initial implementation. Update this status once
> the application is implemented and verified.

## Goals

-   Automatically display public GitHub repositories and available
    metadata.
-   Search, filter, and sort projects by language, topic, name, and
    activity.
-   Highlight selected projects with detailed, owner-verified case
    studies.
-   Present skills, education, research, resume, and contact information
    when verified content is supplied.
-   Provide a fast, accessible, responsive experience suitable for
    recruiters and engineering teams.

## Planned stack

-   Next.js App Router
-   React and TypeScript
-   Tailwind CSS
-   shadcn/ui where appropriate
-   GitHub REST API
-   Vercel-compatible deployment
-   No database in the initial release

Confirm actual dependencies and versions against the implementation
before treating this list as final.

## Features

### GitHub integration

-   Public profile and repository metadata
-   Repository language, topics, stars, forks, and update timestamps
    where available
-   Pagination and caching/revalidation
-   Graceful handling of API rate limits and missing fields

### Portfolio

-   Hero and about section
-   Featured projects and case studies
-   Searchable repository explorer
-   Skills grouped by technology area
-   Education, research, resume, and contact sections when content is
    provided
-   Responsive layout, accessible navigation, and SEO metadata

## Getting started

These instructions describe the intended setup. Adjust commands if the
repository already exists or uses a different package manager.

### Prerequisites

-   A supported Node.js LTS release
-   npm, pnpm, or the package manager selected for this repository
-   Git
-   A GitHub account with public repositories

### Install dependencies

``` bash
npm install
```

### Configure environment variables

Create `.env.local` in the project root:

``` env
GITHUB_USERNAME=your-github-username

# Optional: only if needed for higher API limits.
# Keep this server-side and never expose it with a NEXT_PUBLIC_ prefix.
GITHUB_TOKEN=
```

Do not commit `.env.local` or any real token. `.env.example` should
contain placeholder values only.

### Start the development server

``` bash
npm run dev
```

Open the local URL printed by Next.js, usually `http://localhost:3000`.

### Quality checks

Use the scripts actually defined in `package.json`. The intended checks
are similar to:

``` bash
npm run lint
npx tsc --noEmit
npm test
npm run build
```

If a script such as `test` is not configured yet, add the relevant test
setup or document that the command is not available; do not report a
test as passing when it was not run.

## GitHub API notes

-   Public profile and repository information can generally be fetched
    without authentication, subject to GitHub's unauthenticated rate
    limits.
-   An optional token can improve API limits. Store it in server-only
    environment configuration.
-   Fetch all pages if the UI promises to list all public repositories.
-   Some metadata fields may be empty or unavailable.
-   A repository's primary language is not a complete inventory of every
    technology used in that project.
-   GitHub metadata is evidence of repository contents, not proof of the
    owner's skill proficiency.
-   Do not publish private repository data by default.
-   Cache or revalidate data to avoid unnecessary requests.

## Curated project case studies

GitHub repository data should be supplemented with owner-written content
for selected projects: - Problem and intended users - Personal
contribution - Architecture and design decisions - Technologies used -
Challenges and trade-offs - Verified evaluation results - Screenshots,
diagrams, demo, and documentation links - Current status and future
improvements

Do not invent metrics, credentials, employment, publications, or project
outcomes. Add only facts that can be confirmed.

## Claude skills and OpenCode

This project is intended to reuse the owner's already-installed
Claude-related and OpenCode skills where available. The coding assistant
should inspect the actual local skill directories, read applicable
instructions, and use only skills it can verify are installed.

Bulk skill libraries such as `claude-skills/` and `.opencode/skills/`
should remain local and should not be committed by default. Keep this
repository's `SKILL.md` as a project workflow guide rather than a copy
of those libraries. Check the existing `.gitignore` before adding ignore
rules.

## Deployment

A typical deployment flow is:

1.  Push the source repository to GitHub.
2.  Import the repository into Vercel or another compatible Next.js
    host.
3.  Set `GITHUB_USERNAME` in the hosting environment.
4.  Add `GITHUB_TOKEN` only if necessary; keep it server-side.
5.  Deploy and verify all pages, GitHub data refresh, metadata, and
    mobile behavior.
6.  Configure a custom domain if desired.

Never commit real environment variables or secrets.

## Project documentation

-   [`PROMPT.md`](./PROMPT.md) --- master implementation prompt and
    acceptance requirements
-   [`ARCHITECTURE.md`](./ARCHITECTURE.md) --- architecture, data flow,
    security, and folder structure
-   [`PLAN.md`](./PLAN.md) --- phased implementation plan and acceptance
    criteria
-   [`SKILL.md`](./SKILL.md) --- instructions for discovering and
    reusing installed coding skills

## Roadmap

-   [ ] Inspect the existing repository and installed skills
-   [ ] Set up Next.js, TypeScript, styling, and quality checks
-   [ ] Implement GitHub profile/repository integration
-   [ ] Build the homepage and responsive design system
-   [ ] Build repository search, filters, and sorting
-   [ ] Add featured project case studies
-   [ ] Add skills and verified career content
-   [ ] Add SEO, accessibility, and security checks
-   [ ] Run tests and production build
-   [ ] Deploy and verify the live website

## License

Choose a license before publishing this project. Do not claim a license
until a license file has been added.
