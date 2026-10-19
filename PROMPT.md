# Master Build Prompt --- GitHub-Powered Professional Portfolio

## Role

Act as a senior full-stack engineer, product designer,
security-conscious architect, and technical writer. Build a
production-quality, accessible, responsive personal developer portfolio
that uses GitHub as its primary source of repository data.

Do not merely produce a static mockup. Implement the application in
small, testable phases, verify each phase, and keep documentation
aligned with the actual code.

## Product goal

Create a professional portfolio website that: - Presents the owner as a
software engineer focused on AI/ML, GenAI, cybersecurity, full-stack
engineering, and research. - Automatically discovers and displays public
GitHub repositories. - Shows repository metadata such as name,
description, topics, primary language, stars, forks, last-updated date,
and repository URL when available. - Supports search, sorting, and
filtering by topic, language, and featured status. - Provides curated
project case studies for selected high-value projects. - Includes
profile, skills, experience/education, research/publications, resume,
and contact sections where content is available. - Is suitable for
internship, placement, research, and engineering job applications. - Is
easy to maintain when new GitHub repositories are created.

## Default technical direction

Use these defaults unless the existing repository or the user specifies
otherwise: - Next.js with the App Router - TypeScript with strict type
checking - React - Tailwind CSS - shadcn/ui where useful - GitHub REST
API for public profile and repository metadata - Vercel-compatible
deployment - No database in the initial version - A small server-side
data-access layer with caching/revalidation - Automated linting, type
checking, and tests

Before installing dependencies, inspect the existing project and its
package manager. Do not replace working configuration without a clear
reason. Use current stable, mutually compatible package versions and
document any important version decisions.

## Core requirements

### 1. GitHub data integration

-   Read the GitHub username from an environment variable such as
    `GITHUB_USERNAME`.
-   Fetch public profile and repository data through a dedicated
    server-side module.
-   Normalize GitHub API responses into application-owned TypeScript
    types.
-   Handle pagination; do not silently stop after the first page if the
    design promises all public repositories.
-   Support loading, empty, rate-limited, unavailable, and
    unexpected-error states.
-   Cache or revalidate responses to reduce API calls.
-   Never expose a GitHub token or other secret in browser-delivered
    code.
-   Public data should work without a token where possible. If an
    optional token is used to increase API limits, read it only on the
    server from an environment variable.
-   Do not access private repositories unless the owner explicitly
    configures authorized access. Do not expose private repository data
    publicly by default.
-   Treat repository README content as untrusted data. Render Markdown
    safely and do not execute embedded HTML or scripts.
-   Do not claim that GitHub metadata proves skill proficiency.

### 2. Repository experience

-   Display a responsive repository grid with clear hierarchy and
    readable metadata.
-   Add search by repository name and description.
-   Add filters for language, topics, and featured projects.
-   Add sorting options such as recently updated, stars, and name.
-   Link to the canonical GitHub repository.
-   Show a clear fallback when descriptions, topics, language, or other
    metadata are missing.
-   Exclude forks, archived repositories, or empty repositories from
    featured sections by default, but allow them in the full repository
    browser where appropriate.
-   Make inclusion/exclusion rules configurable and documented.

### 3. Curated case studies

Create a separate curated data source for featured project narratives. A
case study may include: - Project title and short summary - Problem and
intended users - My role and contribution - Architecture and key design
decisions - Technologies used - Challenges and trade-offs - Verified
results and evaluation method - Screenshots, diagrams, demo URL,
repository URL, and documentation URL - Current status and future
improvements

Do not invent results, performance metrics, publications, employment
history, credentials, or project outcomes. Mark missing information as a
TODO for the owner.

### 4. Portfolio sections

Implement suitable sections for: - Hero/introduction and clear call to
action - About - Featured projects - Searchable GitHub repository
explorer - Skills and technology evidence - Education and experience,
only with supplied facts - Research/publications, only when supplied -
Resume download, only when a real resume file is provided - Contact and
social links, using supplied URLs - Footer with GitHub and relevant
professional links

### 5. Design and accessibility

-   Use a polished, modern, recruiter-friendly visual system.
-   Default to a dark developer aesthetic with a light/dark theme option
    if it can be implemented cleanly.
-   Use responsive layouts for mobile, tablet, and desktop.
-   Provide visible keyboard focus, semantic landmarks, accessible
    labels, sufficient contrast, and reduced-motion support.
-   Avoid excessive animations, fake terminal gimmicks, fabricated
    counters, decorative skill percentages, and unnecessary visual
    clutter.
-   Use real screenshots and diagrams when available; never fabricate
    project screenshots that imply a real application exists.
-   Optimize images, font loading, layout stability, and page
    performance.
-   Provide meaningful page titles, descriptions, Open Graph metadata,
    favicon, and canonical URLs once the domain is known.

### 6. Security and privacy

-   Keep secrets out of source control and client bundles.
-   Provide `.env.example` with placeholder values only.
-   Ensure `.env*` secret files are ignored, while `.env.example`
    remains tracked.
-   Validate external URLs and use safe link attributes when opening new
    tabs.
-   Sanitize/render README Markdown safely.
-   Do not scrape private data or infer sensitive personal details.
-   Do not publish email addresses or personal information unless the
    owner chooses to provide them.
-   Add basic defensive error handling and avoid logging secrets.

### 7. Quality gates

Before declaring a phase complete: - Run the configured linter. - Run
TypeScript/type checks. - Run relevant unit/component tests. - Run a
production build. - Fix failures introduced by the implementation. -
Check mobile and desktop layouts. - Verify keyboard navigation and
empty/error/loading states. - Update README and architecture/plan
documents if implementation decisions changed.

## Claude skills and existing local skills

The owner already has Claude-related skills installed locally and has
also configured OpenCode skills in a local development environment.
Reuse applicable installed skills rather than duplicating their files or
copying entire skill libraries into this project.

At the beginning: 1. Inspect the repository's existing `claude-skills/`,
`.claude/`, `.opencode/skills/`, and project configuration if present.
2. Identify which installed skills are relevant to planning, frontend
design, Next.js/React, TypeScript, testing, accessibility, security,
Git/GitHub, and documentation. 3. Use only skills that actually exist
and whose instructions apply; do not invent skill names or claim a skill
was used if it was not. 4. Follow each applicable skill's instructions.
5. Keep bulk third-party skill-library directories out of GitHub. Do not
commit the entire `claude-skills/` or `.opencode/skills/` directory
unless the owner explicitly asks to vendor them. 6. Track
project-specific agent/command configuration only when useful and safe.
Document how to install or regenerate local skills without committing
secrets or bulky external libraries. 7. Create or maintain this
project-level `SKILL.md` as an index of workflow expectations and
skill-selection rules, not as a copied replacement for the installed
skill library.

If a skill directory is absent in the current environment, say so
accurately and proceed with the built-in engineering workflow. Do not
claim to have inspected a machine or path that is inaccessible.

## Expected deliverables

-   Working Next.js application
-   `PROMPT.md`
-   `ARCHITECTURE.md`
-   `PLAN.md`
-   `SKILL.md`
-   `README.md`
-   `.env.example`
-   Correct `.gitignore`
-   Tests for critical data normalization/filtering behavior
-   Deployment instructions
-   Clear owner TODOs for missing personal content

## Implementation workflow

1.  Inspect the repository and report its current state before changing
    files.
2.  Propose a concise implementation sequence and identify unknown
    personal details.
3.  Establish project structure, dependencies, linting, type checking,
    and tests.
4.  Implement the GitHub data layer and unit tests.
5.  Implement reusable layout and portfolio sections.
6.  Implement repository explorer, filters, and featured case studies.
7.  Add metadata, accessibility improvements, responsive behavior, and
    error states.
8.  Add documentation, environment setup, and deployment guidance.
9.  Run quality gates and report exact commands and outcomes.
10. Summarize what is implemented, what remains, and what the owner must
    supply.

## Working rules

-   Prefer simple, maintainable solutions over unnecessary
    infrastructure.
-   Do not add PostgreSQL, authentication, an admin panel, analytics, or
    AI chat in the first release unless explicitly approved.
-   Do not invent personal details or project metrics.
-   Do not overwrite existing work blindly; inspect first and preserve
    useful code.
-   Do not expose secrets in examples, logs, screenshots, or commits.
-   Make decisions explicit and record material deviations from this
    prompt.
