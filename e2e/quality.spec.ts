import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';

const routes = [
  '/',
  '/projects',
  '/projects/hexpilot',
  '/projects/enterprise-ai-assistant',
  '/projects/uem-compliance',
];
test.use({ reducedMotion: 'reduce' });

test('automated WCAG audit covers every page, both themes, and menu states', async ({
  page,
}, info) => {
  test.setTimeout(180000);
  const findings: unknown[] = [];
  for (const width of [375, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const theme of ['light', 'dark'] as const) {
      await page.emulateMedia({ colorScheme: theme });
      for (const route of routes) {
        await page.goto(route);
        const result = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
          .analyze();
        findings.push({
          route,
          width,
          theme,
          violations: result.violations,
          incomplete: result.incomplete,
        });
      }
      if (width === 375) {
        await page
          .getByRole('button', { name: 'Open navigation menu' })
          .click();
        const result = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
          .analyze();
        findings.push({
          route: '/projects/uem-compliance',
          width,
          theme,
          menu: 'open',
          violations: result.violations,
          incomplete: result.incomplete,
        });
      }
    }
  }
  await mkdir('artifacts/phase-5', { recursive: true });
  await writeFile(
    `artifacts/phase-5/axe-${info.project.name}.json`,
    JSON.stringify(findings, null, 2),
  );
  const violations = findings as {
    route: string;
    width: number;
    theme: string;
    violations: { id: string; impact: string; nodes: unknown[] }[];
  }[];
  expect(
    violations.flatMap((entry) =>
      entry.violations.map((violation) => ({
        route: entry.route,
        width: entry.width,
        theme: entry.theme,
        id: violation.id,
        impact: violation.impact,
        nodes: violation.nodes,
      })),
    ),
  ).toEqual([]);
});

test('200% text resizing preserves content and prevents horizontal overflow', async ({
  page,
}, info) => {
  test.setTimeout(120000);
  const findings = [];
  for (const width of [320, 375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of routes) {
      await page.goto(route);
      await page.evaluate(() => {
        document.documentElement.style.fontSize = '200%';
      });
      await page.evaluate(() => document.fonts.ready);
      const result = await page.evaluate(() => ({
        viewport: innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        fontSize: getComputedStyle(document.documentElement).fontSize,
        clippedText: [
          ...document.querySelectorAll<HTMLElement>(
            'main p, main h1, main h2, main h3, main h4, main dt, main dd, main li, main .project-tags > span',
          ),
        ]
          .filter(
            (element) =>
              !element.classList.contains('sr-only') &&
              element.clientWidth > 0 &&
              element.scrollWidth > element.clientWidth + 1,
          )
          .map((element) => ({
            tag: element.tagName,
            text: element.textContent?.slice(0, 100),
            width: element.clientWidth,
            scrollWidth: element.scrollWidth,
          })),
        overflowing: [...document.querySelectorAll<HTMLElement>('body *')]
          .filter((element) => {
            const rect = element.getBoundingClientRect();
            return (
              rect.width > 0 &&
              (rect.right > innerWidth + 1 || rect.left < -1) &&
              getComputedStyle(element).position !== 'fixed'
            );
          })
          .slice(0, 15)
          .map((element) => ({
            tag: element.tagName,
            class: element.className,
            width: element.getBoundingClientRect().width,
          })),
      }));
      findings.push({ route, width, ...result });
      if (width === 320 && (route === '/' || route === '/projects/hexpilot')) {
        await mkdir('artifacts/phase-5', { recursive: true });
        await page.screenshot({
          path: `artifacts/phase-5/text-200-${info.project.name}-${route === '/' ? 'home' : 'hexpilot'}.png`,
          fullPage: false,
        });
      }
    }
  }
  await mkdir('artifacts/phase-5', { recursive: true });
  await writeFile(
    `artifacts/phase-5/text-resize-${info.project.name}.json`,
    JSON.stringify(findings, null, 2),
  );
  expect(
    findings.filter((entry) => entry.scrollWidth > entry.width + 1),
  ).toEqual([]);
  expect(
    findings.flatMap((entry) =>
      entry.clippedText.map((element) => ({
        route: entry.route,
        viewportWidth: entry.width,
        ...element,
      })),
    ),
  ).toEqual([]);
});

test('SEO routes, structured data, noindex default, and social preview are valid', async ({
  page,
  request,
  browser,
}, info) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text());
  });
  const titles = new Set<string>();
  for (const route of routes) {
    await page.goto(route);
    const title = await page.title();
    expect(titles.has(title)).toBe(false);
    titles.add(title);
    await expect(page.locator('meta[name="description"]')).toHaveCount(1);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      /noindex/,
    );
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      'content',
      'summary_large_image',
    );
    if (route !== '/projects') {
      const schema = await page
        .locator('script[type="application/ld+json"]')
        .textContent();
      expect(JSON.parse(schema!)['@type']).toBe(
        route === '/' ? 'Person' : 'TechArticle',
      );
    }
  }
  const robots = await request.get('/robots.txt');
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain('Disallow: /');
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain('<urlset');
  const image = await request.get('/social-preview');
  expect(image.status()).toBe(200);
  expect(image.headers()['content-type']).toContain('image/png');
  const missing = await request.get('/not-a-real-page');
  expect(missing.status()).toBe(404);
  expect(await missing.text()).toContain(
    '<title>Page not found | Kishore Kattiri</title>',
  );
  await mkdir('artifacts/phase-5', { recursive: true });
  await writeFile(
    `artifacts/phase-5/browser-${info.project.name}.json`,
    JSON.stringify({ version: browser.version(), errors }, null, 2),
  );
  await writeFile('artifacts/phase-5/social-preview.png', await image.body());
  expect(errors).toEqual([]);
});
