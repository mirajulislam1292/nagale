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
          <Logo size="mark" accessibleName="Nagale" />
          <strong className="text-lead text-moss-900">
            {c('Nagale', 'নাগালে')}
          </strong>
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
            to={hasSession ? '/home' : '/'}
            className="min-h-11 inline-flex items-center"
          >
            {hasSession
              ? c('Go to dashboard', 'ড্যাশবোর্ডে যান')
              : c('Log in', 'লগইন')}
          </Link>
          <Link to="/auth?mode=signup" className="gate-primary">
            {c('Sign up', 'অ্যাকাউন্ট খুলুন')}
          </Link>
        </nav>
      </LayoutContainer>
    </header>
  );
}
