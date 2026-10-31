import { chromium } from 'playwright';
import fs from 'node:fs/promises';
const browser = await chromium.launch({
  executablePath:
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 320, height: 900 } });
const results = [];
for (const route of ['/', '/client', '/provider']) {
  await page.goto('http://127.0.0.1:4173' + route);
  await page.locator('h1').waitFor();
  results.push({
    route,
    ...(await page.evaluate(() => ({
      viewport: innerWidth,
      pageWidth: document.documentElement.scrollWidth,
    }))),
  });
  await page.screenshot({
    path: `qa/screenshots/final-${route === '/' ? 'landing' : route.slice(1)}-320.png`,
    fullPage: true,
  });
}
await fs.writeFile('qa/mobile-final.json', JSON.stringify(results, null, 2));
process.stdout.write(JSON.stringify(results));
await browser.close();
