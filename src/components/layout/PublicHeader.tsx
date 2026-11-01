import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { LayoutContainer } from './LayoutContainer';
import { useApp, useCopy } from '../../app/context';
export function PublicHeader({ hasSession = false }: { hasSession?: boolean }) {
  const { bn, setBn } = useApp();
  const c = useCopy();
  return (
    <header className="h-16 bg-white border-b border-moss-200">
      <LayoutContainer className="h-full flex items-center justify-between gap-4">
        <Link to="/" className="inline-flex items-center gap-3">
          <Logo accessibleName="Nagale" />
        </Link>
        <nav className="flex items-center gap-4">
          <button
            onClick={() => setBn(!bn)}
            aria-label={bn ? 'Switch to English' : 'Switch to Bangla'}
            className="min-h-11"
          >
            {bn ? 'EN' : 'বাংলা'}
          </button>
          <Link
            to={hasSession ? '/client' : '/auth'}
            className="min-h-11 inline-flex items-center"
          >
            {hasSession
              ? c('Go to dashboard', 'ড্যাশবোর্ডে যান')
              : c('Log in', 'লগইন')}
          </Link>
          <Link
            to="/auth?mode=signup"
            className="inline-flex min-h-11 items-center rounded-sm bg-moss-900 px-4 text-white"
          >
            {c('Sign up', 'অ্যাকাউন্ট খুলুন')}
          </Link>
        </nav>
      </LayoutContainer>
    </header>
  );
}
