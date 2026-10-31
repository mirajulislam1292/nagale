import { useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Lock,
  Unlock,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Printer,
  RotateCcw,
  Scale,
  Send,
  MessagesSquare,
} from 'lucide-react';
import { LayoutContainer } from '../../components/layout/LayoutContainer';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Avatar } from '../../components/ui/Avatar';
import { OrderStatusBadge } from '../../components/ui/Badge';
import { OrderTimeline } from '../../components/ui/OrderTimeline';
import {
  EscrowSummary,
  DeliveryPreview,
} from '../../components/ui/MarketplaceComponents';
import { Modal } from '../../components/ui/Feedback';
import { useMarket, useApp, useCopy } from '../../app/context';
import { actOnOrder, getCounterpart, feeFor } from '../../api/marketplace';

export function OrderDetailPage() {
  const { orderId } = useParams();
  const { pathname } = useLocation();
  const isProvider = pathname.startsWith('/provider');

  const { orders, providers, feeRate } = useMarket();
  const { role, notify } = useApp();
  const c = useCopy();
  const nav = useNavigate();

  const order = orders.find((o) => o.id === orderId) || orders[0];

  // Action states
  const [fundingMethod, setFundingMethod] = useState<'bKash' | 'Nagad'>(
    'bKash',
  );
  const [fundingModalOpen, setFundingModalOpen] = useState(false);
  const [deliveryNote, setDeliveryNote] = useState('');
  const [deliveryModalOpen, setDeliveryModalOpen] = useState(false);
  const [approvalModalOpen, setApprovalModalOpen] = useState(false);
  const [actionBusy, setActionBusy] = useState(false);

  if (!order) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-lead font-bold text-moss-900">Order not found</h2>
        <Link
          to="/client"
          className="text-deep-600 underline mt-2 inline-block"
        >
          Return to dashboard
        </Link>
      </div>
    );
  }

  // Counterpart identification:
  // Client sees Provider. Provider sees Client. (NEVER THE VIEWER!)
  const counterpart = getCounterpart(order, role, providers);
  const fee = feeFor(order.price, feeRate);

  const handleAction = async (
    action: 'accept' | 'fund' | 'deliver' | 'approve' | 'revise' | 'dispute',
    note = '',
  ) => {
    setActionBusy(true);
    try {
      await actOnOrder(order.id, action, role, crypto.randomUUID(), note);
      notify('Order state updated successfully.');
      setFundingModalOpen(false);
      setDeliveryModalOpen(false);
      setApprovalModalOpen(false);
    } catch (e) {
      notify(e instanceof Error ? e.message : 'Error processing action');
    } finally {
      setActionBusy(false);
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
          <span>← {c('Back to active orders', 'অর্ডারে ফিরে যান')}</span>
        </Link>

        {/* Order Header: Title, Order number, Status, Price, Counterpart */}
        <div className="bg-white border border-moss-200 rounded-md p-6 shadow-e1 mb-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-moss-100">
            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="text-caption font-mono uppercase text-moss-500 font-bold bg-mist px-2 py-0.5 rounded-sm">
                  Order {order.id}
                </span>
                <OrderStatusBadge
                  status={order.status}
                  label={order.status.replace('_', ' ')}
                />
              </div>
              <h1 className="text-h3 font-bold text-moss-900 tracking-tight">
                {order.title}
              </h1>
            </div>

            {/* Price block */}
            <div className="text-left md:text-right shrink-0">
              <span className="text-caption text-moss-500 block">
                Agreed Order Price
              </span>
              <span className="text-h2 font-bold text-moss-900 font-variant-numeric tabular-nums">
                ৳{order.price.toLocaleString('en-IN')}
              </span>
              <span className="text-caption text-deep-700 block">
                {isProvider
                  ? `Net payout: ৳${fee.net.toLocaleString('en-IN')}`
                  : 'Protected in Escrow'}
              </span>
            </div>
          </div>

          {/* Counterpart Person row: Never the viewer! */}
          <div className="flex items-center justify-between pt-4 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Avatar initials={counterpart.initials} size="md" />
              <div>
                <strong className="text-small font-bold text-moss-900 block">
                  {counterpart.name}
                </strong>
                <span className="text-caption text-moss-500">
                  {counterpart.roleLabel}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link to={`/${role}/messages`}>
                <Button
                  size="sm"
                  variant="secondary"
                  icon={<MessagesSquare size={14} />}
                >
                  {c('Open messages', 'বার্তা দেখুন')}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Six-step OrderTimeline */}
        <div className="bg-white border border-moss-200 rounded-md p-6 mb-8 shadow-e1">
          <h2 className="text-small font-bold text-moss-500 uppercase tracking-wider mb-2">
            Order lifecycle timeline
          </h2>
          <OrderTimeline status={order.status} />
        </div>

        {/* Main Grid: Left Next Step / Details / Preview / Activity, Right Escrow Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-8">
            {/* NEXT STEP ACTION PANEL */}
            <Card
              variant="flat"
              className="p-6 bg-mist/50 border border-moss-200"
            >
              <span className="text-caption uppercase tracking-wider text-deep-600 font-bold block mb-1">
                Current State Action
              </span>

              {/* Status: Accepted */}
              {order.status === 'accepted' && (
                <div>
                  <h3 className="text-lead font-bold text-moss-900 mb-2">
                    {!order.providerAccepted
                      ? isProvider
                        ? 'Confirm client agreement'
                        : 'Waiting for provider agreement confirmation'
                      : isProvider
                        ? 'Agreement confirmed · Client is funding escrow'
                        : 'Agreement agreed by both sides · Fund escrow to begin work'}
                  </h3>
                  <p className="text-small text-moss-600 mb-4">
                    Both parties must accept before funds can be deposited.
                    Exact project workspace and addresses unlock once escrow is
                    funded.
                  </p>

                  {isProvider && !order.providerAccepted && (
                    <Button
                      variant="primary"
                      onClick={() => handleAction('accept')}
                      disabled={actionBusy}
                      icon={<CheckCircle2 size={16} />}
                    >
                      Accept order agreement
                    </Button>
                  )}

                  {!isProvider && order.providerAccepted && (
                    <Button
                      variant="primary"
                      onClick={() => setFundingModalOpen(true)}
                      icon={<Lock size={16} />}
                    >
                      Fund escrow · ৳{order.price.toLocaleString('en-IN')}
                    </Button>
                  )}
                </div>
              )}

              {/* Status: Details Unlocked / In Progress */}
              {order.status === 'details_unlocked' && (
                <div>
                  <h3 className="text-lead font-bold text-moss-900 mb-2">
                    {isProvider
                      ? 'Work in progress · Submit delivery when ready'
                      : 'Payment held in escrow · Provider is working'}
                  </h3>
                  <p className="text-small text-moss-600 mb-4">
                    {isProvider
                      ? 'Payment is verified and held securely. Prepare your files and submit a draft note when ready for client review.'
                      : 'Your payment of ৳' +
                        order.price.toLocaleString('en-IN') +
                        ' is safely held. The provider is preparing your deliverables.'}
                  </p>

                  {isProvider ? (
                    <Button
                      variant="primary"
                      onClick={() => setDeliveryModalOpen(true)}
                      icon={<Send size={16} />}
                    >
                      Submit completed delivery
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2 text-small text-moss-600">
                      <Clock size={16} className="text-deep-600" />
                      <span>
                        Deliverables are being prepared. You will be notified
                        when ready to review.
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Status: Delivered */}
              {order.status === 'delivered' && (
                <div>
                  <h3 className="text-lead font-bold text-moss-900 mb-2">
                    {isProvider
                      ? 'Draft delivered · Client is inspecting preview'
                      : 'Draft delivered · Inspect watermarked preview and approve'}
                  </h3>
                  <p className="text-small text-moss-600 mb-4">
                    Inspect the work below. You can approve and release payment,
                    request revisions, or open a dispute if issues cannot be
                    resolved.
                  </p>

                  {!isProvider && (
                    <div className="flex flex-wrap items-center gap-3">
                      <Button
                        variant="primary"
                        onClick={() => setApprovalModalOpen(true)}
                        icon={<CheckCircle2 size={16} />}
                      >
                        Approve & release payment
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => handleAction('revise')}
                        disabled={actionBusy}
                        icon={<RotateCcw size={16} />}
                      >
                        Request revisions
                      </Button>
                      <Button
                        variant="tertiary"
                        onClick={() => nav(`/orders/${order.id}/dispute`)}
                        icon={<Scale size={16} />}
                      >
                        Open dispute
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {/* Status: Completed */}
              {order.status === 'completed' && (
                <div>
                  <h3 className="text-lead font-bold text-moss-900 mb-2">
                    Order completed · Payment released
                  </h3>
                  <p className="text-small text-moss-600 mb-4">
                    The delivery was approved and ৳
                    {fee.net.toLocaleString('en-IN')} net was released to the
                    provider. Direct files are unlocked.
                  </p>
                  <Button
                    variant="secondary"
                    onClick={() => window.print()}
                    icon={<Printer size={16} />}
                  >
                    Print payment receipt
                  </Button>
                </div>
              )}
            </Card>

            {/* WATERMARKED DELIVERY PREVIEW (When delivered or completed) */}
            {(order.status === 'delivered' || order.status === 'completed') && (
              <DeliveryPreview
                title={order.title + ' - Final Delivery'}
                notes={order.delivery || 'First draft delivery notes.'}
                isApproved={order.status === 'completed'}
              />
            )}

            {/* PRIVATE PROJECT DETAILS CARD (Locked until funded!) */}
            <Card variant="flat" className="p-6">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-moss-100">
                <div className="flex items-center gap-2">
                  {order.privateDetails ? (
                    <Unlock size={18} className="text-deep-600" />
                  ) : (
                    <Lock size={18} className="text-moss-400" />
                  )}
                  <h3 className="text-lead font-bold text-moss-900">
                    Private project details & workspace notes
                  </h3>
                </div>
                <span
                  className={`text-caption font-medium px-2 py-0.5 rounded-sm ${
                    order.privateDetails
                      ? 'bg-deep-100 text-deep-700'
                      : 'bg-moss-100 text-moss-500'
                  }`}
                >
                  {order.privateDetails ? 'Unlocked' : 'Locked'}
                </span>
              </div>

              {order.privateDetails ? (
                <div className="space-y-3">
                  <p className="text-small text-moss-800 leading-relaxed bg-mist p-4 rounded-sm border border-moss-100">
                    {order.privateDetails.workspaceNotes}
                  </p>
                  <p className="text-caption text-moss-500">
                    Shared only with verified order participants (
                    {counterpart.name} and you).
                  </p>
                </div>
              ) : (
                <div className="p-8 text-center bg-mist/50 rounded-sm border border-dashed border-moss-200">
                  <Lock size={28} className="mx-auto text-moss-400 mb-2" />
                  <p className="text-small font-medium text-moss-700">
                    Exact addresses, files and private project credentials
                    remain locked.
                  </p>
                  <p className="text-caption text-moss-500 mt-1">
                    Unlocks automatically once both parties confirm agreement
                    and escrow is funded.
                  </p>
                </div>
              )}
            </Card>

            {/* AUDIT ACTIVITY LOG */}
            <Card variant="flat" className="p-6">
              <h3 className="text-lead font-bold text-moss-900 mb-4">
                Order activity & history
              </h3>
              <ol className="space-y-4 border-l-2 border-moss-200 ml-2 pl-4">
                {order.events.map((ev, i) => (
                  <li key={i} className="relative">
                    <span className="absolute -left-[23px] top-1.5 w-2.5 h-2.5 rounded-full bg-deep-600 ring-4 ring-white" />
                    <p className="text-small font-medium text-moss-900">
                      {ev.text}
                    </p>
                    <span className="text-caption text-moss-400 font-variant-numeric tabular-nums">
                      {new Date(ev.at).toLocaleString('en-GB', {
                        timeZone: 'Asia/Dhaka',
                        dateStyle: 'medium',
                        timeStyle: 'short',
                      })}
                    </span>
                  </li>
                ))}
              </ol>
            </Card>
          </div>

          {/* Right Column: Escrow Summary Panel & Safeguards */}
          <div className="lg:col-span-4 space-y-6">
            <EscrowSummary amount={order.price} feeRate={feeRate} />

            <Card variant="flat" className="p-5 text-caption space-y-3">
              <div className="flex items-center gap-2 font-bold text-moss-900 text-small">
                <ShieldCheck size={16} className="text-deep-600" />
                <span>Safeguard reminder</span>
              </div>
              <p className="text-moss-600 leading-normal">
                Never accept or make off-platform payments via phone or personal
                bank accounts. Orders paid outside Nagale lose escrow
                protection.
              </p>
              <Link
                to="/trust"
                className="text-deep-600 font-bold hover:underline inline-block"
              >
                Read escrow rules →
              </Link>
            </Card>
          </div>
        </div>

        {/* Modal: Client Fund Escrow */}
        <Modal
          open={fundingModalOpen}
          onClose={() => setFundingModalOpen(false)}
          title="Deposit funds into escrow"
        >
          <div className="space-y-4">
            <p className="text-small text-moss-700">
              Select your payment method to deposit{' '}
              <strong>৳{order.price.toLocaleString('en-IN')}</strong> into
              escrow. Payment is held securely until you approve delivery.
            </p>

            <div className="space-y-2">
              {(['bKash', 'Nagad'] as const).map((m) => (
                <div
                  key={m}
                  onClick={() => setFundingMethod(m)}
                  className={`p-3.5 rounded-sm border cursor-pointer flex items-center justify-between ${
                    fundingMethod === m
                      ? 'border-deep-600 bg-deep-50'
                      : 'border-moss-200'
                  }`}
                >
                  <span className="font-bold text-moss-900">{m} Wallet</span>
                  {fundingMethod === m && (
                    <CheckCircle2 size={16} className="text-deep-600" />
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-moss-100">
              <Button
                variant="secondary"
                onClick={() => setFundingModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => handleAction('fund')}
                disabled={actionBusy}
              >
                Confirm deposit
              </Button>
            </div>
          </div>
        </Modal>

        {/* Modal: Provider Submit Delivery */}
        <Modal
          open={deliveryModalOpen}
          onClose={() => setDeliveryModalOpen(false)}
          title="Submit work for client review"
        >
          <div className="space-y-4">
            <p className="text-small text-moss-700">
              Attach your deliverables or write a handover summary. The client
              will inspect a watermarked preview.
            </p>
            <div>
              <label className="block text-small font-medium text-moss-700 mb-1">
                Handover delivery note
              </label>
              <textarea
                rows={4}
                value={deliveryNote}
                onChange={(e) => setDeliveryNote(e.target.value)}
                placeholder="Explain the delivered draft, attachments and what you have completed…"
                className="w-full p-3 bg-white border border-moss-200 rounded-sm text-small text-moss-900 focus:outline-none focus:border-deep-600"
              />
            </div>
            <div className="flex justify-end gap-3 pt-3 border-t border-moss-100">
              <Button
                variant="secondary"
                onClick={() => setDeliveryModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => handleAction('deliver', deliveryNote)}
                disabled={actionBusy || !deliveryNote.trim()}
              >
                Submit delivery
              </Button>
            </div>
          </div>
        </Modal>

        {/* Modal: Client Approve & Release */}
        <Modal
          open={approvalModalOpen}
          onClose={() => setApprovalModalOpen(false)}
          title="Release escrow payment"
        >
          <div className="space-y-4">
            <p className="text-small text-moss-700">
              Confirming approval will complete the order and release{' '}
              <strong>৳{fee.net.toLocaleString('en-IN')}</strong> to{' '}
              {counterpart.name}. Direct download files will unlock.
            </p>
            <div className="p-3 bg-mist rounded-sm text-caption text-moss-600">
              Order: ৳{order.price.toLocaleString('en-IN')} · Fee: ৳
              {fee.fee.toLocaleString('en-IN')} (10%) · Net payout: ৳
              {fee.net.toLocaleString('en-IN')}
            </div>
            <div className="flex justify-end gap-3 pt-3 border-t border-moss-100">
              <Button
                variant="secondary"
                onClick={() => setApprovalModalOpen(false)}
              >
                Keep inspecting
              </Button>
              <Button
                variant="primary"
                onClick={() => handleAction('approve')}
                disabled={actionBusy}
              >
                Confirm approval & release
              </Button>
            </div>
          </div>
        </Modal>
      </LayoutContainer>
    </div>
  );
}
