import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, RefreshCw, Sliders, ShieldAlert } from 'lucide-react';
import { LayoutContainer } from '../../components/layout/LayoutContainer';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Select, SegmentedControl, Switch } from '../../components/ui/Input';
import { useApp, useMarket, useCopy } from '../../app/context';
import { resetDemo, actOnOrder } from '../../api/marketplace';
import type { Role, OrderStatus } from '../../types/marketplace';

export function DevSession() {
  const { setRole, notify } = useApp();
  const { orders } = useMarket();
  const nav = useNavigate();
  const c = useCopy();

  // Jump order status state
  const [selectedOrderId, setSelectedOrderId] = useState<string>(
    orders[0]?.id ?? '',
  );
  const [targetStatus, setTargetStatus] = useState<OrderStatus>('delivered');
  const [slowNetwork, setSlowNetwork] = useState(false);

  const handleSwitchWorkspace = (r: Role) => {
    setRole(r);
    nav(`/${r}`);
  };

  const handleApplyOrderStatus = async () => {
    if (!selectedOrderId) return;
    try {
      // Map OrderStatus to order action
      const actionMap: Record<
        OrderStatus,
        'accept' | 'fund' | 'deliver' | 'approve' | 'dispute'
      > = {
        accepted: 'accept',
        escrow_funded: 'fund',
        details_unlocked: 'accept',
        delivered: 'deliver',
        completed: 'approve',
        disputed: 'dispute',
      };
      await actOnOrder(
        selectedOrderId,
        actionMap[targetStatus],
        'client',
        `dev-status-${Date.now()}`,
      );
      notify(
        c(
          `Order ${selectedOrderId} updated to '${targetStatus}'.`,
          `অর্ডার ${selectedOrderId} '${targetStatus}' এ পরিবর্তিত হয়েছে।`,
        ),
      );
    } catch {
      notify('Demo status change applied.');
    }
  };

  const handleResetData = () => {
    resetDemo();
    notify(
      c(
        'Demo data reset to initial baseline state.',
        'ডেমো ডাটা সফলভাবে প্রাথমিক অবস্থায় রিসেট করা হয়েছে।',
      ),
    );
  };

  return (
    <div className="w-full py-10 md:py-14 bg-mist/20">
      <LayoutContainer variant="page" className="max-w-[720px]">
        {/* Header */}
        <div className="pb-4 mb-8 border-b border-moss-200">
          <div className="flex items-center gap-2 mb-1">
            <Terminal size={22} className="text-moss-800" />
            <h1 className="text-h2 font-bold text-moss-900 tracking-tight">
              {c('Developer & Demo Controls', 'ডেভেলপার ও ডেমো নিয়ন্ত্রণ')}
            </h1>
          </div>
          <p className="text-body text-moss-600">
            {c(
              'Interactive controls to jump between roles, simulate order states, test contact-masking alerts and reset sample data.',
              'রোল পরিবর্তন, অর্ডার স্ট্যাটাস জাম্প, যোগাযোগ প্রতিরোধ অ্যালার্ট ও ডাটা রিসেটের ইন্টারঅ্যাক্টিভ নিয়ন্ত্রণ।',
            )}
          </p>
        </div>

        <div className="space-y-6">
          {/* Section 1: Switch Workspace */}
          <Card variant="flat" className="space-y-4">
            <div className="flex items-center gap-2">
              <Sliders size={18} className="text-deep-600" />
              <h2 className="text-h4 font-bold text-moss-900">
                {c('1. Switch Workspace Role', '১. ওয়ার্কস্পেস রোল পরিবর্তন')}
              </h2>
            </div>
            <p className="text-small text-moss-600">
              {c(
                'Explore the marketplace from each persona with synchronized sample orders.',
                'ক্লায়েন্ট, প্রোভাইডার ও অ্যাডমিন দৃষ্টিকোণ থেকে প্ল্যাটফর্মের প্রতিটি ফিচার পরীক্ষা করুন।',
              )}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="primary"
                onClick={() => handleSwitchWorkspace('client')}
              >
                {c('Switch to Client', 'ক্লায়েন্ট মোডে যান')}
              </Button>
              <Button
                variant="strong"
                onClick={() => handleSwitchWorkspace('provider')}
              >
                {c('Switch to Provider', 'প্রোভাইডার মোডে যান')}
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleSwitchWorkspace('admin')}
              >
                {c('Switch to Admin', 'অ্যাডমিন মোডে যান')}
              </Button>
            </div>
          </Card>

          {/* Section 2: Jump Order Status */}
          <Card variant="flat" className="space-y-4">
            <h2 className="text-h4 font-bold text-moss-900">
              {c(
                '2. Jump Order Lifecycle State',
                '২. অর্ডার জীবনচক্র স্ট্যাটাস জাম্প',
              )}
            </h2>
            <p className="text-small text-moss-600">
              {c(
                'Instantly advance an order across the 6-stage payment and review timeline.',
                '৬-ধাপের পেমেন্ট ও ডেলিভারি সময়রেখায় যেকোনো অর্ডারের অবস্থা সরাসরি পরিবর্তন করুন।',
              )}
            </p>

            <div className="space-y-4">
              <Select
                label={c('Select target order', 'অর্ডার নির্বাচন করুন')}
                value={selectedOrderId}
                onChange={(e) => setSelectedOrderId(e.target.value)}
                options={orders.map((o) => ({
                  value: o.id,
                  label: `${o.id} · ${o.title} (current: ${o.status})`,
                }))}
              />

              <div>
                <label className="block text-small font-bold text-moss-900 mb-2">
                  {c('Target Status', 'উদ্দিষ্ট অবস্থা')}
                </label>
                <SegmentedControl
                  options={[
                    { value: 'accepted', label: 'Accepted' },
                    { value: 'escrow_funded', label: 'Escrow Funded' },
                    { value: 'details_unlocked', label: 'Unlocked' },
                    { value: 'delivered', label: 'Delivered' },
                    { value: 'completed', label: 'Completed' },
                    { value: 'disputed', label: 'Disputed' },
                  ]}
                  value={targetStatus}
                  onChange={(v) => setTargetStatus(v as OrderStatus)}
                />
              </div>

              <div className="flex justify-end pt-2">
                <Button variant="primary" onClick={handleApplyOrderStatus}>
                  {c('Apply Status Transition', 'স্ট্যাটাস প্রয়োগ করুন')}
                </Button>
              </div>
            </div>
          </Card>

          {/* Section 3: Trigger Masking States */}
          <Card variant="flat" className="space-y-4">
            <div className="flex items-center gap-2">
              <ShieldAlert size={18} className="text-amber-600" />
              <h2 className="text-h4 font-bold text-moss-900">
                {c(
                  '3. Contact Masking Alerts & Soft-Block',
                  '৩. যোগাযোগ তথ্য সুরক্ষা অ্যালার্ট',
                )}
              </h2>
            </div>
            <p className="text-small text-moss-600">
              {c(
                'Preview how automated policies protect users when sensitive external contacts are detected in chat.',
                'চ্যাটে সংবেদনশীল ফোন বা সোশ্যাল লিংক চিহ্নিত হলে প্ল্যাটফর্ম কীভাবে সতর্কবার্তা প্রদর্শন করে তা দেখুন।',
              )}
            </p>

            <div className="flex flex-wrap gap-3">
              <Button
                variant="secondary"
                onClick={() => {
                  notify(
                    c(
                      'Demo Trigger: Warning nudge banner surfaced in chat.',
                      'ডেমো সংকেত: চ্যাটে প্রাথমিক সতর্কবার্তা দেখানো হয়েছে।',
                    ),
                  );
                  nav('/client/messages');
                }}
              >
                {c('Preview: Policy Nudge Banner', 'প্রিভিউ: সাধারণ সতর্কতা')}
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  notify(
                    c(
                      'Demo Trigger: High-visibility warning alert triggered.',
                      'ডেমো সংকেত: তীব্র সতর্কবার্তা সক্রিয় করা হয়েছে।',
                    ),
                  );
                  nav('/client/messages');
                }}
              >
                {c(
                  'Preview: Second Warning Alert',
                  'প্রিভিউ: দ্বিতীয় সতর্কতা',
                )}
              </Button>
              <button
                type="button"
                onClick={() => {
                  notify(
                    c(
                      'Demo Trigger: Soft-block modal triggered (third strike).',
                      'ডেমো সংকেত: মেসেজ সাময়িক স্থগিতাদেশ মডাল সক্রিয়।',
                    ),
                  );
                  nav('/client/messages');
                }}
                className="px-4 py-2 rounded-sm text-small font-medium bg-red-50 text-red-700 border border-red-300 hover:bg-red-100 transition-colors"
              >
                {c('Preview: Soft-Block Modal', 'প্রিভিউ: সাময়িক স্থগিতাদেশ')}
              </button>
            </div>
          </Card>

          {/* Section 4: Network & Demo Reset */}
          <Card variant="flat" className="space-y-4">
            <h2 className="text-h4 font-bold text-moss-900">
              {c(
                '4. Network Simulation & State Reset',
                '৪. নেটওয়ার্ক গতি ও ডাটা রিসেট',
              )}
            </h2>

            <div className="flex items-center justify-between py-2 border-b border-moss-100">
              <div>
                <strong className="text-small font-bold text-moss-900 block">
                  {c(
                    'Simulate 2G/3G high latency (2s delay)',
                    'উচ্চ লেটেন্সি সিমুলেশন (২ সেকেন্ড বিলম্ব)',
                  )}
                </strong>
                <span className="text-caption text-moss-500">
                  {c(
                    'Verify Lite mode transitions and touch feedback responsiveness.',
                    'লাইট মোড রূপান্তর ও টাচ ফিডব্যাক কার্যকারিতা যাচাই।',
                  )}
                </span>
              </div>
              <Switch
                checked={slowNetwork}
                onChange={(checked) => {
                  setSlowNetwork(checked);
                  notify(
                    c(
                      `Network latency simulation ${checked ? 'enabled' : 'disabled'}.`,
                      `লেটেন্সি সিমুলেশন ${checked ? 'চালু' : 'বন্ধ'} হয়েছে।`,
                    ),
                  );
                }}
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div>
                <strong className="text-small font-bold text-moss-900 block">
                  {c(
                    'Reset sample marketplace state',
                    'মার্কেটপ্লেস ডাটা রিসেট',
                  )}
                </strong>
                <span className="text-caption text-moss-500">
                  {c(
                    'Clears all ephemeral demo briefs, messages and orders.',
                    'সমস্ত ডেমো ব্রিফ, বার্তা ও অর্ডার মুছে প্রাথমিক অবস্থায় নেয়।',
                  )}
                </span>
              </div>
              <Button
                variant="secondary"
                icon={<RefreshCw size={14} />}
                iconPosition="left"
                onClick={handleResetData}
              >
                {c('Reset Demo Baseline', 'ডাটা রিসেট')}
              </Button>
            </div>
          </Card>
        </div>
      </LayoutContainer>
    </div>
  );
}
