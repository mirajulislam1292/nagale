import { useLocation } from 'react-router-dom';

// Tier 2 & Tier 3 implementations
import { ClientDashboard } from './workspace/ClientDashboard';
import { ProviderDashboard } from './workspace/ProviderDashboard';
import { AiIntake } from './workspace/AiIntake';
import { GigProposals } from './workspace/GigProposals';
import { OrderDetailPage } from './workspace/OrderDetailPage';
import { MessagingPage } from './workspace/MessagingPage';
import { WalletView } from './workspace/WalletView';
import { ProviderProfile } from './workspace/ProviderProfile';
import { VerificationPage } from './workspace/VerificationPage';
import { DisputePage } from './workspace/DisputePage';
import { LearningPage } from './workspace/LearningPage';
import { DevSession } from './workspace/DevSession';

// Admin implementations
import { AdminOverview } from './admin/AdminOverview';
import { AdminDisputes } from './admin/AdminDisputes';
import { AdminVerification } from './admin/AdminVerification';
import { AdminUsers } from './admin/AdminUsers';

export function Dashboard() {
  const { pathname } = useLocation();
  if (pathname.startsWith('/provider')) {
    return <ProviderDashboard />;
  }
  return <ClientDashboard />;
}

export function Brief() {
  return <AiIntake />;
}

export function GigDetail() {
  return <GigProposals />;
}

export function OrderDetail() {
  return <OrderDetailPage />;
}

export function Messages() {
  return <MessagingPage />;
}

export function WalletPage() {
  return <WalletView />;
}

export function Profile() {
  return <ProviderProfile />;
}

export function Verification() {
  return <VerificationPage />;
}

export function Dispute() {
  return <DisputePage />;
}

export function Learning() {
  return <LearningPage />;
}

export function DevControls() {
  return <DevSession />;
}

export function Admin() {
  const { pathname } = useLocation();
  if (pathname === '/admin/disputes') {
    return <AdminDisputes />;
  }
  if (pathname === '/admin/verification') {
    return <AdminVerification />;
  }
  if (pathname === '/admin/users') {
    return <AdminUsers />;
  }
  return <AdminOverview />;
}
