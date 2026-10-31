import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppProvider } from './context';
import { Layout } from './layout';
import '../lib/base.css';
const work =
  (
    name:
      | 'Dashboard'
      | 'Brief'
      | 'GigDetail'
      | 'OrderDetail'
      | 'Messages'
      | 'Profile'
      | 'WalletPage'
      | 'Verification'
      | 'Admin',
  ) =>
  async () => {
    const mod = await import('../features/Workspace');
    return { Component: mod[name] };
  };
const pub = (name: 'Auth' | 'Info' | 'Demo' | 'NotFound') => async () => {
  const mod = await import('../features/PublicPages');
  return { Component: mod[name] };
};
const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: (
      <div className="reading-page">
        <h1>Something interrupted this page.</h1>
        <a href="/">Return to Nagale</a>
      </div>
    ),
    children: [
      { path: '/', lazy: () => import('../features/Landing') },
      { path: '/styleguide', lazy: () => import('../features/Styleguide') },
      { path: '/auth', lazy: pub('Auth') },
      ...['trust', 'fees', 'support', 'learning', 'privacy', 'terms'].map(
        (path) => ({ path: '/' + path, lazy: pub('Info') }),
      ),
      { path: '/dev/session', lazy: pub('Demo') },
      { path: '/p/:providerId', lazy: work('Profile') },
      ...['client', 'provider'].flatMap((role) => [
        { path: `/${role}`, lazy: work('Dashboard') },
        { path: `/${role}/messages/:threadId?`, lazy: work('Messages') },
        { path: `/${role}/orders/:orderId`, lazy: work('OrderDetail') },
        { path: `/${role}/wallet`, lazy: work('WalletPage') },
      ]),
      { path: '/client/new', lazy: work('Brief') },
      { path: '/client/gigs/:gigId', lazy: work('GigDetail') },
      { path: '/provider/feed/:gigId', lazy: work('GigDetail') },
      { path: '/provider/profile', lazy: work('Profile') },
      { path: '/provider/onboarding', lazy: work('Verification') },
      ...['admin', 'admin/disputes', 'admin/verification', 'admin/users'].map(
        (path) => ({ path: '/' + path, lazy: work('Admin') }),
      ),
      { path: '/orders/:orderId/dispute', lazy: work('OrderDetail') },
      { path: '*', lazy: pub('NotFound') },
    ],
  },
]);
const root = document.getElementById('root');
if (root)
  createRoot(root).render(
    <StrictMode>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </StrictMode>,
  );
