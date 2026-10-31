import fs from 'node:fs';
const files = [
  'src/app/layout.tsx',
  'src/components/interface.tsx',
  'src/features/Landing.tsx',
  'src/features/Workspace.tsx',
  'src/features/PublicPages.tsx',
];
const source = files.map((p) => fs.readFileSync(p, 'utf8')).join('\n');
const result = {
  marketingShellInApp: fs
    .readFileSync(files[0], 'utf8')
    .match(/workspace\s*\?\s*\(?\s*<AppBar/)
    ? 0
    : 1,
  eyebrowLabels: (source.match(/className="eyebrow"/g) || []).length,
  decorativeNumbers: (
    source.match(/category-number|large-number|0\{i\s*\+\s*1\}|0[123] \//g) ||
    []
  ).length,
  internalExternalArrows: (source.match(/ArrowUpRight/g) || []).length,
  repeatedDemoCopy: (
    source.match(
      /Demo workspace|demo jobs|Example matched job|Sample profiles for the demo|Coming soon · no paid enrolment/g,
    ) || []
  ).length,
};
fs.writeFileSync(
  `qa/redesign/patterns-${process.argv[2] || 'after'}.json`,
  JSON.stringify(result, null, 2),
);
process.stdout.write(JSON.stringify(result));
