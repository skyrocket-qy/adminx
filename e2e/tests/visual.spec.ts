import { expect, test } from '@playwright/test';
import { routes } from './routes';

const routeName = (route: string) =>
  route === '/'
    ? 'home'
    : route
        .replace(/^\//, '')
        .replace(/[^a-zA-Z0-9]+/g, '-')
        .replace(/-+$/, '')
        .toLowerCase();

test.describe('visual snapshots', () => {
  for (const route of routes) {
    test(`snapshot ${route}`, async ({ page }) => {
      // Freeze virtual time so JS timers/animations (typewriter, rAF effects)
      // always land in the same deterministic state.
      await page.clock.install({ time: new Date('2026-01-01T00:00:00Z') });
      await page.addInitScript(() => {
        Math.random = () => 0.42;
      });

      await page.goto(route, { waitUntil: 'load' });
      // Advance 3s to let entrance/typewriter animations reach a
      // representative state, then keep virtual time frozen.
      await page.clock.pauseAt(new Date('2026-01-01T00:00:03Z'));
      await page.addStyleTag({
        content:
          '*, *::before, *::after { animation: none !important; transition: none !important; }' +
          'canvas { display: none !important; }',
      });

      // The tuple graph is an SVG whose d3-force layout is timing-dependent,
      // so it is masked (the rest of the page is still compared).
      const masks =
        route === '/admin/tuple/graph' ? [page.locator('svg[width="1200"]')] : [];

      await expect(page).toHaveScreenshot(`${routeName(route)}.png`, {
        fullPage: true,
        animations: 'disabled',
        mask: masks,
        maxDiffPixelRatio: 0.02,
      });
    });
  }
});
