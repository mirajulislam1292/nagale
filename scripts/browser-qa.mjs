import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import axe from 'axe-core';
const browser = await chromium.launch({
  executablePath:
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
});
const page = await browser.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
const results = [];
const routes = [
  '/',
  '/auth',
  '/client',
  '/provider',
  '/client/new',
  '/client/gigs/g1',
  '/provider/feed/g1',
  '/client/orders/N-1042',
  '/provider/orders/N-1041',
  '/client/messages',
  '/client/wallet',
  '/provider/wallet',
  '/provider/onboarding',
  '/p/nusrat',
  '/admin',
  '/trust',
  '/fees',
  '/learning',
  '/support',
  '/privacy',
  '/not-found',
];
for (const width of [320, 768, 1280]) {
  await page.setViewportSize({ width, height: 900 });
  for (const route of routes) {
    await page.goto('http://127.0.0.1:4173' + route);
    await page.locator('h1').waitFor();
    await page.evaluate(() => document.fonts.ready);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    );
    const name =
      route === '/' ? 'landing' : route.slice(1).replaceAll('/', '-');
    await page.screenshot({
      path: `qa/screenshots/${name}-${width}.png`,
      fullPage: true,
    });
    let violations = [];
    if (width === 1280) {
      await page.addScriptTag({ content: axe.source });
      violations = await page.evaluate(async () => {
        const r = await window.axe.run();
        return r.violations
          .filter((v) => ['serious', 'critical'].includes(v.impact))
          .map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) }));
      });
    }
    results.push({ route, width, overflow, violations });
  }
}
await page.setViewportSize({ width: 360, height: 800 });
await page.goto('http://127.0.0.1:4173/');
await page.getByRole('button', { name: 'Switch to Bangla' }).click();
await page.screenshot({
  path: 'qa/screenshots/landing-bn-360.png',
  fullPage: true,
});
results.push({
  route: '/',
  locale: 'bn',
  width: 360,
  overflow: await page.evaluate(
    () => document.documentElement.scrollWidth > innerWidth,
  ),
});
await fs.writeFile(
  'qa/browser-results.json',
  JSON.stringify({ errors, results }, null, 2),
);
await page.getByRole('button', { name: 'Switch to English' }).click();
await page.goto('http://127.0.0.1:4173/client/gigs/g1');
await page.getByRole('button', { name: 'Choose proposal' }).first().click();
await page
  .getByRole('heading', { name: 'Waiting for provider acceptance.' })
  .waitFor();
await page.getByRole('button', { name: 'Provider', exact: true }).click();
await page.getByRole('button', { name: 'Accept agreement' }).click();
await page.getByRole('heading', { name: 'Fund the agreed work.' }).waitFor();
await page.getByRole('button', { name: 'Client', exact: true }).click();
await page.getByRole('button', { name: /Fund escrow/ }).click();
await page.getByRole('heading', { name: 'Work is in progress.' }).waitFor();
await page.getByRole('button', { name: 'Provider', exact: true }).click();
await page
  .getByLabel('Delivery note', { exact: true })
  .fill('The completed draft is ready for review.');
await page.getByRole('button', { name: 'Submit delivery' }).click();
await page
  .getByRole('heading', { name: 'Review the delivered work.' })
  .waitFor();
await page.getByRole('button', { name: 'Client', exact: true }).click();
await page
  .getByRole('button', { name: 'Approve delivery', exact: true })
  .click();
await page.getByRole('button', { name: 'Confirm approval' }).click();
await page.getByRole('heading', { name: 'This order is complete.' }).waitFor();
await fs.writeFile(
  'qa/flow-result.json',
  JSON.stringify(
    {
      proposalAcceptance: true,
      bothPartyAgreement: true,
      escrow: true,
      providerDelivery: true,
      clientApproval: true,
    },
    null,
    2,
  ),
);
await browser.close();
process.stdout.write(
  JSON.stringify({
    routes: results.length,
    errors,
    overflows: results.filter((r) => r.overflow),
    violations: results.filter((r) => r.violations?.length),
  }),
);
