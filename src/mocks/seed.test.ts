import { describe, expect, it } from 'vitest';
import { createSeed, disputeSeeds, paymentAccounts, VERIF_DATA } from './seed';
import {
  heldAmount,
  releasedAmount,
  participantOrders,
  isActiveOrder,
  matchedGigs,
} from './selectors';
import {
  formatBDT,
  formatDate,
  statusLabel,
  proposalCount,
} from '../lib/format';
describe('Canonical demo invariants', () => {
  it('derives Mahim’s balances and active count only from his orders', () => {
    const s = createSeed(),
      orders = participantOrders(s, 'client');
    expect(orders.reduce((n, o) => n + heldAmount(o), 0)).toBe(4500);
    expect(orders.reduce((n, o) => n + releasedAmount(o, s.feeRate), 0)).toBe(
      2250,
    );
    expect(orders.filter(isActiveOrder)).toHaveLength(2);
    expect(
      s.gigs.filter(
        (g) => g.clientId === 'usr-client-1' && g.status === 'open',
      ),
    ).toHaveLength(4);
  });
  it('keeps reviews within completed jobs and approved Nusrat outside review queues', () => {
    const s = createSeed();
    for (const p of s.providers)
      expect(p.reviews).toBeLessThanOrEqual(p.completed);
    const n = s.providers.find((p) => p.id === 'nusrat');
    expect([n?.area, n?.reviews, n?.level, n?.verification?.l2]).toEqual([
      'Dhanmondi',
      34,
      2,
      'approved',
    ]);
    expect(
      Object.values(VERIF_DATA)
        .flat()
        .some((v) => v.name === n?.name),
    ).toBe(false);
  });
  it('matches Nusrat’s skills or area rather than unrelated digital jobs', () => {
    expect(matchedGigs(createSeed()).map((g) => g.id)).toEqual([
      'g1',
      'g5',
      'g6',
      'g7',
    ]);
  });
  it('attaches dispute narratives to disputed orders and keeps accounts separate', () => {
    const s = createSeed();
    for (const d of disputeSeeds)
      expect(s.orders.find((o) => o.id === d.orderId)?.status).toBe('disputed');
    expect(disputeSeeds[0]?.orderId).toBe('N-1029');
    expect(paymentAccounts.nusrat[0]?.last4).not.toBe(
      paymentAccounts['usr-client-1'][0]?.last4,
    );
  });
  it('returns independent copies so a demo action cannot corrupt reset data', () => {
    const a = createSeed();
    if (a.orders[0]) a.orders[0].price = 1;
    expect(createSeed().orders[0]?.price).toBe(1500);
  });
});
describe('Localized presentation', () => {
  it('formats status, money, dates and plurals in both languages', () => {
    expect(formatBDT(2500, false)).toBe('৳2,500');
    expect(formatBDT(2500, true)).toBe('৳২,৫০০');
    expect(formatDate('2026-11-07', false)).toBe('7 Nov');
    expect(formatDate('2026-11-07', true)).toContain('৭');
    expect(statusLabel('details_unlocked', false)).toBe('In progress');
    expect(statusLabel('completed', true)).toBe('সম্পন্ন');
    expect(proposalCount(1, false)).toBe('1 proposal');
    expect(proposalCount(2, false)).toBe('2 proposals');
    expect(proposalCount(2, true)).toBe('২টি প্রস্তাব');
  });
});
