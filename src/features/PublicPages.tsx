import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../app/context';
import { resetDemo } from '../api/marketplace';
import { AuthPage } from './auth/AuthPage';

export function Auth() {
  return <AuthPage />;
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
