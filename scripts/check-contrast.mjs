// Verifies WCAG AA contrast (4.5:1 for normal text, 3:1 for large text/UI) across all documented token pairs.
// Fails CI if any documented color pair fails WCAG AA.

function parseHex(hex) {
  const c = hex.replace('#', '');
  const r = parseInt(c.slice(0, 2), 16) / 255;
  const g = parseInt(c.slice(2, 4), 16) / 255;
  const b = parseInt(c.slice(4, 6), 16) / 255;
  return [r, g, b].map((v) =>
    v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4),
  );
}

function luminance(hex) {
  const [r, g, b] = parseHex(hex);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(hex1, hex2) {
  const l1 = luminance(hex1);
  const l2 = luminance(hex2);
  const brighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (brighter + 0.05) / (darker + 0.05);
}

const pairs = [
  { name: 'Moss text on White', fg: '#0C2A24', bg: '#FFFFFF', min: 4.5 },
  { name: 'Moss text on Mist', fg: '#0C2A24', bg: '#F3F7F5', min: 4.5 },
  {
    name: 'Moss text on Mint (Primary action)',
    fg: '#0C2A24',
    bg: '#3FD3A2',
    min: 4.5,
  },
  {
    name: 'Moss-600 (Secondary text) on White',
    fg: '#476259',
    bg: '#FFFFFF',
    min: 4.5,
  },
  {
    name: 'Moss-500 (Muted text minimum) on White',
    fg: '#5A7269',
    bg: '#FFFFFF',
    min: 4.5,
  },
  {
    name: 'Moss-500 (Muted text minimum) on Mist',
    fg: '#5A7269',
    bg: '#F3F7F5',
    min: 4.5,
  },
  {
    name: 'Deep Mint on White (Links/Icons)',
    fg: '#0F7A5C',
    bg: '#FFFFFF',
    min: 4.5,
  },
  {
    name: 'Deep-700 (Adjusted one step) on Deep-100 (Success)',
    fg: '#0A5C45',
    bg: '#DCF1EA',
    min: 4.5,
  },
  {
    name: 'White on Moss (Dark surfaces)',
    fg: '#FFFFFF',
    bg: '#0C2A24',
    min: 4.5,
  },
  {
    name: 'Moss-300 on Moss (Hero secondary text)',
    fg: '#B4C4BD',
    bg: '#0C2A24',
    min: 4.5,
  },
  {
    name: 'Warning text on Warning bg',
    fg: '#7A5200',
    bg: '#FBF3E0',
    min: 4.5,
  },
  { name: 'Danger text on Danger bg', fg: '#9A2F2F', bg: '#FBECEA', min: 4.5 },
  { name: 'Info text on Info bg', fg: '#476259', bg: '#E6EDEA', min: 4.5 },
];

let failed = 0;
process.stdout.write(
  'Testing design tokens contrast pairs against WCAG AA (4.5:1 minimum for body text):\n',
);
process.stdout.write(
  '--------------------------------------------------------------------------------\n',
);

for (const pair of pairs) {
  const ratio = contrast(pair.fg, pair.bg);
  const pass = ratio >= pair.min;
  const formatted = ratio.toFixed(2) + ':1';
  if (pass) {
    process.stdout.write(
      `✓ PASS: ${pair.name} - Ratio: ${formatted} (Required >= ${pair.min}:1)\n`,
    );
  } else {
    process.stderr.write(
      `✗ FAIL: ${pair.name} - Ratio: ${formatted} (Required >= ${pair.min}:1)\n`,
    );
    failed++;
  }
}

process.stdout.write(
  '--------------------------------------------------------------------------------\n',
);
if (failed > 0) {
  process.stderr.write(`Failed ${failed} contrast check(s).\n`);
  process.exit(1);
} else {
  process.stdout.write(`All ${pairs.length} contrast checks passed.\n`);
}
