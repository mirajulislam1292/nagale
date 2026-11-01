import {
  matchedGigs as selectMatchedGigs,
  matchingReason,
  participantOrders,
} from '../../mocks/selectors';
import { formatDate } from '../../lib/format';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BriefcaseBusiness,
  ShieldCheck,
  Clock,
  ArrowRight,
  Search,
  Wallet,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import { LayoutContainer } from '../../components/layout/LayoutContainer';
import { Button } from '../../components/ui/Button';
import { StatTile, Card } from '../../components/ui/Card';
import {
  DigitalBadge,
  LocalBadge,
  VerifiedBadge,
  OrderStatusBadge,
} from '../../components/ui/Badge';
import { Rating } from '../../components/ui/Avatar';
import { useCopy, useMarket } from '../../app/context';
import { feeFor } from '../../api/marketplace';

export function ProviderDashboard() {
  const c = useCopy();
  const nav = useNavigate();
  const snapshot = useMarket();
  const { feeRate, providers } = snapshot;
  const orders = participantOrders(snapshot, 'provider');
  const gigs = selectMatchedGigs(snapshot);
  const viewer = providers.find((p) => p.id === 'nusrat');

  const [filterType, setFilterType] = useState<'All' | 'Digital' | 'Local'>(
    'All',
  );
  const [searchQuery, setSearchQuery] = useState('');

  // Active orders where user is provider
  const activeOrders = orders.filter(
    (o) => o.status !== 'completed' && o.status !== 'disputed',
  );
  const completedOrders = orders.filter((o) => o.status === 'completed');

  // Filtered feed
  const matchedGigs = gigs.filter((g) => {
    const matchesType =
      filterType === 'All'
        ? true
        : g.type.toLowerCase() === filterType.toLowerCase();
    const matchesSearch =
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const totalEarnedNet = completedOrders.reduce(
    (sum, o) => sum + feeFor(o.price, feeRate).net,
    0,
  );

  return (
    <div className="w-full py-8 md:py-10">
      <LayoutContainer variant="app">
        {/* Page Header: Nusrat Jahan */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-moss-200 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-h3 font-bold text-moss-900 tracking-tight">
                {c('Welcome back, Nusrat.', 'আবার স্বাগতম, নুসরাত জাহান।')}
              </h1>
              <VerifiedBadge level={2} />
            </div>
            <p className="text-small text-moss-600">
              {c(
                'Review matched briefs, deliver active client orders, and manage wallet payouts.',
                'নতুন কাজের প্রস্তাব দিন, চলমান কাজ সম্পন্ন করুন এবং অর্জিত অর্থ বুঝে নিন।',
              )}
            </p>
          </div>
          <Button
            size="md"
            variant="secondary"
            onClick={() => nav('/provider/profile')}
            icon={<ArrowRight size={16} />}
          >
            {c('View your profile', 'প্রোফাইল দেখুন')}
          </Button>
        </div>

        {/* Verification Progress Strip */}
        <div className="mb-8 p-4 bg-deep-50 border border-deep-100 rounded-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-e1">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-deep-100 text-deep-700 flex items-center justify-center shrink-0">
              <ShieldCheck size={20} />
            </div>
            <div>
              <strong className="text-small font-bold text-moss-900 block">
                {c('Level 2 Verified Provider', 'লেভেল ২ যাচাইকৃত সেবাদাতা')}
              </strong>
              <p className="text-caption text-moss-700">
                Phone, live selfie and national ID verified. Complete Level 3
                Skill Assessment to unlock higher budget projects.
              </p>
            </div>
          </div>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => nav('/provider/onboarding')}
          >
            {c('Verification status', 'যাচাইয়ের অবস্থা')}
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <StatTile
            label={c('Matched job briefs', 'উপযুক্ত কাজের সুযোগ')}
            value={matchedGigs.length}
            sublabel={c(
              'Matching your CV and writing skills',
              'আপনার প্রোফাইলের সাথে মিলে',
            )}
            icon={<BriefcaseBusiness size={18} />}
          />
          <StatTile
            label={c('Active client orders', 'চলমান ক্লায়েন্ট অর্ডার')}
            value={activeOrders.length}
            sublabel={c(
              '1 awaiting your review draft',
              '১টি ড্রাফট পর্যালোচনায়',
            )}
            icon={<Clock size={18} />}
          />
          <StatTile
            label={c('Net earnings', 'মোট অর্জিত আয়')}
            value={`৳${totalEarnedNet.toLocaleString(document.documentElement.lang === 'bn' ? 'bn-BD' : 'en-BD')}`}
            sublabel={c(
              'Available for bKash/Nagad payout',
              'বিকাশ/নগদে উত্তোলনের জন্য প্রস্তুত',
            )}
            icon={<Wallet size={18} />}
          />
        </div>

        {/* Active Jobs & Reputation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          {/* Active Jobs list */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-moss-100">
              <h2 className="text-lead font-bold text-moss-900">
                {c('Active client orders', 'চলমান অর্ডারসমূহ')}
              </h2>
              <span className="text-caption text-moss-500 font-variant-numeric tabular-nums">
                {activeOrders.length} {c('active', 'টি চলমান')}
              </span>
            </div>

            <div className="space-y-3">
              {activeOrders.map((o) => {
                // RULE: Provider sees the client name ("Mahim Rahman"), NEVER Nusrat Jahan herself!
                const clientName = o.clientName || 'Mahim Rahman';
                const fee = feeFor(o.price, feeRate);

                return (
                  <Link
                    key={o.id}
                    to={`/provider/orders/${o.id}`}
                    className="block p-4 bg-white border border-moss-200 rounded-md hover:border-moss-300 hover:shadow-e1 transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div>
                        <span className="text-caption tabular-nums text-moss-500 mr-2">
                          {o.id}
                        </span>
                        <strong className="text-small font-bold text-moss-900">
                          {o.title}
                        </strong>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-small font-bold text-deep-700 font-variant-numeric tabular-nums">
                          ৳
                          {fee.net.toLocaleString(
                            document.documentElement.lang === 'bn'
                              ? 'bn-BD'
                              : 'en-BD',
                          )}{' '}
                          net
                        </span>
                        <OrderStatusBadge
                          status={o.status}
                          label={o.status.replace('_', ' ')}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-caption text-moss-500 pt-2 border-t border-moss-100">
                      <span>
                        Working with Client:{' '}
                        <strong className="text-moss-800">{clientName}</strong>
                      </span>
                      <span className="text-deep-600 font-medium inline-flex items-center gap-1">
                        Open order <ArrowRight size={12} />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Reputation & Payout Block */}
          <div className="lg:col-span-4 space-y-6">
            {/* Reputation Card */}
            <Card variant="flat" className="p-5">
              <h3 className="text-lead font-bold text-moss-900 mb-3">
                {c('Reputation & trust', 'সুনাম ও রেটিং')}
              </h3>
              <div className="space-y-3 text-small">
                <div className="flex items-center justify-between">
                  <span className="text-moss-600">Client Rating:</span>
                  <Rating
                    rating={viewer?.rating ?? 0}
                    reviewsCount={viewer?.reviews ?? 0}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-moss-600">Completion rate:</span>
                  <span className="font-bold text-moss-900 font-variant-numeric tabular-nums">
                    100%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-moss-600">Average response:</span>
                  <span className="font-bold text-moss-900">Under 2 hours</span>
                </div>
              </div>
            </Card>

            {/* Payout Block */}
            <div className="p-5 bg-moss-900 text-white rounded-md border border-moss-800 shadow-e1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-caption text-moss-300">
                  Available balance
                </span>
                <Wallet size={16} className="text-mint-300" />
              </div>
              <div className="text-h3 font-bold text-white font-variant-numeric tabular-nums mb-4">
                ৳
                {totalEarnedNet.toLocaleString(
                  document.documentElement.lang === 'bn' ? 'bn-BD' : 'en-BD',
                )}
              </div>
              <Button
                size="sm"
                variant="primary"
                className="w-full"
                onClick={() => nav('/provider/wallet')}
              >
                {c('Request payout to bKash / Nagad', 'টাকা উত্তোলন করুন')}
              </Button>
            </div>
          </div>
        </div>

        {/* Matched Feed with "Why you see this" */}
        <section className="pt-6 border-t border-moss-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lead font-bold text-moss-900">
                {c('Matched job feed', 'আপনার জন্য উপযুক্ত কাজ')}
              </h2>
              <p className="text-caption text-moss-600">
                {c(
                  'Jobs filtered to your verified categories and service areas.',
                  'আপনার দক্ষতা ও এলাকার ভিত্তিতে সাজানো।',
                )}
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex bg-moss-100 p-1 rounded-sm border border-moss-200">
                {(['All', 'Digital', 'Local'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setFilterType(t)}
                    className={`px-3 py-1 text-small font-medium rounded-sm transition-colors ${
                      filterType === t
                        ? 'bg-white text-moss-900 shadow-e1'
                        : 'text-moss-600 hover:text-moss-900'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-moss-500 pointer-events-none"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search feed…"
                  className="w-full max-w-full pl-9 pr-3 py-1.5 min-h-[36px] bg-white border border-moss-200 rounded-sm text-small text-moss-900 focus:outline-none focus:border-deep-600"
                />
              </div>
            </div>
          </div>

          {/* Feed List */}
          <div className="space-y-4">
            {matchedGigs.map((gig) => {
              const whyLine = matchingReason(snapshot, gig);

              return (
                <Card
                  key={gig.id}
                  variant="flat"
                  className="p-5 hover:border-moss-300 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <FileText size={16} className="text-deep-600" />
                        <span className="text-caption font-medium text-moss-500">
                          {gig.category}
                        </span>
                        {gig.type === 'local' ? (
                          <LocalBadge />
                        ) : (
                          <DigitalBadge />
                        )}
                      </div>
                      <h3 className="text-lead font-bold text-moss-900">
                        {gig.title}
                      </h3>
                      <p className="text-small text-moss-600 mt-1 line-clamp-2">
                        {gig.summary}
                      </p>
                    </div>

                    <div className="text-left sm:text-right shrink-0">
                      <div className="text-h3 font-bold text-moss-900 font-variant-numeric tabular-nums">
                        ৳
                        {gig.budget.toLocaleString(
                          document.documentElement.lang === 'bn'
                            ? 'bn-BD'
                            : 'en-BD',
                        )}
                      </div>
                      <div className="text-caption text-moss-500">
                        Due {formatDate(gig.deadline)}
                      </div>
                    </div>
                  </div>

                  {/* Why you see this badge */}
                  <div className="mt-3 pt-3 border-t border-moss-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-caption text-deep-700 bg-deep-50 px-2.5 py-1 rounded-sm border border-deep-100">
                      <CheckCircle2
                        size={14}
                        className="text-deep-600 shrink-0"
                      />
                      <span>
                        <strong>Why you see this:</strong> {whyLine}
                      </span>
                    </div>

                    <Link to={`/provider/feed/${gig.id}`}>
                      <Button
                        size="sm"
                        variant="secondary"
                        icon={<ArrowRight size={14} />}
                      >
                        View & propose
                      </Button>
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      </LayoutContainer>
    </div>
  );
}
