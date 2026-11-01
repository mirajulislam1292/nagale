import {
  CLIENT_ID,
  isActiveOrder,
  participantOrders,
} from '../../mocks/selectors';
import { proposalCount } from '../../lib/format';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  MessagesSquare,
  Clock,
  ArrowRight,
  Plus,
  Lock,
  AlertCircle,
  Wallet,
} from 'lucide-react';
import { LayoutContainer } from '../../components/layout/LayoutContainer';
import { Button } from '../../components/ui/Button';
import { StatTile, Card } from '../../components/ui/Card';
import {
  DigitalBadge,
  LocalBadge,
  OrderStatusBadge,
} from '../../components/ui/Badge';
import { useApp, useCopy, useMarket } from '../../app/context';

export function ClientDashboard() {
  const c = useCopy();
  const nav = useNavigate();
  const { bn } = useApp();
  const snapshot = useMarket();
  const { messages, providers } = snapshot;
  const orders = participantOrders(snapshot, 'client');
  const gigs = snapshot.gigs.filter((g) => g.clientId === CLIENT_ID);

  const [prompt, setPrompt] = useState('');

  // Attention counts
  const openGigs = gigs.filter((g) => g.status === 'open');
  const deliveredOrders = orders.filter((o) => o.status === 'delivered');
  const heldAmount = orders
    .filter((o) => ['details_unlocked', 'delivered'].includes(o.status))
    .reduce((sum, o) => sum + o.price, 0);

  const handleStartBrief = () => {
    if (prompt.trim()) {
      sessionStorage.setItem('nagale.brief', prompt);
    }
    nav('/client/new');
  };

  return (
    <div className="w-full py-8 md:py-10">
      <LayoutContainer variant="app">
        {/* Page Header: h1 28px, description, primary action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-moss-200 gap-4">
          <div>
            <h1 className="text-h3 font-bold text-moss-900 tracking-tight">
              {c('Good to see you, Mahim.', 'স্বাগতম, মাহিম রহমান।')}
            </h1>
            <p className="text-small text-moss-600 mt-0.5">
              {c(
                'Monitor active job briefs, inspect delivered drafts, and manage held escrow.',
                'চলমান কাজ, জমা হওয়া ডেলিভারি এবং এসক্রো ব্যালেন্স পর্যবেক্ষণ করুন।',
              )}
            </p>
          </div>
          <Button
            size="md"
            variant="strong"
            onClick={() => nav('/client/new')}
            icon={<Plus size={16} />}
          >
            {c('Post a job', 'নতুন কাজ দিন')}
          </Button>
        </div>

        {/* Needs-Attention Action Banners */}
        {deliveredOrders.length > 0 && (
          <div className="mb-8 p-4 bg-mint-100 border border-mint-200 rounded-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-e1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-mint-500 text-moss-900 flex items-center justify-center shrink-0">
                <AlertCircle size={20} />
              </div>
              <div>
                <strong className="text-small font-bold text-moss-900 block">
                  {c(
                    'Delivery waiting for your inspection',
                    'একটি ডেলিভারি আপনার পর্যালোচনার অপেক্ষায়',
                  )}
                </strong>
                <p className="text-caption text-moss-700">
                  {deliveredOrders[0]?.title} has been submitted with a
                  watermarked preview.
                </p>
              </div>
            </div>
            <Button
              size="sm"
              variant="strong"
              onClick={() => nav(`/client/orders/${deliveredOrders[0]?.id}`)}
              icon={<ArrowRight size={14} />}
            >
              {c('Inspect & approve', 'পরীক্ষা করুন')}
            </Button>
          </div>
        )}

        {/* Stat Tiles: With specific sublabels & tabular numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <StatTile
            label={c('Open job briefs', 'পোস্ট করা কাজ')}
            value={openGigs.length}
            sublabel={
              openGigs.length === 1
                ? c(
                    '1 brief collecting proposals',
                    '১টি কাজ প্রস্তাব গ্রহণ করছে',
                  )
                : c(
                    `${openGigs.length} briefs collecting proposals`,
                    `${openGigs.length}টি কাজ প্রস্তাব গ্রহণ করছে`,
                  )
            }
            icon={<FileText size={18} />}
          />
          <StatTile
            label={c('Active in progress', 'চলমান অর্ডার')}
            value={
              orders.filter(
                (o) => !['completed', 'disputed'].includes(o.status),
              ).length
            }
            sublabel={c(
              `${deliveredOrders.length} awaiting delivery review`,
              `${deliveredOrders.length}টি ডেলিভারি পর্যালোচনার অপেক্ষায়`,
            )}
            icon={<Clock size={18} />}
          />
          <StatTile
            label={c('Held in escrow', 'এসক্রোতে সুরক্ষিত')}
            value={`৳${heldAmount.toLocaleString(document.documentElement.lang === 'bn' ? 'bn-BD' : 'en-BD')}`}
            sublabel={c(
              'Protected until your final approval',
              'আপনার অনুমোদন না হওয়া পর্যন্ত সুরক্ষিত',
            )}
            icon={<Lock size={18} />}
          />
        </div>

        {/* Quick Post Prompt Box */}
        <Card
          variant="flat"
          className="p-5 sm:p-6 bg-mist/60 border border-moss-200 mb-10"
        >
          <h2 className="text-small font-bold text-moss-900 mb-2">
            {c('Need another job done?', 'নতুন কোনো কাজে সাহায্য লাগবে?')}
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={c(
                'Describe what you need… e.g. Design a university presentation',
                'কাজের বিবরণ লিখুন… যেমন: প্রেজেন্টেশন স্লাইড ডিজাইন',
              )}
              className="flex-1 min-h-[44px] px-3.5 bg-white border border-moss-200 rounded-sm text-body text-moss-900 focus:outline-none focus:border-deep-600 focus:ring-1 focus:ring-deep-600"
            />
            <Button
              size="md"
              variant="primary"
              onClick={handleStartBrief}
              icon={<ArrowRight size={16} />}
            >
              {c('Start brief', 'বিবরণ শুরু করুন')}
            </Button>
          </div>
        </Card>

        {/* Active Orders & Escrow Summary Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          {/* Active Orders List */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-moss-100">
              <h2 className="text-lead font-bold text-moss-900">
                {c('Active orders', 'চলমান অর্ডারসমূহ')}
              </h2>
              <span className="text-caption text-moss-500 font-variant-numeric tabular-nums">
                {orders.filter(isActiveOrder).length} {c('orders', 'টি অর্ডার')}
              </span>
            </div>

            <div className="space-y-3">
              {orders.filter(isActiveOrder).map((o) => {
                const provider = providers.find((p) => p.id === o.providerId);
                return (
                  <Link
                    key={o.id}
                    to={`/client/orders/${o.id}`}
                    className="block p-4 bg-white border border-moss-200 rounded-md hover:border-moss-300 hover:shadow-e1 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                      <div>
                        <span className="text-caption tabular-nums text-moss-500 mr-2">
                          {o.id}
                        </span>
                        <strong className="text-small font-bold text-moss-900 hover:text-deep-600">
                          {o.title}
                        </strong>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-small font-bold text-moss-900 font-variant-numeric tabular-nums">
                          ৳
                          {o.price.toLocaleString(
                            document.documentElement.lang === 'bn'
                              ? 'bn-BD'
                              : 'en-BD',
                          )}
                        </span>
                        <OrderStatusBadge
                          status={o.status}
                          label={o.status.replace('_', ' ')}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-caption text-moss-500 pt-2 border-t border-moss-100">
                      <span>
                        Provider: {provider?.name || 'Assigned provider'}
                      </span>
                      <span className="text-deep-600 font-medium inline-flex items-center gap-1">
                        View order <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Escrow Status Mini Panel */}
          <div className="lg:col-span-4">
            <div className="p-5 bg-moss-900 text-white rounded-md shadow-e1 border border-moss-800">
              <div className="flex items-center gap-2 text-mint-300 text-small font-bold mb-3">
                <Lock size={16} />
                <span>Escrow balances</span>
              </div>
              <div className="text-caption text-moss-300">
                Total held in escrow
              </div>
              <div className="text-h2 font-bold text-white font-variant-numeric tabular-nums mb-4">
                ৳
                {heldAmount.toLocaleString(
                  document.documentElement.lang === 'bn' ? 'bn-BD' : 'en-BD',
                )}
              </div>

              <div className="space-y-2.5 pt-3 border-t border-moss-700/80 text-caption text-moss-300">
                <div className="flex justify-between">
                  <span>Awaiting delivery:</span>
                  <span className="text-white font-bold">
                    ৳
                    {heldAmount.toLocaleString(
                      document.documentElement.lang === 'bn'
                        ? 'bn-BD'
                        : 'en-BD',
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Released this month:</span>
                  <span className="text-white font-bold">৳2,500</span>
                </div>
              </div>

              <Link
                to="/client/wallet"
                className="inline-flex items-center gap-1.5 text-caption font-bold text-mint-300 hover:underline mt-4 pt-3 border-t border-moss-700/60 w-full"
              >
                <Wallet size={14} />
                <span>Open wallet statement →</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Posted Jobs & Messages Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Posted Gigs List */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-moss-100">
              <h2 className="text-lead font-bold text-moss-900">
                {c('Your posted jobs', 'আপনার পোস্ট করা কাজ')}
              </h2>
              <span className="text-caption text-moss-500 font-variant-numeric tabular-nums">
                {gigs.length} {c('jobs', 'টি কাজ')}
              </span>
            </div>

            <div className="space-y-3">
              {gigs.map((g) => {
                // Correct plural check
                const proposalLabel = proposalCount(g.proposals, bn);

                return (
                  <Link
                    key={g.id}
                    to={`/client/gigs/${g.id}`}
                    className="block p-4 bg-white border border-moss-200 rounded-md hover:border-moss-300 hover:shadow-e1 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2">
                        <strong className="text-small font-bold text-moss-900">
                          {g.title}
                        </strong>
                        {g.type === 'local' ? <LocalBadge /> : <DigitalBadge />}
                      </div>
                      <span className="text-small font-bold text-moss-900 font-variant-numeric tabular-nums">
                        ৳
                        {g.budget.toLocaleString(
                          document.documentElement.lang === 'bn'
                            ? 'bn-BD'
                            : 'en-BD',
                        )}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-caption text-moss-500 pt-2 border-t border-moss-100">
                      <span>
                        {g.category} · {g.area}
                      </span>
                      <span className="text-deep-700 font-medium bg-deep-50 px-2 py-0.5 rounded-sm">
                        {proposalLabel}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Latest Messages Preview */}
          <div className="lg:col-span-4">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-moss-100">
              <h2 className="text-lead font-bold text-moss-900">
                {c('Recent messages', 'সাম্প্রতিক বার্তা')}
              </h2>
              <Link
                to="/client/messages"
                className="text-caption font-medium text-deep-600 hover:underline"
              >
                View all
              </Link>
            </div>

            <Card variant="flat" className="p-4 space-y-3">
              {messages.slice(0, 3).map((m) => (
                <div
                  key={m.id}
                  className="pb-2 border-b border-moss-100 last:border-b-0 text-caption"
                >
                  <div className="flex justify-between text-moss-500 mb-0.5">
                    <span className="font-bold text-moss-800">
                      {m.sender === 'you' ? 'You' : 'Nusrat Jahan'}
                    </span>
                    <span className="font-variant-numeric tabular-nums">
                      {m.at}
                    </span>
                  </div>
                  <p className="text-moss-700 truncate">{m.body}</p>
                </div>
              ))}
              <Link
                to="/client/messages"
                className="inline-flex items-center gap-1.5 text-caption font-bold text-deep-600 hover:underline pt-1"
              >
                <MessagesSquare size={14} />
                <span>Open messaging conversation →</span>
              </Link>
            </Card>
          </div>
        </div>
      </LayoutContainer>
    </div>
  );
}
