# Kishore Kattiri — engineering portfolio

Experience-first homepage, project listing, and static MDX case studies. Phase 5 QA is documented in [docs/phase-5.md](docs/phase-5.md); final configuration and deployment preparation are in [docs/phase-6.md](docs/phase-6.md). Local changes are prepared for approval. Nothing has been pushed or deployed during Phase 6, and this unpublished build remains `noindex`.

## Run locally

Use Node.js 24 LTS and npm. Run `npm ci`, then `npm run dev`. Visit http://localhost:3000.

Validation: `npm run typecheck`, `npm run lint`, `npm run format:check`, and `npm run build`.
`npm test` runs Vitest content/configuration/security tests and a React Testing Library theme-control test. For Playwright production-browser tests, run `npx playwright install chromium`, then `npm run test:e2e`. Alternatively, use installed Chrome by setting `PLAYWRIGHT_CHANNEL=chrome` (PowerShell: `$env:PLAYWRIGHT_CHANNEL = 'chrome'`). To include Firefox and WebKit, install those engines with `npx playwright install firefox webkit` and set `PLAYWRIGHT_ALL_BROWSERS=1`. Browser binaries and Node must be available on the test machine.

Screenshots are written to ignored `artifacts/phase-2/`, `artifacts/phase-3/`, and `artifacts/phase-4/after/`; audit JSON/HTML goes in `artifacts/phase-5/`. The checks cover every page at 320, 375, 768, 1024, and 1440px in both themes, keyboard focus, menu resize behavior, motion preferences, contrast, headings, landmarks, touch targets, metric fit, 200% root text resizing, and axe WCAG rules. Automated tests do not establish complete WCAG conformance. The runner builds/starts the application unless a local server is already running; stop stale servers before testing changed code. The SEO browser test assumes the default unpublished configuration.

This Windows WebKit build skips native links during Tab navigation, reproduced with a minimal native HTML page. Three Tab-order-dependent tests are explicitly skipped for Windows WebKit; they remain enabled for Chromium and Firefox and for WebKit on other platforms. Verify those paths on Safari with full keyboard navigation. Resized browser viewports do not replace physical-device and screen-reader checks. Text-resize screenshots capture the viewport because WebKit rejects images exceeding 32,767 pixels in either dimension.

For production Lighthouse measurements, run `npm run build`, then `npm start`. In a second terminal run `node scripts/audit-performance.mjs`; `CHROME_PATH` can identify an installed Chrome executable, and `AUDIT_ORIGIN` can override the default `http://127.0.0.1:3000`. The script audits all five pages at mobile and desktop sizes and writes local JSON/HTML reports plus a measurement summary. Avoid simultaneous test/build workloads during measurement. Real-user INP requires separate post-deployment measurement.

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
- `profile.resumeUrl` is the confirmed Google Drive viewer URL: `https://drive.google.com/file/d/1UwsJNuQzFcUEF3mdQeClUozfietVGOti/view?usp=drivesdk`. The hero contains one **View Resume** action, opening a new tab with `noopener noreferrer` and a screen-reader announcement. Do not relabel a viewer as a download or add a placeholder PDF. Update this HTTPS value when the actual viewer changes.
- HexPilot's `demoUrl` is `https://ai-doc-copilot-iota.vercel.app/` in `src/data/projects.ts`. **Live Demo** appears on the homepage card, projects listing, and case study, using the same accessible new-tab behavior. Its source repository remains private: omit `repositoryUrl`. No other project URLs were added.

## Optional profile photo

The current hero illustration remains. The optional portrait appears in **About** only after a real asset is supplied; no placeholder or empty layout slot is rendered now.

1. Place the real photo at **`public/images/kishore-kattiri.webp`** (create `images/` if necessary).
2. Prefer an **800×800 square WebP**, or a well-compressed JPEG with its actual filename and dimensions. Aim for no more than about 200 KiB. Do not upscale a small source or substitute a stock/generated face.
3. Replace `photo: undefined as ProfilePhotoConfig | undefined` in `src/data/profile.ts` with:

```ts
photo: {
  src: '/images/kishore-kattiri.webp',
  alt: 'Portrait of Kishore Kattiri',
  width: 800,
  height: 800,
} satisfies ProfilePhotoConfig,
```

`src/components/ui/profile-photo.tsx` uses Next Image, intrinsic dimensions, a responsive `sizes` value, lazy loading, and a square reserved aspect ratio, with a maximum display width of 320px. Supply a square crop so its reserved geometry matches the asset. It uses the existing corner-radius token, supports optional reuse via `className`, and needs no remote image host configuration. Verify its alt text, crop, optimized image response, mobile layout, and CLS after adding the real image. The component tests validate configured markup and the unset state; an actual photo has not been visually tested.

## Theme

The default follows the OS. The toggle cycles system → light → dark → system, storing only explicit choices. A small fixed script applies stored preference before paint. CSS handles system changes and unavailable storage; no theme dependency is needed. Suppression is limited to the root HTML attribute changed before hydration.

UI transitions use the shared `--transition-ui` token. Native smooth anchor scrolling is enabled only when reduced motion is not requested. Focus indicators remain visible without animation. Homepage active-section indication uses one IntersectionObserver in the existing navigation component; project pages identify the Projects location. The mobile menu is a disclosure, not a modal: normal Tab order is retained, Escape returns focus to its toggle, and crossing the responsive breakpoint transfers focus to a visible navigation control.

## Deployment and maintenance

No deployment has been created. The target remote is **`https://github.com/21pa5a0507/Portfolio.git`**, branch **`main`**. The actual application/Git root is the local `Portfolio/` directory, whose repository-relative root contains `package.json`. The outer `port/` directory is a separate local Git repository with no remote; do not stage or push from it.

For this GitHub repository, use these Vercel Hobby settings after explicit approval:

| Setting                        | Value                                                                      |
| ------------------------------ | -------------------------------------------------------------------------- |
| Repository / production branch | `21pa5a0507/Portfolio` / `main`                                            |
| Root Directory                 | **`.`** (repository root; do not select `Portfolio`)                       |
| Framework                      | Next.js                                                                    |
| Node                           | 24.x                                                                       |
| Install / build                | `npm ci` / `npm run build`                                                 |
| Output                         | Framework default; no custom `public` or `out` override                    |
| Domain                         | Actual free Vercel subdomain assigned after deployment; none invented here |
| Initial indexing               | `SITE_INDEXING=false` for Production and Preview                           |

Use Vercel's native GitHub integration and branch previews. No `vercel.json`, Vercel CLI dependency, backend, database, or paid service is required. Do not connect/import the project before deployment approval, because the native integration can immediately create a deployment. After the approved initial deployment, obtain its actual stable production origin and set `NEXT_PUBLIC_SITE_URL` to it (HTTPS, no path or credentials), then rebuild. Canonicals, social image URLs, structured-data URLs, and the sitemap use it; origin-dependent values are omitted while unset. Keep indexing off until explicit publication approval. Never commit `.env.local`, Vercel credentials, or secrets.

To publish for indexing, set **`SITE_INDEXING=true` in the production environment only**, supply the actual `NEXT_PUBLIC_SITE_URL`, and rebuild. The build rejects indexing without an origin or an invalid setting. Vercel preview/development environments remain `noindex` even if the flag is inherited. Verify the production response contains `index, follow`, `robots.txt` allows `/`, the sitemap lists the actual origin, and social/canonical URLs point to it before submitting the site to search engines. Local or unpublished builds retain `SITE_INDEXING=false`. These controls are indexing preferences, not access control.

The prepared `.github/workflows/ci.yml` runs on main pushes, pull requests, or manual dispatch with read-only contents permission. Official actions are pinned to verified commit SHAs. It uses Node 24, `npm ci`, a blocking production audit, content/type/lint/format/unit checks, an explicit production build, and all three Playwright engines (including axe). Full development audit output is retained as a nonblocking report because of the known upstream advisory. Failure traces and QA artifacts are retained for seven days. The workflow does not push, deploy, or enable indexing. YAML was parsed locally; an actual GitHub Actions run requires the approved push.

CI sets `PLAYWRIGHT_SKIP_BUILD=1` only after `npm run build` succeeds, avoiding a duplicate build inside Playwright. Local tests retain their build-first default; use that flag only with a current production build. The CI environment keeps indexing false and the origin empty so unpublished-state tests are deterministic. Linux CI execution, branch protection, and deployed-origin checks remain to be verified after approval.

Before releases, run all available checks and review mobile/keyboard behavior. Commit the lockfile with dependency changes, review security updates routinely, and upgrade one framework major version at a time. See [docs/security-review.md](docs/security-review.md) for the unresolved development-only advisory. Phase 5 performance measurements are historical local lab results, not a fresh Phase 6 or deployed score; repeat against the deployed site. Actual screen-reader, physical-device, Safari full-keyboard, and real-user INP checks remain outstanding.
