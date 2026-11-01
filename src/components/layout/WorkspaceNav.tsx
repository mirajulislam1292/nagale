import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BriefcaseBusiness,
  MessagesSquare,
  Wallet,
  ShieldCheck,
  BookOpen,
  Settings2,
  PanelLeft,
  ChevronDown,
  UserCheck,
} from 'lucide-react';
import { Logo } from '../ui/Logo';
import { Avatar } from '../ui/Avatar';
import { useApp, useCopy } from '../../app/context';
import type { Role } from '../../types/marketplace';

// App users as specified in Section 8:
// Client: "Mahim Rahman"
// Provider (verified): "Nusrat Jahan"
// Provider (new): "Rafiul Islam"
// Admin: "Admin"
function getUserDetails(role: Role) {
  switch (role) {
    case 'provider':
      return {
        name: 'Nusrat Jahan',
        initials: 'NJ',
        roleLabel: 'Verified provider',
        headline: 'CV & Career document specialist',
      };
    case 'admin':
      return {
        name: 'Admin',
        initials: 'AD',
        roleLabel: 'Platform moderator',
        headline: 'Compliance & Safety',
      };
    case 'client':
    default:
      return {
        name: 'Mahim Rahman',
        initials: 'MR',
        roleLabel: 'Client',
        headline: 'Individual client',
      };
  }
}

// 56px AppBar for logged-in workspaces
export function AppBar() {
  const { bn, setBn, lite, setLite, role, setRole } = useApp();
  const c = useCopy();
  const nav = useNavigate();
  const user = getUserDetails(role);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const switchRole = (newRole: Role) => {
    setRole(newRole);
    setRoleMenuOpen(false);
    nav(`/${newRole}`);
  };

  return (
    <header className="sticky top-0 z-40 w-full h-14 bg-white border-b border-moss-200 px-4 md:px-6 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <Link to="/" aria-label="Nagale Home" className="shrink-0">
          <Logo size="mark" accessibleName="Nagale" />
        </Link>
        <span className="text-small font-bold text-moss-900 truncate">
          {role === 'provider'
            ? c('Provider workspace', 'সেবাদাতার কাজ')
            : role === 'admin'
              ? c('Admin workspace', 'অ্যাডমিন ড্যাশবোর্ড')
              : c('Client workspace', 'ক্লায়েন্টের কাজ')}
        </span>
        <span className="hidden sm:inline-block text-caption px-2 py-0.5 rounded-sm bg-moss-100 text-moss-600 font-medium">
          {c('Demo mode', 'ডেমো মোড')}
        </span>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Language toggle */}
        <button
          type="button"
          onClick={() => setBn(!bn)}
          aria-label={bn ? 'Switch to English' : 'Switch to Bangla'}
          className="px-2.5 py-1 text-small font-medium text-moss-700 hover:text-moss-900 hover:bg-moss-100 rounded-sm min-h-[36px]"
        >
          {bn ? 'EN' : 'বাংলা'}
        </button>

        {/* Lite mode toggle */}
        <button
          type="button"
          onClick={() => setLite(!lite)}
          title={c('Toggle Lite mode', 'লাইট মোড পরিবর্তন')}
          aria-label="Toggle lite mode"
          className={`p-1.5 rounded-sm min-h-[36px] flex items-center gap-1.5 text-caption font-medium ${
            lite
              ? 'bg-mint-100 text-deep-700'
              : 'text-moss-600 hover:bg-moss-100'
          }`}
        >
          <PanelLeft size={16} />
          <span className="hidden sm:inline">Lite: {lite ? 'On' : 'Off'}</span>
        </button>

        {/* Role switcher menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            className="flex items-center gap-2 p-1.5 rounded-sm hover:bg-moss-100 transition-colors"
          >
            <Avatar initials={user.initials} size="sm" />
            <span className="hidden md:inline text-small font-medium text-moss-900">
              {user.name}
            </span>
            <ChevronDown size={14} className="text-moss-500" />
          </button>

          {roleMenuOpen && (
            <div className="absolute right-0 top-12 w-56 bg-white border border-moss-200 rounded-md shadow-e2 p-2 z-50">
              <div className="px-2.5 py-1.5 border-b border-moss-100 mb-1">
                <p className="text-caption text-moss-500">Demo Role Switcher</p>
                <p className="text-small font-bold text-moss-900">
                  {user.name}
                </p>
              </div>
              <button
                type="button"
                onClick={() => switchRole('client')}
                className={`w-full text-left px-2.5 py-2 text-small rounded-sm flex items-center justify-between ${
                  role === 'client'
                    ? 'bg-mint-100 text-deep-700 font-bold'
                    : 'hover:bg-mist text-moss-800'
                }`}
              >
                <span>Client (Mahim Rahman)</span>
                {role === 'client' && <UserCheck size={14} />}
              </button>
              <button
                type="button"
                onClick={() => switchRole('provider')}
                className={`w-full text-left px-2.5 py-2 text-small rounded-sm flex items-center justify-between ${
                  role === 'provider'
                    ? 'bg-mint-100 text-deep-700 font-bold'
                    : 'hover:bg-mist text-moss-800'
                }`}
              >
                <span>Provider (Nusrat Jahan)</span>
                {role === 'provider' && <UserCheck size={14} />}
              </button>
              <button
                type="button"
                onClick={() => switchRole('admin')}
                className={`w-full text-left px-2.5 py-2 text-small rounded-sm flex items-center justify-between ${
                  role === 'admin'
                    ? 'bg-mint-100 text-deep-700 font-bold'
                    : 'hover:bg-mist text-moss-800'
                }`}
              >
                <span>Admin (Compliance)</span>
                {role === 'admin' && <UserCheck size={14} />}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

// 240px Sidebar for Desktop (lg+)
export function Sidebar() {
  const { role } = useApp();
  const c = useCopy();
  const user = getUserDetails(role);
  const base = `/${role}`;

  const navItems = [
    {
      to: base,
      label: c('Overview', 'সারসংক্ষেপ'),
      icon: <LayoutDashboard size={18} />,
      end: true,
    },
    {
      to: role === 'admin' ? '/admin/disputes' : `${base}/orders/N-1042`,
      label:
        role === 'admin'
          ? c('Disputes', 'বিরোধ নিষ্পত্তি')
          : c('Orders', 'অর্ডারসমূহ'),
      icon: <BriefcaseBusiness size={18} />,
    },
    ...(role !== 'admin'
      ? [
          {
            to: `${base}/messages`,
            label: c('Messages', 'বার্তা'),
            icon: <MessagesSquare size={18} />,
          },
          {
            to: `${base}/wallet`,
            label: c('Wallet', 'ওয়ালেট'),
            icon: <Wallet size={18} />,
          },
        ]
      : [
          {
            to: '/admin/verification',
            label: c('Verification', 'যাচাইকরণ'),
            icon: <ShieldCheck size={18} />,
          },
          {
            to: '/admin/users',
            label: c('Users', 'ব্যবহারকারী'),
            icon: <UserCheck size={18} />,
          },
        ]),
    ...(role === 'provider'
      ? [
          {
            to: '/provider/onboarding',
            label: c('Verification', 'যাচাই'),
            icon: <ShieldCheck size={18} />,
          },
        ]
      : []),
    {
      to: '/learning',
      label: c('Learning', 'শেখা'),
      icon: <BookOpen size={18} />,
    },
  ];

  return (
    <aside className="hidden lg:flex flex-col justify-between w-60 shrink-0 min-h-[calc(100vh-56px)] bg-white border-r border-moss-200 p-4">
      <div>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-sm text-small font-medium transition-colors ${
                  isActive
                    ? 'bg-deep-50 text-deep-700 font-bold'
                    : 'text-moss-700 hover:text-moss-900 hover:bg-mist'
                }`
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Sidebar trust banner */}
        <div className="mt-8 p-3.5 bg-mist rounded-sm border border-moss-200 text-caption">
          <div className="flex items-center gap-2 text-moss-900 font-bold mb-1">
            <ShieldCheck size={16} className="text-deep-600" />
            <span>{c('Keep work on Nagale', 'কাজ নাগালেতেই রাখুন')}</span>
          </div>
          <p className="text-moss-600 leading-normal">
            {c(
              'Your brief, messages, and escrowed payment stay protected together.',
              'আপনার কাজের বিবরণ, বার্তা এবং এসক্রো পেমেন্ট নিরাপদ থাকে।',
            )}
          </p>
          <Link
            to="/trust"
            className="inline-block mt-2 font-bold text-deep-600 hover:underline"
          >
            {c('Read safeguards →', 'সুরক্ষা নিয়ম পড়ুন →')}
          </Link>
        </div>
      </div>

      {/* User profile footer */}
      <div className="pt-4 border-t border-moss-200">
        <Link
          to={role === 'provider' ? '/provider/profile' : '/dev/session'}
          className="flex items-center gap-3 p-2 rounded-sm hover:bg-mist transition-colors"
        >
          <Avatar initials={user.initials} size="sm" />
          <div className="flex-1 min-w-0">
            <p className="text-small font-bold text-moss-900 truncate">
              {user.name}
            </p>
            <p className="text-caption text-moss-500 truncate">
              {user.roleLabel}
            </p>
          </div>
          <Settings2 size={16} className="text-moss-400 shrink-0" />
        </Link>
      </div>
    </aside>
  );
}

// Bottom tab bar on mobile
export function BottomTabs() {
  const { role } = useApp();
  const c = useCopy();
  const base = `/${role}`;

  const tabs = [
    {
      to: base,
      label: c('Overview', 'সারসংক্ষেপ'),
      icon: <LayoutDashboard size={20} />,
      end: true,
    },
    {
      to: role === 'admin' ? '/admin/disputes' : `${base}/orders/N-1042`,
      label: role === 'admin' ? c('Disputes', 'বিরোধ') : c('Orders', 'অর্ডার'),
      icon: <BriefcaseBusiness size={20} />,
    },
    ...(role !== 'admin'
      ? [
          {
            to: `${base}/messages`,
            label: c('Messages', 'বার্তা'),
            icon: <MessagesSquare size={20} />,
          },
          {
            to: `${base}/wallet`,
            label: c('Wallet', 'ওয়ালেট'),
            icon: <Wallet size={20} />,
          },
        ]
      : [
          {
            to: '/admin/verification',
            label: c('Review', 'যাচাই'),
            icon: <ShieldCheck size={20} />,
          },
        ]),
    {
      to: role === 'provider' ? '/provider/profile' : '/dev/session',
      label: c('Role', 'রোল'),
      icon: <Settings2 size={20} />,
    },
  ];

  return (
    <nav
      aria-label="Mobile workspace navigation"
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 h-16 bg-white border-t border-moss-200 flex items-center justify-around px-2"
    >
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.end}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 text-caption font-medium transition-colors ${
              isActive
                ? 'text-deep-600 font-bold'
                : 'text-moss-500 hover:text-moss-900'
            }`
          }
        >
          {tab.icon}
          <span className="mt-1 text-[11px]">{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
