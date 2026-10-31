import { chromium } from 'playwright';
import axe from 'axe-core';
import fs from 'node:fs/promises';
const browser = await chromium.launch({
  executablePath:
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
});
const page = await browser.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
const result = [];
for (const locale of ['en', 'bn'])
  for (const width of [360, 768, 1280])
    for (const route of [
      '/',
      '/auth',
      '/client',
      '/client/new',
      '/client/gigs/g1',
      '/client/orders/N-1042',
      '/provider',
      '/provider/wallet',
      '/orders/N-1042/dispute',
      '/admin',
      '/learning',
      '/privacy',
      '/terms',
    ]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('http://127.0.0.1:4180' + route);
      await page.locator('h1').first().waitFor();
      const button = page.getByRole('button', {
        name: locale === 'bn' ? 'Switch to Bangla' : 'Switch to English',
      });
      if (await button.count()) await button.first().click();
      await page.evaluate(() => document.fonts.ready);
      const tag =
        (route === '/' ? 'landing' : route.slice(1).replaceAll('/', '-')) +
        '-' +
        locale +
        '-' +
        width;
      await page.screenshot({
        path: 'qa/standalone/' + tag + '.png',
        fullPage: true,
      });
      await page.evaluate(axe.source);
      const data = await page.evaluate(async () => ({
        width: innerWidth,
        pageWidth: document.documentElement.scrollWidth,
        lang: document.documentElement.lang,
        issues: (await window.axe.run()).violations
          .filter((v) => ['serious', 'critical'].includes(v.impact))
          .map((v) => ({ id: v.id, targets: v.nodes.map((n) => n.target) })),
      }));
      result.push({ route, locale, ...data });
      await fs.writeFile(
        'qa/standalone/results.json',
        JSON.stringify({ errors, result }, null, 2),
      );
    }
process.stdout.write(
  JSON.stringify({
    errors,
    checks: result.length,
    failures: result.filter((r) => r.pageWidth > r.width || r.issues.length),
  }),
);
await browser.close();
