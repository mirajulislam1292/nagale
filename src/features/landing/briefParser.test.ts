import { describe, it, expect } from 'vitest';
import { parseBriefInput } from './briefParser';
describe('brief parser boundaries', () => {
  it('keeps unknown work unclassified and unpriced', () =>
    expect(parseBriefInput('something please')).toMatchObject({
      category: '',
      budgetMin: 0,
      budgetMax: 0,
    }));
  it('keeps the empty brief empty', () =>
    expect(parseBriefInput('')).toMatchObject({
      title: '',
      category: '',
      budgetMin: 0,
    }));
  it.each([
    ['CV ৳2,000', 2000],
    ['সিভি বাজেট ২০০০ টাকা', 2000],
    ['website budget 25000', 25000],
  ])('accepts explicit budgets %s', (text, value) =>
    expect(parseBriefInput(text).budgetMin).toBe(value),
  );
  it('does not treat a number of pages as a budget', () =>
    expect(parseBriefInput('website 1000 pages').budgetMin).toBe(8000));
  it('reads a budget range', () =>
    expect(parseBriefInput('CV budget 1000 to 2000')).toMatchObject({
      budgetMin: 1000,
      budgetMax: 2000,
    }));
  it('classifies Bengali local requests', () =>
    expect(parseBriefInput('উত্তরায় গণিত টিউশন')).toMatchObject({
      type: 'local',
      area: 'উত্তরা',
    }));
});
