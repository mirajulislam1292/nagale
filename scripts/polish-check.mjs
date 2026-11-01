import { chromium } from 'playwright';
import fs from 'node:fs/promises';
const base = process.env.BASE_URL || 'http://127.0.0.1:5180';
const dir = 'docs/audit/after';
await fs.mkdir(dir, { recursive: true });
const routes = [
  '/',
  '/about',
  '/auth',
  '/client',
  '/client/new',
  '/client/gigs/g1',
  '/client/orders/N-1042',
  '/client/orders/N-1038',
  '/provider',
  '/client/wallet',
  '/provider/wallet',
];
const browser = await chromium.launch({
  executablePath:
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
});
const axe = await fs.readFile('node_modules/axe-core/axe.min.js', 'utf8');
const results = [];
try {
  for (const locale of ['en', 'bn'])
    for (const width of [1280, 390]) {
      const context = await browser.newContext({
        viewport: { width, height: width === 1280 ? 800 : 844 },
      });
      await context.addInitScript(
        (locale) => localStorage.setItem('nagale.locale', locale),
        locale,
      );
      const page = await context.newPage();
      for (const route of locale === 'bn'
        ? ['/', '/client', '/client/orders/N-1042']
        : routes) {
        const errors = [];
        page.on('pageerror', (e) => errors.push(e.message));
        await page.goto(base + route, { waitUntil: 'networkidle' });
        await page.locator('h1').first().waitFor();
        await page.evaluate(() => document.fonts.ready);
        const layout = await page.evaluate(() => {
          const visible = (e) => {
            const r = e.getBoundingClientRect();
            return (
              r.width > 0 &&
              r.height > 0 &&
              r.top < innerHeight &&
              r.bottom > 0 &&
              r.left < innerWidth &&
              getComputedStyle(e).visibility !== 'hidden'
            );
          };
          return {
            overflow: document.documentElement.scrollWidth > innerWidth,
            mint: [...document.querySelectorAll('a,button')]
              .filter(
                (e) =>
                  visible(e) &&
                  getComputedStyle(e).backgroundColor === 'rgb(63, 211, 162)',
              )
              .map((e) => e.textContent.trim()),
            h1: document.querySelector('h1').textContent,
          };
        });
        await page.addScriptTag({ content: axe });
        const violations = await page.evaluate(async () =>
          (
            await window.axe.run(document, {
              runOnly: {
                type: 'tag',
                values: ['wcag2a', 'wcag2aa', 'wcag21aa'],
              },
            })
          ).violations
            .filter((v) => ['serious', 'critical'].includes(v.impact))
            .map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
        );
        const file = `${dir}/${locale}-${width}-${route === '/' ? 'gate' : route.slice(1).replaceAll('/', '-')}.png`;
        await page.screenshot({ path: file });
        results.push({
          route,
          locale,
          width,
          ...layout,
          violations,
          errors,
          file,
        });
      }
      await context.close();
    }
  // Narrowest supported layout without extra screenshots.
  const page = await browser.newPage({ viewport: { width: 360, height: 844 } });
  for (const route of routes) {
    await page.goto(base + route, { waitUntil: 'networkidle' });
    results.push({
      route,
      width: 360,
      overflow: await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
    });
  }
} finally {
  await browser.close();
}
await fs.writeFile(
  `${dir}/tier0-results.json`,
  JSON.stringify(results, null, 2),
);
process.stdout.write(
  JSON.stringify({
    cases: results.length,
    overflow: results
      .filter((r) => r.overflow)
      .map((r) => [r.route, r.locale, r.width]),
    mint: results
      .filter((r) => r.mint?.length > 1)
      .map((r) => [r.route, r.locale, r.width, r.mint]),
    axe: results
      .filter((r) => r.violations?.length)
      .map((r) => [r.route, r.locale, r.width, r.violations]),
    errors: results.filter((r) => r.errors?.length),
  }),
);
