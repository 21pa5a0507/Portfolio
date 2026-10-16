# Phase 3 — project case studies

Completed locally on 16 October 2026. Phase 4 has not started. No deployment or dependency installation was performed.

## Routes and content

- `/projects`: responsive listing reusing the approved featured/supporting card composition.
- `/projects/hexpilot`: deepest case study, covering BM25/vector hybrid retrieval, FAISS, cross-encoder reranking, ONNX-based embeddings/ONNX Runtime, source-aware routing, LangGraph/ReAct workflows, MCP, PostgreSQL-backed tools, device information retrieval, FastAPI/React, Docker, and Cloud Run.
- `/projects/enterprise-ai-assistant`: professional responsibilities, generalized capability map, and the supplied 30% retrieval latency reduction / 40% response accuracy improvement.
- `/projects/uem-compliance`: three separate production workstreams, preserving managed-device units and the internal benchmark qualification for the CIS risk metric.
- Unsupported challenges, tradeoffs, lessons, and future plans are omitted. No proprietary infrastructure or new quantitative outcomes are asserted.

## Architecture decisions

Typed project metadata remains in `src/data/projects.ts`. Case-study bodies are local MDX files under `src/content/projects/`. `generateStaticParams` and bundler-discovered MDX imports produce static pages; `dynamicParams = false` rejects unknown slugs. A new project requires metadata and a matching MDX file, without a third import registry. Diagrams are optional for future content.

`scripts/validate-content.mjs` runs before dev, type checking, and production builds. It checks metadata/file pairing, safe/unique slugs, required metadata, required Overview plus another section, heading uniqueness, plain-text H2 headings, absence of an extra H1, HTTPS optional URLs, and the private HexPilot source-link rule. Fenced code examples are excluded when deriving headings. MDX syntax/component errors are checked by the Next build. Validation is structural; factual accuracy still requires author review.

MDX H2 elements and the contents list share heading-ID normalization. Contents navigation is sticky only on wide case-study pages and becomes a compact block above the article at tablet/mobile widths. Architecture figures combine original SVG details/connectors with responsive HTML text, keeping labels readable on small screens. Employer figures show capabilities/workstreams rather than internal infrastructure.

Homepage cards now link to real case studies, and the homepage includes a projects-list action. Shared header links resolve correctly from project routes back to homepage sections; the footer targets the current page's main landmark. Theme behavior is retained. No new client components or dependencies were needed.

Project pages have unique titles, descriptions, Open Graph metadata, and conditional canonical URLs. `NEXT_PUBLIC_SITE_URL` must be a real HTTPS origin. Canonical/OG URLs are omitted while unset. The development `noindex` setting is intentionally retained until launch readiness; sitemap, social-card, and full SEO work remain in their later milestone.

## Important source files

- `src/app/projects/page.tsx`, `layout.tsx`, `[slug]/page.tsx`: project routes and shared shell.
- `src/content/projects/*.mdx`: three factual narratives.
- `src/components/projects/project-card.tsx`, `architecture-diagram.tsx`: real case-study links and original diagrams.
- `src/lib/content-validation.ts`, `project-content.ts`, `site.ts`: validation, content lookup, and site-origin configuration.
- `src/mdx-components.tsx`: shared MDX heading and diagram components.
- `src/styles/projects.css`: responsive listing/case-study styles; shared card-link styling remains in `home.css`.
- `scripts/validate-content.mjs`, `package.json`: automated validation hooks and explicit module mode for Node's built-in TypeScript loading.
- `tests/content-validation.test.ts`, `e2e/projects.spec.ts`, updated `e2e/homepage.spec.ts`: unit and browser regression coverage. Browser tests enumerate typed metadata so future projects do not require a second route list.
- README and content-authoring documentation updated. Existing `Test-check.py` changes were preserved.

## Executed verification

| Check                                                       | Result                                                      |
| ----------------------------------------------------------- | ----------------------------------------------------------- |
| `npm run validate:content`                                  | Passed: three metadata/MDX pairs                            |
| `npm run typecheck`                                         | Passed                                                      |
| `npm run lint`                                              | Passed with zero warnings                                   |
| `npm run format:check`                                      | Passed after formatting                                     |
| `npm run build`                                             | Passed; listing and three case studies statically generated |
| `npm test`                                                  | 12 unit tests passed                                        |
| `PLAYWRIGHT_CHANNEL=chrome npm run test:e2e -- --workers=1` | 16 tests passed against a fresh production build            |

Browser checks cover every new route at 375, 768, and 1440px; homepage regression at 320, 375, 768, 1024, and 1440px; contents anchors and sticky-header clearance; unique IDs; supplied optional-link behavior; back links; cross-page navigation; theme persistence; metadata presence; and a real 404 for unknown project slugs. No horizontal overflow was detected. Browser tests reported no page errors on the project listing/case-study traversals.

Captured pages and diagrams are in ignored `artifacts/phase-3/`. Visually inspected the desktop listing and HexPilot layout, tablet HexPilot layout, mobile UEM header/contents layout, mobile HexPilot diagram, enterprise assistant desktop diagram, and dark mobile UEM diagram. Full-page captures show the actual page; isolated diagram screenshots hide the sticky header/skip link only for capture clarity.

## Limits and handoff

This verifies installed headless Chrome at emulated viewport sizes, not physical devices or other browsers. No Lighthouse scores, Core Web Vitals, or full WCAG conformance claims are made. The pre-existing development-tool audit findings were not changed; see `security-review.md`. No resume, demo URL, final domain, certificate links, screenshots of employer software, or public private-repository link were fabricated.

Phase 3 is ready for review. Phase 4 requires approval.
