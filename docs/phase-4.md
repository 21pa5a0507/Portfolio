# Phase 4 — visual polish, responsiveness, accessibility, and interactions

Completed locally on 16 October 2026. Phase 5 has not started. No content facts, routes, metadata architecture, dependency versions, or optional-link configuration were changed. Nothing was deployed.

## Visual improvements

- Retained the engineering editorial design, exact light/dark palette, Geist typography, 1120px content grid, original illustrations, and experience-first section order.
- Increased the prominence of the Hexnode company heading and improved role, contribution-heading, body, and impact-label readability. The internship remains smaller and concise.
- Fixed cramped impact metrics at 320px. On narrow phones, managed-device scale occupies its own row above the two retrieval/accuracy metrics. Every original metric and its unit remains unchanged. Numeric glyphs use tabular figures.
- Adjusted mobile hero typography for more comfortable line breaks. Improved project categories, technology tags, case-study prose, diagram notes, and captions. Long headings can wrap without overflowing.
- Extended the tablet project composition through 1100px: a wide featured row above the two professional cards, avoiding the empty-column effect at 1024px. The large-desktop asymmetry and single-column phone layout remain.
- Centralized section spacing and the 180ms UI transition token. Card borders, button surfaces, navigation, and focus treatments use the existing semantic palette.

## Interactions and accessibility

- Homepage active-section navigation uses one IntersectionObserver in the existing client header. The visible state combines color and an underline; `aria-current="location"` supplies a semantic indication. Project pages identify the Projects location.
- Fixed an existing mobile-navigation exception: project-page links without a hash are no longer sent to `querySelector` with an empty selector.
- Preserved native disclosure navigation and normal Tab order. Escape closes the menu and returns focus to its toggle. Crossing the mobile/desktop breakpoint transfers focus to a visible equivalent navigation link or the menu toggle.
- Added card hover/focus-within borders and a small case-link arrow response. Buttons and the theme control have restrained hover/press transitions. No card-wide click handlers or redundant tab stops were added.
- Native smooth anchor scrolling is enabled only when the user does not request reduced motion. Reduced motion removes transitions and press/arrow movement. Broad functional tests explicitly use reduced motion for deterministic anchor assertions; a dedicated test verifies actual smooth scrolling and preference changes.
- Kept immediate visible two-pixel focus outlines, with a forced-colors system highlight fallback. MDX section headings and the 404 main landmark can receive programmatic anchor/skip-link focus.
- Verified semantic landmarks, heading progression, decorative SVG exclusion, and visible link/button touch-target dimensions on representative mobile/desktop pages. Informative architecture labels remain accessible HTML rather than text hidden inside SVG.
- Tested all twelve foreground/secondary/accent combinations against the background and surface tokens across both themes; each met the 4.5:1 AA normal-text threshold. This is token-pair verification, not a complete rendered-page contrast or WCAG conformance audit.

## Files changed

- `src/styles/globals.css`: shared spacing/transition tokens, button states, focus/reduced-motion behavior, native smooth scrolling, and heading wrapping.
- `src/styles/home.css`: experience typography, responsive metrics, project proportions, navigation states, card focus/hover, and supporting text sizes.
- `src/styles/projects.css`: case-study and diagram readability, contents-link states, and section-target treatment.
- `src/components/layout/site-header.tsx`: active sections, accessible breakpoint focus transfer, and safe hash handling.
- `src/components/ui/theme-toggle.tsx`: theme-control styling hook and descriptive native tooltip.
- `src/mdx-components.tsx`, `src/app/not-found.tsx`: programmatic focus targets.
- `e2e/polish.spec.ts`: five-width/two-theme captures and focused accessibility/interaction checks.
- `e2e/homepage.spec.ts`, `e2e/projects.spec.ts`: explicit reduced-motion preference for existing regression checks; all prior behavior assertions remain.
- README and this report: current milestone status, interaction behavior, screenshot locations, and verification limits.

## Verification results

| Check                                                       | Final result                                                                                              |
| ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `npm run validate:content`                                  | Passed: three metadata/MDX pairs                                                                          |
| `npm run typecheck`                                         | Passed                                                                                                    |
| `npm run lint`                                              | Passed with zero warnings                                                                                 |
| `npm run format:check`                                      | Passed after formatting                                                                                   |
| Production build                                            | Passed via the browser runner's `npm run build && npm run start` command; existing static routes retained |
| `npm test`                                                  | 12 tests passed                                                                                           |
| `PLAYWRIGHT_CHANNEL=chrome npm run test:e2e -- --workers=1` | 30 tests passed in the final complete run                                                                 |

The browser suite retained the previous 16 regression tests and added 14 polish tests. Ten of the new tests open all five routes at each requested width in each theme: 50 route/viewport/theme combinations. They check response status, a single H1, horizontal overflow, metric fit, and metric overlap while capturing the rendered pages. The four interaction/accessibility tests cover menu keyboard behavior and resize focus, smooth/reduced-motion behavior and card focus, semantics and target dimensions, and text-token contrast. New test-only selector and shorthand-hex parsing errors found during verification were corrected before the final passing run.

## Actual visual review and screenshots

Opened the portfolio in installed headless Chrome, captured rendered pages, and inspected the resulting images. Baseline renders at 320 and 1024px exposed the narrow metric collision and tablet card proportion issue. Final captures cover the homepage, experience, project listing, HexPilot, and both professional cases at 320, 375, 768, 1024, and 1440px in both themes.

Manual image inspection included the narrow-phone experience and dark hero; mobile HexPilot title/contents; tablet hero and diagrams; 1024px project listing; desktop dark hero and light experience; desktop About, Skills, Achievements, and full-page visual rhythm; mobile dark Education and Contact; active mobile navigation; and dark case-study diagrams. Capturing every combination is not a claim that every pixel or interaction in every capture received a manual audit.

Artifacts are ignored by Git:

- `artifacts/phase-4/before/`: initial comparison captures.
- `artifacts/phase-4/after/`: final viewport/full-page/diagram captures, individual homepage sections, active mobile menu, and keyboard-focused card.

Isolated section screenshots hide only the sticky header and skip link during capture to prevent overlay artifacts. Full-page and viewport captures retain the actual page presentation.

## Remaining limitations

- Browser verification used installed Chrome and emulated viewport/media preferences. Firefox, Safari, physical touch devices, and manual screen-reader testing remain unverified.
- No complete WCAG 2.2 audit or accessibility certification is claimed. First-paint theme-flash measurement, browser zoom/text-spacing audits, and broader component tests remain for later quality work.
- Lighthouse and field performance have not been measured; no performance score is claimed.
- Previously documented development-tool dependency findings remain deferred in `security-review.md`; dependency versions were unchanged in this phase.
- Resume/demo/domain inputs are still intentionally absent. Development `noindex` remains in place; no publication or deployment was performed.

Phase 4 is ready for approval before any Phase 5 work.
