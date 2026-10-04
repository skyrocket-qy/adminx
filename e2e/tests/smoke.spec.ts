import { expect, test } from '@playwright/test';
import { routes } from './routes';

test.describe('route smoke', () => {
  for (const route of routes) {
    test(`loads ${route} without console errors`, async ({ page }) => {
      const errors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') errors.push(msg.text());
      });
      page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`));

      const response = await page.goto(route, { waitUntil: 'networkidle' });

      expect(response?.status(), `HTTP status for ${route}`).toBe(200);
      await expect(page.locator('body')).toBeVisible();
      expect(errors, `console errors on ${route}:\n${errors.join('\n')}`).toEqual([]);
    });
  }

  test('serves the exported 404 page', async ({ request }) => {
    const response = await request.get('/404.html');

    expect(response.status()).toBe(200);
    expect(await response.text()).toContain('404');
  });
});
