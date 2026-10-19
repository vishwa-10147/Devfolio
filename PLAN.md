# Implementation Plan --- GitHub-Powered Professional Portfolio

## Goal

Deliver a polished, deployable portfolio that imports public GitHub
repository data, highlights selected projects with truthful case
studies, and works well on mobile and desktop.

## Guiding rules

-   Inspect the existing repository before making changes.
-   Reuse installed, applicable Claude skills; do not copy the full
    skill library into the project.
-   Keep bulk `claude-skills/` and `.opencode/skills/` directories out
    of GitHub unless explicitly requested.
-   Do not invent personal details, project metrics, credentials, or
    work history.
-   Do not add a database or admin system in the first release without a
    clear requirement.
-   Each phase must pass its quality gates before moving on.

## Phase 0 --- Repository inspection and decisions

Tasks: - Inspect current directory, Git status, package manager,
existing app, dependencies, and scripts. - Inspect relevant local
Claude/OpenCode skill locations if accessible. - Select applicable
installed skills for planning, frontend, TypeScript, accessibility,
security, testing, and documentation. - Confirm GitHub username,
portfolio domain (if known), preferred theme, contact links, and resume
availability. - Record unresolved facts as TODOs; do not block
implementation on optional details.

Acceptance criteria: - Existing work and package manager are
understood. - No existing files are overwritten blindly. - A concise
implementation plan and key decisions are recorded.

## Phase 1 --- Project foundation

Tasks: - Initialize or adapt Next.js App Router with TypeScript. -
Configure Tailwind CSS and a small, consistent design system. -
Configure linting, type checking, formatting if selected, and tests. -
Create a safe `.gitignore` and `.env.example`. - Create reusable layout,
navigation, footer, and responsive containers.

Acceptance criteria: - Development server starts. - Production build
succeeds. - Lint and type-check scripts work. - Secret-bearing
environment files are ignored.

## Phase 2 --- GitHub data layer

Tasks: - Define normalized profile and repository types. - Implement
server-side GitHub client and pagination. - Read `GITHUB_USERNAME` from
environment configuration. - Normalize nullable or missing API fields. -
Add cache/revalidation and useful error categories. - Add tests for
normalization, pagination behavior where practical, and missing
fields. - Ensure tokens, if used, never enter client bundles.

Acceptance criteria: - Public repositories can be fetched for a
configured username. - Pagination behavior is correct. - Missing fields
do not crash rendering. - Rate-limit and network errors produce safe
fallback behavior. - Tests cover key data transformations.

## Phase 3 --- Visual foundation and profile content

Tasks: - Implement hero, about, navigation, footer, and social links. -
Create curated profile/skills content files. - Add responsive
typography, spacing, colors, focus styles, and theme behavior. - Use
only verified personal information.

Acceptance criteria: - Layout is consistent at mobile, tablet, and
desktop sizes. - No invented biography, achievements, or skill ratings
appear. - Keyboard navigation is usable.

## Phase 4 --- Repository explorer

Tasks: - Create repository cards and repository listing page. - Add
search, language/topic filters, and sorting. - Add featured, fork,
archived, and empty-repository display rules. - Link to GitHub and
optional demo URLs. - Implement loading, empty, and error states.

Acceptance criteria: - Search and filters work together. - Sorting is
deterministic. - Repositories with incomplete metadata still render. -
Links are correct and accessible.

## Phase 5 --- Featured project case studies

Tasks: - Create curated featured-project data. - Match curated entries
to repositories using stable slugs/IDs. - Implement project detail
pages. - Add problem, role, architecture, technology, evidence-backed
results, screenshots, demo, and future-work sections when information
exists. - Add architecture diagrams or screenshots only when they
reflect the real project.

Acceptance criteria: - Featured pages contain substantive, truthful
information. - Missing content is omitted or shown as an owner TODO in
development, not as fabricated production copy. - Each case study links
to the source repository.

## Phase 6 --- Skills, research and career information

Tasks: - Group skills into languages, AI/ML and GenAI, cybersecurity,
web/backend, databases, DevOps, and tools as appropriate. - Distinguish
technologies detected in repositories from owner-claimed proficiency. -
Add education, research, experience, resume, and contact sections only
using supplied details. - Add research/publication links only when
verified.

Acceptance criteria: - Skill categories are clear and defensible. - No
unsupported proficiency percentages or fake endorsements. - Resume
download works only if a real file is supplied.

## Phase 7 --- SEO, accessibility, security and performance

Tasks: - Add metadata, social previews, favicon, and canonical URL when
domain is known. - Audit semantic HTML, headings, focus, contrast,
reduced motion, and accessible labels. - Confirm README Markdown is
rendered safely. - Confirm secrets and private repository information
cannot leak. - Optimize images, caching, and client-side JavaScript. -
Review external links and failure states.

Acceptance criteria: - Core pages have meaningful metadata. - No secrets
are exposed to the browser. - Key flows work by keyboard. - Mobile
layout has no major overflow or unreadable sections. - Performance
issues found during basic testing are addressed.

## Phase 8 --- Testing and production readiness

Tasks: - Run lint. - Run TypeScript checks. - Run unit/component
tests. - Run a production build. - Manually verify the homepage, project
explorer, project details, error state, and mobile navigation. - Verify
GitHub API behavior and caching. - Review README setup/deployment
instructions. - Confirm environment variables in hosting configuration.

Acceptance criteria: - All required quality commands pass, or known
failures are documented accurately. - No placeholder personal claims
remain on public pages. - Deployment instructions are reproducible.

## Phase 9 --- Deployment

Tasks: - Push the project to GitHub. - Connect it to Vercel or another
compatible host. - Configure required environment variables. - Deploy
and verify HTTPS, metadata, routes, and data refresh. - Add a custom
domain only when one has been selected.

Acceptance criteria: - Live site loads successfully. - Repository data
is populated and refreshes as expected. - Errors are handled without
exposing internal details or credentials.

## Definition of done

-   The site is responsive, accessible, and deployable.
-   Public GitHub data is imported through a maintainable server-side
    data layer.
-   Search, filters, and sorting work.
-   Featured projects have owner-verified case studies.
-   Secrets and private data are protected.
-   Documentation matches the actual implementation.
-   Lint, type checks, tests, and production build have been run and
    their outcomes reported.

## Suggested milestone checklist

-   [ ] M0: Inspect repository and installed skills
-   [ ] M1: Foundation and configuration
-   [ ] M2: GitHub API integration
-   [ ] M3: Main profile and design system
-   [ ] M4: Repository explorer
-   [ ] M5: Featured project case studies
-   [ ] M6: Skills and career sections
-   [ ] M7: SEO, accessibility and security
-   [ ] M8: Testing and production build
-   [ ] M9: Deployment and final review
