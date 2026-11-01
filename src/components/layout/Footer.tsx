import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { LayoutContainer } from './LayoutContainer';
import { useApp, useCopy } from '../../app/context';
export function Footer() {
  const { bn, lite, setLite } = useApp();
  const c = useCopy();
  return (
    <footer className="border-t border-moss-200 bg-mist py-4 text-small text-moss-600">
      <LayoutContainer className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <Link to="/" aria-label="Nagale">
          <Logo markSize={24} size="mark" />
        </Link>
        <nav
          aria-label={c('Footer', 'ফুটার')}
          className="flex flex-wrap gap-x-4 gap-y-1"
        >
          {(
            [
              ['trust', 'Trust', 'নিরাপত্তা'],
              ['fees', 'Fees', 'ফি'],
              ['learning', 'Learning', 'শিখুন'],
              ['support', 'Support', 'সহায়তা'],
              ['terms', 'Terms', 'শর্ত'],
              ['privacy', 'Privacy', 'গোপনীয়তা'],
              ['dev/session?demo=1', 'Demo', 'ডেমো'],
            ] as const
          ).map(([path, en, bnText]) => (
            <Link
              className="inline-flex min-h-11 items-center text-deep-600"
              key={path}
              to={'/' + path}
            >
              {c(en, bnText)}
            </Link>
          ))}
        </nav>
        <button
          aria-pressed={lite}
          onClick={() => setLite(!lite)}
          className="min-h-11"
        >
          {c('Lite', 'লাইট')}: {lite ? c('On', 'চালু') : c('Off', 'বন্ধ')}
        </button>
        <span className="sm:ml-auto">
          {bn ? '© ২০২৬ নাগালে' : '© 2026 Nagale'}
        </span>
      </LayoutContainer>
      <LayoutContainer className="text-caption">
        {c('Demo. No real payments.', 'ডেমো। প্রকৃত লেনদেন হয় না।')}
      </LayoutContainer>
    </footer>
  );
}
