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
for (const bn of [false, true])
  for (const route of ['/', '/about']) {
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto('http://127.0.0.1:4190' + route);
    await page.locator('h1').waitFor();
    const toggle = page.getByRole('button', {
      name: bn ? 'Switch to Bangla' : 'Switch to English',
    });
    if (await toggle.count()) await toggle.click();
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
    await page.waitForTimeout(550);
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({
      path: `qa/final-master/final-${route === '/' ? 'gate' : 'about'}-${bn ? 'bn' : 'en'}-360.png`,
      fullPage: true,
    });
    await page.evaluate(axe.source);
    results.push({
      route,
      bn,
      ...(await page.evaluate(async () => ({
        width: innerWidth,
        height: innerHeight,
        pageWidth: document.documentElement.scrollWidth,
        pageHeight: document.documentElement.scrollHeight,
        gateHeight: document.querySelector('.gate-screen')?.clientHeight,
        gateScroll: document.querySelector('.gate-screen')?.scrollHeight,
        issues: (await window.axe.run()).violations
          .filter((v) => ['serious', 'critical'].includes(v.impact))
          .map((v) => v.id),
      }))),
    });
  }
await page.setViewportSize({ width: 1200, height: 630 });
await page.setContent(
  `<html><head><style>@font-face{font-family:Inter;src:url('http://127.0.0.1:4190/fonts/inter-700.woff2');font-weight:700}*{box-sizing:border-box}body{margin:0;background:#0C2A24;color:white;padding:72px;font-family:Inter,sans-serif}header{display:flex;align-items:center;gap:40px;font-size:96px;font-weight:700}img{width:152px;height:152px}p{font-size:72px;line-height:1.1;font-weight:700;margin:72px 0 0}</style></head><body><header><img src="http://127.0.0.1:4190/brand/icon-192.png">Nagale</header><p>Work safely.<br>Get it done.</p></body></html>`,
);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: 'public/og.png' });
await fs.writeFile(
  'qa/final-master/followup.json',
  JSON.stringify(results, null, 2),
);
process.stdout.write(JSON.stringify(results));
await browser.close();
