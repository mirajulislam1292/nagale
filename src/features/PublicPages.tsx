import { useLocation } from 'react-router-dom';
import { AuthPage } from './auth/AuthPage';
import {
  TrustPage,
  FeesPage,
  SupportPage,
  TermsPage,
  PrivacyPage,
  NotFoundPage,
} from './static/StaticPages';
import { LearningPage } from './workspace/LearningPage';
import { DevSession } from './workspace/DevSession';

export function Auth() {
  return <AuthPage />;
}

export function Info() {
  const { pathname } = useLocation();

  if (pathname === '/fees') return <FeesPage />;
  if (pathname === '/support') return <SupportPage />;
  if (pathname === '/trust') return <TrustPage />;
  if (pathname === '/privacy') return <PrivacyPage />;
  if (pathname === '/terms') return <TermsPage />;
  if (pathname === '/learning') return <LearningPage />;

  return <TrustPage />;
}

export function Demo() {
  return <DevSession />;
}

export function NotFound() {
  return <NotFoundPage />;
}
