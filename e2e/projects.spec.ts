import { test, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { projects } from '../src/data/projects';

test.use({ colorScheme: 'light', reducedMotion: 'reduce' });

for (const width of [375, 768, 1440]) {
  test(`projects listing and all case studies work at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 1000 });
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await mkdir('artifacts/phase-3', { recursive: true });
    await page.goto('/projects');
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(
      'Software in practice.',
    );
    await expect(page.locator('.project-case-link')).toHaveCount(
      projects.length,
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: `artifacts/phase-3/projects-${width}.png`,
      fullPage: true,
    });

    const titles = new Set<string>();
    for (const project of projects) {
      const { slug } = project;
      await page
        .locator(`.project-case-link[href="/projects/${slug}"]`)
        .click();
      await expect(page).toHaveURL(new RegExp(`/projects/${slug}$`));
      await expect(page.locator('main h1')).toHaveCount(1);
      if (
        ['hexpilot', 'enterprise-ai-assistant', 'uem-compliance'].includes(slug)
      )
        await expect(page.locator('.architecture-figure')).toBeVisible();
      await expect(
        page.getByRole('link', { name: 'Live demo', exact: true }),
      ).toHaveCount(project.demoUrl ? 1 : 0);
      await expect(
        page.getByRole('link', { name: 'Source code', exact: true }),
      ).toHaveCount(project.repositoryUrl ? 1 : 0);
      const title = await page.title();
      expect(title).toContain('Kishore Kattiri');
      expect(titles.has(title)).toBe(false);
      titles.add(title);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute(
        'content',
        /.+/,
      );
      await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
        'content',
        'article',
      );
      const toc = page.getByRole('navigation', { name: 'On this page' });
      await expect(page.locator('.case-prose h2')).toHaveCount(
        await toc.getByRole('link').count(),
      );
      for (const link of await toc.getByRole('link').all()) {
        const target = await link.getAttribute('href');
        await expect(page.locator(target!)).toHaveCount(1);
        await link.click();
        await expect(page).toHaveURL(new RegExp(`${target}$`));
        expect(
          await page
            .locator(target!)
            .evaluate((element) => element.getBoundingClientRect().top),
        ).toBeGreaterThanOrEqual(88);
      }
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      const broken = await page
        .locator('a[href^="#"]')
        .evaluateAll((links) =>
          links
            .filter(
              (link) =>
                !document.getElementById(link.getAttribute('href')!.slice(1)),
            )
            .map((link) => link.getAttribute('href')),
        );
      expect(broken).toEqual([]);
      const ids = await page
        .locator('[id]')
        .evaluateAll((elements) => elements.map((element) => element.id));
      expect(new Set(ids).size).toBe(ids.length);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({
        path: `artifacts/phase-3/${slug}-${width}.png`,
        fullPage: true,
      });
      await page.screenshot({
        path: `artifacts/phase-3/${slug}-${width}-top.png`,
      });
      if (await page.locator('.architecture-figure').count())
        await page.locator('.architecture-figure').screenshot({
          path: `artifacts/phase-3/${slug}-${width}-diagram.png`,
          style: '.site-header, .skip-link { visibility: hidden !important; }',
        });
      await page
        .getByRole('link', { name: 'Back to projects', exact: true })
        .click();
      await expect(page).toHaveURL(/\/projects$/);
    }
    expect(errors).toEqual([]);
  });
}

test('project pages retain theme and their header links return to the correct homepage section', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto('/projects/hexpilot');
  await page
    .getByRole('button', { name: 'Theme: system. Switch to light theme' })
    .click();
  await page
    .getByRole('button', { name: 'Theme: light. Switch to dark theme' })
    .click();
  await page.getByRole('link', { name: 'All projects', exact: true }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.goto('/projects/uem-compliance');
  await mkdir('artifacts/phase-3', { recursive: true });
  await page.screenshot({
    path: 'artifacts/phase-3/uem-compliance-mobile-dark.png',
  });
  await page.locator('.architecture-figure').screenshot({
    path: 'artifacts/phase-3/uem-compliance-mobile-dark-diagram.png',
    style: '.site-header, .skip-link { visibility: hidden !important; }',
  });
  await page.getByRole('button', { name: 'Open navigation menu' }).click();
  await page
    .getByRole('navigation', { name: 'Mobile navigation' })
    .getByRole('link', { name: 'Experience' })
    .click();
  await expect(page).toHaveURL(/\/#experience$/);
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('#experience')).toContainText('Hexnode');
});

test('unknown project slugs return a real 404', async ({ page }) => {
  const response = await page.goto('/projects/unknown-project');
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole('heading', { name: 'This path ends here.' }),
  ).toBeVisible();
});
