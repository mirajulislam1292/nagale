import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
const target = process.argv[2];
const token = process.env.VERCEL_OIDC_TOKEN;
if (!target || !token)
  throw new Error(
    'A target and a short-lived Vercel development identity are required.',
  );
const bin = (process.env.PATH || '')
  .split(path.delimiter)
  .map((p) => path.join(p, 'lighthouse'))
  .find((p) => fs.existsSync(p));
if (!bin) throw new Error('Lighthouse executable is not available.');
const real = fs.realpathSync(bin);
const require = createRequire(real);
const lighthouse = (
  await import(
    pathToFileURL(path.resolve(path.dirname(real), '../core/index.js')).href
  )
).default;
const { launch } = await import(
  pathToFileURL(require.resolve('chrome-launcher')).href
);
const chrome = await launch({
  chromePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  chromeFlags: ['--headless'],
});
try {
  const result = await lighthouse(target, {
    port: chrome.port,
    logLevel: 'error',
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    extraHeaders: { 'x-vercel-trusted-oidc-idp-token': token },
  });
  if (!result) throw new Error('No report.');
  const lhr = result.lhr;
  if (new URL(lhr.finalDisplayedUrl).origin !== new URL(target).origin)
    throw new Error('Authentication did not reach the requested application.');
  const safe = JSON.stringify(lhr, null, 2).split(token).join('[redacted]');
  fs.writeFileSync('qa/final-master/authenticated-gate-lighthouse.json', safe);
  process.stdout.write(
    JSON.stringify({
      applicationVerified: true,
      scores: Object.fromEntries(
        Object.entries(lhr.categories).map(([k, v]) => [
          k,
          v.score === null ? null : Math.round(v.score * 100),
        ]),
      ),
    }),
  );
} finally {
  await chrome.kill();
}
