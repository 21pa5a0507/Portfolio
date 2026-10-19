import { execFileSync } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { cpus, platform, release } from 'node:os';

// Audit a separately started production server. Reports remain local artifacts.
const origin = process.env.AUDIT_ORIGIN ?? 'http://127.0.0.1:3000';
const directory = resolve('artifacts/phase-5');
await mkdir(directory, { recursive: true });
const routes = [
  '/',
  '/projects',
  '/projects/hexpilot',
  '/projects/enterprise-ai-assistant',
  '/projects/uem-compliance',
];
const results = [];
for (const formFactor of ['mobile', 'desktop']) {
  for (const route of routes) {
    const name = `${formFactor}-${route === '/' ? 'home' : route.slice(1).replaceAll('/', '-')}`;
    const output = resolve(directory, `lighthouse-${name}`);
    const args = [
      resolve('node_modules/lighthouse/cli/index.js'),
      `${origin}${route}`,
      '--quiet',
      '--chrome-flags=--headless --disable-gpu',
      '--output=json',
      '--output=html',
      `--output-path=${output}`,
      '--only-categories=performance,accessibility,best-practices,seo',
      '--screenEmulation.deviceScaleFactor=1',
      '--screenEmulation.height=1000',
    ];
    if (formFactor === 'desktop')
      args.push(
        '--preset=desktop',
        '--screenEmulation.width=1440',
        '--screenEmulation.mobile=false',
      );
    else
      args.push('--screenEmulation.width=375', '--screenEmulation.mobile=true');
    execFileSync(process.execPath, args, { stdio: 'inherit', timeout: 180000 });
    const report = JSON.parse(await readFile(`${output}.report.json`, 'utf8'));
    const audits = report.audits;
    const resources = audits['network-requests'].details.items;
    const result = {
      route,
      formFactor,
      lighthouse: report.lighthouseVersion,
      browser: report.environment.networkUserAgent,
      settings: report.configSettings,
      scores: Object.fromEntries(
        Object.entries(report.categories).map(([key, value]) => [
          key,
          Math.round(value.score * 100),
        ]),
      ),
      lcpMs: audits['largest-contentful-paint'].numericValue,
      cls: audits['cumulative-layout-shift'].numericValue,
      tbtMs: audits['total-blocking-time'].numericValue,
      fcpMs: audits['first-contentful-paint'].numericValue,
      javascriptTransferBytes: resources
        .filter((entry) => entry.resourceType === 'Script')
        .reduce((total, entry) => total + entry.transferSize, 0),
      javascriptResourceBytes: resources
        .filter((entry) => entry.resourceType === 'Script')
        .reduce((total, entry) => total + entry.resourceSize, 0),
      scriptBootupMs: audits['bootup-time'].numericValue,
      mainThreadMs: audits['mainthread-work-breakdown'].numericValue,
      fonts: resources
        .filter((entry) => entry.resourceType === 'Font')
        .map((entry) => ({
          url: entry.url,
          transferBytes: entry.transferSize,
        })),
      thirdPartyRequests: resources
        .filter((entry) => new URL(entry.url).origin !== origin)
        .map((entry) => entry.url),
      errors: report.runWarnings,
    };
    results.push(result);
    console.log(
      JSON.stringify({
        name,
        scores: result.scores,
        lcpMs: result.lcpMs,
        cls: result.cls,
        tbtMs: result.tbtMs,
      }),
    );
    await writeFile(
      resolve(directory, 'performance-summary.json'),
      JSON.stringify(
        {
          environment: {
            node: process.version,
            platform: platform(),
            release: release(),
            cpu: cpus()[0]?.model,
          },
          results,
        },
        null,
        2,
      ),
    );
  }
}
