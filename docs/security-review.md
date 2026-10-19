# Dependency security review

Reviewed on 16 October 2026. No dependency upgrades, overrides, or forced fixes were applied in Phase 2.

Rechecked on 19 October 2026 during Phase 5 after adding development-only axe and Lighthouse tools. The full audit still reports the same five high-severity entries below; the production-only audit reports zero vulnerabilities. `npm view braces version` still returns 3.0.3, and the primary advisory still lists no patched release. No forced fix, dependency downgrade, or override was applied. Raw current audit JSON is retained locally in `artifacts/phase-5/audit-full.json` and `audit-production.json`.

## Exact findings

`npm audit --json` reports five high-severity package entries, all propagated from one underlying advisory:

```text
eslint-config-next@16.4.2 (direct devDependency)
└── @next/eslint-plugin-next@16.4.2
    └── fast-glob@3.3.1
        └── micromatch@4.0.8
            └── braces@3.0.3
```

The five entries are `eslint-config-next`, `@next/eslint-plugin-next`, `fast-glob`, `micromatch`, and `braces`. They are not five separate root vulnerabilities.

The root advisory is [GHSA-vfj7-8cjw-p6xm / CVE-2026-93687](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm). Deeply nested brace patterns can exhaust recursive walkers and terminate the Node.js process with a `RangeError`. The advisory lists versions through 3.0.3 as affected and no patched release.

## Exposure in this repository

- `npm audit --omit=dev --json` reports **zero production vulnerabilities** as of this review. This is a dependency audit result, not a guarantee against all security issues.
- The affected chain belongs to ESLint tooling. It is installed on development machines and in build environments that include development dependencies. It is not imported by portfolio components.
- Inspection of `node_modules/@next/eslint-plugin-next/dist/utils/get-root-dirs.js` shows `fast-glob.globSync` processes explicitly configured `settings.next.rootDir` patterns. Without that setting it returns `context.cwd` directly. This portfolio does not configure `settings.next.rootDir`, so this observed call site is not traversed with a supplied glob during current linting.
- The portfolio has no visitor-controlled glob, file-upload, compilation, or arbitrary content input. Its homepage is prerendered. There is no identified visitor-to-vulnerable-parser input path.
- The practical concern is availability of a local or CI lint process if tooling is later changed to accept malicious deeply nested patterns. Arbitrary changes to lint configuration already require repository-level code review. Do not treat development-only classification as removal of the package or a patched status.

## Safe options

1. **Current approach:** retain compatible pinned versions and document the finding. Keep glob configuration trusted and review lint/configuration changes. Re-run the audit before deployment and when upstream publishes a patch.
2. When an upstream patch is published, update the affected lint chain within compatible version ranges, refresh the lockfile, and run type, lint, build, and browser checks. A narrow transitive override is an option only after a patched release exists and compatibility is verified.
3. A reviewed package patch with recursion-depth guards could mitigate the parser, but it adds security-sensitive maintenance responsibility. It is not adopted here.
4. Replacing the lint configuration to remove this dependency chain requires deliberately preserving Next, React, accessibility, and TypeScript lint coverage. That is a tooling change for separate approval, not an automatic audit fix.

Do **not** run `npm audit fix --force`: npm suggests downgrading `eslint-config-next` to 14.2.35, which changes framework lint behavior and mismatches Next 16. Do not override `braces` to the current affected release and claim remediation. ESLint 10 alone does not remove this chain and currently conflicts with the plugin peer ranges recorded in Phase 1.
