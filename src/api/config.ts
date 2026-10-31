/** Public browser configuration. Backend credentials must never enter this module. */
export function readDemoMode(value: string | undefined): boolean {
  return value === 'true';
}
