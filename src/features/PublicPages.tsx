import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  UserRound,
  ShieldCheck,
  BookOpen,
  Check,
} from 'lucide-react';
import { useApp, useCopy, useMarket, useMoney } from '../app/context';
import { AsyncButton, PageHeading, SectionLink } from '../components/interface';
import { feeFor, resetDemo } from '../api/marketplace';
import type { Role } from '../types/marketplace';
export function Auth() {
  const { setRole, notify } = useApp();
  const c = useCopy();
  const nav = useNavigate();
  const [login, setLogin] = useState(false);
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [otp, setOtp] = useState(false);
  const [role, selectRole] = useState<Role>('client');
  const enter = (r: Role) => {
    setRole(r);
    nav(`/${r}`);
  };
  return (
    <div className="auth-page">
      <div className="auth-intro">
        <p className="eyebrow">Nagale / interactive demo</p>
        <h1 tabIndex={-1}>
          {c('Choose your', 'আপনার জায়গা')}
          <br />
          {c('workspace.', 'বেছে নিন।')}
        </h1>
        <p>
          {c(
            'Explore the entire workflow. No sign-in, phone number or payment is needed for the demo.',
            'পুরো কাজের ধারা দেখুন। ডেমোর জন্য লগইন, ফোন নম্বর বা টাকা প্রয়োজন নেই।',
          )}
        </p>
        <div className="auth-trust">
          <ShieldCheck size={22} />
          <span>
            {c(
              'Sample data. Real interactions.',
              'নমুনা তথ্য, ব্যবহারযোগ্য ফিচার।',
            )}
          </span>
        </div>
      </div>
      <div className="auth-options">
        {[
          [
            'client',
            'I need work done',
            'Post a brief, compare proposals and review deliveries.',
            BriefcaseBusiness,
          ],
          [
            'provider',
            'I want to offer a service',
            'Find jobs, send a proposal and manage your work.',
            UserRound,
          ],
          [
            'admin',
            'Explore moderation',
            'Review flags and see the human review workflow.',
            ShieldCheck,
          ],
        ].map(([r, title, description, Icon]) => {
          const I = Icon as typeof UserRound;
          return (
            <button
              className="role-card"
              key={String(r)}
              onClick={() => enter(r as Role)}
            >
              <span className="role-icon">
                <I size={25} strokeWidth={1.5} />
              </span>
              <div>
                <h2>{String(title)}</h2>
                <p>{String(description)}</p>
              </div>
              <ArrowUpRight size={22} />
            </button>
          );
        })}
        <button className="text-link" onClick={() => setLogin(!login)}>
          {login ? 'Hide sign-in preview' : 'See the sign-in flow'}
          <ArrowRight size={16} />
        </button>
        {login && (
          <form
            className="panel form-stack"
            onSubmit={(e) => {
              e.preventDefault();
              if (!otp) {
                if (!/^01[3-9]\d{8}$/.test(phone)) {
                  notify('Enter an 11-digit Bangladesh mobile number.');
                  return;
                }
                setOtp(true);
              } else if (code === '123456') enter(role);
              else notify('For this demo, use 123456.');
            }}
          >
            <h2>Demo sign-in</h2>
            <label>
              Workspace
              <select
                value={role}
                onChange={(e) => selectRole(e.target.value as Role)}
              >
                <option value="client">Client</option>
                <option value="provider">Provider</option>
              </select>
            </label>
            {!otp ? (
              <label>
                Mobile number
                <input
                  inputMode="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) =>
                    setPhone(
                      e.target.value.replace(/[০-৯]/g, (d) =>
                        String('০১২৩৪৫৬৭৮৯'.indexOf(d)),
                      ),
                    )
                  }
                />
              </label>
            ) : (
              <label>
                Verification code
                <input
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </label>
            )}
            <p className="small muted">
              Demo only. No SMS is sent. Verification code: 123456.
            </p>
            <button className="button">
              {otp ? 'Enter workspace' : 'Continue'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
export function Info() {
  const { pathname } = useLocation();
  const { feeRate } = useMarket();
  const money = useMoney();
  const [amount, setAmount] = useState(1500);
  const fee = feeFor(Math.max(0, Math.round(amount || 0)), feeRate);
  const { notify } = useApp();
  const [message, setMessage] = useState('');
  const [notifyCourse, setNotifyCourse] = useState<string[]>([]);
  if (pathname === '/fees')
    return (
      <div className="reading-page">
        <PageHeading eyebrow="Pricing" title="A fee you can calculate.">
          The client pays the agreed order price. A provider service fee is
          deducted when work is approved.
        </PageHeading>
        <section className="fee-calculator panel">
          <label>
            Order value (BDT)
            <input
              type="number"
              min={0}
              max={1000000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </label>
          <dl className="price-summary">
            <div>
              <dt>Client pays</dt>
              <dd>{money(fee.gross)}</dd>
            </div>
            <div>
              <dt>Service fee ({feeRate * 100}%)</dt>
              <dd>{money(fee.fee)}</dd>
            </div>
            <div>
              <dt>Provider receives</dt>
              <dd>{money(fee.net)}</dd>
            </div>
          </dl>
          <p className="small muted">
            This is the demo fee configuration. The production backend will
            supply current fees and any payment-processing charges.
          </p>
        </section>
        <SectionLink to="/trust">How escrow works</SectionLink>
      </div>
    );
  if (pathname === '/learning')
    return (
      <div className="section-wrap learning-page">
        <PageHeading
          eyebrow="Nagale learning"
          title="Practical skills for better work."
        >
          A preview of short guides being prepared for clients and providers.
        </PageHeading>
        <div className="course-grid">
          {[
            [
              'Write a clear job brief',
              'For clients',
              '12 min',
              'Scope, budget and a useful description.',
            ],
            [
              'Send a focused proposal',
              'For providers',
              '15 min',
              'Explain your approach and set expectations.',
            ],
            [
              'Make a useful portfolio',
              'For providers',
              '18 min',
              'Show your process and the result.',
            ],
            [
              'Work safely online',
              'For everyone',
              '10 min',
              'Keep your information and payments protected.',
            ],
            [
              'Handle feedback well',
              'For everyone',
              '14 min',
              'Ask clear questions and agree on revisions.',
            ],
            [
              'Deliver a complete handover',
              'For providers',
              '16 min',
              'Package your files and explain the next steps.',
            ],
          ].map(([title, audience, time, description], i) => (
            <article className="course" key={title}>
              <div className="course-art">
                <BookOpen size={38} strokeWidth={1.5} />
                <span>0{i + 1}</span>
              </div>
              <div className="course-body">
                <p className="eyebrow">
                  {audience} · {time}
                </p>
                <h2>{title}</h2>
                <p>{description}</p>
                <button
                  className="button button--outline full"
                  onClick={() => {
                    if (title)
                      setNotifyCourse(
                        notifyCourse.includes(title)
                          ? notifyCourse.filter((x) => x !== title)
                          : [...notifyCourse, title],
                      );
                  }}
                >
                  {title && notifyCourse.includes(title)
                    ? 'Saved in this demo'
                    : 'Save course preview'}
                  {title && notifyCourse.includes(title) ? (
                    <Check size={16} />
                  ) : (
                    <PlusIcon />
                  )}
                </button>
                <small className="muted">Coming soon · no paid enrolment</small>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  if (pathname === '/support')
    return (
      <div className="reading-page">
        <PageHeading
          eyebrow="Help & support"
          title="Tell us what needs attention."
        >
          Use the order workspace for job updates. For platform issues, describe
          what happened below.
        </PageHeading>
        <form className="panel form-stack" onSubmit={(e) => e.preventDefault()}>
          <label>
            Topic
            <select>
              <option>Using Nagale</option>
              <option>Order or payment</option>
              <option>Account or verification</option>
              <option>Report a concern</option>
            </select>
          </label>
          <label>
            Order ID (optional)
            <input placeholder="N-1042" />
          </label>
          <label>
            Your message
            <textarea
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
          <AsyncButton
            disabled={message.trim().length < 10}
            onClick={async () => {
              setMessage('');
              notify(
                'Demo support request recorded for this session. Nothing was sent to a support team.',
              );
            }}
          >
            Submit demo request <ArrowRight size={17} />
          </AsyncButton>
        </form>
      </div>
    );
  const trust = pathname === '/trust';
  return (
    <div className="reading-page">
      <PageHeading
        eyebrow={trust ? 'Trust & safety' : 'Prototype policies'}
        title={
          trust
            ? 'Know what happens to your work.'
            : pathname === '/privacy'
              ? 'Your information stays private.'
              : 'Clear agreements, from the start.'
        }
      />
      {(trust
        ? [
            [
              'Both sides agree',
              'The brief sets the deliverables, price and deadline. The client chooses a proposal and the provider confirms before funding.',
            ],
            [
              'Payment is held',
              'The client funds the order. The provider works while payment is held, then submits the delivery. The client reviews before releasing payment.',
            ],
            [
              'Verification has levels',
              'Phone and selfie, identity and skill checks are separate. Public profiles show verification status, never identity documents or payment accounts.',
            ],
            [
              'Keep conversations on the platform',
              'Contact details and external links are masked in messages. Repeated attempts are blocked for review. This protects the record of what both sides agreed.',
            ],
            [
              'A human reviews disputes',
              'If a problem cannot be resolved together, an order can be disputed. Evidence supports a human decision; an AI flag alone does not impose a ban.',
            ],
          ]
        : [
            [
              'About this prototype',
              'Nagale is being developed as a marketplace for digital and locally coordinated services. This preview uses demonstration data and does not process real payments.',
            ],
            [
              'Data in this demo',
              'Messages and orders remain in temporary browser memory and reset on reload. Your chosen language is saved on this device. Do not enter real identity documents or payment details.',
            ],
            [
              'Before a public launch',
              'Production policies, data retention, payment terms and support procedures require review before real users or payments are enabled.',
            ],
          ]
      ).map(([title, body], i) => (
        <section className="reading-section" key={title}>
          <span className="eyebrow">0{i + 1}</span>
          <h2>{title}</h2>
          <p>{body}</p>
        </section>
      ))}
      <SectionLink to="/fees">See the fee calculation</SectionLink>
    </div>
  );
}
function PlusIcon() {
  return <ArrowUpRight size={16} />;
}
export function Demo() {
  const { setRole, notify } = useApp();
  const nav = useNavigate();
  return (
    <div className="reading-page">
      <PageHeading title="Demo controls">
        Explore each workspace with the same sample data.
      </PageHeading>
      <div className="button-row">
        {(['client', 'provider', 'admin'] as const).map((r) => (
          <button
            key={r}
            className="button"
            onClick={() => {
              setRole(r);
              nav('/' + r);
            }}
          >
            {r}
          </button>
        ))}
        <button
          className="button button--outline"
          onClick={() => {
            resetDemo();
            notify('Demo data reset.');
          }}
        >
          Reset demo data
        </button>
      </div>
    </div>
  );
}
export function NotFound() {
  return (
    <div className="reading-page">
      <PageHeading eyebrow="404" title="This page is not here.">
        The link may be incomplete. Your workspace is still available.
      </PageHeading>
      <Link to="/" className="button">
        Return to Nagale <ArrowRight size={18} />
      </Link>
    </div>
  );
}
