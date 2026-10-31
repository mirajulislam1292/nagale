import { useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowRight,
  Plus,
  Clock,
  ShieldCheck,
  ArrowUpRight,
  Check,
  SlidersHorizontal,
  Search,
  Send,
  FileText,
  Wallet,
  BriefcaseBusiness,
  Star,
} from 'lucide-react';
import { useApp, useCopy, useMarket, useMoney } from '../app/context';
import {
  AsyncButton,
  Badge,
  Empty,
  PageHeading,
  SectionLink,
} from '../components/interface';
import {
  acceptProposal,
  actOnOrder,
  createGig,
  feeFor,
  propose,
  sendMessage,
  reviewCase,
} from '../api/marketplace';
import type { Gig, OrderStatus } from '../types/marketplace';
const labels: Record<OrderStatus, string> = {
  accepted: 'Awaiting agreement',
  escrow_funded: 'Payment held',
  details_unlocked: 'In progress',
  delivered: 'Ready to review',
  completed: 'Completed',
  disputed: 'Under review',
};
function OrderList() {
  const { orders, providers } = useMarket();
  const money = useMoney();
  const { pathname } = useLocation();
  const base = pathname.startsWith('/provider') ? '/provider' : '/client';
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Order</th>
            <th>Working with</th>
            <th>Amount</th>
            <th>Status</th>
            <th>
              <span className="sr-only">Open</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>
                <Link className="name-link" to={`${base}/orders/${o.id}`}>
                  {o.title}
                </Link>
                <small className="muted">{o.id}</small>
              </td>
              <td>{providers.find((p) => p.id === o.providerId)?.name}</td>
              <td className="nowrap">{money(o.price)}</td>
              <td>
                <Badge
                  tone={
                    o.status === 'completed'
                      ? 'green'
                      : o.status === 'delivered'
                        ? 'amber'
                        : 'neutral'
                  }
                >
                  {labels[o.status]}
                </Badge>
              </td>
              <td>
                <Link
                  className="icon-button"
                  aria-label={`Open ${o.id}`}
                  to={`${base}/orders/${o.id}`}
                >
                  <ArrowUpRight size={18} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export function Dashboard() {
  const c = useCopy();
  const { gigs, orders } = useMarket();
  const money = useMoney();
  const { pathname } = useLocation();
  const provider = pathname.startsWith('/provider');
  const [filter, setFilter] = useState('All');
  const [q, setQ] = useState('');
  const shown = gigs.filter(
    (g) =>
      (filter === 'All' || g.type === filter.toLowerCase()) &&
      g.title.toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <>
      <PageHeading
        eyebrow={c('Your workspace', 'আপনার কাজের জায়গা')}
        title={
          provider
            ? c('Good to see you, Nusrat.', 'আবার স্বাগতম, নুসরাত।')
            : c('Good to see you, Mahim.', 'আবার স্বাগতম, মাহিম।')
        }
        action={
          <Link
            to={provider ? '/provider/profile' : '/client/new'}
            className="button"
          >
            <Plus size={17} />
            {provider
              ? c('View profile', 'প্রোফাইল দেখুন')
              : c('Post a job', 'কাজ পোস্ট করুন')}
          </Link>
        }
      >
        {provider
          ? c(
              'Find your next task and keep current work moving.',
              'নতুন কাজ খুঁজুন ও চলমান কাজ এগিয়ে নিন।',
            )
          : c(
              'Here is where your work stands today.',
              'আপনার কাজের বর্তমান অবস্থা।',
            )}
      </PageHeading>
      <div className="stats-grid">
        {[
          [
            provider ? 'Matched jobs' : 'Open jobs',
            gigs.filter((g) => g.status === 'open').length,
            BriefcaseBusiness,
          ],
          [
            provider ? 'Active orders' : 'In progress',
            orders.filter((o) => !['completed', 'disputed'].includes(o.status))
              .length,
            Clock,
          ],
          [
            provider ? 'Demo earnings' : 'Payment held',
            money(
              orders
                .filter((o) =>
                  provider
                    ? o.status === 'completed'
                    : ['details_unlocked', 'delivered'].includes(o.status),
                )
                .reduce((a, o) => a + o.price, 0),
            ),
            Wallet,
          ],
        ].map(([name, value, Icon]) => {
          const I = Icon as typeof Wallet;
          return (
            <div className="stat" key={String(name)}>
              <div>
                <span>{String(name)}</span>
                <I size={19} strokeWidth={1.5} />
              </div>
              <strong>{String(value)}</strong>
              <small>{c('Demo workspace', 'ডেমো ওয়ার্কস্পেস')}</small>
            </div>
          );
        })}
      </div>
      <div className="attention">
        <div className="attention-icon">
          <FileText size={24} />
        </div>
        <div>
          <strong>
            {provider
              ? c('Complete your profile', 'প্রোফাইল সম্পূর্ণ করুন')
              : c(
                  'A delivery is ready for your review',
                  'একটি ডেলিভারি আপনার পর্যালোচনার অপেক্ষায়',
                )}
          </strong>
          <p>
            {provider
              ? 'Add your skills and work samples so clients can make an informed choice.'
              : 'Nusrat has submitted the first draft of your graduate CV.'}
          </p>
        </div>
        <Link
          to={provider ? '/provider/onboarding' : '/client/orders/N-1042'}
          className="button button--outline"
        >
          {provider ? 'View verification' : 'Review delivery'}
          <ArrowRight size={16} />
        </Link>
      </div>
      <section className="workspace-section">
        <div className="section-heading">
          <h2>{c('Active orders', 'চলমান অর্ডার')}</h2>
          <Badge>Demo</Badge>
        </div>
        <OrderList />
      </section>
      <section className="workspace-section">
        <div className="section-heading">
          <h2>
            {provider
              ? c('Find your next job', 'পরের কাজ খুঁজুন')
              : c('Your posted jobs', 'আপনার পোস্ট করা কাজ')}
          </h2>
          <span className="small muted">
            {shown.length} {c('jobs', 'টি কাজ')}
          </span>
        </div>
        <div className="list-controls">
          <div className="tabs">
            {['All', 'Digital', 'Local'].map((f) => (
              <button
                className={filter === f ? 'selected' : ''}
                onClick={() => setFilter(f)}
                key={f}
              >
                {f}
              </button>
            ))}
          </div>
          <label className="search-field">
            <Search size={17} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={c('Search jobs', 'কাজ খুঁজুন')}
            />
          </label>
        </div>
        <div className="jobs-list">
          {shown.map((g) => (
            <Link
              to={provider ? `/provider/feed/${g.id}` : `/client/gigs/${g.id}`}
              className="job-row"
              key={g.id}
            >
              <span className="job-icon">
                <FileText size={22} strokeWidth={1.5} />
              </span>
              <div>
                <div className="job-meta">
                  <span>{g.category}</span>
                  <span>·</span>
                  <span>{g.type}</span>
                </div>
                <h3>{g.title}</h3>
                <p>
                  {g.proposals} proposals · {g.area}
                </p>
              </div>
              <div className="job-right">
                <strong>{money(g.budget)}</strong>
                <span>
                  View job <ArrowUpRight size={14} />
                </span>
              </div>
            </Link>
          ))}
          {!shown.length && (
            <Empty title="No jobs match this search">
              <button
                className="text-link"
                onClick={() => {
                  setQ('');
                  setFilter('All');
                }}
              >
                Clear filters
              </button>
            </Empty>
          )}
        </div>
      </section>
    </>
  );
}
export function Brief() {
  const c = useCopy();
  const nav = useNavigate();
  const { notify } = useApp();
  const [step, setStep] = useState(1);
  const [prompt, setPrompt] = useState(
    sessionStorage.getItem('nagale.brief') || '',
  );
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('CV writing');
  const [type, setType] = useState<'digital' | 'local'>('digital');
  const [budget, setBudget] = useState(1500);
  const [area, setArea] = useState('Dhanmondi, Dhaka');
  const [deadline, setDeadline] = useState('2026-11-14');
  const [summary, setSummary] = useState('');
  const money = useMoney();
  const build = () => {
    setTitle(prompt.slice(0, 100));
    setSummary(prompt);
    if (/web/i.test(prompt)) {
      setCategory('Web development');
      setBudget(22000);
    }
    if (/photo/i.test(prompt)) {
      setCategory('Photography');
      setType('local');
      setBudget(4500);
    }
    setStep(2);
  };
  return (
    <>
      <PageHeading
        eyebrow={c('New job', 'নতুন কাজ')}
        title={c('Start with what you need.', 'আপনার প্রয়োজন দিয়ে শুরু করুন।')}
      >
        {c(
          'Turn your request into a brief. Check every detail before it goes live.',
          'আপনার অনুরোধ থেকে কাজের বিবরণ তৈরি করুন। পোস্ট করার আগে সব দেখুন।',
        )}
      </PageHeading>
      <div className="intake-layout">
        <section className="panel">
          <div className="form-progress">
            <span className={step === 1 ? 'current' : ''}>01 Describe</span>
            <span className={step === 2 ? 'current' : ''}>02 Review</span>
            <span>03 Post</span>
          </div>
          {step === 1 ? (
            <>
              <label className="field-label" htmlFor="prompt">
                {c('What would you like someone to do?', 'কী কাজ করাতে চান?')}
              </label>
              <textarea
                id="prompt"
                rows={7}
                value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value);
                  sessionStorage.setItem('nagale.brief', e.target.value);
                }}
                placeholder="Describe the outcome, what you already have, and when you need it."
              />
              <div className="form-bottom">
                <span className="small muted">
                  Demo brief builder · no live AI
                </span>
                <button
                  className="button"
                  disabled={!prompt.trim()}
                  onClick={build}
                >
                  Create a brief <ArrowRight size={17} />
                </button>
              </div>
              <button
                className="text-link"
                onClick={() => {
                  setSummary(prompt);
                  setStep(2);
                }}
              >
                Write the brief myself
              </button>
            </>
          ) : (
            <form onSubmit={(e) => e.preventDefault()} className="form-stack">
              <label>
                Job title
                <input
                  value={title}
                  maxLength={100}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </label>
              <label>
                What needs to be delivered?
                <textarea
                  rows={4}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  required
                />
              </label>
              <div className="two-fields">
                <label>
                  Category
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {[
                      'CV writing',
                      'Web development',
                      'Design',
                      'Photography',
                      'Translation',
                      'Tutoring',
                      'Data entry',
                      'Local services',
                      'Other',
                    ].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Work type
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as Gig['type'])}
                  >
                    <option value="digital">Digital</option>
                    <option value="local">Local</option>
                  </select>
                </label>
                <label>
                  Budget (BDT)
                  <input
                    type="number"
                    min={100}
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                  />
                </label>
                <label>
                  Deadline
                  <input
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                  />
                </label>
              </div>
              {type === 'local' && (
                <label>
                  Approximate area
                  <input
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                  />
                </label>
              )}
              <div className="form-bottom">
                <button className="text-link" onClick={() => setStep(1)}>
                  Back to request
                </button>
                <AsyncButton
                  onClick={async () => {
                    const g = await createGig({
                      title,
                      summary,
                      category,
                      type,
                      budget,
                      deadline,
                      area: type === 'local' ? area : 'Anywhere in Bangladesh',
                    });
                    notify('Your demo job has been posted.');
                    sessionStorage.removeItem('nagale.brief');
                    nav(`/client/gigs/${g.id}`);
                  }}
                >
                  Post job <ArrowUpRight size={17} />
                </AsyncButton>
              </div>
            </form>
          )}
        </section>
        <aside className="brief-aside">
          <ShieldCheck size={25} strokeWidth={1.5} />
          <h3>A clear brief helps both sides.</h3>
          <ul>
            <li>Describe the result you want.</li>
            <li>Include a realistic budget and deadline.</li>
            <li>
              Keep phone numbers and exact addresses out of the public brief.
            </li>
          </ul>
          <div className="aside-divider" />
          <p className="small muted">Your budget</p>
          <strong className="aside-amount">{money(budget)}</strong>
          <p className="small">
            You only fund the order after both parties agree.
          </p>
          <SectionLink to="/fees">See how fees work</SectionLink>
        </aside>
      </div>
    </>
  );
}
export function GigDetail() {
  const { gigId } = useParams();
  const { gigs, proposals, providers } = useMarket();
  const { pathname } = useLocation();
  const provider = pathname.startsWith('/provider');
  const g = gigs.find((g) => g.id === gigId);
  const money = useMoney();
  const nav = useNavigate();
  const { notify } = useApp();
  const [sort, setSort] = useState('price');
  const [price, setPrice] = useState(1200);
  const [message, setMessage] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  if (!g)
    return (
      <Empty title="Job not found">
        <Link to="/client">Return to workspace</Link>
      </Empty>
    );
  const ps = proposals
    .filter((p) => p.gigId === g.id)
    .sort((a, b) => (sort === 'price' ? a.price - b.price : a.days - b.days));
  return (
    <>
      <Link className="back-link" to={provider ? '/provider' : '/client'}>
        ← Back to workspace
      </Link>
      <PageHeading eyebrow={`${g.category} / ${g.type}`} title={g.title} />
      <div className="detail-layout">
        <div>
          <section className="panel">
            <h2>The brief</h2>
            <p className="body-copy">{g.summary}</p>
            <dl className="brief-facts">
              <div>
                <dt>Budget</dt>
                <dd>{money(g.budget)}</dd>
              </div>
              <div>
                <dt>Deadline</dt>
                <dd>{g.deadline}</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>{g.area}</dd>
              </div>
            </dl>
          </section>
          {provider ? (
            <section className="panel form-stack">
              <h2>Send your proposal</h2>
              <label>
                Your price (BDT)
                <input
                  type="number"
                  min={100}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </label>
              <label>
                How will you approach this work?
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </label>
              <AsyncButton
                onClick={async () => {
                  await propose(g.id, price, message);
                  setMessage('');
                  notify('Proposal sent. The client can now review it.');
                }}
              >
                Send proposal <Send size={17} />
              </AsyncButton>
            </section>
          ) : (
            <section className="workspace-section">
              <div className="section-heading">
                <h2>
                  Proposals <span className="muted">{ps.length}</span>
                </h2>
                <label className="inline-select">
                  <SlidersHorizontal size={17} />
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    aria-label="Sort proposals"
                  >
                    <option value="price">Lowest price</option>
                    <option value="days">Fastest delivery</option>
                  </select>
                </label>
              </div>
              {selected.length >= 2 && (
                <div className="comparison">
                  <h3>Compare selected proposals</h3>
                  {ps
                    .filter((p) => selected.includes(p.id))
                    .map((p) => (
                      <div key={p.id}>
                        <strong>
                          {providers.find((x) => x.id === p.providerId)?.name}
                        </strong>
                        <span>
                          {money(p.price)} · {p.days} days
                        </span>
                      </div>
                    ))}
                </div>
              )}
              {ps.map((p) => {
                const person = providers.find((x) => x.id === p.providerId);
                return (
                  <article className="proposal" key={p.id}>
                    <div className="provider-top">
                      <span className="avatar">{person?.initials}</span>
                      <div>
                        <Link className="name-link" to={`/p/${p.providerId}`}>
                          {person?.name}
                        </Link>
                        <p className="small muted">{person?.headline}</p>
                      </div>
                      <ShieldCheck className="verified" size={20} />
                    </div>
                    <p>{p.message}</p>
                    <div className="proposal-footer">
                      <div>
                        <strong>{money(p.price)}</strong>
                        <span className="small muted">
                          {p.days} days delivery
                        </span>
                      </div>
                      <label className="check-label">
                        <input
                          type="checkbox"
                          checked={selected.includes(p.id)}
                          disabled={
                            !selected.includes(p.id) && selected.length === 3
                          }
                          onChange={() =>
                            setSelected(
                              selected.includes(p.id)
                                ? selected.filter((x) => x !== p.id)
                                : [...selected, p.id],
                            )
                          }
                        />
                        Compare
                      </label>
                      <AsyncButton
                        className="button button--outline"
                        onClick={async () => {
                          const o = await acceptProposal(p.id);
                          nav(`/client/orders/${o.id}`);
                        }}
                      >
                        Choose proposal <ArrowRight size={16} />
                      </AsyncButton>
                    </div>
                  </article>
                );
              })}
              {!ps.length && (
                <Empty title="Your job is open for proposals">
                  <p>
                    Providers can now review your brief. Use the provider demo
                    to submit a proposal.
                  </p>
                  <Link
                    to={`/provider/feed/${g.id}`}
                    className="button button--outline"
                  >
                    View as provider
                  </Link>
                </Empty>
              )}
            </section>
          )}
        </div>
        <aside className="brief-aside">
          <ShieldCheck size={26} />
          <h3>Agree before you begin.</h3>
          <p>
            Choosing a proposal starts an agreement. The provider must accept
            before you can fund escrow.
          </p>
          <p>Payments and messages stay in the order workspace.</p>
          <SectionLink to="/trust">Read the process</SectionLink>
        </aside>
      </div>
    </>
  );
}
export function OrderDetail() {
  const { orderId } = useParams();
  const { orders, providers, feeRate } = useMarket();
  const { role, setRole, notify } = useApp();
  const money = useMoney();
  const [note, setNote] = useState('');
  const [confirm, setConfirm] = useState(false);
  const o = orders.find((o) => o.id === orderId);
  if (!o)
    return (
      <Empty title="Order not found">
        <Link to="/client">Return to dashboard</Link>
      </Empty>
    );
  const person = providers.find((p) => p.id === o.providerId);
  const fee = feeFor(o.price, feeRate);
  const action = async (a: Parameters<typeof actOnOrder>[1]) => {
    await actOnOrder(o.id, a, role, crypto.randomUUID(), note);
    setConfirm(false);
    notify('Demo order updated. No real payment was processed.');
  };
  return (
    <>
      <Link
        className="back-link"
        to={role === 'provider' ? '/provider' : '/client'}
      >
        ← Back to orders
      </Link>
      <PageHeading
        eyebrow={`Order ${o.id}`}
        title={o.title}
        action={
          <Badge tone={o.status === 'completed' ? 'green' : 'neutral'}>
            {labels[o.status]}
          </Badge>
        }
      />
      <div className="demo-role-bar">
        <span>Review this demo as</span>
        <button
          className={role === 'client' ? 'selected' : ''}
          onClick={() => setRole('client')}
        >
          Client
        </button>
        <button
          className={role === 'provider' ? 'selected' : ''}
          onClick={() => setRole('provider')}
        >
          Provider
        </button>
      </div>
      <div className="order-steps">
        {[
          'Agreement',
          'Payment held',
          'In progress',
          'Delivery',
          'Completed',
        ].map((s, i) => {
          const index = {
            accepted: 0,
            escrow_funded: 1,
            details_unlocked: 2,
            delivered: 3,
            completed: 4,
            disputed: 3,
          }[o.status];
          return (
            <div className={i <= index ? 'done' : ''} key={s}>
              <span>{i < index ? <Check size={15} /> : i + 1}</span>
              <p>{s}</p>
            </div>
          );
        })}
      </div>
      <div className="detail-layout">
        <div>
          <section className="panel order-action">
            <p className="eyebrow">Next step</p>
            <h2>
              {o.status === 'accepted'
                ? o.providerAccepted
                  ? 'Fund the agreed work.'
                  : 'Waiting for provider acceptance.'
                : o.status === 'delivered'
                  ? 'Review the delivered work.'
                  : o.status === 'completed'
                    ? 'This order is complete.'
                    : o.status === 'disputed'
                      ? 'Your dispute is under review.'
                      : 'Work is in progress.'}
            </h2>
            {o.status === 'accepted' && (
              <>
                <p>
                  Client accepted: yes · Provider accepted:{' '}
                  {o.providerAccepted ? 'yes' : 'not yet'}
                </p>
                {role === 'provider' && !o.providerAccepted && (
                  <AsyncButton onClick={() => action('accept')}>
                    Accept agreement
                  </AsyncButton>
                )}
                {role === 'client' && (
                  <AsyncButton
                    disabled={!o.providerAccepted}
                    onClick={() => action('fund')}
                  >
                    Fund escrow · {money(o.price)}
                  </AsyncButton>
                )}
              </>
            )}
            {o.status === 'details_unlocked' && (
              <>
                <p>
                  Payment is held. Keep updates and delivery notes in this
                  workspace.
                </p>
                {role === 'provider' && (
                  <div className="form-stack">
                    <label>
                      Delivery note
                      <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        rows={4}
                      />
                    </label>
                    <AsyncButton onClick={() => action('deliver')}>
                      Submit delivery
                    </AsyncButton>
                  </div>
                )}
              </>
            )}
            {o.status === 'delivered' && (
              <>
                <div className="delivery-preview">
                  <FileText size={30} />
                  <div>
                    <strong>Delivery note</strong>
                    <p>{o.delivery}</p>
                  </div>
                  <Badge>Preview</Badge>
                </div>
                {role === 'client' &&
                  (!confirm ? (
                    <div className="button-row">
                      <button
                        className="button"
                        onClick={() => setConfirm(true)}
                      >
                        Approve delivery
                      </button>
                      <AsyncButton
                        className="button button--outline"
                        onClick={() => action('revise')}
                      >
                        Request revision
                      </AsyncButton>
                    </div>
                  ) : (
                    <div className="confirmation" role="alert">
                      <h3>Release {money(o.price)}?</h3>
                      <p>
                        In this demo, approval completes the order. Provider
                        receives {money(fee.net)} after the {money(fee.fee)}{' '}
                        service fee.
                      </p>
                      <div className="button-row">
                        <AsyncButton onClick={() => action('approve')}>
                          Confirm approval
                        </AsyncButton>
                        <button
                          className="button button--outline"
                          onClick={() => setConfirm(false)}
                        >
                          Keep reviewing
                        </button>
                      </div>
                    </div>
                  ))}
              </>
            )}
            {o.status === 'completed' && (
              <>
                <p>
                  Payment released to the provider. Thank you for keeping the
                  work and payment on Nagale.
                </p>
                <button
                  className="button button--outline"
                  onClick={() => window.print()}
                >
                  Print receipt
                </button>
              </>
            )}
            {o.status === 'disputed' && (
              <p>
                A human reviewer will consider both sides and the order
                evidence. Payments remain held in this demo.
              </p>
            )}
          </section>
          {o.privateDetails && (
            <section className="panel">
              <h2>Private project details</h2>
              <p>{o.privateDetails.workspaceNotes}</p>
              <Badge tone="green">Visible to order participants</Badge>
            </section>
          )}
          <section className="panel">
            <h2>Order activity</h2>
            <ol className="activity">
              {o.events.map((event, i) => (
                <li key={i}>
                  <span className="activity-dot" />
                  <div>
                    <strong>{event.text}</strong>
                    <small>
                      {new Date(event.at).toLocaleDateString('en-GB', {
                        timeZone: 'Asia/Dhaka',
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </small>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>
        <aside>
          <section className="panel">
            <div className="provider-top">
              <div className="avatar">{person?.initials}</div>
              <div>
                <strong>{person?.name}</strong>
                <p className="small muted">Your provider</p>
              </div>
            </div>
            <dl className="price-summary">
              <div>
                <dt>Agreed price</dt>
                <dd>{money(o.price)}</dd>
              </div>
              <div>
                <dt>Provider fee ({feeRate * 100}%)</dt>
                <dd>{money(fee.fee)}</dd>
              </div>
              <div>
                <dt>Provider receives</dt>
                <dd>{money(fee.net)}</dd>
              </div>
            </dl>
            <Link
              className="button button--outline full"
              to={`/${role === 'provider' ? 'provider' : 'client'}/messages`}
            >
              Open messages
            </Link>
          </section>
          {['details_unlocked', 'delivered'].includes(o.status) && (
            <section className="panel">
              <h3>Something needs resolving?</h3>
              <p className="small muted">
                Try discussing the issue first. You can open a dispute if you
                need help.
              </p>
              <AsyncButton
                className="text-link"
                onClick={() => action('dispute')}
              >
                Open dispute
              </AsyncButton>
            </section>
          )}
        </aside>
      </div>
    </>
  );
}
export function Messages() {
  const { messages } = useMarket();
  const [body, setBody] = useState('');
  const { notify } = useApp();
  return (
    <>
      <PageHeading eyebrow="Order conversations" title="Messages">
        Keep decisions, updates and delivery details in one place.
      </PageHeading>
      <div className="messaging">
        <aside className="thread-list">
          <p className="eyebrow">Order conversation</p>
          <div className="thread selected">
            <span className="avatar">NJ</span>
            <span>
              <strong>Nusrat Jahan</strong>
              <small>Graduate CV · N-1042</small>
            </span>
          </div>
          <div className="thread-info">
            <ShieldCheck size={22} />
            <p>
              Contact details and external links are masked before a message is
              sent.
            </p>
          </div>
        </aside>
        <section className="conversation">
          <div className="conversation-header">
            <div>
              <strong>Nusrat Jahan</strong>
              <p className="small muted">Graduate CV and cover letter</p>
            </div>
            <Link to="/client/orders/N-1042" className="text-link">
              View order <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="message-list" aria-live="polite">
            {messages.map((m) => (
              <div className={`message message--${m.sender}`} key={m.id}>
                <p>{m.body}</p>
                <small>{m.at}</small>
              </div>
            ))}
          </div>
          <form className="composer" onSubmit={(e) => e.preventDefault()}>
            <label className="sr-only" htmlFor="message">
              Write a message
            </label>
            <textarea
              id="message"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={2}
              placeholder="Write a message…"
            />
            <AsyncButton
              disabled={!body.trim()}
              onClick={async () => {
                const masked = await sendMessage(body);
                setBody('');
                if (masked)
                  notify(
                    'Contact details were hidden. Keep your conversation on Nagale.',
                  );
              }}
            >
              Send <Send size={17} />
            </AsyncButton>
          </form>
        </section>
      </div>
    </>
  );
}
export function Profile() {
  const { providerId } = useParams();
  const { providers } = useMarket();
  const p = providers.find((p) => p.id === providerId) || providers[0];
  const money = useMoney();
  if (!p) return null;
  return (
    <div className="section-wrap profile-page">
      <Link className="back-link" to="/">
        ← Explore Nagale
      </Link>
      <div className="profile-hero">
        <div className="avatar avatar--large">{p.initials}</div>
        <div>
          <Badge tone="green">Identity verified · demo</Badge>
          <h1 tabIndex={-1}>{p.name}</h1>
          <p className="profile-headline">{p.headline}</p>
          <p className="muted">{p.area}</p>
        </div>
        <Link to="/client/new" className="button">
          Invite to a job <ArrowUpRight size={18} />
        </Link>
      </div>
      <div className="profile-layout">
        <div>
          <section className="panel">
            <h2>About</h2>
            <p className="body-copy">{p.bio}</p>
            <div className="skills">
              {p.skills.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </section>
          <section className="panel">
            <h2>Selected work</h2>
            <div className="portfolio-grid">
              {[
                'Document structure',
                'Presentation layout',
                'Project outline',
              ].map((s, i) => (
                <div className="portfolio-item" key={s}>
                  <div className="portfolio-art">
                    <div className="fake-line short" />
                    <div className="fake-line" />
                    <div className="fake-line" />
                    <span>0{i + 1}</span>
                  </div>
                  <h3>{s}</h3>
                  <p className="small muted">Illustrative sample · demo</p>
                </div>
              ))}
            </div>
          </section>
        </div>
        <aside>
          <section className="panel">
            <h3>At a glance</h3>
            <dl className="price-summary">
              <div>
                <dt>Demo rating</dt>
                <dd>
                  <Star size={14} /> {p.rating} / 5
                </dd>
              </div>
              <div>
                <dt>Demo jobs completed</dt>
                <dd>{p.completed}</dd>
              </div>
              <div>
                <dt>Starting price</dt>
                <dd>{money(p.price)}</dd>
              </div>
            </dl>
            <p className="small muted">
              Agree on scope and price before starting an order.
            </p>
          </section>
          <section className="panel">
            <ShieldCheck size={24} />
            <h3>Verified, with boundaries.</h3>
            <p className="small muted">
              Verification records stay private. No phone numbers, identity
              documents or payment details appear on this profile.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
export function WalletPage() {
  const { orders, feeRate } = useMarket();
  const money = useMoney();
  const { pathname } = useLocation();
  const provider = pathname.startsWith('/provider');
  const [method, setMethod] = useState('bKash');
  const { notify } = useApp();
  const completed = orders.filter((o) => o.status === 'completed');
  const held = orders
    .filter((o) =>
      ['details_unlocked', 'delivered', 'disputed'].includes(o.status),
    )
    .reduce((n, o) => n + o.price, 0);
  return (
    <>
      <PageHeading eyebrow="Payments" title="Your wallet">
        Every amount is linked to an order. All balances are demo data.
      </PageHeading>
      <div className="stats-grid">
        <div className="stat">
          <span>Payment held</span>
          <strong>{money(held)}</strong>
          <small>Across active orders</small>
        </div>
        <div className="stat">
          <span>{provider ? 'Net earnings' : 'Completed payments'}</span>
          <strong>
            {money(
              completed.reduce(
                (n, o) =>
                  n + (provider ? feeFor(o.price, feeRate).net : o.price),
                0,
              ),
            )}
          </strong>
          <small>From completed demo orders</small>
        </div>
        <div className="stat">
          <span>Provider service fee</span>
          <strong>{feeRate * 100}%</strong>
          <SectionLink to="/fees">View fee calculation</SectionLink>
        </div>
      </div>
      <div className="detail-layout">
        <section className="panel">
          <h2>Order transactions</h2>
          <div className="transaction-list">
            {orders.map((o) => (
              <Link
                to={`/${provider ? 'provider' : 'client'}/orders/${o.id}`}
                key={o.id}
              >
                <span className="job-icon">
                  <Wallet size={20} />
                </span>
                <span>
                  <strong>{o.title}</strong>
                  <small>
                    {o.id} · {labels[o.status]}
                  </small>
                </span>
                <strong>{money(o.price)}</strong>
              </Link>
            ))}
          </div>
        </section>
        <aside className="panel form-stack">
          <h3>Payout method</h3>
          <p className="small muted">
            No payment account is collected in this prototype.
          </p>
          <label>
            Method
            <select value={method} onChange={(e) => setMethod(e.target.value)}>
              <option>bKash</option>
              <option>Nagad</option>
              <option>Bank transfer</option>
            </select>
          </label>
          <button
            className="button button--outline"
            onClick={() =>
              notify(
                `${method} selected for this demo. Real payout setup requires the backend.`,
              )
            }
          >
            Save demo preference
          </button>
        </aside>
      </div>
    </>
  );
}
export function Verification() {
  const [step, setStep] = useState<string | null>(null);
  const { notify } = useApp();
  return (
    <>
      <PageHeading
        eyebrow="Provider identity"
        title="Build a profile clients can trust."
      >
        Verification documents stay private. Only the result appears on your
        profile.
      </PageHeading>
      <div className="verification-grid">
        {[
          [
            '01',
            'Phone & selfie',
            'Confirm your phone and submit a clear selfie.',
            'Approved',
          ],
          [
            '02',
            'Identity verification',
            'A secure identity check, reviewed privately.',
            'Not started',
          ],
          [
            '03',
            'Skill review',
            'Share work samples and relevant certificates.',
            'Not started',
          ],
        ].map(([n, title, description, status]) => (
          <section className="panel" key={n}>
            <span className="large-number">{n}</span>
            <h2>{title}</h2>
            <p>{description}</p>
            <Badge tone={status === 'Approved' ? 'green' : 'neutral'}>
              {step === title ? 'Submitted for demo review' : status}
            </Badge>
            {status !== 'Approved' && (
              <button
                className="button button--outline full"
                onClick={() => {
                  setStep(title || '');
                  notify(
                    'Demo verification submitted. No identity document was collected.',
                  );
                }}
              >
                Try demo submission
              </button>
            )}
          </section>
        ))}
      </div>
      <div className="notice-panel">
        <ShieldCheck size={24} />
        <p>
          This prototype demonstrates verification states only. It does not
          collect or store real NID numbers, selfies or certificates. The
          backend must provide secure upload and human review before this
          feature is enabled.
        </p>
      </div>
    </>
  );
}
export function Admin() {
  const { cases } = useMarket();
  const [q, setQ] = useState('');
  const [reason, setReason] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const { notify } = useApp();
  return (
    <>
      <PageHeading eyebrow="Moderation workspace" title="Review queue">
        Flags suggest what to inspect. A human makes the decision.
      </PageHeading>
      <div className="stats-grid">
        <div className="stat">
          <span>Open cases</span>
          <strong>{cases.filter((c) => c.status === 'open').length}</strong>
          <small>Demo queue</small>
        </div>
        <div className="stat">
          <span>High risk</span>
          <strong>{cases.filter((c) => c.risk === 'high').length}</strong>
          <small>Prioritise review</small>
        </div>
        <div className="stat">
          <span>Reviewed</span>
          <strong>{cases.filter((c) => c.status === 'reviewed').length}</strong>
          <small>Human decisions recorded</small>
        </div>
      </div>
      <label className="search-field">
        <Search size={18} />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search cases"
        />
      </label>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Case</th>
              <th>Reason</th>
              <th>Risk</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cases
              .filter((c) =>
                (c.subject + c.reason).toLowerCase().includes(q.toLowerCase()),
              )
              .map((c) => (
                <tr key={c.id}>
                  <td>
                    <strong>{c.subject}</strong>
                    <small>{c.id}</small>
                  </td>
                  <td>{c.reason}</td>
                  <td>
                    <Badge tone={c.risk === 'high' ? 'amber' : 'neutral'}>
                      {c.risk}
                    </Badge>
                  </td>
                  <td>{c.status}</td>
                  <td>
                    <button
                      className="button button--outline button--small"
                      onClick={() => setSelected(c.id)}
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {selected && (
        <section className="panel form-stack">
          <h2>Review {selected}</h2>
          <p>
            Evidence is masked in this demo. Reviewing marks the case as
            reviewed; no user is automatically suspended.
          </p>
          <label>
            Decision reason
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
            />
          </label>
          <AsyncButton
            onClick={async () => {
              await reviewCase(selected, reason);
              setSelected(null);
              setReason('');
              notify('Review recorded in the demo queue.');
            }}
          >
            Record review
          </AsyncButton>
        </section>
      )}
    </>
  );
}
