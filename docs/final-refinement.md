# AI Software Engineer refinement review

## Scope and content

This is a refinement of the existing portfolio, using the supplied final brief. The public identity is now **AI Software Engineer**; the official Hexnode titles remain **Software Engineer** and **Software Engineer Intern**, including in Person structured data. The intended AI/software balance is editorial emphasis, not a measured proficiency score.

- Applied the exact requested hero headline, descriptor, introduction, homepage title, and meta description.
- Tightened About copy around enterprise AI, retrieval, tool orchestration, reliable APIs, and maintainability.
- Reordered Hexnode work into Agentic AI & Enterprise Knowledge Systems, Backend & Enterprise Device Management, and Compliance & Security Engineering. All five approved impact figures and their meanings remain intact: 1,000+ managed devices; 30% retrieval latency reduction; 40% response accuracy improvement; 25% unauthorized access risk reduction based on internal CIS benchmarks; 60% configuration efficiency improvement.
- Updated HexPilot's title and description, clearly labeling it as a personal AI engineering project. Professional AI and UEM case studies retain their confidentiality boundaries, implementation details, and outcomes. No new performance claims or architecture were added.
- Curated five homepage skill categories in the requested order. Selected skills are checked against the complete inventory by TypeScript; the full inventory remains available for structured data.
- Updated homepage Open Graph, Twitter, social image copy, and Person description. The Person job title remains the official employment title. Canonical, robots, sitemap, and preview-indexing guards are unchanged.
- Kept the supplied resume and demo URLs and existing safe new-tab behavior. The private repository remains hidden.
- Preserved the real photo supplied immediately before this brief, which supersedes the attachment's older statement that a photo was still pending. The optimized local portrait remains in About; the hero diagram is unchanged.

## Browser review and visual changes

Before styling changes, opened and captured the homepage, project listing, and HexPilot in Chrome in both themes. The experience card, timeline, asymmetric project presentation, diagrams, borders, and dark theme already provided a coherent editorial hierarchy, so they were retained.

Changes with specific reasons:

- Adjusted the hero's responsive desktop type scale and enabled balanced wrapping for the longer headline.
- Kept `real-world` together when space allows using an inline block with a maximum width, preserving reflow at enlarged text sizes.
- Removed the hero diagram's extra desktop top margin so it aligns with the taller copy.
- Allowed more comfortable leading for the longer monospace descriptor, and prevented its accent rule from shrinking.
- Increased the introduction's allowed line length slightly within its existing column, limiting unnecessary vertical growth.
- Reduced seven visible skill groups to five to improve scanning without removing the complete inventory.

Deliberately unchanged: section order; experience metrics layout and labels; internship treatment; project card grids and actions; case-study table of contents and diagrams; theme implementation; navigation and focus management; reduced-motion handling; education, certification, achievement, contact, and footer styling. No dependencies were added or upgraded in this refinement.

Captured all three reviewed routes at 320, 375, 768, 1024, and 1440px in light and dark themes. The 30 combinations had no horizontal page overflow. Inspected rendered screenshots, including close views of the hero, experience, About photo, skills, listing, and case study. Native screenshot stitching can include the sticky header across a tall element capture; use the full-page/hero captures for review.

## Verification

| Check                                | Result                                                                                |
| ------------------------------------ | ------------------------------------------------------------------------------------- |
| Content validation                   | Passed: 3 project metadata entries and matching MDX files                             |
| TypeScript                           | Passed: route type generation and strict `tsc --noEmit`                               |
| ESLint                               | Passed with zero warnings                                                             |
| Prettier                             | Passed                                                                                |
| Production build                     | Passed: all 10 static route outputs generated                                         |
| Unit/component tests                 | 20 passed across 4 files                                                              |
| Full Playwright run, 2 workers       | 98 passed, 1 Firefox timeout, 3 existing Windows WebKit skips; exit 1; 12.1 minutes   |
| Isolated failed-case rerun, 1 worker | 1 passed in 11.3 seconds, unchanged assertions and original 30-second timeout; exit 0 |
| Combined enabled browser coverage    | All 99 unique enabled cases verified passing across the full run and isolated rerun   |
| axe                                  | 66 scans across the three engines, zero violations                                    |
| 200% text resizing                   | 75 cases, zero horizontal overflow and zero clipped-text findings                     |
| Console/page errors                  | Zero in the all-route SEO/browser checks in each engine                               |
| Manual responsive captures           | 30 route/width/theme combinations, no horizontal page overflow                        |
| `git diff --check`                   | Passed                                                                                |

Commands used: `npm run typecheck` (including content validation), `npm run lint`, `npm run format:check`, `npm run build`, `npm test`, and `npx playwright test --workers=2 --reporter=line`, followed by `npx playwright test --last-failed --workers=1 --reporter=line`. The browser runs used installed Chrome, Firefox, and WebKit, all-browser configuration, and the existing production build. Browser versions: Chrome 155.0.8059.84, Firefox 157.0, WebKit 27.2.

The final full run is not described as exit-zero: its single Firefox configuration test exhausted the shared 30-second budget while navigating to HexPilot after checking the homepage, resume popup, and listing. It passed unchanged in isolation. No application code, assertions, timeout, or skip policy was changed between those two runs. Keep an eye on this test's timing in hosted CI.

The three skips are the preexisting Windows WebKit native-Tab limitations documented in README, not new skips. Each engine also recorded eight scans containing incomplete contrast checks around conceptual SVG content; these require manual review and are not counted as passing automated rules. Existing text-token contrast checks passed, and the original diagrams and palette were retained. No complete WCAG conformance claim is made. Current audit evidence is copied to `artifacts/refinement/verification-summary.json` and the adjacent per-engine JSON files.

An exploratory browser run was deliberately interrupted to finish headline wrapping. A subsequent sandboxed run encountered Firefox `browserContext.newPage: Target crashed` errors before loading the application and was interrupted; it is not a passing run. The final suite runs with browser process permissions against a fresh production build. No assertions or skips were added to hide these crashes.

The supplied resume and demo were opened in a fresh Chrome session with network permission: both returned HTTP 200. The resume page title was `KISHORE_KATTIRI_2026_Resume.pdf - Google Drive`; the demo title was `HexPilot AI`. The resume finished loading as a readable one-page PDF without signing in. No AI conversations, uploads, or external writes were submitted.

## Files changed in this refinement

Earlier approved phase and photo changes were already present in the working tree. This refinement touches:

- `src/data/profile.ts`
- `src/data/experience.ts`
- `src/data/projects.ts`
- `src/data/skills.ts`
- `src/components/layout/site-header.tsx`
- `src/components/sections/hero.tsx`
- `src/components/sections/experience.tsx`
- `src/components/sections/about.tsx`
- `src/components/sections/skills.tsx`
- `src/content/projects/hexpilot.mdx`
- `src/styles/home.css`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/social-preview/route.tsx`
- `src/lib/site.ts`
- `src/lib/structured-data.ts`
- `e2e/homepage.spec.ts` (exact copy, metadata, official role, experience ordering, and skill ordering assertions)
- `docs/final-refinement.md`

Screenshots and audit evidence are local, ignored artifacts under `artifacts/refinement/`; browser regression artifacts also use the existing phase folders. Representative captures:

- `artifacts/refinement/hero-1440-light.png`
- `artifacts/refinement/hero-375-dark.png`
- `artifacts/refinement/after-home-1440-light.png`
- `artifacts/refinement/after-projects-375-light.png`
- `artifacts/refinement/after-hexpilot-1440-dark.png`
- `artifacts/refinement/about-1440-light.png`

## Remaining review and deployment

No push, deployment, or public indexing is authorized by this brief. The branch is `main`, with HEAD unchanged at `b4a4d15ff7025a171b5a9c867129d40fe54b5a54`; no changes are staged. Existing modifications from earlier approved work remain uncommitted alongside this refinement; review them together before any commit. The actual Vercel production origin is still unset. Deployment, hosted CI, physical-device checks, screen-reader checks, and real-user INP remain future verification steps. Automated axe checks do not establish complete WCAG conformance.

The prior security review documents five high-severity development dependency audit entries from the ESLint/Next lint dependency chain. This refinement changes no dependencies and makes no new audit or performance claims. The original uploaded JPEG is still present alongside the optimized WebP; only the WebP is used by the page.

Stop for user review and approval before any next deployment step.
