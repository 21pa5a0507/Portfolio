# Project case studies

Pair each entry in `src/data/projects.ts` with `<slug>.mdx` here. Slugs use lowercase letters, numbers, and hyphens. Static route generation and bundler imports discover new pairs automatically; no manual route or import registry is required.

Use plain-text `##` headings, with an Overview and at least one other supported section. `###` headings may divide a section. Do not add H1; the route provides the project title. The contents navigation and rendered H2 anchor IDs use the same normalization. Keep titles unique. Avoid inline JSX or Markdown formatting in section headings.

`npm run validate:content` rejects missing/orphan files, duplicate/unsafe slugs, incomplete metadata, duplicate/empty heading IDs, H1 headings, unsafe optional URLs, and any public HexPilot repository URL. Validation also runs automatically before dev, type checking, and builds. MDX syntax and component errors are checked by Next's compiler during the build.

`ArchitectureDiagram` is available in MDX with kinds `hexpilot`, `enterprise-ai-assistant`, and `uem-compliance`. It uses original SVG details and responsive HTML labels. New projects can omit it or add their own factual diagram separately.

Only include supplied facts. Omit unsupported challenges, tradeoffs, lessons, or future plans. Employer diagrams must be conceptual; never include proprietary code or infrastructure. MDX is trusted, version-controlled executable author content, not an input format for visitors. Do not enable remote MDX or arbitrary HTML ingestion.
