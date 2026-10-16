# Phase 1 review scope

This milestone establishes tooling, content types, theme handling, and UI primitives. It does not represent the finished portfolio.

## Decisions

- Use the existing `Portfolio/` Git repository, whose origin is `21pa5a0507/Portfolio`. Preserve the pre-existing Python file and its working-tree changes.
- Follow the requested Next.js/Vercel stack and local milestone workflow. No Sites hosting registration or publication.
- Pin direct dependencies and check in npm's lockfile. Node 24 LTS is the development baseline.
- Keep all supplied professional claims in data and retain their original scope. No measured performance claims have been added.
- Retain empty articles as typed data, without exposing an empty navigation destination.
- Use CSS for system theme preference and a small client control for explicit preferences. No animation or theme library.
- Defer case-study content and route loading to Phase 3. The MDX compiler is configured now; no untrusted content inputs are supported.
- Keep the foundation preview out of search indexes. Final metadata, social cards, structured data, sitemap, and robots routes belong to the SEO milestone.

## Later verification

Responsive browser review, automated unit/component/E2E coverage, contrast audit, Lighthouse measurements, and CI are not complete in Phase 1. They must be checked in their authorized milestones.

## Dependency review

ESLint 9.39.5 is retained because the current Next-config React, import, and accessibility plugins do not declare ESLint 10 compatibility. npm labels ESLint 9 unsupported; revisit when those plugins update. An attempted upgrade passed lint but produced invalid peer dependencies, so it was reverted.

The initial audit reports five high-severity entries in one development-only chain: Next ESLint plugin → fast-glob → micromatch → braces. The underlying braces advisory is GHSA-vfj7-8cjw-p6xm; the latest published braces version (3.0.3) is affected. No compatible patched release was available during setup. These packages process repository glob patterns during linting and are not application runtime code. Do not apply npm's suggested forced downgrade to Next 14 lint configuration. Recheck this advisory during the quality milestone.

The first sandboxed production build could not download Google Fonts. A network-enabled retry passed, producing static homepage and not-found routes. Builds need initial font download access.

## Executed checks

- `npm run typecheck`: passed.
- `npm run lint`: passed with zero warnings after correcting the PostCSS export.
- `npm run format:check`: passed.
- `npm run build`: passed with initial font-download network access; both routes statically prerendered.
- `npm ls --depth=0`: passed for the final direct dependency set.
- Relative-luminance calculation for text on the specified backgrounds: light primary 16.85:1, secondary 4.76:1, accent 4.97:1; dark primary 17.02:1, secondary 7.58:1, accent 8.92:1. These text/background pairs exceed the AA normal-text minimum. Thin borders are decorative and are not used as the sole focus indicator.
- Unit/component/E2E tests were not run: test cases belong to Phase 5. Browser responsiveness, theme flash, and keyboard behavior are not yet verified.
