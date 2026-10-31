import { useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  SlidersHorizontal,
  ShieldCheck,
  Send,
  Calendar,
  MapPin,
  Check,
} from 'lucide-react';
import { LayoutContainer } from '../../components/layout/LayoutContainer';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { DigitalBadge, LocalBadge } from '../../components/ui/Badge';
import {
  ProposalCard,
  ProposalCompareTable,
  type ProposalItem,
} from '../../components/ui/ProposalCard';
import { FeeBreakdown } from '../../components/ui/MarketplaceComponents';
import { Modal } from '../../components/ui/Feedback';
import { useMarket, useApp, useCopy } from '../../app/context';
import { propose, acceptProposal, feeFor } from '../../api/marketplace';

export function GigProposals() {
  const { gigId } = useParams();
  const { pathname } = useLocation();
  const isProvider = pathname.startsWith('/provider');

  const { gigs, proposals, providers, feeRate } = useMarket();
  const { notify } = useApp();
  const c = useCopy();
  const nav = useNavigate();

  const gig = gigs.find((g) => g.id === gigId) || gigs[0];

  // Proposal filter & sort
  const [sort, setSort] = useState<'best' | 'price' | 'fastest' | 'rating'>(
    'best',
  );
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState<string[]>([]);
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [acceptingProposal, setAcceptingProposal] =
    useState<ProposalItem | null>(null);

  // Provider proposal form state
  const [providerPrice, setProviderPrice] = useState(gig ? gig.budget : 1500);
  const [providerMessage, setProviderMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!gig) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-lead font-bold text-moss-900">Brief not found</h2>
        <Link
          to="/client"
          className="text-deep-600 underline mt-2 inline-block"
        >
          Return to workspace
        </Link>
      </div>
    );
  }

  // Map proposals to full proposal items with provider info
  const gigProposals: ProposalItem[] = proposals
    .filter((p) => p.gigId === gig.id)
    .map((p) => {
      const provider = providers.find((pr) => pr.id === p.providerId);
      return {
        id: p.id,
        providerId: p.providerId,
        name: provider?.name || 'Verified Provider',
        initials: provider?.initials || 'VP',
        headline: provider?.headline,
        rating: provider?.rating || 4.9,
        completedJobs: provider?.completed || 20,
        area: provider?.area || 'Dhaka',
        price: p.price,
        days: p.days,
        message: p.message,
        verifiedLevel: (provider?.id === 'nusrat' ? 2 : 1) as 1 | 2 | 3,
      };
    })
    .filter((p) => (verifiedOnly ? (p.verifiedLevel || 0) >= 2 : true))
    .sort((a, b) => {
      if (sort === 'price') return a.price - b.price;
      if (sort === 'fastest') return a.days - b.days;
      if (sort === 'rating') return b.rating - a.rating;
      return 0; // best match
    });

  const handleToggleCompare = (id: string) => {
    if (selectedForCompare.includes(id)) {
      setSelectedForCompare(selectedForCompare.filter((x) => x !== id));
    } else {
      if (selectedForCompare.length >= 3) {
        notify('You can compare up to 3 proposals at once.');
        return;
      }
      setSelectedForCompare([...selectedForCompare, id]);
    }
  };

  const handleConfirmAccept = async () => {
    if (!acceptingProposal) return;
    try {
      const order = await acceptProposal(acceptingProposal.id);
      setAcceptingProposal(null);
      notify('Agreement initiated! You can now fund escrow.');
      nav(`/client/orders/${order.id}`);
    } catch (e) {
      notify(e instanceof Error ? e.message : 'Error accepting proposal');
    }
  };

  const handleSubmitProviderProposal = async () => {
    if (!providerMessage.trim()) {
      notify('Please enter your approach message.');
      return;
    }
    setSubmitting(true);
    try {
      await propose(gig.id, providerPrice, providerMessage);
      setProviderMessage('');
      notify('Your proposal has been sent to the client.');
    } catch (e) {
      notify(e instanceof Error ? e.message : 'Error sending proposal');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full py-8 md:py-10">
      <LayoutContainer variant="app">
        {/* Navigation Breadcrumb */}
        <Link
          to={isProvider ? '/provider' : '/client'}
          className="inline-flex items-center gap-1.5 text-small text-moss-500 hover:text-moss-900 mb-6"
        >
          <span>← {c('Back to dashboard', 'ড্যাশবোর্ডে ফিরে যান')}</span>
        </Link>

        {/* Sticky Brief Summary Card */}
        <Card variant="raised" className="p-6 mb-8 border-moss-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-3 border-b border-moss-100">
            <div className="flex items-center gap-2">
              <span className="text-caption font-bold text-moss-500 uppercase">
                {gig.category}
              </span>
              {gig.type === 'local' ? <LocalBadge /> : <DigitalBadge />}
            </div>
            <div className="text-caption text-moss-500">Brief ID: {gig.id}</div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <h1 className="text-h3 font-bold text-moss-900 mb-2">
                {gig.title}
              </h1>
              <p className="text-body text-moss-700 max-w-2xl leading-relaxed">
                {gig.summary}
              </p>
            </div>
            <div className="text-left sm:text-right shrink-0">
              <span className="text-caption text-moss-500 block">
                Client budget
              </span>
              <span className="text-h2 font-bold text-moss-900 font-variant-numeric tabular-nums">
                ৳{gig.budget.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-moss-100 mt-4 text-small text-moss-600">
            <span className="flex items-center gap-1.5">
              <Calendar size={15} />
              <span>Target: {gig.deadline}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={15} />
              <span>{gig.area}</span>
            </span>
            <span className="flex items-center gap-1.5 text-deep-700 font-medium">
              <ShieldCheck size={15} className="text-deep-600" />
              <span>Client verified · Escrow protection active</span>
            </span>
          </div>
        </Card>

        {/* PROVIDER VIEW: Proposal Form */}
        {isProvider ? (
          <div className="max-w-2xl bg-white border border-moss-200 rounded-md p-6 shadow-e1">
            <h2 className="text-lead font-bold text-moss-900 mb-2">
              {c('Send your proposal', 'আপনার প্রস্তাব পাঠান')}
            </h2>
            <p className="text-small text-moss-600 mb-6">
              {c(
                'State your competitive price, delivery timeline and work samples. The client reviews proposals before funding escrow.',
                'আপনার কাজের মূল্য ও সময় উল্লেখ করুন। ক্লায়েন্ট প্রস্তাব দেখে এসক্রোতে অর্থ জমা করবেন।',
              )}
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-small font-medium text-moss-700 mb-1.5">
                  Your Price (BDT ৳)
                </label>
                <input
                  type="number"
                  min={100}
                  value={providerPrice}
                  onChange={(e) => setProviderPrice(Number(e.target.value))}
                  className="w-full min-h-[44px] px-3.5 bg-white border border-moss-200 rounded-sm text-body font-bold text-moss-900 focus:outline-none focus:border-deep-600 font-variant-numeric tabular-nums"
                />
                <p className="text-caption text-deep-700 font-medium mt-1">
                  You receive ৳
                  {feeFor(providerPrice, feeRate).net.toLocaleString('en-IN')}{' '}
                  after 10% platform fee.
                </p>
              </div>

              <div>
                <label className="block text-small font-medium text-moss-700 mb-1.5">
                  How will you approach this task?
                </label>
                <textarea
                  rows={4}
                  value={providerMessage}
                  onChange={(e) => setProviderMessage(e.target.value)}
                  placeholder="Explain your approach, milestones and what is included…"
                  className="w-full p-3 bg-white border border-moss-200 rounded-sm text-body text-moss-900 focus:outline-none focus:border-deep-600"
                />
              </div>

              <Button
                size="lg"
                variant="primary"
                onClick={handleSubmitProviderProposal}
                disabled={submitting || !providerMessage.trim()}
                icon={<Send size={16} />}
              >
                {c('Submit proposal', 'প্রস্তাব জমা দিন')}
              </Button>
            </div>
          </div>
        ) : (
          /* CLIENT VIEW: Proposals Toolbar, List & Compare */
          <div>
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-moss-200 gap-4">
              <div className="flex items-center gap-3">
                <h2 className="text-lead font-bold text-moss-900">
                  {c('Proposals received', 'প্রাপ্ত প্রস্তাবসমূহ')}
                </h2>
                <span className="text-caption bg-moss-100 text-moss-700 px-2 py-0.5 rounded-sm font-bold font-variant-numeric tabular-nums">
                  {gigProposals.length}
                </span>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                {/* Verified only checkbox */}
                <label className="inline-flex items-center gap-2 text-small text-moss-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={(e) => setVerifiedOnly(e.target.checked)}
                    className="w-4 h-4 rounded-sm border-moss-300 text-deep-600 focus:ring-deep-600"
                  />
                  <span>Verified only</span>
                </label>

                {/* Sort dropdown */}
                <div className="flex items-center gap-1.5 text-small text-moss-600">
                  <SlidersHorizontal size={16} />
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as typeof sort)}
                    className="bg-white border border-moss-200 rounded-sm px-2.5 py-1 text-small text-moss-900 focus:outline-none focus:border-deep-600"
                  >
                    <option value="best">Best match</option>
                    <option value="price">Lowest price</option>
                    <option value="fastest">Fastest delivery</option>
                    <option value="rating">Top rated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Sticky Compare Bar when 2+ selected */}
            {selectedForCompare.length >= 2 && (
              <div className="sticky top-16 z-30 mb-6 p-4 bg-moss-900 text-white rounded-md shadow-e2 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-small">
                  <span className="font-bold text-mint-300">
                    {selectedForCompare.length}
                  </span>
                  <span>proposals selected for side-by-side comparison.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => setCompareModalOpen(true)}
                  >
                    Compare side-by-side
                  </Button>
                  <Button
                    size="sm"
                    variant="tertiary"
                    className="text-white hover:text-white"
                    onClick={() => setSelectedForCompare([])}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            )}

            {/* Comparison Modal */}
            {compareModalOpen && (
              <Modal
                open={compareModalOpen}
                onClose={() => setCompareModalOpen(false)}
                title="Proposal Comparison"
                maxWidth="max-w-2xl"
              >
                <ProposalCompareTable
                  proposals={gigProposals.filter((p) =>
                    selectedForCompare.includes(p.id),
                  )}
                  onChoose={(p) => {
                    setCompareModalOpen(false);
                    setAcceptingProposal(p);
                  }}
                  onClose={() => setCompareModalOpen(false)}
                />
              </Modal>
            )}

            {/* Proposal Cards List */}
            <div className="space-y-4">
              {gigProposals.map((proposal) => (
                <ProposalCard
                  key={proposal.id}
                  proposal={proposal}
                  selected={selectedForCompare.includes(proposal.id)}
                  onSelect={handleToggleCompare}
                  onAccept={(p) => setAcceptingProposal(p)}
                />
              ))}

              {gigProposals.length === 0 && (
                <div className="p-8 text-center bg-white border border-moss-200 rounded-md text-moss-600">
                  No proposals matching your filter criteria.
                </div>
              )}
            </div>

            {/* Accept Modal */}
            <Modal
              open={Boolean(acceptingProposal)}
              onClose={() => setAcceptingProposal(null)}
              title="Confirm proposal agreement"
            >
              {acceptingProposal && (
                <div className="space-y-4">
                  <p className="text-small text-moss-700 leading-relaxed">
                    You are accepting <strong>{acceptingProposal.name}</strong>
                    's proposal for{' '}
                    <strong>
                      ৳{acceptingProposal.price.toLocaleString('en-IN')}
                    </strong>
                    .
                  </p>
                  <p className="text-caption text-moss-600">
                    Once accepted, your order workspace is created. Both parties
                    agree on milestones before escrow is funded.
                  </p>

                  <FeeBreakdown
                    gross={acceptingProposal.price}
                    rate={feeRate}
                  />

                  <div className="flex justify-end gap-3 pt-3 border-t border-moss-100">
                    <Button
                      variant="secondary"
                      onClick={() => setAcceptingProposal(null)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      onClick={handleConfirmAccept}
                      icon={<Check size={16} />}
                    >
                      Accept & initiate order
                    </Button>
                  </div>
                </div>
              )}
            </Modal>
          </div>
        )}
      </LayoutContainer>
    </div>
  );
}
