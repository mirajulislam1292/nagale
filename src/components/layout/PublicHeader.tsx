import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';
import { LayoutContainer } from './LayoutContainer';
import { useApp, useCopy } from '../../app/context';

export function PublicHeader({ hasSession = false }: { hasSession?: boolean }) {
  const { bn, setBn, role } = useApp();
  const c = useCopy();
  const nav = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/#how-it-works', label: c('How it works', 'যেভাবে কাজ করে') },
    { to: '/#categories', label: c('Categories', 'ক্যাটাগরি') },
    { to: '/trust', label: c('Trust & safety', 'আস্থা ও নিরাপত্তা') },
    { to: '/provider', label: c('For providers', 'সেবাদাতাদের জন্য') },
    { to: '/learning', label: c('Learning', 'শেখা') },
  ];

  return (
    <header className="sticky top-0 z-40 w-full h-16 bg-white border-b border-moss-200">
      <LayoutContainer className="h-full flex items-center justify-between gap-4">
        {/* Logo and Brand */}
        <Link
          to="/"
          className="inline-flex items-center gap-3 focus-visible:outline-deep-600"
        >
          <Logo size="mark" accessibleName="Nagale" />
          <span className="text-lead font-bold text-moss-900 tracking-tight">
            {c('Nagale', 'নাগালে')}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-small font-medium text-moss-700">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `transition-colors hover:text-moss-900 ${
                  isActive ? 'text-moss-900 font-bold' : ''
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* EN | বাংলা toggle */}
          <button
            type="button"
            onClick={() => setBn(!bn)}
            aria-label={bn ? 'Switch to English' : 'Switch to Bangla'}
            className="px-2.5 py-1 text-small font-medium text-moss-700 hover:text-moss-900 hover:bg-moss-100 rounded-sm min-h-[36px] transition-colors"
          >
            {bn ? 'EN' : 'বাংলা'}
          </button>

          {hasSession ? (
            <Button
              size="sm"
              variant="secondary"
              onClick={() => nav(`/${role}`)}
              icon={<ArrowRight size={14} />}
            >
              {c('Go to dashboard', 'ড্যাশবোর্ডে যান')}
            </Button>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Button
                size="sm"
                variant="tertiary"
                onClick={() => nav('/auth?mode=login')}
              >
                {c('Log in', 'লগইন')}
              </Button>
              <Button
                size="sm"
                variant="primary"
                onClick={() => nav('/auth?mode=signup')}
              >
                {c('Sign up', 'অ্যাকাউন্ট খুলুন')}
              </Button>
            </div>
          )}

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="md:hidden p-2 text-moss-700 hover:text-moss-900 rounded-sm"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </LayoutContainer>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 bg-white border-b border-moss-200 p-6 shadow-e2 z-50">
          <nav className="flex flex-col gap-4 text-body font-medium text-moss-800 mb-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-deep-600"
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex flex-col gap-3 pt-4 border-t border-moss-100">
            {hasSession ? (
              <Button
                size="md"
                variant="primary"
                className="w-full"
                onClick={() => {
                  setMobileMenuOpen(false);
                  nav(`/${role}`);
                }}
              >
                {c('Go to dashboard', 'ড্যাশবোর্ডে যান')}
              </Button>
            ) : (
              <>
                <Button
                  size="md"
                  variant="primary"
                  className="w-full"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    nav('/auth?mode=signup');
                  }}
                >
                  {c('Sign up', 'অ্যাকাউন্ট খুলুন')}
                </Button>
                <Button
                  size="md"
                  variant="secondary"
                  className="w-full"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    nav('/auth?mode=login');
                  }}
                >
                  {c('Log in', 'লগইন')}
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
