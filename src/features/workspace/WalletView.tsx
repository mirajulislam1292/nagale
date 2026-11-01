import { paymentAccounts } from '../../mocks/seed';
import { participantOrders } from '../../mocks/selectors';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Wallet,
  Lock,
  CheckCircle2,
  AlertCircle,
  Plus,
  RefreshCw,
} from 'lucide-react';
import { LayoutContainer } from '../../components/layout/LayoutContainer';
import { Button } from '../../components/ui/Button';
import { Card, StatTile } from '../../components/ui/Card';
import { OrderStatusBadge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Feedback';
import { Select, PhoneInput, OtpInput } from '../../components/ui/Input';
import { useMarket, useApp, useCopy } from '../../app/context';
import { feeFor } from '../../api/marketplace';

export function WalletView() {
  const { pathname } = useLocation();
  const isProvider = pathname.startsWith('/provider');

  const snapshot = useMarket();
  const { feeRate } = snapshot;
  const orders = participantOrders(
    snapshot,
    isProvider ? 'provider' : 'client',
  );
  const { notify } = useApp();
  const c = useCopy();
  const account = paymentAccounts[
    isProvider ? 'nusrat' : 'usr-client-1'
  ][0] ?? { type: 'bKash', last4: '••••' };

  // Client funding modal
  const [fundingModalOpen, setFundingModalOpen] = useState(false);
  const [fundAmount, setFundAmount] = useState('2000');
  const [fundMethod, setFundMethod] = useState<'bKash' | 'Nagad'>('bKash');
  const [fundingState, setFundingState] = useState<
    'idle' | 'processing' | 'success'
  >('idle');

  // Provider payout modal
  const [payoutModalOpen, setPayoutModalOpen] = useState(false);
  const [payoutAmount, setPayoutAmount] = useState('1350');
  const [addMethodModalOpen, setAddMethodModalOpen] = useState(false);
  const [newMethodPhone, setNewMethodPhone] = useState('');
  const [newMethodOtp, setNewMethodOtp] = useState('');
  const [methodAdded, setMethodAdded] = useState(false);

  // Financial calculations
  const heldOrders = orders.filter((o) =>
    ['details_unlocked', 'delivered'].includes(o.status),
  );
  const completedOrders = orders.filter((o) => o.status === 'completed');

  const totalHeld = heldOrders.reduce((sum, o) => sum + o.price, 0);
  const totalCompletedGross = completedOrders.reduce(
    (sum, o) => sum + o.price,
    0,
  );
  const totalCompletedNet = completedOrders.reduce(
    (sum, o) => sum + feeFor(o.price, feeRate).net,
    0,
  );

  const handleSimulateFunding = () => {
    setFundingState('processing');
    setTimeout(() => {
      setFundingState('success');
      setTimeout(() => {
        setFundingModalOpen(false);
        setFundingState('idle');
        notify('Escrow funded successfully.');
      }, 1200);
    }, 1500);
  };

  const handleRequestPayout = () => {
    setPayoutModalOpen(false);
    notify(`Payout request sent to ${account.type} •••• ${account.last4}.`);
  };

  const handleAddPaymentMethod = () => {
    if (newMethodOtp === '123456') {
      setMethodAdded(true);
      setAddMethodModalOpen(false);
      notify('New payment account verified and masked.');
    } else {
      notify('Use demo code 123456 to verify.');
    }
  };

  return (
    <div className="w-full py-8 md:py-10">
      <LayoutContainer variant="app">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-moss-200 gap-4">
          <div>
            <h1 className="text-h3 font-bold text-moss-900 tracking-tight">
              {isProvider
                ? c('Provider earnings & wallet', 'আয় ও ওয়ালেট')
                : c('Client wallet & escrow', 'ক্লায়েন্ট ওয়ালেট ও এসক্রো')}
            </h1>
            <p className="text-small text-moss-600">
              {isProvider
                ? c(
                    'Track completed order payouts, held escrow and withdraw to verified mobile wallets.',
                    'আপনার অর্জিত আয় দেখুন এবং বিকাশ বা নগদে উত্তোলন করুন।',
                  )
                : c(
                    'Track funds held in escrow, release history, and payment gateway methods.',
                    'এসক্রোতে সংরক্ষিত অর্থ এবং পূর্ববর্তী পেমেন্টের বিবরণ।',
                  )}
            </p>
          </div>

          <div>
            {isProvider ? (
              <Button
                variant="primary"
                onClick={() => setPayoutModalOpen(true)}
                icon={<Wallet size={16} />}
              >
                {c('Request payout', 'টাকা উত্তোলন')}
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={() => setFundingModalOpen(true)}
                icon={<Lock size={16} />}
              >
                {c('Fund escrow balance', 'এসক্রোতে জমা দিন')}
              </Button>
            )}
          </div>
        </div>

        {/* Financial Stat Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {isProvider ? (
            <>
              <StatTile
                label="Available for payout"
                value={`৳${totalCompletedNet.toLocaleString(document.documentElement.lang === 'bn' ? 'bn-BD' : 'en-BD')}`}
                sublabel="Ready for instant withdrawal"
                icon={<Wallet size={18} />}
              />
              <StatTile
                label="In active escrow"
                value={`৳${heldOrders.reduce((s, o) => s + feeFor(o.price, feeRate).net, 0).toLocaleString(document.documentElement.lang === 'bn' ? 'bn-BD' : 'en-BD')}`}
                sublabel="Held safely while work is verified"
                icon={<Lock size={18} />}
              />
              <StatTile
                label="Platform fee rate"
                value={`${feeRate * 100}%`}
                sublabel="Transparent service fee on approval"
                icon={<CheckCircle2 size={18} />}
              />
            </>
          ) : (
            <>
              <StatTile
                label="Payment held in escrow"
                value={`৳${totalHeld.toLocaleString(document.documentElement.lang === 'bn' ? 'bn-BD' : 'en-BD')}`}
                sublabel={`${heldOrders.length} active orders protected`}
                icon={<Lock size={18} />}
              />
              <StatTile
                label="Completed releases"
                value={`৳${totalCompletedGross.toLocaleString(document.documentElement.lang === 'bn' ? 'bn-BD' : 'en-BD')}`}
                sublabel={`${completedOrders.length} approved handovers`}
                icon={<CheckCircle2 size={18} />}
              />
              <StatTile
                label="Refunds & disputes"
                value="৳0"
                sublabel="Zero active dispute deductions"
                icon={<AlertCircle size={18} />}
              />
            </>
          )}
        </div>

        {/* Transactions Table & Saved Payment Methods Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Order Transactions Table */}
          <div className="lg:col-span-8 bg-white border border-moss-200 rounded-md p-6 shadow-e1">
            <h2 className="text-lead font-bold text-moss-900 mb-4">
              {c('Order transaction ledger', 'লেনদেন খতিয়ান')}
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-small">
                <thead>
                  <tr className="border-b border-moss-200 text-caption text-moss-500 normal-case tracking-wider">
                    <th className="py-3 pr-4 font-bold">Order / Description</th>
                    <th className="py-3 px-3 font-bold">Status</th>
                    <th className="py-3 pl-4 text-right font-bold">
                      Amount (৳)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-moss-100">
                  {orders.map((o) => {
                    const fee = feeFor(o.price, feeRate);
                    const amountToShow = isProvider ? fee.net : o.price;

                    return (
                      <tr
                        key={o.id}
                        className="hover:bg-mist/50 transition-colors"
                      >
                        <td className="py-3.5 pr-4">
                          <Link
                            to={`/${isProvider ? 'provider' : 'client'}/orders/${o.id}`}
                            className="font-bold text-moss-900 hover:text-deep-600 block"
                          >
                            {o.title}
                          </Link>
                          <span className="text-caption tabular-nums text-moss-500">
                            {o.id}
                          </span>
                        </td>
                        <td className="py-3.5 px-3">
                          <OrderStatusBadge
                            status={o.status}
                            label={o.status.replace('_', ' ')}
                          />
                        </td>
                        <td className="py-3.5 pl-4 text-right font-bold text-moss-900 font-variant-numeric tabular-nums">
                          ৳
                          {amountToShow.toLocaleString(
                            document.documentElement.lang === 'bn'
                              ? 'bn-BD'
                              : 'en-BD',
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment Methods Side Column: Neutral Text Only, NO logos */}
          <div className="lg:col-span-4 space-y-6">
            <Card variant="flat" className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lead font-bold text-moss-900">
                  {isProvider ? 'Payout accounts' : 'Payment methods'}
                </h3>
                <button
                  type="button"
                  onClick={() => setAddMethodModalOpen(true)}
                  className="text-caption font-bold text-deep-600 hover:underline inline-flex items-center gap-1"
                >
                  <Plus size={14} />
                  <span>Add</span>
                </button>
              </div>

              {/* Verified Payment Method Rows: Text only, neutral icon */}
              <div className="space-y-3">
                <div className="p-3.5 border border-moss-200 rounded-sm bg-mist flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-sm bg-white border border-moss-200 flex items-center justify-center text-moss-700">
                      <Wallet size={16} />
                    </div>
                    <div>
                      <strong className="text-small font-bold text-moss-900 block">
                        bKash
                      </strong>
                      <span className="text-caption text-moss-500 tabular-nums">
                        •••• {account.last4}
                      </span>
                    </div>
                  </div>
                  <span className="text-caption bg-deep-100 text-deep-700 px-2 py-0.5 rounded-sm">
                    Default
                  </span>
                </div>

                <div className="p-3.5 border border-moss-200 rounded-sm bg-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-sm bg-white border border-moss-200 flex items-center justify-center text-moss-700">
                      <Wallet size={16} />
                    </div>
                    <div>
                      <strong className="text-small font-bold text-moss-900 block">
                        Nagad
                      </strong>
                      <span className="text-caption text-moss-500 tabular-nums">
                        •••• 8912
                      </span>
                    </div>
                  </div>
                  <span className="text-caption text-moss-500">Active</span>
                </div>

                {methodAdded && (
                  <div className="p-3.5 border border-deep-600 rounded-sm bg-deep-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-sm bg-white border border-deep-200 flex items-center justify-center text-deep-700">
                        <Wallet size={16} />
                      </div>
                      <div>
                        <strong className="text-small font-bold text-moss-900 block">
                          Bank Account
                        </strong>
                        <span className="text-caption text-deep-700 tabular-nums">
                          •••• 7741
                        </span>
                      </div>
                    </div>
                    <span className="text-caption bg-deep-100 text-deep-700 px-2 py-0.5 rounded-sm">
                      Verified
                    </span>
                  </div>
                )}
              </div>

              <p className="text-caption text-moss-500 mt-4 leading-normal">
                Account numbers are masked according to our privacy contract.
                Full credentials never appear in public UI.
              </p>
            </Card>
          </div>
        </div>

        {/* Modal: Client Fund Escrow Flow */}
        <Modal
          open={fundingModalOpen}
          onClose={() => setFundingModalOpen(false)}
          title="Deposit funds into escrow"
        >
          {fundingState === 'processing' ? (
            <div className="py-8 text-center space-y-3">
              <RefreshCw
                size={36}
                className="animate-spin text-deep-600 mx-auto"
              />
              <p className="text-small font-medium text-moss-800">
                Contacting payment gateway to reserve funds in escrow…
              </p>
            </div>
          ) : fundingState === 'success' ? (
            <div className="py-8 text-center space-y-3">
              <CheckCircle2 size={36} className="text-deep-600 mx-auto" />
              <p className="text-lead font-bold text-moss-900">
                Deposit confirmed and held in escrow!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-small font-medium text-moss-700 mb-1">
                  Amount to deposit (BDT ৳)
                </label>
                <input
                  type="number"
                  value={fundAmount}
                  onChange={(e) => setFundAmount(e.target.value)}
                  className="w-full min-h-[44px] px-3.5 bg-white border border-moss-200 rounded-sm font-bold text-moss-900 focus:outline-none focus:border-deep-600 font-variant-numeric tabular-nums"
                />
              </div>

              <div>
                <label className="block text-small font-medium text-moss-700 mb-1">
                  Select payment gateway method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['bKash', 'Nagad'] as const).map((m) => (
                    <div
                      key={m}
                      onClick={() => setFundMethod(m)}
                      className={`p-3.5 rounded-sm border cursor-pointer flex items-center justify-between ${
                        fundMethod === m
                          ? 'border-deep-600 bg-deep-50'
                          : 'border-moss-200'
                      }`}
                    >
                      <span className="font-bold text-moss-900">{m}</span>
                      {fundMethod === m && (
                        <CheckCircle2 size={16} className="text-deep-600" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-moss-100">
                <Button
                  variant="secondary"
                  onClick={() => setFundingModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleSimulateFunding}>
                  Deposit ৳
                  {Number(fundAmount).toLocaleString(
                    document.documentElement.lang === 'bn' ? 'bn-BD' : 'en-BD',
                  )}
                </Button>
              </div>
            </div>
          )}
        </Modal>

        {/* Modal: Provider Request Payout */}
        <Modal
          open={payoutModalOpen}
          onClose={() => setPayoutModalOpen(false)}
          title="Withdraw available earnings"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-small font-medium text-moss-700 mb-1">
                Payout amount (BDT ৳)
              </label>
              <input
                type="number"
                value={payoutAmount}
                onChange={(e) => setPayoutAmount(e.target.value)}
                className="w-full min-h-[44px] px-3.5 bg-white border border-moss-200 rounded-sm font-bold text-moss-900 focus:outline-none focus:border-deep-600 font-variant-numeric tabular-nums"
              />
            </div>

            <div>
              <label className="block text-small font-medium text-moss-700 mb-1">
                Transfer to verified account
              </label>
              <div className="p-3 border border-moss-200 rounded-sm bg-mist text-small font-medium text-moss-900 flex justify-between">
                <span>bKash Wallet</span>
                <span className="tabular-nums text-moss-500">
                  •••• {account.last4}
                </span>
              </div>
            </div>

            <p className="text-caption text-moss-500">
              Instant mobile wallet transfer. No withdrawal fees applied on
              regular payouts.
            </p>

            <div className="flex justify-end gap-3 pt-3 border-t border-moss-100">
              <Button
                variant="secondary"
                onClick={() => setPayoutModalOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" onClick={handleRequestPayout}>
                Confirm transfer
              </Button>
            </div>
          </div>
        </Modal>

        {/* Modal: Add Payment Method */}
        <Modal
          open={addMethodModalOpen}
          onClose={() => setAddMethodModalOpen(false)}
          title="Link new wallet or bank account"
        >
          <div className="space-y-4">
            <Select
              label="Account type"
              options={[
                { value: 'bkash', label: 'bKash Mobile Wallet' },
                { value: 'nagad', label: 'Nagad Mobile Wallet' },
                { value: 'bank', label: 'Bangladesh Bank Transfer' },
              ]}
            />
            <PhoneInput
              value={newMethodPhone}
              onChange={setNewMethodPhone}
              label="Mobile / Account number"
            />
            <div>
              <label className="block text-small font-medium text-moss-700 mb-1">
                SMS verification code (use 123456)
              </label>
              <OtpInput value={newMethodOtp} onChange={setNewMethodOtp} />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-moss-100">
              <Button
                variant="secondary"
                onClick={() => setAddMethodModalOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" onClick={handleAddPaymentMethod}>
                Verify & save account
              </Button>
            </div>
          </div>
        </Modal>
      </LayoutContainer>
    </div>
  );
}
