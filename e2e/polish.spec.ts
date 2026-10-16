import { test, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

const stage =
  process.env.PORTFOLIO_CAPTURE_STAGE === 'before' ? 'before' : 'after';
const captureRoot = `artifacts/phase-4/${stage}`;

for (const width of [320, 375, 768, 1024, 1440]) {
  for (const theme of ['light', 'dark'] as const) {
    test(`visual review at ${width}px in ${theme} mode`, async ({ page }) => {
      await page.setViewportSize({ width, height: 1000 });
      await page.emulateMedia({ colorScheme: theme, reducedMotion: 'reduce' });
      await mkdir(captureRoot, { recursive: true });
      for (const route of [
        '/',
        '/projects',
        '/projects/hexpilot',
        '/projects/enterprise-ai-assistant',
        '/projects/uem-compliance',
      ]) {
        const response = await page.goto(route);
        expect(response?.status()).toBe(200);
        await page.evaluate(() => document.fonts.ready);
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true);
        await expect(page.locator('main h1')).toHaveCount(1);
        const name =
          route === '/' ? 'home' : route.replaceAll('/', '-').slice(1);
        const prefix = `${captureRoot}/${name}-${width}-${theme}`;
        await page.screenshot({ path: `${prefix}-top.png` });
        await page.screenshot({ path: `${prefix}-full.png`, fullPage: true });
        if (route === '/') {
          const metricsFit = await page
            .locator('.impact-metrics dd')
            .evaluateAll((values) =>
              values.every(
                (value) => value.scrollWidth <= value.clientWidth + 1,
              ),
            );
          expect(metricsFit).toBe(true);
          const overlap = await page
            .locator('.impact-metrics dd')
            .evaluateAll((values) =>
              values.some((value, index) =>
                values.slice(index + 1).some((other) => {
                  const a = value.getBoundingClientRect();
                  const b = other.getBoundingClientRect();
                  return (
                    a.left < b.right &&
                    a.right > b.left &&
                    a.top < b.bottom &&
                    a.bottom > b.top
                  );
                }),
              ),
            );
          expect(overlap).toBe(false);
          for (const id of ['experience', 'projects'])
            await page.locator(`#${id}`).screenshot({
              path: `${captureRoot}/${id}-${width}-${theme}.png`,
              style:
                '.site-header, .skip-link { visibility: hidden !important; }',
            });
          if (
            (width === 1440 && theme === 'light') ||
            (width === 375 && theme === 'dark')
          ) {
            for (const id of [
              'about',
              'skills',
              'education',
              'achievements',
              'contact',
            ])
              await page.locator(`#${id}`).screenshot({
                path: `${captureRoot}/${id}-${width}-${theme}.png`,
                style:
                  '.site-header, .skip-link { visibility: hidden !important; }',
              });
          }
        } else if (route.includes('/projects/')) {
          await page.locator('.architecture-figure').screenshot({
            path: `${prefix}-diagram.png`,
            style:
              '.site-header, .skip-link { visibility: hidden !important; }',
          });
        }
      }
    });
  }
}

test('mobile menu supports keyboard dismissal, resize focus, and the projects link without a hash', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/projects/hexpilot');
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const menu = page.getByRole('button', { name: 'Open navigation menu' });
  await menu.click();
  const mobile = page.getByRole('navigation', { name: 'Mobile navigation' });
  await page.keyboard.press('Tab');
  await expect(mobile.getByRole('link', { name: 'Experience' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(menu).toBeFocused();
  await menu.click();
  await mobile.getByRole('link', { name: 'Projects' }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await page.getByRole('button', { name: 'Open navigation menu' }).click();
  await expect(mobile.getByRole('link', { name: 'Projects' })).toHaveAttribute(
    'aria-current',
    'location',
  );
  await mkdir(captureRoot, { recursive: true });
  await page
    .getByRole('banner')
    .screenshot({ path: `${captureRoot}/mobile-menu-active.png` });
  await mobile.getByRole('link', { name: 'Skills' }).focus();
  await page.setViewportSize({ width: 1440, height: 900 });
  const desktop = page.getByRole('navigation', { name: 'Main navigation' });
  await expect(desktop.getByRole('link', { name: 'Skills' })).toBeFocused();
  await page.setViewportSize({ width: 375, height: 900 });
  await expect(
    page.getByRole('button', { name: 'Open navigation menu' }),
  ).toBeFocused();
  expect(errors).toEqual([]);
});

test('smooth anchors, active navigation, and card focus respect motion preference', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({
    reducedMotion: 'no-preference',
    colorScheme: 'light',
  });
  await page.goto('/');
  await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'smooth');
  const projectsLink = page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'Projects' });
  await projectsLink.click();
  await expect
    .poll(() =>
      page
        .locator('#projects')
        .evaluate((element) => Math.round(element.getBoundingClientRect().top)),
    )
    .toBe(96);
  await expect(projectsLink).toHaveAttribute('aria-current', 'location');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto');
  const cardLink = page.locator('.project-case-link').first();
  await cardLink.focus();
  await page.keyboard.press('Tab');
  await page.keyboard.press('Shift+Tab');
  await expect(cardLink).toBeFocused();
  await expect(cardLink).toHaveCSS('outline-style', 'solid');
  await expect(cardLink).toHaveCSS('outline-width', '2px');
  await cardLink.hover();
  await expect(cardLink.locator('svg')).toHaveCSS('transform', 'none');
  await expect(cardLink).toHaveCSS('transition-duration', '0s');
  await mkdir(captureRoot, { recursive: true });
  await page
    .locator('.project-card')
    .first()
    .screenshot({
      path: `${captureRoot}/card-keyboard-focus.png`,
      style: '.site-header, .skip-link { visibility: hidden !important; }',
    });
});

test('landmarks, heading levels, decorative SVGs, and touch targets remain accessible', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const width of [320, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of ['/', '/projects', '/projects/hexpilot']) {
      await page.goto(route);
      await expect(page.getByRole('banner')).toHaveCount(1);
      await expect(page.getByRole('main')).toHaveCount(1);
      await expect(page.getByRole('contentinfo')).toHaveCount(1);
      const levels = await page
        .locator('h1, h2, h3, h4, h5, h6')
        .evaluateAll((headings) =>
          headings
            .filter((heading) => heading.getClientRects().length)
            .map((heading) => Number(heading.tagName.slice(1))),
        );
      expect(levels[0]).toBe(1);
      expect(
        levels.every(
          (level, index) => index === 0 || level <= levels[index - 1]! + 1,
        ),
      ).toBe(true);
      await expect(page.locator('svg:not([aria-hidden="true"])')).toHaveCount(
        0,
      );
      const undersized = await page
        .locator('a, button')
        .evaluateAll((elements) =>
          elements
            .filter((element) => {
              const rect = element.getBoundingClientRect();
              return (
                rect.width > 0 &&
                rect.height > 0 &&
                (rect.height < 43.5 || rect.width < 24)
              );
            })
            .map(
              (element) =>
                element.textContent?.trim() ||
                element.getAttribute('aria-label'),
            ),
        );
      expect(undersized).toEqual([]);
    }
  }
});

test('light and dark text token pairs meet AA normal-text contrast', async ({
  page,
}) => {
  await page.goto('/');
  for (const theme of ['light', 'dark']) {
    await page.evaluate((value) => {
      document.documentElement.dataset.theme = value;
    }, theme);
    const ratios = await page.evaluate(() => {
      const styles = getComputedStyle(document.documentElement);
      const luminance = (token: string) => {
        const raw = styles.getPropertyValue(token).trim().slice(1);
        const hex =
          raw.length === 3
            ? [...raw].map((digit) => digit + digit).join('')
            : raw;
        const channels = [0, 2, 4].map((offset) => {
          const value = parseInt(hex.slice(offset, offset + 2), 16) / 255;
          return value <= 0.04045
            ? value / 12.92
            : ((value + 0.055) / 1.055) ** 2.4;
        });
        return (
          channels[0]! * 0.2126 + channels[1]! * 0.7152 + channels[2]! * 0.0722
        );
      };
      return ['--background', '--surface'].flatMap((background) =>
        ['--foreground', '--muted', '--accent'].map((foreground) => {
          const a = luminance(background);
          const b = luminance(foreground);
          return {
            background,
            foreground,
            ratio: (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05),
          };
        }),
      );
    });
    for (const pair of ratios)
      expect(
        pair.ratio,
        `${theme}: ${pair.foreground} on ${pair.background}`,
      ).toBeGreaterThanOrEqual(4.5);
  }
});
