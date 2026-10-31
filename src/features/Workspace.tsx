import { useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Star, Search } from 'lucide-react';
import { useApp, useMarket, useMoney } from '../app/context';
import { AsyncButton, Badge, PageHeading } from '../components/interface';
import { reviewCase } from '../api/marketplace';

// Tier 2 high-craft implementations
import { ClientDashboard } from './workspace/ClientDashboard';
import { ProviderDashboard } from './workspace/ProviderDashboard';
import { AiIntake } from './workspace/AiIntake';
import { GigProposals } from './workspace/GigProposals';
import { OrderDetailPage } from './workspace/OrderDetailPage';
import { MessagingPage } from './workspace/MessagingPage';
import { WalletView } from './workspace/WalletView';

export function Dashboard() {
  const { pathname } = useLocation();
  if (pathname.startsWith('/provider')) {
    return <ProviderDashboard />;
  }
  return <ClientDashboard />;
}

export function Brief() {
  return <AiIntake />;
}

export function GigDetail() {
  return <GigProposals />;
}

export function OrderDetail() {
  return <OrderDetailPage />;
}

export function Messages() {
  return <MessagingPage />;
}

export function WalletPage() {
  return <WalletView />;
}

export function Profile() {
  const { providerId } = useParams();
  const { providers } = useMarket();
  const p = providers.find((pr) => pr.id === providerId) || providers[0];
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
          Invite to a job <ArrowRight size={18} />
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
              ].map((s) => (
                <div className="portfolio-item" key={s}>
                  <div className="portfolio-art">
                    <div className="fake-line short" />
                    <div className="fake-line" />
                    <div className="fake-line" />
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
