import { chromium } from 'playwright';
const browser = await chromium.launch({
  executablePath:
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 320, height: 800 } });
await page.goto('http://127.0.0.1:4173' + (process.argv[2] || ''));
await page.locator('h1').waitFor();
process.stdout.write(
  JSON.stringify(
    await page.evaluate(() =>
      [...document.querySelectorAll('body *')]
        .filter((e) => e.getBoundingClientRect().right > innerWidth + 1)
        .map((e) => ({
          tag: e.tagName,
          c: e.className,
          w: e.getBoundingClientRect().width,
          right: e.getBoundingClientRect().right,
        }))
        .slice(0, 15),
    ),
  ),
);
await browser.close();
