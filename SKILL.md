# Project Skill Guide --- Portfolio

## Purpose

This file describes how an AI coding assistant should select and use
skills for this repository. It is a project-level guide, not a
replacement for the owner's installed Claude skills or OpenCode skill
library.

## Required behavior

1.  Inspect the repository and available skill directories before
    implementation.
2.  Reuse installed skills that are relevant to the current task.
3.  Read the full instructions for a selected skill before following it.
4.  Do not invent skill names, claim a skill was used without reading
    it, or assume a skill is installed merely because its name sounds
    familiar.
5.  If no relevant skill is available, proceed with sound engineering
    practices and state that no applicable installed skill was found
    when useful.
6.  Do not copy a third-party skill library into this repository simply
    to make the agent aware of it.
7.  Keep local skill installation separate from application
    dependencies.

## Skill discovery locations

Inspect only locations that exist and are accessible in the current
environment. Possible locations include: - The Claude Code user-level
skills directory, commonly `~/.claude/skills/` - Project-local Claude
skills under `.claude/skills/` - A project or workspace `claude-skills/`
directory, if it is part of the owner's local workflow - OpenCode skills
under `.opencode/skills/` - Tool-specific skill registries available in
the current environment

Exact paths can vary by operating system and installation method. Do not
assume a Windows path is available from a Linux/WSL environment, or vice
versa.

## Skill selection by task

When applicable installed skills exist, prefer them for the
corresponding work:

  -----------------------------------------------------------------------
  Task                                Look for skill instructions
                                      covering
  ----------------------------------- -----------------------------------
  Product planning                    Requirements analysis, planning,
                                      task decomposition

  UI and visual design                Frontend design, responsive layout,
                                      design systems

  Next.js and React                   App Router, server/client
                                      components, rendering and routing

  TypeScript                          Strict typing, schemas, error
                                      handling

  GitHub integration                  API use, authentication,
                                      pagination, rate limits

  Security                            Secrets, environment configuration,
                                      safe Markdown rendering, privacy

  Accessibility                       WCAG-oriented implementation,
                                      keyboard navigation, semantic HTML

  Testing                             Unit tests, component tests,
                                      integration tests

  Performance                         Caching, rendering, images, bundle
                                      size

  Documentation                       README, architecture, setup and
                                      deployment instructions

  Git workflow                        Ignore rules, commits, repository
                                      hygiene
  -----------------------------------------------------------------------

These are task categories, not names of installed skills. Use only
actual discovered skill names and instructions.

## Suggested workflow for Claude Code / OpenCode

1.  Ask the assistant to inspect the repository and list the relevant
    installed skills it can access.
2.  Ask it to read the applicable skill instructions before editing.
3.  Give it one bounded implementation phase from `PLAN.md`.
4.  Ask it to inspect existing files before changes and preserve useful
    work.
5.  Ask it to run the phase's tests, type checks, lint, and build where
    practical.
6.  Review the diff and confirm no secrets, local skill libraries,
    generated files, or unrelated changes were added.
7.  Update `README.md`, `ARCHITECTURE.md`, and `PLAN.md` when
    implementation decisions materially change.

## Git and skill-library policy

-   Do not commit the entire `claude-skills/` directory or
    `.opencode/skills/` directory by default.
-   These may contain downloaded third-party instructions, large
    libraries, or machine-specific content.
-   Track only project-specific agent/command configuration if it is
    useful, safe, and intentionally maintained.
-   Keep required project documentation (`PROMPT.md`, `ARCHITECTURE.md`,
    `PLAN.md`, `SKILL.md`, `README.md`) in Git.
-   Add local skill directories to `.gitignore` when appropriate, but
    inspect existing rules first and avoid accidentally ignoring project
    files that should be tracked.
-   Document how to install or regenerate local skills instead of
    vendoring them.
-   Never commit credentials or tokens stored alongside local tooling.

## Task completion report

At the end of each implementation phase, report: - What changed - Which
installed skills were actually used, if any - Tests and commands run,
with pass/fail results - Known limitations and unresolved TODOs -
Whether documentation changed - Any unexpected files or dependencies
added

## Project quality expectations

-   Keep code modular and typed.
-   Keep GitHub data access server-side.
-   Render imported README content safely.
-   Do not invent the owner's professional history, project metrics, or
    skills proficiency.
-   Maintain accessible UI and responsive layouts.
-   Prefer a small first release over speculative infrastructure.
