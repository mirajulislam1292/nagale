import type { Snapshot, Order } from '../types/marketplace';
export const CLIENT_ID = 'usr-client-1';
export const PROVIDER_ID = 'nusrat';
export function participantOrders(s: Snapshot, role: 'client' | 'provider') {
  return s.orders.filter((o) =>
    role === 'client' ? o.clientId === CLIENT_ID : o.providerId === PROVIDER_ID,
  );
}
export function isActiveOrder(o: Order) {
  return !['completed', 'disputed'].includes(o.status);
}
export function heldAmount(o: Order) {
  return [
    'escrow_funded',
    'details_unlocked',
    'delivered',
    'disputed',
  ].includes(o.status)
    ? o.price
    : 0;
}
export function releasedAmount(o: Order, rate: number) {
  return o.status === 'completed' ? o.price - Math.round(o.price * rate) : 0;
}
export function matchingReason(
  s: Snapshot,
  gig: Snapshot['gigs'][number],
  providerId = PROVIDER_ID,
) {
  const p = s.providers.find((p) => p.id === providerId);
  if (!p || p.accountStatus === 'suspended') return null;
  if (
    p.skills.includes(gig.category) ||
    (gig.category === 'Writing' && p.skills.includes('CV writing'))
  )
    return `Matches ${gig.category}`;
  if (
    gig.type === 'local' &&
    gig.category === 'Tuition' &&
    gig.area.includes(p.area.split(',')[0] ?? p.area)
  )
    return `Near you in ${p.area}`;
  return null;
}
export function matchedGigs(s: Snapshot) {
  return s.gigs.filter((g) => g.status === 'open' && matchingReason(s, g));
}
