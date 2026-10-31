import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { PublicHeader } from '../components/layout/PublicHeader';
import { AppBar, Sidebar, BottomTabs } from '../components/layout/WorkspaceNav';
import { Footer } from '../components/layout/Footer';
import { Toast } from '../components/ui/Feedback';
import { useApp, useCopy } from './context';

export function Layout() {
  const { pathname } = useLocation();
  const c = useCopy();
  const { notice, notify, setRole } = useApp();

  const isWorkspace = /^\/(client|provider|admin)(\/|$)/.test(pathname);

  useEffect(() => {
    document.title = 'Nagale';
    window.scrollTo(0, 0);

    // Sync active role with workspace route
    if (pathname.startsWith('/provider')) {
      setRole('provider');
    } else if (pathname.startsWith('/admin')) {
      setRole('admin');
    } else if (pathname.startsWith('/client')) {
      setRole('client');
    }
  }, [pathname, setRole]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-moss-900 font-sans selection:bg-mint-200 selection:text-moss-900">
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:p-3 focus:bg-moss-900 focus:text-white focus:rounded-sm focus:shadow-e2"
        href="#main-content"
      >
        {c('Skip to content', 'মূল অংশে যান')}
      </a>

      {/* Header layer: Workspace AppBar or Public Header */}
      {isWorkspace ? <AppBar /> : <PublicHeader />}

      {/* Main content body */}
      <div
        className={`flex-1 flex flex-col ${isWorkspace ? 'lg:flex-row' : ''}`}
      >
        {isWorkspace && <Sidebar />}

        <main
          id="main-content"
          tabIndex={-1}
          className={`flex-1 flex flex-col focus:outline-none ${
            isWorkspace ? 'pb-20 lg:pb-8' : ''
          }`}
        >
          <Outlet />
        </main>
      </div>

      {/* Mobile navigation tab bar for workspaces */}
      {isWorkspace && <BottomTabs />}

      {/* Footer on public pages */}
      {!isWorkspace && <Footer />}

      {/* System toast notification */}
      {notice && (
        <Toast message={notice} onDismiss={() => notify('')} type="info" />
      )}
    </div>
  );
}
