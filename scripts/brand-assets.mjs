import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { readFile, writeFile, copyFile } from 'node:fs/promises';
import { optimize } from 'svgo';
const require = createRequire(import.meta.url);
for (const [pkg, prefix, subset] of [
  ['@fontsource/inter', 'inter', 'latin'],
  ['@fontsource/noto-sans-bengali', 'noto-sans-bengali', 'bengali'],
]) {
  const root = dirname(
    pkg === '@fontsource/inter'
      ? require.resolve('@fontsource/inter/package.json')
      : require.resolve('@fontsource/noto-sans-bengali/package.json'),
  );
  for (const weight of [400, 500, 700])
    await copyFile(
      join(root, `files/${prefix}-${subset}-${weight}-normal.woff2`),
      `public/fonts/${subset === 'latin' ? 'inter' : 'bengali'}-${weight}.woff2`,
    );
  await copyFile(join(root, 'LICENSE'), `public/fonts/${prefix}-LICENSE.txt`);
}
for (const name of ['logo-mark', 'logo-mint-on-white', 'logo-mint-on-moss']) {
  const path = `public/brand/${name}.svg`;
  await writeFile(path, optimize(await readFile(path, 'utf8'), { path }).data);
}
