import { describe, it, expect, beforeEach } from 'vitest';
import {
  maskContacts,
  feeFor,
  nextOrder,
  resetDemo,
  getSnapshot,
  actOnOrder,
  sendMessage,
  getCounterpart,
} from './marketplace';
import type { Order } from '../types/marketplace';
const accepted: Order = {
  id: 'test',
  title: 'Test job',
  providerId: 'nusrat',
  price: 1500,
  status: 'accepted',
  clientAccepted: true,
  providerAccepted: false,
  events: [],
};
describe('public privacy boundary', () => {
  it.each([
    '01712345678',
    '+8801712345678',
    '০১৭১২৩৪৫৬৭৮',
    '017-1234-5678',
    'person@example.com',
    'https://example.com/private',
    'www.example.com',
    'example.com',
    '@someone',
  ])('masks %s', (value) => {
    expect(maskContacts(value)).not.toContain(value);
  });
  it.each([
    'My budget is 1500 taka.',
    'Please deliver within 3 days.',
    'Can you revise the heading?',
  ])('keeps ordinary text', (value) => expect(maskContacts(value)).toBe(value));
  it('has no contact fields in public profiles', () => {
    for (const p of getSnapshot().providers) {
      expect(p).not.toHaveProperty('phone');
      expect(p).not.toHaveProperty('email');
      expect(p).not.toHaveProperty('nid');
      expect(p).not.toHaveProperty('exactAddress');
    }
  });
});
describe('server-configured integer fees', () => {
  it.each([
    [1500, 0.1, 150, 1350],
    [1001, 0.1, 100, 901],
    [0, 0.1, 0, 0],
    [100, 0.2, 20, 80],
  ])('calculates %i', (gross, rate, fee, net) =>
    expect(feeFor(gross, rate)).toEqual({ gross, fee, net }),
  );
  it.each([-1, 1.5, NaN])('rejects invalid amount %s', (value) =>
    expect(() => feeFor(value, 0.1)).toThrow(),
  );
});
describe('order state boundaries', () => {
  it('does not include private details before funding', () =>
    expect(accepted).not.toHaveProperty('privateDetails'));
  it('blocks funding without both acceptances', () =>
    expect(() => nextOrder(accepted, 'fund', 'client')).toThrow());
  it('rejects client provider-acceptance', () =>
    expect(() => nextOrder(accepted, 'accept', 'client')).toThrow());
  it('makes private details available only through funding', () => {
    const a = nextOrder(accepted, 'accept', 'provider');
    expect(a).not.toHaveProperty('privateDetails');
    const funded = nextOrder(a, 'fund', 'client');
    expect(funded.status).toBe('details_unlocked');
    expect(funded.privateDetails).toBeDefined();
  });
  it('rejects provider funding', () =>
    expect(() =>
      nextOrder({ ...accepted, providerAccepted: true }, 'fund', 'provider'),
    ).toThrow());
  it('cannot approve before delivery', () =>
    expect(() => nextOrder(accepted, 'approve', 'client')).toThrow());
  it('requires a provider delivery note', () =>
    expect(() =>
      nextOrder(
        { ...accepted, status: 'details_unlocked' },
        'deliver',
        'provider',
        '',
      ),
    ).toThrow());
  it('rejects client delivery', () =>
    expect(() =>
      nextOrder(
        { ...accepted, status: 'details_unlocked' },
        'deliver',
        'client',
        'Done',
      ),
    ).toThrow());
  it('lets the client request revision after delivery', () =>
    expect(
      nextOrder({ ...accepted, status: 'delivered' }, 'revise', 'client')
        .status,
    ).toBe('details_unlocked'));
  it('does not let providers release their own payment', () =>
    expect(() =>
      nextOrder({ ...accepted, status: 'delivered' }, 'approve', 'provider'),
    ).toThrow());
  it('completes an approved delivery', () =>
    expect(
      nextOrder({ ...accepted, status: 'delivered' }, 'approve', 'client')
        .status,
    ).toBe('completed'));
  it('rejects disputes on completed work', () =>
    expect(() =>
      nextOrder({ ...accepted, status: 'completed' }, 'dispute', 'client'),
    ).toThrow());
  it('does not mutate the previous snapshot', () => {
    nextOrder(accepted, 'accept', 'provider');
    expect(accepted.providerAccepted).toBe(false);
    expect(accepted.events).toHaveLength(0);
  });
});
describe('mock service enforcement', () => {
  beforeEach(() => resetDemo());
  it('deduplicates repeated money action keys', async () => {
    await actOnOrder('N-1042', 'approve', 'client', 'same');
    await actOnOrder('N-1042', 'approve', 'client', 'same');
    expect(
      getSnapshot()
        .orders.find((o) => o.id === 'N-1042')
        ?.events.filter((e) => e.text.includes('released')),
    ).toHaveLength(1);
  });
  it('stores masked messages and blocks the third strike', async () => {
    await sendMessage('person@example.com');
    await sendMessage('https://example.com');
    await expect(sendMessage('@someone')).rejects.toThrow();
    expect(getSnapshot().messages.at(-1)?.body).not.toContain('example.com');
  });
  it('ensures viewer own name never appears as counterpart', () => {
    const snap = getSnapshot();
    const firstOrder = snap.orders[0];
    if (!firstOrder) throw new Error('No orders in snapshot');
    const order = firstOrder;

    // Client viewer sees provider, NEVER Mahim Rahman
    const forClient = getCounterpart(order, 'client', snap.providers);
    expect(forClient.name).not.toBe('Mahim Rahman');
    expect(forClient.name).toBe('Nusrat Jahan');

    // Provider viewer sees client, NEVER Nusrat Jahan
    const forProvider = getCounterpart(order, 'provider', snap.providers);
    expect(forProvider.name).not.toBe('Nusrat Jahan');
    expect(forProvider.name).toBe('Mahim Rahman');
  });
});
