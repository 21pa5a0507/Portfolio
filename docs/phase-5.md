# Phase 5 — production quality assurance

Audit date: 19 October 2026. Phase 6 has not started. No deployment, CI workflow, domain, resume, demo URL, or public repository link was created.

## 1. Executive summary

Preserved the experience-first design, supplied content, routes, server-component architecture, themes, and existing regression coverage. Fixed verified accessible-name, text-resizing, and breakpoint-focus problems. Completed missing SEO infrastructure with explicit publication controls. Added development-only axe and Lighthouse tools, configuration/security tests, a component test, and cross-browser QA.

The complete browser regression finished with 96 passed and three explicitly skipped Windows WebKit Tab tests; unit/component tests passed 18/18. Axe found zero violations across 66 scans. Final production measurements are recorded below. This report distinguishes lab/browser evidence from real-user and assistive-technology checks that remain outstanding.

## 2. Audit methodology

- Production Next.js build served on `http://127.0.0.1:3000`; no development-server performance claims.
- Five content routes: `/`, `/projects`, `/projects/hexpilot`, `/projects/enterprise-ai-assistant`, `/projects/uem-compliance`. Existing tests also exercise unknown-route and unknown-slug 404s.
- Browser layout and interaction checks at 320, 375, 768, 1024, and 1440 CSS pixels in both themes. Headless desktop engines with resized viewports, not physical devices.
- Axe rules tagged WCAG 2 A/AA, 2.1 A/AA, and 2.2 AA: five pages × two widths × two themes plus two open-menu states = 22 scans per engine.
- Text resizing sets the root font size to 200% (32px), separately from viewport emulation: five pages × five widths per engine. This is not a physical-device pinch-zoom or operating-system text-scaling test.
- Existing keyboard, skip-link, disclosure, focus, anchor, heading, SVG, touch-target, reduced-motion, metric-fit, and theme-persistence assertions retained. Stronger text checks detect both document overflow and overflowing text blocks.
- Dependency audit, source/configuration review, and comparison of public content against the supplied resume. No penetration test or exhaustive secret-history audit is implied.

## 3. Actual performance measurements

Lighthouse **13.5.0**, headless Chrome **155.0.8059.84** (mobile emulation UA reports Chrome 155), Node **24.22.0**, Windows **10.0.26200**, Intel **Core i3-1315U**. Final production build, localhost, no concurrent build/test workload. One initial sample per route/form factor, with three additional mobile-home samples to investigate the first-run spike. Reports and settings are retained in ignored `artifacts/phase-5/` as JSON and HTML.

Mobile: **375×1000**, DPR 1, simulated 150ms RTT / 1,638.4 Kbps / 4× CPU slowdown. Desktop: **1440×1000**, DPR 1, simulated 40ms RTT / 10,240 Kbps / 1× CPU. Lighthouse also records its adjusted mobile request/download/upload values in the raw settings. Storage/cache reset uses Lighthouse defaults. These are simulated lab conditions on this machine, not a Moto device or a real deployment.

Initial samples (unaltered, including the slow first homepage sample):

| Route                               | Device  | Performance | LCP (s) | CLS | TBT (ms) | External JS transferred (KiB) |
| ----------------------------------- | ------- | ----------- | ------- | --- | -------- | ----------------------------- |
| `/`                                 | Mobile  | 80          | 2.485   | 0   | 626      | 142.0                         |
| `/projects`                         | Mobile  | 98          | 2.379   | 0   | 24.5     | 149.6                         |
| `/projects/hexpilot`                | Mobile  | 98          | 2.377   | 0   | 48       | 142.6                         |
| `/projects/enterprise-ai-assistant` | Mobile  | 100         | 1.834   | 0   | 47       | 142.6                         |
| `/projects/uem-compliance`          | Mobile  | 97          | 2.419   | 0   | 90       | 142.6                         |
| `/`                                 | Desktop | 100         | 0.501   | 0   | 0        | 142.0                         |
| `/projects`                         | Desktop | 100         | 0.538   | 0   | 0        | 149.6                         |
| `/projects/hexpilot`                | Desktop | 100         | 0.538   | 0   | 0        | 142.6                         |
| `/projects/enterprise-ai-assistant` | Desktop | 100         | 0.535   | 0   | 0        | 142.6                         |
| `/projects/uem-compliance`          | Desktop | 100         | 0.525   | 0   | 0        | 142.6                         |

The first homepage run's calibration benchmarkIndex was 1,352, compared with roughly 3,000–3,129 on subsequent initial runs. It recorded elevated layout and script work. This indicates measurement variability; it does not prove a cause. Repeat results are recorded below before deciding whether a code optimization is justified.

Three repeated mobile-home measurements used identical settings and the same unchanged production build:

| Sample   | Performance | LCP (s) | CLS | TBT (ms) | Calibration benchmarkIndex |
| -------- | ----------- | ------- | --- | -------- | -------------------------- |
| Initial  | 80          | 2.485   | 0   | 626      | 1,352                      |
| Repeat 1 | 93          | 2.280   | 0   | 279.0    | 2,998.5                    |
| Repeat 2 | 93          | 2.275   | 0   | 278.9    | 3,076                      |
| Repeat 3 | 94          | 2.364   | 0   | 220.0    | 2,871                      |

Across **all four** homepage samples, median Performance is **93**, median LCP **2.322s**, median TBT **279.0ms**, and CLS **0**. The first 80 result remains in the raw reports and table; not every run met the 90 target. The spike was not reproduced at the same magnitude, and all three follow-up samples exceeded 90. No application rewrite was justified by this evidence. Blocking time remains a useful diagnostic to revisit if post-deployment interaction data is poor.

All **13** samples measured LCP ≤2.5s and CLS 0; all desktop samples scored 100. These are finite local measurements, not a performance guarantee. Repeat results are in `home-repeats.json` and `lighthouse-mobile-home-repeat-{1,2,3}.report.{json,html}`. The repeat command used the same Lighthouse CLI arguments as `scripts/audit-performance.mjs` with the route restricted to `/`, mobile settings, and distinct output paths; the local helper is `artifacts/phase-5/repeat-home.mjs`.

Other measured observations:

- Lighthouse Accessibility and Best Practices: **100** in all ten initial reports. These scores do not establish complete conformance or security.
- Lighthouse SEO: **63** in all ten reports. The only failing scored SEO audit is `is-crawlable`, with both the intentional noindex meta tag and robots disallow reported. Do not remove unpublished-site controls to inflate a score. Recheck after real production configuration.
- External JavaScript: approximately **142.0–149.6 KiB transferred**, **463.0–479.5 KiB decoded**. This includes framework/navigation code; it is not an isolated application-only bundle. Inline HTML/RSC data is separate.
- Two same-origin, self-hosted WOFF2 font requests per page, **51.8 KiB total transferred**. No runtime Google Fonts request. All initial reports measured CLS 0.
- **Zero third-party network requests** in every initial report. Main content visuals are inline SVG; no large raster hero/profile image is downloaded. The social PNG is generated statically and is not part of the page's initial visual payload.
- Only the header/theme control are application-authored interactive client components. The script records Lighthouse's boot-up and main-thread diagnostics; these combine framework/parsing/rendering work and are not an isolated React hydration duration. Cross-engine console/page error collections were empty, including no hydration errors.
- Initial mobile script boot-up ranged **194.3–604.5ms**, with total main-thread work **701.7–1,821.5ms**; desktop boot-up **4.0–5.7ms**, main-thread work **160.3–230.3ms**. The highest mobile values belong to the recorded first homepage sample. These diagnostics are retained in the summary and raw reports, not represented as React-only timings.
- No performance dependency, lazy-loading abstraction, or client/server rewrite was added. Optimization decisions depend on repeatable evidence, not a single score.

INP has not been measured. Lighthouse TBT is a lab diagnostic, not a real-user INP measurement. Repeat performance testing on the eventual deployed origin and collect real-user evidence before claiming the INP target.

## 4. Accessibility findings

Verified defects corrected:

- Header link had an overriding accessible name that omitted visible content. It now uses its natural text name, with explicit whitespace and a supplemental destination title.
- At 200% text size, header controls, intrinsic grid minimums, the company heading, education content, and the mobile metrics could overflow. Wrapping, zero-minimum grid tracks, stable horizontal gutters, and content-based diagram/contents grids permit reflow without hiding overflow. The stronger clipping audit also found and fixed a six-pixel overflow in a project description at 320px.
- Header height can grow with text. A ResizeObserver measures the collapsed header row and updates anchor scroll clearance, preserving the normal 96px minimum.
- Contents numbering is kept on one line so two-digit section markers do not split at narrow widths.
- Breakpoint changes can blur a newly hidden link before the media-query event fires. Focus restoration now remembers the last header control and transfers focus to a visible equivalent.
- WebKit's native pointer click does not focus a button. The keyboard fixture explicitly focuses the menu button. A minimal HTML reproduction also showed this Windows WebKit build skipping native links during Tab navigation (a button → link → button sequence focused the second button). Three Tab-order-dependent tests are explicitly skipped on Windows WebKit only; Chromium/Firefox retain these assertions. Native Safari full-keyboard testing remains outstanding. No application tabindex workaround was added to mask the engine behavior. WebKit exposes a [link-tabbing preference](https://developer.apple.com/documentation/webkit/webpreferences/tabstolinks); this local result is not a claim that macOS Safari is broken.

Final axe results are recorded with cross-browser results below. Incomplete axe contrast checks concern decorative SVG text in the homepage/project previews. These SVGs are hidden from assistive technology, have accompanying HTML descriptions, and use the accent token against the background; the shared text token pairs are independently checked at a minimum 4.5:1. Essential case-study diagram labels remain HTML.

No complete WCAG 2.2 AA conformance claim is made. Outstanding: actual NVDA/JAWS/VoiceOver reading and announcements, speech-input navigation, physical-device zoom/text scaling, and human assessment of all applicable success criteria. Browser role/name assertions and axe are not a screen-reader session.

## 5. SEO findings

- Unique titles/descriptions and project-specific Open Graph/Twitter metadata; original 1200×630 static PNG social preview at `/social-preview`.
- The custom 404 has its own title/description and remains noindex even when content indexing is enabled.
- Person JSON-LD on the homepage uses supplied identity, actual public links, employment, education, and the complete skills inventory. Case studies use TechArticle JSON-LD without invented dates, publisher credentials, or outcomes. Serialization escapes `<` to prevent script termination.
- `/robots.txt` and `/sitemap.xml` are generated using the configured origin. The sitemap contains the five actual content routes when an origin exists; it is empty while the domain is unknown. No arbitrary modification dates or unfinished article URLs are emitted.
- `NEXT_PUBLIC_SITE_URL` must be an HTTPS origin without credentials, path, query, or hash. Canonicals, social image URLs, and schema URLs are omitted when it is unset.
- `SITE_INDEXING=false` defaults to noindex/nofollow and robots disallow. Production can explicitly enable indexing with `SITE_INDEXING=true` and the actual origin; missing-origin and invalid settings fail validation. Vercel preview/development environments remain unindexed even if the flag is inherited.
- Unit tests verify production enablement, preview protection, sitemap/canonical generation, and safe schema escaping. Default-unpublished browser tests verify served metadata, JSON-LD, robots, sitemap, image response, and absence of console/page errors.

Publication still requires the real origin and an explicit production-only indexing setting followed by a rebuild and deployed-response checks. Local `noindex` scores are not evidence of a permanent indexing defect. Search-engine rich-result eligibility and actual indexing have not been claimed.

## 6. Security findings

Full audit: five high-severity package entries from one underlying development-tool advisory. Production-only audit: zero vulnerabilities. Exact chain:

```text
eslint-config-next@16.4.2 [dev]
  → @next/eslint-plugin-next@16.4.2
    → fast-glob@3.3.1
      → micromatch@4.0.8
        → braces@3.0.3
```

[GHSA-vfj7-8cjw-p6xm / CVE-2026-93687](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) concerns stack exhaustion from deeply nested brace patterns. On this audit date the primary advisory lists no patched release, and the registry's latest braces version remains 3.0.3. Development/build environments install the affected tooling. The inspected Next ESLint call site only processes configured rootDir globs; this repo does not configure them. No visitor-controlled input reaches that parser in the static portfolio. Development-only does not mean patched or risk-free.

No force fix, downgrade, override, or breaking dependency upgrade was applied. npm's suggested eslint-config-next 14.2.35 downgrade is incompatible with the current framework tooling direction. Retain trusted lint configuration and monitor for a compatible upstream fix; see [security-review.md](security-review.md) for alternatives and exposure analysis.

Source review found no API keys or private-key blocks using the documented pattern scan, no actual environment file beyond `.env.example`, no trackers, and only two interactive client components (header and theme control). External profile/contact links use supplied values and the same browsing context, so no new-window opener relationship is created. MDX is trusted local source compiled at build time; never compile visitor-supplied MDX. Allowed slugs are checked before content imports, optional public URLs require HTTPS, and HexPilot repository URLs are rejected by validation.

The theme prepaint script is fixed application code; JSON-LD is escaped structured data. No arbitrary visitor HTML is rendered. Professional diagrams are conceptual capability maps, without internal hosts, topology, screenshots, datasets, or source code. Direct dependencies were reviewed for application/build/test use; no unused runtime dependency was identified. New axe/Lighthouse packages and their transitive dependencies are development-only.

## 7. Cross-browser results

The complete production regression finished in 10.2 minutes with **96 passed, 3 skipped, 0 failed**:

| Engine actually launched             | Version       | Passed | Explicit skips           | Axe scans / violations | 200% text cases / overflow or clipping |
| ------------------------------------ | ------------- | ------ | ------------------------ | ---------------------- | -------------------------------------- |
| Chromium via installed Google Chrome | 155.0.8059.84 | 33     | 0                        | 22 / 0                 | 25 / 0                                 |
| Playwright Firefox                   | 157.0         | 33     | 0                        | 22 / 0                 | 25 / 0                                 |
| Playwright WebKit                    | 27.2          | 30     | 3 native Tab-order tests | 22 / 0                 | 25 / 0                                 |

Every engine exercised the five required widths, both themes, navigation, project links, MDX, theme persistence, 404s, and overflow checks. Browser console/page error collections were empty. Each engine's axe report has eight incomplete contrast entries for decorative SVG text, discussed above.

After that full run, only the contents-marker wrapping rule and custom-404 metadata changed. A focused cross-engine rerun verifies the final build; its result is recorded in the command table. These local engines are not claims of testing macOS Safari or iOS Safari on physical devices.

Selected captured images were opened and visually reviewed: desktop homepage, 320px experience, tablet project listing, mobile dark HexPilot, desktop architecture diagram, and the generated social preview. Automated screenshot capture across all widths/themes is broader than the human image review. Local evidence is in `artifacts/phase-4/after/` and `artifacts/phase-5/`; repeated legacy filenames are overwritten by later engine runs. Representative Chromium copies use explicit engine filenames in Phase 5 artifacts.

## 8. Content verification

| Content            | Compared with supplied resume                                                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Employment         | Hexnode Software Engineer, July 2024–Present; intern May–June 2024.                                                                        |
| Production scale   | 1,000+ managed devices, never users or customers.                                                                                          |
| Assistant outcomes | 30% retrieval latency reduction; 40% response accuracy improvement, attributed to professional Hexnode work.                               |
| Compliance         | 25% reduction in unauthorized access risk, explicitly based on internal CIS compliance benchmarks.                                         |
| Windows MDM        | CSP/ADMX and 60% improvement in enterprise configuration management efficiency.                                                            |
| Ownership          | HexPilot is personal research; the two enterprise case studies are professional work. Professional metrics are not attributed to HexPilot. |
| Skills             | All supplied categories/items remain in typed data; curated homepage subset has no invented scores.                                        |
| Education          | B.Tech 2021–2024, Vishnu Institute of Technology, CGPA 8.74; diploma 2018–2021, SIR C.R.R. Polytechnic, 80.74%. Locations retained.        |
| Certification      | Oracle Certified — Agentic AI Foundations Associate; no invented badge, ID, or verification link.                                          |
| Achievement        | Top 3 Finalist, Hexcode 25, company-wide AI-powered Knowledge Hub hackathon.                                                               |
| Public contacts    | kishorekattiri@gmail.com; +91 9346528404; supplied GitHub and LinkedIn URLs.                                                               |
| Missing assets     | Resume and HexPilot demo remain unset/hidden; private repository action remains absent.                                                    |

No resume facts, MDX claims, or technical outcomes were added or altered in this phase. Unsupported challenges, tradeoffs, and lessons remain omitted.

## 9. Files changed

- `src/components/layout/site-header.tsx`, `src/styles/{globals,home,projects}.css`: accessible name, resize reflow, anchor clearance, and breakpoint focus fixes.
- `src/lib/site.ts`, `src/lib/structured-data.ts`, `src/components/ui/structured-data.tsx`: publication configuration and escaped schema.
- `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/projects/page.tsx`, `src/app/projects/[slug]/page.tsx`, `src/app/social-preview/route.tsx`: metadata, schema, robots/sitemap, static social image.
- `src/app/not-found.tsx`: specific missing-page metadata.
- `e2e/quality.spec.ts`, `e2e/homepage.spec.ts`, `e2e/polish.spec.ts`, `playwright.config.ts`: axe, text resizing/clipping, SEO/hydration checks, documented Windows WebKit exclusions, and opt-in Firefox/WebKit.
- `tests/seo.test.ts`, `tests/theme-toggle.test.tsx`: indexing/schema contracts and storage-failure component behavior.
- `scripts/audit-performance.mjs`: repeatable production lab audit runner.
- `package.json`, `package-lock.json`: exact-pinned development-only @axe-core/playwright 4.14.0 and Lighthouse 13.5.0.
- `eslint.config.mjs`: excludes generated audit artifacts; `.env.example`, `README.md`, `docs/security-review.md`, and this report: configuration, reproducibility, findings, limitations.

No architectural redesign, new content model, application backend, paid service, or animation dependency was introduced.

## 10. Tests executed

| Command / check                                                                                                            | Actual result                                                                                                                   |
| -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `npm run validate:content` (also prebuild/pretypecheck)                                                                    | Exit 0; three metadata entries and matching MDX files validated.                                                                |
| `npm run typecheck`                                                                                                        | Exit 0; route generation and strict TypeScript passed.                                                                          |
| `npm run lint`                                                                                                             | Exit 0; zero warnings.                                                                                                          |
| `npm run format:check`                                                                                                     | Exit 0; all matched files use Prettier code style.                                                                              |
| `npm run build`                                                                                                            | Exit 0; optimized build, TypeScript, and ten static outputs generated.                                                          |
| `npm test`                                                                                                                 | Exit 0; three files, 18 tests passed, including the RTL component test.                                                         |
| `npm run test:e2e -- --workers=1` with all three engines enabled                                                           | Exit 0; 96 passed, three documented Windows WebKit skips, no failures; 10.2 minutes.                                            |
| Focused final rerun: `npm run test:e2e -- --workers=1 --grep 'visual review at 375px in dark mode\|200% text\|SEO routes'` | Exit 0; nine passed across all engines in 1.2 minutes; covers the two final small changes and the explicit 404 title assertion. |
| Axe via Playwright                                                                                                         | 66 scans, zero violations; eight incomplete decorative-SVG contrast entries per engine.                                         |
| `npm audit --json`                                                                                                         | Exit 1 because of the five documented high development entries.                                                                 |
| `npm audit --omit=dev --json`                                                                                              | Exit 0; zero production vulnerabilities.                                                                                        |
| `npm view braces version`                                                                                                  | Exit 0; 3.0.3, still affected.                                                                                                  |
| `node scripts/audit-performance.mjs`                                                                                       | Exit 0; ten production Lighthouse JSON/HTML report pairs and `performance-summary.json` generated.                              |
| `node artifacts/phase-5/repeat-home.mjs`                                                                                   | Exit 0; three additional mobile-home JSON/HTML report pairs and `home-repeats.json` generated with identical settings.          |

Playwright environment: `PLAYWRIGHT_ALL_BROWSERS=1`, `PLAYWRIGHT_CHANNEL=chrome`, `PLAYWRIGHT_BROWSERS_PATH=C:\Users\CHECK\Desktop\port\.tools\browsers`. Production browser checks used a separately started `npm start` server for the final runs. Lighthouse is run only after other checks stop.

Diagnostic runs initially failed on the defects above; those runs are not reported as passing. Strict TypeScript caught test-diagnostic typing mistakes, corrected before final validation. Restricted Vitest/lint workers stalled and were stopped; normal-permission reruns passed. WebKit's 32,767-pixel screenshot ceiling required viewport-only text-resize captures; full-page DOM overflow/clipping assertions remain enabled. Initial WebKit keyboard failures were isolated with a minimal native HTML reproduction and documented as exclusions, not fixed by changing application semantics.

## 11. Remaining risks

- The development-only braces advisory remains unresolved upstream; re-audit before deployment.
- No production origin exists. Deployed canonical/social links, robots/indexing, CDN behavior, and actual network performance require Phase 6 verification.
- No real-user INP or field Core Web Vitals. Local Lighthouse is a finite lab sample, not a future performance guarantee.
- Mobile-home performance varied from 80 to 94; median 93. Its median TBT was 279ms, with an initial 626ms sample. Treat the variability as a reason to repeat on the deployment and check field interactions, not as proof of consistently meeting a score target.
- Actual assistive-technology and physical-device checks remain outstanding as listed above; automated accessibility results are not certification.
- Three Windows WebKit native Tab-order tests remain unverified. Other WebKit checks are enabled; repeat these keyboard paths on Safari with full keyboard navigation.
- Fonts are self-hosted at runtime, but next/font needs Google Fonts access during the build. Audit/browser tooling needs its local binaries and supported Node version.
- Employer metrics are supplied resume claims; no confidential benchmark methodology or independent substantiation was available or fabricated.

## 12. Phase 6 readiness assessment

**Ready for Phase 6 preparation after approval**, with the findings above retained. No application build/type/lint/test failure remains in enabled checks. The three Windows WebKit native Tab exclusions and unresolved development advisory are explicit limitations, not passing results or patched findings.

No Phase 6 work has begun. There is no identified code blocker for a preview deployment. Before public indexing, supply the actual production HTTPS origin, enable `SITE_INDEXING=true` only in production, rebuild, and verify deployed metadata/robots/sitemap/social assets. Deployment/CDN performance, Safari keyboard behavior, assistive-technology checks, and future real-user INP remain follow-up work. Missing resume/demo assets intentionally remain hidden and do not block a preview.

Local screenshot examples: [desktop homepage](../artifacts/phase-5/homepage-desktop-chromium.png), [mobile experience](../artifacts/phase-5/experience-mobile-chromium.png), [final mobile HexPilot](../artifacts/phase-5/hexpilot-mobile-webkit.png), [social preview](../artifacts/phase-5/social-preview.png). These evidence artifacts are ignored by Git; the report preserves the measurements for repository review.
