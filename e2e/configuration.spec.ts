import { expect, test } from '@playwright/test';

const resume =
  'https://drive.google.com/file/d/1UwsJNuQzFcUEF3mdQeClUozfietVGOti/view?usp=drivesdk';
const demo = 'https://ai-doc-copilot-iota.vercel.app/';

test('confirmed resume and demo links use safe, accessible new tabs without private source links', async ({
  page,
}) => {
  for (const route of ['/', '/projects', '/projects/hexpilot']) {
    await page.goto(route);
    const demoLink = page.getByRole('link', {
      name: 'Live Demo (opens in a new tab)',
      exact: true,
    });
    await expect(demoLink).toHaveCount(1);
    await expect(demoLink).toHaveAttribute('href', demo);
    await expect(demoLink).toHaveAttribute('target', '_blank');
    await expect(demoLink).toHaveAttribute('rel', 'noopener noreferrer');
    await expect(page.getByRole('link', { name: /Source code/i })).toHaveCount(
      0,
    );
    await expect(page.locator('a[href^="/articles"]')).toHaveCount(0);
    if (route === '/') {
      const link = page.getByRole('link', {
        name: 'View Resume (opens in a new tab)',
        exact: true,
      });
      await expect(link).toHaveCount(1);
      await expect(link).toHaveAttribute('href', resume);
      await expect(link).toHaveAttribute('target', '_blank');
      await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      await expect(page.locator('a[download]')).toHaveCount(0);
      const photo = page.getByRole('img', {
        name: 'Kishore Kattiri',
        exact: true,
      });
      await expect(photo).toHaveCount(1);
      await photo.scrollIntoViewIfNeeded();
      await expect(photo).toBeVisible();
      await expect(photo).toHaveJSProperty('complete', true);
      await expect
        .poll(() =>
          photo.evaluate((image) => (image as HTMLImageElement).naturalWidth),
        )
        .toBeGreaterThan(0);
      await expect(
        page.locator('.hero-figure .engineering-drawing'),
      ).toBeVisible();
      // Validate popup behavior deterministically without depending on the external service.
      await page.context().route(resume, (request) =>
        request.fulfill({
          status: 200,
          contentType: 'text/html',
          body: '<title>Resume viewer test</title>',
        }),
      );
      const popupPromise = page.waitForEvent('popup');
      await link.click();
      const popup = await popupPromise;
      await popup.waitForLoadState('domcontentloaded');
      expect(popup.url()).toBe(resume);
      expect(await popup.evaluate(() => window.opener === null)).toBe(true);
      await popup.close();
    }
  }
  for (const slug of ['enterprise-ai-assistant', 'uem-compliance']) {
    await page.goto(`/projects/${slug}`);
    await expect(
      page.getByRole('link', { name: /Live Demo|View Resume|Source code/ }),
    ).toHaveCount(0);
  }
});
