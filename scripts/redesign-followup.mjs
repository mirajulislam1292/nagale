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
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
for (const bn of [false, true])
  for (const width of [360, 768, 1280])
    for (const route of ['/']) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('http://127.0.0.1:4175' + route);
      await page.locator('h1').waitFor();
      const toggle = page.getByRole('button', {
        name: bn ? 'Switch to Bangla' : 'Switch to English',
      });
      if (await toggle.count()) await toggle.click();
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({
        path: `qa/redesign/${route === '/' ? 'landing' : route.slice(1)}-${bn ? 'bn' : 'en'}-${width}.png`,
        fullPage: true,
      });
      await page.addScriptTag({ content: axe.source });
      const data = await page.evaluate(async () => ({
        width: innerWidth,
        pageWidth: document.documentElement.scrollWidth,
        issues: (await window.axe.run()).violations
          .filter((v) => ['serious', 'critical'].includes(v.impact))
          .map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
      }));
      result.push({ route, bn, ...data });
    }
await page.setViewportSize({ width: 320, height: 800 });
for (const route of ['/', '/client', '/provider']) {
  await page.goto('http://127.0.0.1:4175' + route);
  await page.locator('h1').waitFor();
  result.push({
    route,
    ...(await page.evaluate(() => ({
      width: innerWidth,
      pageWidth: document.documentElement.scrollWidth,
    }))),
  });
}
await fs.writeFile(
  'qa/redesign/followup.json',
  JSON.stringify({ errors, result }, null, 2),
);
process.stdout.write(
  JSON.stringify({
    errors,
    failures: result.filter((r) => r.pageWidth > r.width || r.issues?.length),
  }),
);
await browser.close();
