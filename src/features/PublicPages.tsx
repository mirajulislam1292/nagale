import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BriefcaseBusiness,
  UserRound,
  ShieldCheck,
} from 'lucide-react';
import { useApp, useCopy } from '../app/context';
import { resetDemo } from '../api/marketplace';
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
              <ArrowRight size={22} />
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
import {
  TrustPage,
  FeesPage,
  SupportPage,
  TermsPage,
  PrivacyPage,
  NotFoundPage,
} from './static/StaticPages';

export function Info() {
  const { pathname } = useLocation();

  if (pathname === '/fees') return <FeesPage />;
  if (pathname === '/support') return <SupportPage />;
  if (pathname === '/trust') return <TrustPage />;
  if (pathname === '/privacy') return <PrivacyPage />;
  if (pathname === '/terms') return <TermsPage />;

  return <TrustPage />;
}

export function Demo() {
  const { setRole, notify } = useApp();
  const nav = useNavigate();
  return (
    <div className="max-w-[640px] mx-auto py-16 px-4">
      <h1 className="text-h2 font-bold text-moss-900 mb-2">Demo controls</h1>
      <p className="text-body text-moss-600 mb-6">
        Explore each workspace with the same sample data.
      </p>
      <div className="flex flex-wrap gap-3">
        {(['client', 'provider', 'admin'] as const).map((r) => (
          <button
            key={r}
            className="px-4 py-2 bg-moss-900 text-white rounded-sm font-medium hover:bg-moss-800"
            onClick={() => {
              setRole(r);
              nav('/' + r);
            }}
          >
            Switch to {r}
          </button>
        ))}
        <button
          className="px-4 py-2 border border-moss-200 rounded-sm font-medium text-moss-800 hover:bg-mist"
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
  return <NotFoundPage />;
}
