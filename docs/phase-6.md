# Phase 6 — final configuration and deployment preparation

Prepared on 19 October 2026. **Approval checkpoint: no commit, push, deployment, Vercel project import, or public-indexing change has been performed.** The final production URL is unknown and has not been invented. Local QA uses localhost only.

## Configuration completed

- Preserved Kishore Kattiri's approved positioning, contact information, enterprise-first design, employment dates, achievements, case studies, themes, motion preferences, and content architecture. Professional experience/education/achievement data and MDX content have no Phase 6 edits.
- Added one prominent **View Resume** action in the hero. No duplicate contact resume button or downloadable/placeholder PDF was added. Its exact href is `https://drive.google.com/file/d/1UwsJNuQzFcUEF3mdQeClUozfietVGOti/view?usp=drivesdk`.
- Enabled **Live Demo** for HexPilot on the featured homepage card, `/projects`, and `/projects/hexpilot`, using `https://ai-doc-copilot-iota.vercel.app/`. No other project URL or private repository link was added.
- Resume/demo links share a server-rendered component with `target="_blank"`, `rel="noopener noreferrer"`, a decorative external arrow, and a screen-reader new-tab announcement. Existing focus/touch styles apply. Browser tests verify actual popup creation and `window.opener === null` using a deterministic intercepted response; they do not depend on the external services staying online.
- Articles remain absent from navigation and public listings. The existing typed metadata/MDX architecture is preserved; no empty article pages or links were added.

## External-link verification

Anonymous checks used curl and a fresh headless Chrome context without account cookies:

| Destination           | Verified result                                                                                                                                                                                                                                                                                             |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Supplied resume URL   | HTTP 200. Title `KISHORE_KATTIRI_2026_Resume.pdf - Google Drive`. The actual PDF preview was opened and visually inspected without signing in; no request-access gate was present. Google Drive normalized the browser URL to `/view`, while the portfolio retains the exact supplied `?usp=drivesdk` href. |
| Supplied HexPilot URL | HTTP 200. Title `HexPilot AI`, no access gate observed. The entry page was opened; no AI request, document upload, or workflow submission was performed. Backend/AI functionality was not audited.                                                                                                          |

Ignored local evidence: `artifacts/phase-6/external-links.json`, HTTP HTML responses, and `external-resume.png` / `external-demo.png`. No resume PDF was downloaded into or committed to this repository. Recheck Drive sharing in an incognito browser before release because the owner can change permissions later. Portfolio copy was not rewritten from the linked PDF.

## Optional profile photo

`src/components/ui/profile-photo.tsx` is a reusable Next Image wrapper. The About section passes the optional `profile.photo` value. It returns null while the asset is unset, so there is no fake image, reserved empty slot, request, or change to the hero illustration.

To install the real photo:

1. Create `public/images/` if needed and place the image at **`public/images/kishore-kattiri.webp`**.
2. Prefer an **800×800 square WebP**, around **200 KiB or less**; JPEG is also suitable when the filename and dimensions are updated consistently. Prepare a square crop rather than stretching a source.
3. In `src/data/profile.ts`, replace `photo: undefined as ProfilePhotoConfig | undefined` with:

```ts
photo: {
  src: '/images/kishore-kattiri.webp',
  alt: 'Portrait of Kishore Kattiri',
  width: 800,
  height: 800,
} satisfies ProfilePhotoConfig,
```

Intrinsic dimensions and a square aspect ratio reserve layout space. Responsive sizes, default lazy loading, a maximum display width of 320px, object-fit cropping, and the existing radius token keep it consistent with the editorial layout. This uses native Next/Vercel image optimization and no remote host configuration or new dependency. Component tests cover the absent state and configured optimized markup, not a real photo's appearance or measured CLS. After adding the real asset, verify crop, alt text, optimized response, layout, and CLS. A missing photo does not block deployment.

## GitHub repository and root directory

Verified locally and with a read-only `git ls-remote --heads origin`:

```text
C:/Users/CHECK/Desktop/port/             separate outer Git repository, no remote
└── Portfolio/                          actual target Git/Next.js root
    ├── .git/                           origin below
    ├── .github/workflows/ci.yml
    ├── package.json
    ├── package-lock.json
    └── src/
```

- Target remote fetch/push: **`https://github.com/21pa5a0507/Portfolio.git`**.
- Current branch: **`main`**.
- Local HEAD, cached `origin/main`, and live remote `main`: **`b4a4d15ff7025a171b5a9c867129d40fe54b5a54`** (`phase4`). A final read-only remote recheck returned the same hash. Nothing is staged; local/cached main remains 0 ahead / 0 behind.
- `package.json` is at that GitHub repository's root, not inside an additional repository-relative `Portfolio/` folder. Use Vercel Root Directory **`.`** and normal GitHub Actions checkout working directory.
- The already approved Phase 5 changes remain uncommitted from before this turn. The proposed commit must include them as well as Phase 6, otherwise the updated application would omit required QA/SEO files.
- `Test-check.py` and unrelated outer-workspace files were not changed. No files were deleted or history rewritten.

`.gitignore` excludes dependencies, build output, local environment files (except the non-secret `.env.example`), Vercel state, browser reports/traces/screenshots, audit artifacts, local tools, logs, and common private-key/certificate formats. Eligible/tracked-file review found none of those excluded outputs in the proposed commit. The only environment template is `.env.example`; recognized private-key/token patterns were not found in commit-eligible source/configuration. This is a targeted scan, not a complete Git-history secret audit.

## Prepared GitHub Actions CI

File: **`.github/workflows/ci.yml`**. It is prepared locally and has not run on GitHub because nothing was pushed.

- Runs on pushes to `main`, pull requests, or manual dispatch; Ubuntu 24.04, Node 24 from `.nvmrc`, npm cache, and `npm ci`.
- Read-only `contents` permission, checkout without persisted credentials, concurrency cancellation, and a 30-minute job timeout. No deployment tokens, secrets, publishing permissions, `pull_request_target`, or deployment step.
- Official `actions/checkout`, `actions/setup-node`, and `actions/upload-artifact` v6 references are pinned to immutable SHAs resolved using their official repositories' remote tags:

| Action             | Pinned SHA                                 |
| ------------------ | ------------------------------------------ |
| checkout v6        | `d23441a48e516b6c34aea4fa41551a30e30af803` |
| setup-node v6      | `249970729cb0ef3589644e2896645e5dc5ba9c38` |
| upload-artifact v6 | `b7c566a772e6b6bfb58ed0dc250532a479d7789f` |

- A production dependency audit blocks on findings. The complete audit is retained as a nonblocking report because of the acknowledged development-only advisory; it is not represented as clean.
- Checks content, strict TypeScript, zero-warning ESLint, Prettier, unit/component tests, and an explicit production build. Installs Chromium, Firefox, WebKit, and their Linux dependencies, then runs the complete Playwright suite, including axe.
- `PLAYWRIGHT_SKIP_BUILD=1` is used only after the explicit build succeeds, so Playwright starts that production build instead of rebuilding it. Its ordinary local default still builds before starting.
- CI forces `SITE_INDEXING=false`, `VERCEL_ENV=preview`, and an empty origin for deterministic unpublished-state tests.
- QA evidence/traces/HTML report are retained for seven days with an always-run artifact upload. No artifacts are committed.

Local YAML parsing succeeded: expected triggers, read-only permission, one job, and 14 steps. This is syntax/structure validation, not proof of a GitHub-hosted run. Linux browser execution, actual npm cache behavior, and required branch checks must be verified after the approved push. Review official action updates periodically and refresh SHA pins deliberately.

CI status does not automatically gate Vercel's independent GitHub auto-deploys. Wait for the first real CI run before importing the project; configure an appropriate main-branch merge policy after approval if CI must gate later releases. No remote branch protection or deployment protection was changed here.

## Required Vercel Hobby settings

These are prepared settings, **not changes already applied to an external account**:

| Setting                                    | Required value                                                  |
| ------------------------------------------ | --------------------------------------------------------------- |
| Git provider / repository                  | GitHub / `21pa5a0507/Portfolio`                                 |
| Production branch                          | `main`                                                          |
| Root Directory                             | **`.`** (the Git repository root containing `package.json`)     |
| Framework preset                           | **Next.js**                                                     |
| Node.js                                    | **24.x**, consistent with package engines and `.nvmrc`          |
| Install command                            | `npm ci`                                                        |
| Build command                              | `npm run build`                                                 |
| Output directory                           | Leave the Next.js framework default; no `public`/`out` override |
| Plan / domain                              | Hobby / the actual assigned free Vercel subdomain               |
| Initial Production and Preview environment | `SITE_INDEXING=false`; origin unset until known                 |

Native GitHub integration supports branch previews. No Vercel CLI dependency, `vercel.json`, custom backend, database, CMS, paid service, or custom domain was added. Do not import/connect the project before approval: the native integration can immediately trigger a deployment.

References checked during preparation: [Vercel build/root settings](https://vercel.com/docs/builds/configure-a-build), [Vercel GitHub integration](https://vercel.com/docs/git/vercel-for-github), [supported Node versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions), and [Next Image](https://nextjs.org/docs/app/api-reference/components/image). Node 24 is currently supported by Vercel. The actual account/project settings and deployment are not yet verified.

## SEO and publication sequence after approval

1. Commit/push only the reviewed manifest, with a normal fast-forward workflow. Fetch/recheck remote history before pushing; never force-push or overwrite remote work.
2. Verify the real GitHub Actions run. Configure Vercel's native integration and the settings above only when deployment is approved.
3. Deploy initially with indexing disabled. Obtain the actual **stable production** HTTPS origin assigned by Vercel, not a guessed or branch-preview URL.
4. Set `NEXT_PUBLIC_SITE_URL` to that actual origin, without a path, credentials, query, or fragment, and redeploy. Canonical URLs, Open Graph/social preview URLs, Person/project schema URLs, sitemap, and robots sitemap reference all derive from it.
5. Verify the deployed homepage, listing, all three case studies, 404, `/social-preview`, `/sitemap.xml`, `/robots.txt`, new external actions, keyboard behavior, and responsive layouts.
6. Only with explicit public-indexing approval, set `SITE_INDEXING=true` in Production and redeploy. Confirm content pages serve `index, follow`, robots allows `/`, and canonical/sitemap URLs use the actual origin. The custom 404 stays unindexed.
7. Keep Preview explicitly false. The existing `VERCEL_ENV` guard also prevents indexing on Vercel preview/development builds even if a production flag is inherited. Verify an actual preview response after deployment.

No actual URL or indexing flag has been set in this preparation. Indexing preferences are not access control. No Vercel account authentication or GitHub App authorization was requested or changed; access will need to be confirmed during the approved deployment.

## Local verification results

All **99 enabled browser cases** were verified passing across the full run and a targeted rerun; **three existing Windows WebKit Tab cases remain explicitly skipped**. This is not a claim that the initial full command exited successfully: it ended with 95 passed, four screenshot-batch timeouts, and three skips. The four affected batches then passed with their assertions unchanged and a corrected 90-second batch budget.

| Command / verification                                                    | Actual result                                                                                                                                                                                                             |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run validate:content` (including build/typecheck hooks)              | Exit 0; three project metadata entries and matching MDX files validated.                                                                                                                                                  |
| `npm run typecheck`                                                       | Passed; strict TypeScript and generated route types.                                                                                                                                                                      |
| `npm run lint`                                                            | Passed; zero warnings.                                                                                                                                                                                                    |
| `npm run format:check`                                                    | Passed; final documentation formatting rechecked before handoff.                                                                                                                                                          |
| `npm run build`                                                           | Exit 0; optimized build and all ten static outputs generated.                                                                                                                                                             |
| `npm test`                                                                | Exit 0; **20 tests in four files**, including two new portrait component tests.                                                                                                                                           |
| Focused `npm run test:e2e -- --workers=1 --grep 'confirmed resume'`       | Exit 0; **3/3** across Chromium, Firefox, WebKit, including actual secure popup behavior against a deterministic intercepted test response.                                                                               |
| Full `npm run test:e2e -- --workers=1`                                    | Exit 1; **95 passed, four 30-second screenshot-batch timeouts, three existing platform skips**, 16.5 minutes. No layout/URL/accessibility assertion failure was reported in the timed-out batches.                        |
| Targeted `npm run test:e2e -- --project=webkit --workers=1 --last-failed` | Exit 0; **all four affected batches passed**, 2.5 minutes, under the corrected 90-second batch limit. The assertions and application code were unchanged.                                                                 |
| Axe WCAG checks through Playwright                                        | **66 scans, zero violations** across five pages, both themes, desktop/mobile and open-menu states. Eight incomplete decorative-SVG contrast entries per engine remain a manual-review category, as documented in Phase 5. |
| 200% text resize                                                          | **75 page/viewport cases, zero document overflow or clipped text**.                                                                                                                                                       |
| Browser console/page error collections                                    | Empty for all three engines.                                                                                                                                                                                              |
| `npm audit --omit=dev --json`                                             | Exit 0; **zero production vulnerabilities**.                                                                                                                                                                              |
| `npm audit --json`                                                        | Exit 1; the same **five high development entries**.                                                                                                                                                                       |
| Local workflow YAML parsing                                               | Expected three triggers, read-only permissions, one job, 14 steps. Remote GitHub execution not performed.                                                                                                                 |
| `git diff --check`                                                        | Exit 0; no whitespace errors.                                                                                                                                                                                             |

Browsers actually launched: Google Chrome **155.0.8059.84**, Firefox **157.0**, Playwright WebKit **27.2**, on Windows. Final unique enabled-case coverage: Chromium **34**, Firefox **34**, WebKit **31**, plus its **three skips**. Five widths (320/375/768/1024/1440), both themes, navigation, MDX routes, missing routes, new links, motion preferences, and accessible controls were exercised.

The local browser environment used `PLAYWRIGHT_CHANNEL=chrome`, `PLAYWRIGHT_ALL_BROWSERS=1`, and the existing workspace browser cache. The application was explicitly built first and served with `npm start`; tests used `PLAYWRIGHT_SKIP_BUILD=1` against that current build. Four long Windows WebKit capture batches exceeded the old per-test 30-second budget (not an application performance target). Their corrected reruns took 32.6s, 33.7s, 32.9s, and 48.3s. Only the batch timeout increased; no checks were removed or weakened.

The production build initially caught URL literal widening in profile data; making the typed profile immutable corrected it. Prettier also caught one new test file's formatting; the file was formatted and the check passed. These diagnostic failures are not counted as passing runs.

Fresh browser/a11y JSON evidence is copied to ignored `artifacts/phase-6/`; legacy screenshot batches also use the existing Phase 3/4 artifact locations. Actual new mobile/desktop resume actions and the demo card/case-study header were captured and selected screenshots opened for visual review. These include [mobile resume action](../artifacts/phase-6/homepage-resume-mobile.png), [desktop resume action](../artifacts/phase-6/homepage-resume-desktop.png), [demo card](../artifacts/phase-6/hexpilot-demo-card.png), and [demo case-study header](../artifacts/phase-6/hexpilot-demo-case.png). The real portrait is still absent.

## Security and remaining limitations

- No Phase 6 dependencies were added or upgraded. The pending lockfile changes belong to the approved Phase 5 dev-only QA additions.
- The known chain remains `eslint-config-next@16.4.2 → @next/eslint-plugin-next@16.4.2 → fast-glob@3.3.1 → micromatch@4.0.8 → braces@3.0.3`. Five high package entries represent one upstream development-tool advisory; production audit is clean. No force fix, override, downgrade, or breaking upgrade was applied. See [security-review.md](security-review.md).
- Three native Tab-order tests are excluded on this Windows WebKit build after a minimal native-link reproduction; Chromium/Firefox assertions remain enabled. They are unverified cases, not passes. Linux CI and actual Safari with full keyboard navigation still require verification.
- Automated axe/role/focus checks do not establish complete WCAG 2.2 AA conformance. NVDA/JAWS/VoiceOver, speech navigation, physical devices, and OS/browser zoom remain manual follow-ups.
- No new Lighthouse or real-user INP measurement is claimed in Phase 6. Phase 5's recorded scores describe its earlier build. New resume/demo actions change a small part of the layout; repeat Lighthouse on the final deployed origin. Field INP remains unavailable before real use.
- The real profile photo has not been supplied or visually evaluated. Its absence is intentional and nonblocking.
- Font downloads need build-time Google Fonts access. Runtime fonts remain self-hosted.
- Drive sharing and demo uptime can change. Anonymous access was verified at preparation time; no claim is made about every external feature or future availability.

## Exact files and intended commit contents

Proposed commit title: **`Prepare portfolio QA, public links, and deployment workflow`**. The reviewed working-tree manifest contains **27 modified tracked files and 16 new files**, including approved Phase 5 carryover. Nothing is staged or committed. Local/cached main divergence is **0 ahead / 0 behind** before making this proposed commit.

Phase 6 directly changed/added 20 files: `.gitignore`, `README.md`, this report, `.github/workflows/ci.yml`, `playwright.config.ts`, `e2e/configuration.spec.ts`, `e2e/homepage.spec.ts`, `e2e/polish.spec.ts`, `e2e/projects.spec.ts`, `src/app/projects/[slug]/page.tsx`, `src/components/projects/project-card.tsx`, `src/components/sections/about.tsx`, `src/components/sections/hero.tsx`, `src/components/ui/external-link.tsx`, `src/components/ui/profile-photo.tsx`, `src/data/profile.ts`, `src/data/projects.ts`, `src/lib/types.ts`, `src/styles/globals.css`, and `tests/profile-photo.test.tsx`.

Full intended commit contents, relative to the target Git repository root (`M` = tracked modification; `A` = new file to add after approval):

```text
M .env.example
M .gitignore
M README.md
M docs/security-review.md
M e2e/homepage.spec.ts
M e2e/polish.spec.ts
M e2e/projects.spec.ts
M eslint.config.mjs
M package-lock.json
M package.json
M playwright.config.ts
M src/app/layout.tsx
M src/app/not-found.tsx
M src/app/page.tsx
M src/app/projects/[slug]/page.tsx
M src/app/projects/page.tsx
M src/components/layout/site-header.tsx
M src/components/projects/project-card.tsx
M src/components/sections/about.tsx
M src/components/sections/hero.tsx
M src/data/profile.ts
M src/data/projects.ts
M src/lib/site.ts
M src/lib/types.ts
M src/styles/globals.css
M src/styles/home.css
M src/styles/projects.css
A .github/workflows/ci.yml
A docs/phase-5.md
A docs/phase-6.md
A e2e/configuration.spec.ts
A e2e/quality.spec.ts
A scripts/audit-performance.mjs
A src/app/robots.ts
A src/app/sitemap.ts
A src/app/social-preview/route.tsx
A src/components/ui/external-link.tsx
A src/components/ui/profile-photo.tsx
A src/components/ui/structured-data.tsx
A src/lib/structured-data.ts
A tests/profile-photo.test.tsx
A tests/seo.test.ts
A tests/theme-toggle.test.tsx
```

Use only this reviewed manifest after approval. Exclude `.tools`, `node_modules`, `.next`, artifacts, browser reports/traces, real environment files, private keys, and unrelated outer-workspace files. `Test-check.py` is unchanged and not part of this proposed commit. The outer repository's untracked `.gitignore` and embedded `Portfolio/` entry are not to be staged or pushed.

## Deployment approval checklist

- [x] Target repository and actual application root inspected.
- [x] Confirmed resume/demo configured and anonymous entry access checked.
- [x] Private project repository remains hidden; no fake PDF/photo/domain.
- [x] Optional photo component and exact asset instructions prepared.
- [x] CI prepared without deployment or indexing side effects.
- [x] Environment/credential/build/test-output exclusions reviewed.
- [x] Record final regression, formatting, type/lint/build, and audit results above, including the initial timeout results and successful reruns.
- [ ] Owner approves exact commit/push and Vercel deployment.
- [ ] Normal commit/push to the verified target repository; verify remote CI.
- [ ] Confirm Vercel account/GitHub integration access; import with root `.`.
- [ ] Obtain actual production origin, configure SEO origin, and redeploy.
- [ ] Verify production and preview responses, external links, and image/social assets.
- [ ] Obtain explicit indexing approval before enabling production indexing.
- [ ] Complete manual accessibility and deployed performance checks.

**Stop here until approval.** Local preparation does not authorize a push, deployment, or public indexing.
