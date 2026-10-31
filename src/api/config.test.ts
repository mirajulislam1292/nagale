// Demo-only behaviour must fail closed when the flag is missing or malformed.
import { describe, expect, it } from 'vitest';
import { readDemoMode } from './config';
describe('demo mode boundary', () => {
  it.each([undefined, '', 'false', 'TRUE', '1'])(
    'is disabled for %s',
    (value) => {
      expect(readDemoMode(value)).toBe(false);
    },
  );
  it('requires an explicit true value', () => {
    expect(readDemoMode('true')).toBe(true);
  });
});
