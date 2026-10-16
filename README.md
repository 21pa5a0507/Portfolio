# Kishore Kattiri — engineering portfolio

Phase 4 visual and interaction refinements implemented across the experience-first homepage, project listing, and static MDX case studies. The full SEO/accessibility/performance audit and deployment workflow are later milestones. This development preview remains deliberately marked `noindex` until the full portfolio is ready.

## Run locally

Use Node.js 24 LTS and npm. Run `npm ci`, then `npm run dev`. Visit http://localhost:3000.

Validation: `npm run typecheck`, `npm run lint`, `npm run format:check`, and `npm run build`.
`npm test` runs focused Vitest tests for content validation and canonical URL configuration. Broader component coverage remains for Phase 5. For Playwright production-browser smoke tests, run `npx playwright install chromium`, then `npm run test:e2e`. Alternatively, use installed Chrome by setting `PLAYWRIGHT_CHANNEL=chrome` (PowerShell: `$env:PLAYWRIGHT_CHANNEL = 'chrome'`). Screenshots are written to ignored `artifacts/phase-2/`, `artifacts/phase-3/`, and `artifacts/phase-4/after/`. The Phase 4 browser checks capture every page at 320, 375, 768, 1024, and 1440px in both themes; they also check keyboard focus, menu resize behavior, motion preferences, token contrast, heading order, landmarks, touch targets, and metric fit. These focused checks do not constitute a complete WCAG audit. The test runner builds/starts the application unless a local server is already running; stop stale servers before testing changed code.

## Architecture

- Next.js App Router, React server components by default, strict TypeScript, Tailwind CSS 4.
- `src/data/`: typed profile, experience, project metadata, skills, education, certification, and achievement content.
- `src/content/`: trusted local MDX case studies and future articles. Next MDX compiles project content at build time; dynamic imports discover new matching MDX files without a manual component registry.
- `src/components/sections/`: homepage sections, in the required experience-first order.
- `src/components/layout/`: sticky header, mobile disclosure navigation, social links, and footer.
- `src/components/projects/`: reusable case-study cards and responsive conceptual diagrams with readable HTML labels and original SVG details/connectors.
- `src/components/ui/`: reusable links, tags, headings, theme control, and original conceptual SVG drawings.
- `src/styles/globals.css`: semantic colors, typography, spacing, focus indicators, reduced-motion handling.
- `src/styles/home.css`: responsive homepage composition, using the shared tokens.
- `src/styles/projects.css`: listing, case-study typography, local table of contents, and diagram layouts.
- `src/lib/`: shared types and the before-paint theme initialization script.

No backend, CMS, database, trackers, or paid services. Next's native static prerendering is preferred, with Vercel deployment planned. An explicit static export is unnecessary for Vercel. Fonts are self-hosted through `next/font`; the build needs access to Google Fonts to download them.

## Maintain content

- Edit contact details and introduction in `src/data/profile.ts`.
- Add roles to `src/data/experience.ts`; group descriptions by engineering discipline. Preserve metric units and attribution.
- Add typed project metadata to `src/data/projects.ts` and matching `<slug>.mdx` in `src/content/projects/`. A new project requires those two files only; diagrams are optional. Use a lowercase hyphenated slug and plain `##` section headings, including `## Overview` and at least one other section. The page supplies H1; MDX H2 headings generate both anchor IDs and the contents list. Do not invent unknown architecture or results. See `src/content/projects/README.md`.
- Future articles pair metadata in `src/data/articles.ts` with `<slug>.mdx` in `src/content/articles/`. Keep navigation hidden until articles are published.
- The complete skills inventory is in `src/data/skills.ts`; `homepageSkillGroups` selects a readable subset from that inventory. Navigation anchors are configured in `src/data/navigation.ts`.
- Change theme colors in the semantic CSS variables, updating both explicit dark mode and the system preference fallback. Recheck contrast after changes.
- Add a real resume under `public/` and only then set `profile.resumeUrl` to its root-relative PDF path. The hero action stays hidden while the value is unset. Verify the PDF URL before committing it.
- Add a real HTTPS `demoUrl` to HexPilot metadata when available. Its repository is private: omit `repositoryUrl`. Optional actions must only render when configured.

## Theme

The default follows the OS. The toggle cycles system → light → dark → system, storing only explicit choices. A small fixed script applies stored preference before paint. CSS handles system changes and unavailable storage; no theme dependency is needed. Suppression is limited to the root HTML attribute changed before hydration.

UI transitions use the shared `--transition-ui` token. Native smooth anchor scrolling is enabled only when reduced motion is not requested. Focus indicators remain visible without animation. Homepage active-section indication uses one IntersectionObserver in the existing navigation component; project pages identify the Projects location. The mobile menu is a disclosure, not a modal: normal Tab order is retained, Escape returns focus to its toggle, and crossing the responsive breakpoint transfers focus to a visible navigation control.

## Deployment and maintenance

No deployment has been created. When the portfolio is ready, import this GitHub repository into Vercel, choose Next.js, retain the default build settings, and use Node 24. Vercel provides branch previews. Set `NEXT_PUBLIC_SITE_URL` to the actual HTTPS deployment origin when known (no path or credentials). Project canonical and Open Graph URLs use this value; they are omitted while it is unset, rather than inventing a domain. Sitemap configuration remains for the SEO milestone. Never commit `.env.local` or secrets.

CI and detailed deployment verification arrive in Phase 6. Before releases, run all available checks and review mobile/keyboard behavior. Commit the lockfile with dependency changes, use `npm ci` in CI, review security updates routinely, and upgrade one framework major version at a time. Performance and accessibility targets require measurement before any score claims.
