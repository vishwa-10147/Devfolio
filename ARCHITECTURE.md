# Architecture --- GitHub-Powered Professional Portfolio

## 1. Purpose

This document describes the intended architecture for a professional
portfolio whose public repository information is sourced from GitHub and
whose strongest projects are enriched with owner-written case studies.

The first release should be a small, maintainable web application. A
database and custom backend service are not required initially.

## 2. Architectural principles

-   **GitHub is the source of truth** for public repository metadata.
-   **Curated content is separate** from imported metadata. GitHub
    cannot authoritatively describe the owner's role, decisions, or
    verified results.
-   **Server-side data access** protects optional credentials and
    provides a central place for caching, normalization, and error
    handling.
-   **Progressive enhancement**: the site remains understandable when
    GitHub is rate-limited or unavailable.
-   **No fabricated facts**: skills, achievements, metrics,
    publications, and employment claims require evidence or owner
    confirmation.
-   **Minimal infrastructure**: no database or separate API server for
    the initial release.
-   **Accessible and responsive by design**.

## 3. High-level architecture

``` mermaid
flowchart TD
    V[Visitor / Recruiter] --> UI[Next.js App Router UI]
    UI --> P[Portfolio Content]
    UI --> S[Server-side GitHub Data Service]
    S --> C[Cache / Revalidation]
    S --> API[GitHub REST API]
    API --> S
    P --> F[Curated Featured Project Data]
    S --> N[Normalized Repository Models]
    F --> UI
    N --> UI
```

## 4. Suggested stack

  -----------------------------------------------------------------------
  Layer                   Technology              Responsibility
  ----------------------- ----------------------- -----------------------
  Web framework           Next.js App Router      Routing, server
                                                  rendering, metadata and
                                                  deployment

  Language                TypeScript, strict mode Types and
                                                  maintainability

  UI                      React                   Reusable components

  Styling                 Tailwind CSS            Responsive styling and
                                                  design tokens

  Components              shadcn/ui, selectively  Accessible primitives
                                                  and common UI patterns

  Data source             GitHub REST API         Public profile and
                                                  repository metadata

  Data access             Server-only TypeScript  Requests, pagination,
                          module                  normalization, error
                                                  handling

  Curated content         TypeScript/JSON/MDX     Featured project
                          files                   narratives and
                                                  owner-controlled
                                                  profile content

  Testing                 Project-appropriate     Validate
                          unit/component test     transformations and UI
                          tools                   behavior

  CI                      GitHub Actions, if      Lint, type check, test
                          configured              and build

  Hosting                 Vercel-compatible       Deployment and HTTPS
                          platform                
  -----------------------------------------------------------------------

Package choices should be confirmed against the actual project and
current compatible releases before installation.

## 5. Data flow

1.  The application reads `GITHUB_USERNAME` from server configuration.
2.  A server-only GitHub module requests the public profile and
    repository pages.
3.  The module follows pagination and applies safe timeouts/error
    handling supported by the chosen HTTP client.
4.  API responses are normalized into application-owned types.
5.  The normalized data is cached or revalidated to avoid unnecessary
    API calls.
6.  UI components receive the normalized data and render loading, empty,
    success, or error states.
7.  Featured case studies are joined to repositories by a stable
    repository identifier or `owner/repo` slug.
8.  The repository browser supports client-side search/filter/sort over
    the fetched dataset, unless data size later justifies server-side
    querying.

## 6. Data model

### GitHub profile (normalized)

-   `login`
-   `name` (optional)
-   `bio` (optional)
-   `avatarUrl`
-   `htmlUrl`
-   `publicRepos` (API-reported count; the fetched list may differ if
    filters apply)
-   `followers` (optional)
-   `following` (optional)

### Repository (normalized)

-   `id`
-   `name`
-   `fullName`
-   `description` (nullable)
-   `htmlUrl`
-   `homepage` (nullable)
-   `language` (nullable)
-   `topics` (array)
-   `stargazersCount`
-   `forksCount`
-   `openIssuesCount` (optional; clarify that GitHub's field may include
    pull-request-related counts)
-   `isFork`
-   `isArchived`
-   `isPrivate` (private data must never be published by default)
-   `createdAt`
-   `updatedAt`
-   `pushedAt` (optional)
-   `defaultBranch` (optional)

### Curated featured project

-   `repository`: canonical `owner/repo` slug
-   `featured`: boolean
-   `displayTitle` (optional)
-   `summary`
-   `problem`
-   `roleAndContribution`
-   `architecture` (optional)
-   `technologies` (curated list)
-   `verifiedResults` (optional; evidence-backed only)
-   `screenshots` (optional)
-   `demoUrl` (optional)
-   `documentationUrl` (optional)
-   `status` (optional)
-   `futureWork` (optional)

Do not duplicate all GitHub fields in curated content unless there is a
clear reason. Resolve imported metadata at render time and let curated
fields override only explicit presentation fields.

## 7. Suggested folder structure

``` text
portfolio/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── projects/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── skills/
│   │   └── page.tsx
│   ├── about/
│   │   └── page.tsx
│   ├── api/
│   │   └── github/
│   │       └── route.ts       # Optional; add only if a browser-facing endpoint is needed
│   ├── globals.css
│   └── not-found.tsx
├── components/
│   ├── layout/
│   ├── hero/
│   ├── projects/
│   ├── skills/
│   ├── profile/
│   └── ui/
├── content/
│   ├── profile.ts
│   ├── featured-projects.ts
│   ├── skills.ts
│   └── experience.ts          # Only when owner-supplied facts exist
├── lib/
│   ├── github/
│   │   ├── client.ts
│   │   ├── normalize.ts
│   │   ├── types.ts
│   │   └── errors.ts
│   ├── projects/
│   │   ├── filters.ts
│   │   └── featured.ts
│   └── utils.ts
├── public/
│   ├── images/
│   ├── icons/
│   └── resume.pdf             # Only after a real resume is supplied
├── tests/
├── .env.example
├── .gitignore
├── PROMPT.md
├── ARCHITECTURE.md
├── PLAN.md
├── SKILL.md
└── README.md
```

The optional GitHub route handler should not be created automatically if
server components can safely fetch the data directly. Avoid building an
API endpoint solely for architectural appearance.

## 8. GitHub API and refresh policy

-   Use unauthenticated requests for public data where sufficient.
-   An optional personal access token may improve rate limits, but it
    must be least-privilege and server-only.
-   Store any token in the hosting provider's environment settings;
    never commit it.
-   Cache results and revalidate on an appropriate interval, for example
    every 30--60 minutes, after checking the hosting/runtime behavior.
-   Offer a clear fallback if rate limits or upstream errors occur.
-   Do not assume every field is populated.
-   For language statistics beyond the repository's primary language,
    use the repository languages endpoint only when needed; account for
    the additional API calls.
-   For contribution graphs, use an appropriate supported GitHub data
    source and document limitations. Do not imply that repository commit
    lists are identical to GitHub's full contribution graph.
-   Avoid scraping pages when an API endpoint serves the requirement.

## 9. Security and privacy

-   Secrets must remain server-side and be excluded from Git.
-   `.env.example` contains names and placeholders only, never real
    credentials.
-   Public portfolio pages should include public repository data only.
-   Do not expose private repository names, descriptions, code, or
    activity.
-   README Markdown must be sanitized and rendered with raw HTML
    disabled unless a vetted sanitizer is explicitly configured.
-   Validate and safely render external URLs.
-   Use accessible, safe external links and avoid rendering untrusted
    HTML.
-   Add reasonable request timeouts, error handling, and cache behavior.
-   Do not log authorization headers or tokens.

## 10. SEO, performance and accessibility

-   Set page-specific title and description metadata.
-   Add Open Graph/Twitter metadata and canonical URL when the domain is
    known.
-   Use semantic HTML and correct heading order.
-   Ensure keyboard access, visible focus, color contrast, reduced
    motion, and accessible names.
-   Optimize images and avoid large client-side bundles.
-   Prefer server components for data-heavy static content; use client
    components only where interactivity requires them.
-   Provide skeleton/loading states only where they improve perceived
    performance.
-   Test at mobile, tablet, and desktop widths.

## 11. Deployment architecture

Initial deployment: 1. Push source code to the owner's GitHub
repository. 2. Import the repository into the selected hosting provider.
3. Configure `GITHUB_USERNAME` and any optional server-side token. 4.
Configure the production domain and HTTPS. 5. Run a production build and
verify all routes and metadata. 6. Confirm repository refresh, error
fallback, and mobile layouts.

A custom domain is optional. Do not hardcode a domain until it is
selected.

## 12. Future extensions (not initial-release requirements)

Only add these when there is a demonstrated need: - PostgreSQL for
editable content, analytics, or a custom admin panel - Authenticated
owner dashboard - GitHub webhook-triggered refresh - AI-powered project
Q&A grounded in public READMEs and project docs - Project screenshot
gallery or architecture diagram editor - Analytics with
privacy-conscious configuration - Multiple GitHub accounts or
organization repositories

These are extensions, not prerequisites for a professional first
release.
