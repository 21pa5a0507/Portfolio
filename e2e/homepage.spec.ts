import { test, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { projects } from '../src/data/projects';
import { profile } from '../src/data/profile';

test.use({ colorScheme: 'light', reducedMotion: 'reduce' });

test('homepage keeps professional experience first and every link has a real destination', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Engineering AI-powered applications for real-world problems.',
  );
  await expect(page).toHaveTitle('Kishore Kattiri | AI Software Engineer');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    'content',
    profile.seoDescription,
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    'content',
    profile.seoTitle,
  );
  await expect(page.locator('.current-entry h3')).toHaveText(
    'Software Engineer',
  );
  await expect(page.locator('.current-entry h4')).toHaveText([
    'Agentic AI & Enterprise Knowledge Systems',
    'Backend & Enterprise Device Management',
    'Compliance & Security Engineering',
  ]);
  await expect(page.locator('#skills h3')).toHaveText([
    'AI Engineering',
    'Retrieval & Search',
    'Backend Engineering',
    'Frontend & Databases',
    'Cloud & DevOps',
  ]);
  expect(
    await page
      .locator('main > section')
      .evaluateAll((sections) => sections.map((section) => section.id)),
  ).toEqual([
    'home',
    'experience',
    'projects',
    'about',
    'skills',
    'education',
    'achievements',
    'contact',
  ]);
  await expect(page.locator('#experience')).toContainText('1,000+');
  await expect(page.locator('#experience')).toContainText(
    'managed devices supported',
  );
  await expect(page.locator('#experience')).toContainText('Windows MDM');
  await expect(page.locator('#experience')).toContainText(
    'internal CIS compliance benchmarks',
  );

  const links = await page
    .locator('a')
    .evaluateAll((elements) =>
      elements.map((element) => element.getAttribute('href') ?? ''),
    );
  for (const href of links) {
    expect(href).not.toBe('');
    expect(href).not.toBe('#');
    if (href.startsWith('#')) await expect(page.locator(href)).toHaveCount(1);
    else
      expect([
        'https://github.com/21pa5a0507',
        'https://linkedin.com/in/kishorekattiri',
        'mailto:kishorekattiri@gmail.com',
        'tel:+919346528404',
        '/projects',
        ...projects.map((project) => `/projects/${project.slug}`),
        ...projects.flatMap((project) =>
          [project.demoUrl, project.repositoryUrl].filter(Boolean),
        ),
        profile.resumeUrl,
      ]).toContain(href);
  }
  await expect(page.getByRole('link', { name: /résumé|resume/i })).toHaveCount(
    profile.resumeUrl ? 1 : 0,
  );
  await expect(
    page.getByRole('link', {
      name: 'Live Demo (opens in a new tab)',
      exact: true,
    }),
  ).toHaveCount(projects.filter((project) => project.demoUrl).length);
  await expect(
    page.getByRole('link', { name: 'Source code', exact: true }),
  ).toHaveCount(projects.filter((project) => project.repositoryUrl).length);
  await expect(page.locator('a[href^="/articles"]')).toHaveCount(0);
  const ids = await page
    .locator('[id]')
    .evaluateAll((elements) => elements.map((element) => element.id));
  expect(new Set(ids).size).toBe(ids.length);
  expect(errors).toEqual([]);
});

for (const width of [375, 1440]) {
  test(`every navigation anchor scrolls to its section at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    for (const section of [
      'experience',
      'projects',
      'about',
      'skills',
      'contact',
    ]) {
      if (width < 768)
        await page
          .getByRole('button', { name: 'Open navigation menu' })
          .click();
      const nav = page.getByRole('navigation', {
        name: width < 768 ? 'Mobile navigation' : 'Main navigation',
      });
      await nav.locator(`a[href="#${section}"]`).click();
      await expect(page).toHaveURL(new RegExp(`#${section}$`));
      const top = await page
        .locator(`#${section}`)
        .evaluate((element) => element.getBoundingClientRect().top);
      expect(top).toBeGreaterThanOrEqual(88);
      expect(top).toBeLessThan(900);
    }
  });
}

for (const width of [320, 375, 768, 1024, 1440]) {
  test(`layout, navigation, and project links at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    const overflow = () =>
      page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth,
      );
    expect(await overflow()).toBe(false);

    if (width < 768) {
      const menu = page.getByRole('button', { name: 'Open navigation menu' });
      await expect(
        page.getByRole('navigation', { name: 'Mobile navigation' }),
      ).toBeHidden();
      await menu.click();
      await expect(
        page.getByRole('button', { name: 'Close navigation menu' }),
      ).toHaveAttribute('aria-expanded', 'true');
      await page.keyboard.press('Escape');
      await expect(menu).toBeFocused();
      await menu.click();
      if (width === 375) {
        await mkdir('artifacts/phase-2', { recursive: true });
        await page
          .locator('header')
          .screenshot({ path: 'artifacts/phase-2/mobile-menu.png' });
      }
      await page
        .getByRole('navigation', { name: 'Mobile navigation' })
        .getByRole('link', { name: 'Experience' })
        .click();
      await expect(page).toHaveURL(/#experience$/);
      await expect(page.locator('#experience')).toBeFocused();
      await expect(menu).toHaveAttribute('aria-expanded', 'false');
    } else {
      await page
        .getByRole('navigation', { name: 'Main navigation' })
        .getByRole('link', { name: 'Experience' })
        .click();
      await expect(page).toHaveURL(/#experience$/);
      await expect(
        page.getByRole('button', { name: /navigation menu/ }),
      ).toBeHidden();
    }
    // Anchor target must clear the sticky header, including after the mobile menu collapses.
    await expect
      .poll(async () =>
        page
          .locator('#experience')
          .evaluate((element) =>
            Math.round(element.getBoundingClientRect().top),
          ),
      )
      .toBeGreaterThanOrEqual(88);
    await expect(page.locator('.project-case-link')).toHaveCount(
      projects.length,
    );
    expect(await overflow()).toBe(false);
    await page.evaluate(() => window.scrollTo(0, 0));
    if ([375, 768, 1440].includes(width)) {
      await mkdir('artifacts/phase-2', { recursive: true });
      await page.screenshot({
        path: `artifacts/phase-2/home-${width}-light.png`,
        fullPage: true,
      });
      await page.screenshot({
        path: `artifacts/phase-2/viewport-${width}.png`,
      });
      if (width === 1440)
        await page.screenshot({ path: 'artifacts/phase-2/hero-desktop.png' });
      for (const id of [
        'home',
        'experience',
        'projects',
        'skills',
        'education',
        'contact',
      ]) {
        await page.locator(`#${id}`).screenshot({
          path: `artifacts/phase-2/${id}-${width}.png`,
          style: '.site-header, .skip-link { visibility: hidden !important; }',
        });
      }
    }
  });
}

test('theme follows the system, persists manual preference, and can return to system', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('body')).toHaveCSS(
    'background-color',
    'rgb(17, 19, 21)',
  );
  await page
    .getByRole('button', { name: 'Theme: system. Switch to light theme' })
    .click();
  await expect(page.locator('body')).toHaveCSS(
    'background-color',
    'rgb(250, 250, 248)',
  );
  await page.reload();
  await expect(
    page.getByRole('button', { name: 'Theme: light. Switch to dark theme' }),
  ).toBeVisible();
  await page
    .getByRole('button', { name: 'Theme: light. Switch to dark theme' })
    .click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.setViewportSize({ width: 1440, height: 1000 });
  await mkdir('artifacts/phase-2', { recursive: true });
  await page.screenshot({
    path: 'artifacts/phase-2/home-1440-dark.png',
    fullPage: true,
  });
  await page.screenshot({ path: 'artifacts/phase-2/hero-desktop-dark.png' });
  await page
    .getByRole('button', { name: 'Theme: dark. Switch to system theme' })
    .click();
  expect(await page.evaluate(() => localStorage.getItem('theme'))).toBeNull();
  await page.emulateMedia({ colorScheme: 'light' });
  await expect(page.locator('body')).toHaveCSS(
    'background-color',
    'rgb(250, 250, 248)',
  );
});

test('keyboard skip link and project case-study links work', async ({
  page,
  browserName,
}) => {
  test.skip(
    browserName === 'webkit' && process.platform === 'win32',
    'Windows WebKit skips native links during Tab navigation; verify the native skip-link Tab path on Safari with full keyboard navigation.',
  );
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('link', { name: 'Skip to content' }),
  ).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
  const projectLink = page.locator('.project-case-link').first();
  await projectLink.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/projects\/hexpilot$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'HexPilot',
  );
});

test('missing routes return the custom 404', async ({ page }) => {
  const response = await page.goto('/not-a-real-page');
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole('heading', { name: 'This path ends here.' }),
  ).toBeVisible();
  await page.getByRole('link', { name: 'Back to home' }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Engineering AI-powered applications for real-world problems.',
  );
});
