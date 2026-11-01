import { chromium } from 'playwright';
import axe from 'axe-core';
import fs from 'node:fs/promises';
const browser = await chromium.launch({
  executablePath:
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
});
const page = await browser.newPage();
const results = [];
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
for (const bn of [false, true])
  for (const width of [360, 768, 1280])
    for (const route of ['/', '/about']) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('http://127.0.0.1:4190' + route);
      await page.locator('h1').waitFor();
      const toggle = page.getByRole('button', {
        name: bn ? 'Switch to Bangla' : 'Switch to English',
      });
      if (await toggle.count()) await toggle.click();
      await page.evaluate(() => document.fonts.ready);
      await page
        .getByRole('button', {
          name: bn ? 'সিভি লিখুন' : 'Write my CV',
          exact: true,
        })
        .first()
        .click();
      await page
        .getByRole('button', { name: /Choose proposal|প্রস্তাব বাছুন/ })
        .first()
        .waitFor();
      await page.screenshot({
        path: `qa/final-master/${route === '/' ? 'gate' : 'about'}-${bn ? 'bn' : 'en'}-${width}.png`,
        fullPage: true,
      });
      await page.evaluate(axe.source);
      const data = await page.evaluate(async () => ({
        width: innerWidth,
        height: innerHeight,
        pageWidth: document.documentElement.scrollWidth,
        pageHeight: document.documentElement.scrollHeight,
        issues: (await window.axe.run()).violations
          .filter((v) => ['serious', 'critical'].includes(v.impact))
          .map((v) => ({ id: v.id, targets: v.nodes.map((n) => n.target) })),
      }));
      results.push({ route, bn, ...data });
      await fs.writeFile(
        'qa/final-master/results.json',
        JSON.stringify({ errors, results }, null, 2),
      );
    }
await page.goto('http://127.0.0.1:4190/');
await page
  .getByRole('button', { name: /Write my CV|সিভি লিখুন/, exact: true })
  .click();
await page
  .getByRole('button', { name: /Choose proposal|প্রস্তাব বাছুন/ })
  .first()
  .click();
await page.locator('.demo-held').waitFor();
results.push({ escrowExample: true });
await page.locator('.demo-input').fill('unknown task');
await page
  .getByText(/Needs more detail|আরও বিস্তারিত বলুন/, { exact: true })
  .waitFor();
results.push({ unknownNotGuessed: true });
await fs.writeFile(
  'qa/final-master/results.json',
  JSON.stringify({ errors, results }, null, 2),
);
process.stdout.write(JSON.stringify({ errors, results }));
await browser.close();
