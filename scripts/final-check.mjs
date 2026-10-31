import { chromium } from 'playwright';
import axe from 'axe-core';
import fs from 'node:fs/promises';
const browser = await chromium.launch({
  executablePath:
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
});
const page = await browser.newPage();
const result = [];
for (const [route, width] of [
  ['/', 320],
  ['/client', 320],
  ['/provider', 320],
  ['/client/orders/N-1042', 1280],
  ['/provider/onboarding', 1280],
  ['/learning', 1280],
  ['/', 1280],
]) {
  await page.setViewportSize({ width, height: 900 });
  const response = await page.goto('https://nagale.vercel.app' + route);
  await page.locator('h1').waitFor();
  await page.evaluate(() => document.fonts.ready);
  await page.addScriptTag({ content: axe.source });
  const data = await page.evaluate(async () => ({
    title: document.querySelector('h1')?.textContent,
    width: innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    violations: (await window.axe.run()).violations
      .filter((v) => ['serious', 'critical'].includes(v.impact))
      .map((v) => ({ id: v.id, targets: v.nodes.map((n) => n.target) })),
  }));
  result.push({ route, http: response?.status(), ...data });
  await page.screenshot({
    path: `qa/screenshots/live-${route === '/' ? 'landing' : route.slice(1).replaceAll('/', '-')}-${width}.png`,
    fullPage: true,
  });
}
await page.goto('https://nagale.vercel.app/auth');
await page.getByRole('button', { name: /I need work done/ }).click();
await page.getByRole('heading', { name: 'Good to see you, Mahim.' }).waitFor();
await fs.writeFile(
  'qa/final-live-check.json',
  JSON.stringify({ checks: result, demoEntry: true }, null, 2),
);
process.stdout.write(JSON.stringify(result));
await browser.close();
