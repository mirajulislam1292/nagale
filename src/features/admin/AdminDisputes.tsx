import { useState } from 'react';
import { Scale, ShieldCheck, ChevronRight, CheckCircle2 } from 'lucide-react';
import { LayoutContainer } from '../../components/layout/LayoutContainer';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { MoneyInput } from '../../components/ui/Input';
import { useMarket, useApp, useCopy, useMoney } from '../../app/context';
import { reviewCase } from '../../api/marketplace';

export function AdminDisputes() {
  const { orders, providers } = useMarket();
  const { notify } = useApp();
  const c = useCopy();
  const money = useMoney();

  // Pick or synthesize dispute orders
  const disputeOrders = orders.filter(
    (o) => o.status === 'disputed' || o.id === 'ord-1042',
  );
  const activeList =
    disputeOrders.length > 0 ? disputeOrders : orders.slice(0, 2);

  const [selectedOrderId, setSelectedOrderId] = useState<string>(
    activeList[0]?.id ?? '',
  );
  const selectedOrder =
    activeList.find((o) => o.id === selectedOrderId) ?? activeList[0];

  const provider =
    providers.find((p) => p.id === selectedOrder?.providerId) ?? providers[0];

  const totalHeld = selectedOrder ? selectedOrder.price : 2000;
  const [clientRefund, setClientRefund] = useState<number>(
    Math.round(totalHeld * 0.5),
  );
  const [providerPayout, setProviderPayout] = useState<number>(
    Math.round(totalHeld * 0.5),
  );
  const [submitting, setSubmitting] = useState(false);

  const handleRecordDecision = async (e: React.FormEvent) => {
    e.preventDefault();

    if (clientRefund + providerPayout !== totalHeld) {
      notify(
        c(
          `The split amounts must equal total escrow of ${money(totalHeld)}`,
          `উভয় অংশের যোগফল অবশ্যই মোট এসক্রো ${money(totalHeld)} এর সমান হতে হবে`,
        ),
      );
      return;
    }

    setSubmitting(true);
    try {
      await reviewCase(
        selectedOrder ? selectedOrder.id : 'ord-dispute',
        `Dispute resolved: Client refunded ৳${clientRefund}, Provider paid ৳${providerPayout}`,
      );
      notify(
        c(
          'Dispute verdict recorded and escrow balance released.',
          'বিরোধ নিষ্পত্তি সম্পন্ন হয়েছে এবং এসক্রো অর্থ বণ্টন করা হয়েছে।',
        ),
      );
    } catch {
      notify('Failed to record verdict.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full py-8">
      <LayoutContainer variant="app">
        {/* Header */}
        <div className="pb-4 mb-6 border-b border-moss-200">
          <div className="flex items-center gap-2 mb-1">
            <Scale size={20} className="text-amber-600" />
            <h1 className="text-h3 font-bold text-moss-900 tracking-tight">
              {c('Dispute Adjudication', 'বিরোধ নিষ্পত্তি বোর্ড')}
            </h1>
          </div>
          <p className="text-small text-moss-600">
            {c(
              'Impartial mediation between client and provider based on brief scope and delivery timestamps.',
              'চুক্তির পরিধি ও ডেলিভারি সময়রেখার ভিত্তিতে ক্লায়েন্ট ও প্রোভাইডারের মধ্যে নিরপেক্ষ মধ্যস্থতা।',
            )}
          </p>
        </div>

        {/* 2-Pane Disputes Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Panel: Dispute Cases List (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-md border border-moss-200 shadow-e1 overflow-hidden">
            <div className="p-3.5 bg-mist border-b border-moss-200 flex justify-between items-center text-caption font-bold text-moss-700">
              <span>{c('DISPUTED ORDERS', 'বিরোধপূর্ণ অর্ডারসমূহ')}</span>
              <span className="font-variant-numeric tabular-nums">
                {activeList.length}
              </span>
            </div>

            <div className="divide-y divide-moss-100">
              {activeList.map((ord) => {
                const isSelected = ord.id === selectedOrderId;
                const pr =
                  providers.find((p) => p.id === ord.providerId) ??
                  providers[0];
                return (
                  <div
                    key={ord.id}
                    onClick={() => {
                      setSelectedOrderId(ord.id);
                      setClientRefund(Math.round(ord.price * 0.5));
                      setProviderPayout(Math.round(ord.price * 0.5));
                    }}
                    className={`p-4 cursor-pointer transition-colors flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-deep-50/70 border-l-4 border-l-deep-600'
                        : 'hover:bg-mist/40'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <strong className="text-small font-bold text-moss-900 truncate">
                          {ord.title}
                        </strong>
                      </div>
                      <p className="text-caption text-moss-600 truncate">
                        {c('Client', 'ক্লায়েন্ট')}: Mahim Rahman ·{' '}
                        {c('Provider', 'প্রোভাইডার')}: {pr?.name}
                      </p>
                      <p className="text-caption font-bold text-deep-700 font-variant-numeric tabular-nums mt-1">
                        {money(ord.price)} {c('in escrow', 'এসক্রোতে')}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Badge tone="warning">
                        {c('Under Review', 'পর্যালোচনাধীন')}
                      </Badge>
                      <ChevronRight size={16} className="text-moss-400" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Panel: Selected Case Evidence & Split Decision (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {selectedOrder ? (
              <Card variant="flat" className="space-y-6">
                <div>
                  <span className="text-caption font-mono text-moss-400 uppercase tracking-wider block mb-1">
                    {selectedOrder.id}
                  </span>
                  <h2 className="text-h4 font-bold text-moss-900">
                    {selectedOrder.title}
                  </h2>
                </div>

                {/* AI Summary Panel */}
                <div className="bg-moss-900 text-white p-4 rounded-sm text-small space-y-1.5 shadow-e1">
                  <div className="flex items-center gap-2 text-mint-300 font-bold text-caption uppercase tracking-wider">
                    <ShieldCheck size={14} />
                    <span>
                      {c(
                        'AI Timeline & Scope Synthesis',
                        'এআই সময়রেখা ও পরিধি বিশ্লেষণ',
                      )}
                    </span>
                  </div>
                  <p className="text-moss-100 text-caption leading-relaxed">
                    {c(
                      'Client claims the logo export files were delivered 48 hours late without requested SVG vector format. Provider submitted valid high-res PNG proofs and responded within 4 hours. Evidence suggests partial delivery with technical omissions.',
                      'ক্লায়েন্ট অভিযোগ করেছেন এসভিজি ভেক্টর ফাইল ছাড়াই ৪৮ ঘণ্টা দেরিতে ফাইল পাঠানো হয়েছে। প্রোভাইডার উচ্চ রেজোলিউশনের পিএনজি ফাইল প্রদান করেছেন এবং ৪ ঘণ্টার মধ্যে প্রতিক্রিয়া জানিয়েছেন। পর্যালোচনায় আংশিক সরবরাহ ও প্রযুক্তিগত ত্রুটি দৃশ্যমান।',
                    )}
                  </p>
                </div>

                {/* Side-by-side arguments */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-small">
                  <div className="p-3.5 bg-mist rounded-sm border border-moss-200">
                    <span className="text-caption font-bold text-moss-500 uppercase tracking-wider block mb-1">
                      {c(
                        'Client Position (Mahim Rahman)',
                        'ক্লায়েন্টের বক্তব্য (মাহিম রহমান)',
                      )}
                    </span>
                    <p className="text-moss-700 text-caption">
                      {c(
                        '"We agreed on vector SVG source files in the brief. Only raster PNGs were provided and the designer stopped answering my vector requests."',
                        '"চুক্তিতে এসভিজি ভেক্টর সোর্স ফাইল দেওয়ার কথা ছিল। কিন্তু শুধু পিএনজি দেওয়া হয়েছে এবং পরবর্তীতে মেসেজের কোনো সন্তোষজনক উত্তর মেলেনি।"',
                      )}
                    </p>
                  </div>

                  <div className="p-3.5 bg-mist rounded-sm border border-moss-200">
                    <span className="text-caption font-bold text-moss-500 uppercase tracking-wider block mb-1">
                      {c(
                        `Provider Position (${provider?.name})`,
                        `প্রোভাইডারের বক্তব্য (${provider?.name})`,
                      )}
                    </span>
                    <p className="text-moss-700 text-caption">
                      {c(
                        '"I spent 6 hours producing 3 distinct concepts that were approved in chat. The SVG export encountered software errors, which I offered to send via email."',
                        '"আমি চ্যাটে অনুমোদিত ৩টি পৃথক কনসেপ্ট তৈরিতে ৬ ঘণ্টা ব্যয় করেছি। এসভিজি ফাইলে প্রযুক্তিগত সমস্যা হয়েছিল, যা ইমেইলে পাঠাতে চেয়েছিলাম।"',
                      )}
                    </p>
                  </div>
                </div>

                {/* Decision Form: Split Funds */}
                <form
                  onSubmit={handleRecordDecision}
                  className="space-y-4 pt-4 border-t border-moss-100"
                >
                  <h3 className="text-small font-bold text-moss-900 uppercase tracking-wider">
                    {c('Apportion Escrow Funds', 'এসক্রো অর্থ বণ্টন')}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <MoneyInput
                      label={c('Refund to Client', 'ক্লায়েন্টকে রিফান্ড')}
                      value={clientRefund}
                      onChange={(v) => {
                        setClientRefund(v);
                        setProviderPayout(Math.max(0, totalHeld - v));
                      }}
                    />
                    <MoneyInput
                      label={c('Payout to Provider', 'প্রোভাইডারকে পেমেন্ট')}
                      value={providerPayout}
                      onChange={(v) => {
                        setProviderPayout(v);
                        setClientRefund(Math.max(0, totalHeld - v));
                      }}
                    />
                  </div>

                  <div className="flex justify-between items-center text-caption p-2.5 bg-moss-50 rounded-sm">
                    <span className="text-moss-600">
                      {c('Total escrow held:', 'মোট সংরক্ষিত এসক্রো:')}{' '}
                      <strong>{money(totalHeld)}</strong>
                    </span>
                    <span className="font-bold text-deep-700 font-variant-numeric tabular-nums">
                      {c('Sum:', 'যোগফল:')}{' '}
                      {money(clientRefund + providerPayout)}
                    </span>
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={submitting}
                    >
                      {submitting
                        ? c('Recording verdict…', 'রায় সংরক্ষিত হচ্ছে…')
                        : c(
                            'Record binding dispute verdict',
                            'চূড়ান্ত বিরোধ রায় কার্যকর করুন',
                          )}
                    </Button>
                  </div>
                </form>
              </Card>
            ) : (
              <Card variant="flat" className="p-8 text-center text-moss-500">
                <CheckCircle2 size={32} className="mx-auto mb-2 opacity-40" />
                <p className="text-small font-medium">
                  {c(
                    'Select a dispute case to mediate.',
                    'মধ্যস্থতার জন্য তালিকা থেকে কেস নির্বাচন করুন।',
                  )}
                </p>
              </Card>
            )}
          </div>
        </div>
      </LayoutContainer>
    </div>
  );
}
