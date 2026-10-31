import { createSeed } from '../mocks/marketplace';
import type { Gig, Order, Role, Snapshot } from '../types/marketplace';
let state = createSeed();
let listeners: (() => void)[] = [];
let strikes = 0;
const keys = new Set<string>();
export const subscribe = (fn: () => void) => {
  listeners.push(fn);
  return () => {
    listeners = listeners.filter((x) => x !== fn);
  };
};
export const getSnapshot = () => state;
function change(fn: (s: Snapshot) => Snapshot) {
  state = fn(state);
  listeners.forEach((fn) => fn());
}
// BACKEND: Replace the mock transport with authenticated endpoints. Every permission
// and money transition below must be checked again on the server.
async function delay() {
  await new Promise((resolve) => setTimeout(resolve, 350));
}
export function maskContacts(input: string) {
  return input
    .replace(
      /(?:\+?88[\s.-]?)?[0০][1১][3-9৩-৯](?:[\s.-]*[0-9০-৯]){8}/g,
      '[contact hidden]',
    )
    .replace(/[\w.+-]+@[\w.-]+\.[a-z]{2,}/gi, '[contact hidden]')
    .replace(
      /(?:https?:\/\/|www\.)\S+|\b[\w-]+\.(?:com|net|org|app|io|bd)(?:\/\S*)?/gi,
      '[link hidden]',
    )
    .replace(/@[\w.]+/g, '[handle hidden]');
}
export function feeFor(amount: number, rate: number) {
  if (!Number.isInteger(amount) || amount < 0 || rate < 0 || rate > 1)
    throw new Error('Invalid amount');
  const fee = Math.round(amount * rate);
  return { gross: amount, fee, net: amount - fee };
}
export async function createGig(
  input: Omit<Gig, 'id' | 'status' | 'proposals'>,
) {
  await delay();
  if (!input.title.trim() || input.budget < 100)
    throw new Error('Add a title and a budget of at least ৳100.');
  if (maskContacts(input.title + input.summary) !== input.title + input.summary)
    throw new Error('Remove contact details from the public brief.');
  const gig: Gig = {
    ...input,
    id: `g${Date.now()}`,
    status: 'open',
    proposals: 0,
  };
  change((s) => ({ ...s, gigs: [gig, ...s.gigs] }));
  return gig;
}
export async function propose(gigId: string, price: number, message: string) {
  await delay();
  if (price < 100 || !message.trim())
    throw new Error('Add your price and proposal.');
  change((s) => ({
    ...s,
    proposals: [
      ...s.proposals,
      {
        id: `p${Date.now()}`,
        gigId,
        providerId: 'nusrat',
        price,
        days: 3,
        message: maskContacts(message),
      },
    ],
    gigs: s.gigs.map((g) =>
      g.id === gigId ? { ...g, proposals: g.proposals + 1 } : g,
    ),
  }));
}
export async function acceptProposal(id: string) {
  await delay();
  const p = state.proposals.find((x) => x.id === id);
  if (!p) throw new Error('Proposal not found.');
  const existing = state.orders.find((o) => o.id === `N-${id}`);
  if (existing) return existing;
  const g = state.gigs.find((x) => x.id === p.gigId);
  if (!g) throw new Error('Gig not found.');
  const o: Order = {
    id: `N-${id}`,
    title: g.title,
    providerId: p.providerId,
    price: p.price,
    status: 'accepted',
    clientAccepted: true,
    providerAccepted: false,
    events: [
      { text: 'Client accepted the proposal', at: new Date().toISOString() },
    ],
  };
  change((s) => ({
    ...s,
    orders: [o, ...s.orders],
    gigs: s.gigs.map((x) =>
      x.id === g.id ? { ...x, status: 'in_progress' } : x,
    ),
  }));
  return o;
}
export function nextOrder(
  order: Order,
  action: 'accept' | 'fund' | 'deliver' | 'approve' | 'revise' | 'dispute',
  role: Role,
  note = '',
): Order {
  const o = { ...order, events: [...order.events] };
  let event = '';
  if (action === 'accept') {
    if (role !== 'provider' || o.status !== 'accepted')
      throw new Error('Provider acceptance is required.');
    o.providerAccepted = true;
    event = 'Provider accepted the order';
  }
  if (action === 'fund') {
    if (
      role !== 'client' ||
      o.status !== 'accepted' ||
      !o.clientAccepted ||
      !o.providerAccepted
    )
      throw new Error('Both parties must accept before funding.');
    o.status = 'details_unlocked';
    o.privateDetails = {
      workspaceNotes:
        'Project details are now shared only with the two order participants.',
    };
    event = 'Escrow funded; project details made available';
  }
  if (action === 'deliver') {
    if (role !== 'provider' || o.status !== 'details_unlocked' || !note.trim())
      throw new Error('Add a delivery note to the active order.');
    o.status = 'delivered';
    o.delivery = maskContacts(note);
    event = 'Work delivered for review';
  }
  if (action === 'approve') {
    if (role !== 'client' || o.status !== 'delivered')
      throw new Error('Only the client can approve delivered work.');
    o.status = 'completed';
    event = 'Delivery approved; payment released';
  }
  if (action === 'revise') {
    if (role !== 'client' || o.status !== 'delivered')
      throw new Error('Revisions are available after delivery.');
    o.status = 'details_unlocked';
    event = 'Client requested a revision';
  }
  if (action === 'dispute') {
    if (!['delivered', 'details_unlocked'].includes(o.status))
      throw new Error('This order cannot be disputed.');
    o.status = 'disputed';
    event = 'Dispute opened for human review';
  }
  o.events.push({ text: event, at: new Date().toISOString() });
  return o;
}
export async function actOnOrder(
  id: string,
  action: Parameters<typeof nextOrder>[1],
  role: Role,
  key: string,
  note = '',
) {
  await delay();
  if (keys.has(key)) return;
  const current = state.orders.find((o) => o.id === id);
  if (!current) throw new Error('Order not found.');
  const updated = nextOrder(current, action, role, note);
  keys.add(key);
  change((s) => ({
    ...s,
    orders: s.orders.map((o) => (o.id === id ? updated : o)),
  }));
}
export async function sendMessage(body: string) {
  await delay();
  const masked = maskContacts(body.trim());
  if (!masked) throw new Error('Write a message first.');
  if (masked !== body.trim()) {
    strikes++;
    if (strikes >= 3)
      throw new Error(
        'Repeated contact sharing was blocked. Edit your message to continue.',
      );
  }
  change((s) => ({
    ...s,
    messages: [
      ...s.messages,
      {
        id: `m${Date.now()}`,
        body: masked,
        sender: 'you',
        at: new Date().toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Asia/Dhaka',
        }),
      },
    ],
  }));
  return masked !== body.trim();
}
export async function reviewCase(id: string, reason: string) {
  await delay();
  if (reason.trim().length < 10)
    throw new Error('Provide a reason of at least 10 characters.');
  change((s) => ({
    ...s,
    cases: s.cases.map((c) => (c.id === id ? { ...c, status: 'reviewed' } : c)),
  }));
}
export function resetDemo() {
  state = createSeed();
  strikes = 0;
  keys.clear();
  listeners.forEach((fn) => fn());
}
