import { useState, type ReactNode } from 'react';
import { Check, ShieldCheck, ArrowRight, LoaderCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp, useCopy, useMoney } from '../app/context';
import type { Provider } from '../types/marketplace';
export function PageHeading({
  eyebrow,
  title,
  children,
  action,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="page-heading">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 tabIndex={-1}>{title}</h1>
        {children && <p className="muted">{children}</p>}
      </div>
      {action}
    </div>
  );
}
export function Badge({
  children,
  tone = 'neutral',
}: {
  children: ReactNode;
  tone?: 'neutral' | 'green' | 'amber';
}) {
  return (
    <span className={`badge badge--${tone}`}>
      {tone === 'green' && <Check size={12} />} {children}
    </span>
  );
}
export function Empty({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="empty">
      <h3>{title}</h3>
      {children}
    </div>
  );
}
export function ProviderCard({
  provider: p,
  compact = false,
}: {
  provider: Provider;
  compact?: boolean;
}) {
  const money = useMoney();
  const c = useCopy();
  return (
    <article className="provider-card">
      <div className="provider-top">
        <div className="avatar">{p.initials}</div>
        <div>
          <Link className="name-link" to={`/p/${p.id}`}>
            {p.name}
          </Link>
          <p className="small muted">{p.area}</p>
        </div>
        <ShieldCheck className="verified" size={20} />
      </div>
      <h3>{p.headline}</h3>
      <div className="skills">
        {p.skills.map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>
      {!compact && <p className="small muted">{p.bio}</p>}
      <div className="provider-bottom">
        <span>
          <strong>{p.rating.toFixed(1)}</strong> / 5{' '}
          <span className="muted">
            · {p.completed} {c('demo jobs', 'ডেমো কাজ')}
          </span>
        </span>
        <span>
          {c('From', 'শুরু')} <strong>{money(p.price)}</strong>
        </span>
      </div>
    </article>
  );
}
export function AsyncButton({
  children,
  onClick,
  className = 'button',
  disabled = false,
}: {
  children: ReactNode;
  onClick: () => Promise<unknown>;
  className?: string;
  disabled?: boolean;
}) {
  const [busy, setBusy] = useState(false);
  const { notify } = useApp();
  return (
    <button
      className={className}
      disabled={busy || disabled}
      onClick={async () => {
        if (busy) return;
        setBusy(true);
        try {
          await onClick();
        } catch (e) {
          notify(e instanceof Error ? e.message : 'Something went wrong.');
        } finally {
          setBusy(false);
        }
      }}
    >
      {busy ? <LoaderCircle className="spin" size={18} /> : null}
      {children}
    </button>
  );
}
export function SectionLink({
  to,
  children,
}: {
  to: string;
  children: ReactNode;
}) {
  return (
    <Link className="text-link" to={to}>
      {children}
      <ArrowRight size={17} />
    </Link>
  );
}
