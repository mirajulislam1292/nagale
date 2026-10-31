import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BriefcaseBusiness,
  MessagesSquare,
  Wallet,
  ShieldCheck,
  ArrowRight,
  Settings2,
  X,
  PanelLeft,
  BookOpen,
  UserRound,
} from 'lucide-react';
import { useApp, useCopy } from './context';
import { Logo } from '../components/ui/Logo';
export function Layout() {
  const { pathname } = useLocation();
  const [enteredWorkspace, setEnteredWorkspace] = useState(false);
  const c = useCopy();
  const { bn, setBn, lite, setLite, notice, notify, role, setRole } = useApp();
  const workspace = /^\/(client|provider|admin)(\/|$)/.test(pathname);
  const base = pathname.startsWith('/provider')
    ? '/provider'
    : pathname.startsWith('/admin')
      ? '/admin'
      : '/client';
  useEffect(() => {
    document.title = 'Nagale';
    window.scrollTo(0, 0);
    requestAnimationFrame(() =>
      document.querySelector<HTMLElement>('h1')?.focus(),
    );
    notify('');
    if (workspace) setEnteredWorkspace(true);
    if (workspace)
      setRole(
        base === '/provider'
          ? 'provider'
          : base === '/admin'
            ? 'admin'
            : 'client',
      );
  }, [pathname, notify, workspace, base, setRole]);
  return (
    <>
      <a className="skip-link" href="#main">
        {c('Skip to content', 'মূল অংশে যান')}
      </a>
      {workspace ? (
        <AppBar base={base} />
      ) : (
        <header className="site-header">
          <div className="header-inner">
            <Link to="/" aria-label="Nagale home">
              <Logo size="mark" accessibleName="" />
              <span className="wordmark">{c('Nagale', 'নাগালে')}</span>
            </Link>
            <nav className="desktop-nav">
              <NavLink to="/client/new">{c('Post a job', 'কাজ দিন')}</NavLink>
              <NavLink to="/provider">{c('Find work', 'কাজ খুঁজুন')}</NavLink>
              <NavLink to="/trust">
                {c('How it works', 'যেভাবে কাজ করে')}
              </NavLink>
            </nav>
            <div className="header-actions">
              <button
                className="locale"
                onClick={() => setBn(!bn)}
                aria-label={bn ? 'Switch to English' : 'Switch to Bangla'}
              >
                {bn ? 'EN' : 'বাংলা'}
              </button>
              <Link
                className="header-login"
                to={enteredWorkspace ? `/${role}` : '/auth'}
              >
                {enteredWorkspace
                  ? c('Go to dashboard', 'ড্যাশবোর্ডে যান')
                  : c('Log in', 'লগইন')}
              </Link>
              <Link className="button button--small button--outline" to="/auth">
                {c('Sign up', 'অ্যাকাউন্ট খুলুন')}
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </header>
      )}
      <div className={workspace ? 'workspace' : 'public-layout'}>
        {workspace && (
          <aside className="sidebar">
            <nav>
              <NavLink to={base} end>
                <LayoutDashboard size={18} />
                {c('Overview', 'সারসংক্ষেপ')}
              </NavLink>
              <NavLink
                to={
                  base === '/provider'
                    ? '/provider/feed/g1'
                    : base === '/admin'
                      ? '/admin/disputes'
                      : '/client/gigs/g1'
                }
              >
                <BriefcaseBusiness size={18} />
                {base === '/admin'
                  ? c('Disputes', 'অভিযোগ')
                  : c('Jobs & proposals', 'কাজ ও প্রস্তাব')}
              </NavLink>
              {base !== '/admin' && (
                <>
                  {' '}
                  <NavLink to={`${base}/messages`}>
                    <MessagesSquare size={18} />
                    {c('Messages', 'বার্তা')}
                  </NavLink>
                  <NavLink to={`${base}/wallet`}>
                    <Wallet size={18} />
                    {c('Wallet', 'ওয়ালেট')}
                  </NavLink>
                </>
              )}
              {base === '/provider' && (
                <NavLink to="/provider/onboarding">
                  <ShieldCheck size={18} />
                  {c('Verification', 'যাচাই')}
                </NavLink>
              )}
              {base === '/admin' && (
                <NavLink to="/admin/verification">
                  <ShieldCheck size={18} />
                  {c('Verification queue', 'যাচাইয়ের তালিকা')}
                </NavLink>
              )}
              <NavLink to="/learning">
                <BookOpen size={18} />
                {c('Learning', 'শেখা')}
              </NavLink>
            </nav>
            <div className="sidebar-note">
              <ShieldCheck size={22} />
              <strong>{c('Keep work on Nagale', 'কাজ নাগালেতেই রাখুন')}</strong>
              <p>
                {c(
                  'Your brief, messages and payment stay together in one order.',
                  'কাজের বিবরণ, বার্তা ও পেমেন্ট একই অর্ডারে থাকে।',
                )}
              </p>
              <Link to="/trust">
                {c('Read the safeguards', 'সুরক্ষার নিয়ম পড়ুন')}
                <ArrowRight size={14} />
              </Link>
            </div>
            <Link className="account" to="/auth">
              <span className="avatar avatar--small">
                <UserRound size={18} />
              </span>
              <span>
                {role === 'provider'
                  ? 'Nusrat Jahan'
                  : role === 'admin'
                    ? 'Demo admin'
                    : 'Mahim'}
                <small>{c('Switch demo role', 'ডেমো ভূমিকা বদলান')}</small>
              </span>
              <Settings2 size={16} />
            </Link>
          </aside>
        )}
        <main id="main" className={workspace ? 'workspace-main' : ''}>
          <Outlet />
        </main>
      </div>
      {notice && (
        <div className="toast" role="status">
          <span>{notice}</span>
          <button
            aria-label={c('Dismiss notification', 'বার্তা বন্ধ করুন')}
            onClick={() => notify('')}
          >
            <X size={18} />
          </button>
        </div>
      )}
      {!workspace && (
        <footer className="footer">
          <div className="footer-inner">
            <Link className="footer-brand" to="/auth">
              Nagale<span className="badge">Explore demo</span>
            </Link>
            <nav>
              <Link to="/trust">
                {c('Trust & safety', 'আস্থা ও নিরাপত্তা')}
              </Link>
              <Link to="/fees">{c('Fees', 'ফি')}</Link>
              <Link to="/learning">{c('Learning', 'শেখা')}</Link>
              <Link to="/support">{c('Support', 'সহায়তা')}</Link>
              <Link to="/privacy">{c('Privacy', 'গোপনীয়তা')}</Link>
            </nav>
            <button className="text-link" onClick={() => setLite(!lite)}>
              <PanelLeft size={15} />
              {c('Lite mode', 'লাইট মোড')}:{' '}
              {lite ? c('on', 'চালু') : c('off', 'বন্ধ')}
            </button>
          </div>
          <p className="footer-note">
            {c(
              'Interactive prototype. Profiles, jobs and payments are demonstration data. No real payments are processed.',
              'ইন্টারঅ্যাকটিভ প্রোটোটাইপ। প্রোফাইল, কাজ ও পেমেন্ট ডেমো তথ্য। এখানে প্রকৃত টাকা লেনদেন হয় না।',
            )}
          </p>
        </footer>
      )}
    </>
  );
}

function AppBar({ base }: { base: string }) {
  const c = useCopy();
  const { bn, setBn } = useApp();
  const name =
    base === '/provider'
      ? 'Nusrat Jahan'
      : base === '/admin'
        ? 'Admin'
        : 'Mahim';
  return (
    <header className="app-bar">
      <Link to="/" aria-label="Nagale home">
        <Logo size="mark" accessibleName="Nagale" />
      </Link>
      <span>
        {base === '/provider'
          ? c('Provider workspace', 'সেবাদাতার কাজ')
          : base === '/admin'
            ? c('Admin workspace', 'অ্যাডমিনের কাজ')
            : c('Client workspace', 'ক্লায়েন্টের কাজ')}
      </span>
      <small>{c('Interactive demo', 'ইন্টারঅ্যাকটিভ ডেমো')}</small>
      <button
        className="locale"
        onClick={() => setBn(!bn)}
        aria-label={bn ? 'Switch to English' : 'Switch to Bangla'}
      >
        {bn ? 'EN' : 'বাংলা'}
      </button>
      <Link
        className="app-account"
        to="/auth"
        aria-label={c('Switch workspace', 'ওয়ার্কস্পেস বদলান')}
      >
        <span className="avatar avatar--small">{name.slice(0, 1)}</span>
        <span>{name}</span>
      </Link>
    </header>
  );
}
