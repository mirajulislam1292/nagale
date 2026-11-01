import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  ShieldAlert,
} from 'lucide-react';
import { LayoutContainer } from '../../components/layout/LayoutContainer';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Textarea, SegmentedControl } from '../../components/ui/Input';
import { FileDropzone } from '../../components/ui/FileDropzone';
import { EscrowSummary } from '../../components/ui/MarketplaceComponents';
import { useMarket, useApp, useCopy } from '../../app/context';
import { actOnOrder } from '../../api/marketplace';

export function DisputePage() {
  const { orderId } = useParams<{ orderId: string }>();
  const { orders } = useMarket();
  const { role, notify } = useApp();
  const c = useCopy();

  const order = orders.find((o) => o.id === orderId) || orders[0];

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [reason, setReason] = useState('Work not delivered');
  const [description, setDescription] = useState('');
  const [additionalContext, setAdditionalContext] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);

  if (!order) {
    return (
      <div className="w-full py-16 text-center">
        <p className="text-moss-600">
          {c('Order not found.', 'অর্ডার পাওয়া যায়নি।')}
        </p>
        <Link
          to={`/${role}`}
          className="text-deep-600 underline mt-2 inline-block"
        >
          {c('Back to dashboard', 'ড্যাশবোর্ডে ফিরে যান')}
        </Link>
      </div>
    );
  }

  const handleStep1Next = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim().length < 50) {
      notify(
        c(
          'Please provide at least 50 characters explaining the issue.',
          'সমস্যাটি বিশদভাবে ব্যাখ্যা করতে অন্তত ৫০টি অক্ষর লিখুন।',
        ),
      );
      return;
    }
    setStep(2);
  };

  const handleDisputeSubmit = async () => {
    setSubmitting(true);
    try {
      if (orderId) {
        await actOnOrder(
          orderId,
          'dispute',
          role,
          `dispute-${Date.now()}`,
          description,
        );
      }
      setStep(3);
      notify(
        c(
          'Dispute initiated. Escrow funds are frozen under review.',
          'বিরোধ প্রক্রিয়া শুরু হয়েছে। এসক্রো অর্থ পর্যালোচনাধীন অবস্থায় স্থগিত রাখা হয়েছে।',
        ),
      );
    } catch {
      notify(
        c(
          'Failed to initiate dispute in demo.',
          'ডেমোতে বিরোধ প্রক্রিয়া শুরু করতে সমস্যা হয়েছে।',
        ),
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full py-8 md:py-12 bg-mist/20 min-h-screen">
      <LayoutContainer variant="app">
        {/* Breadcrumb back */}
        <Link
          to={`/${role}/orders/${order.id}`}
          className="inline-flex items-center gap-1.5 text-small text-moss-500 hover:text-moss-900 mb-6"
        >
          <ArrowLeft size={14} />
          <span>
            {c('Back to order workspace', 'অর্ডার ওয়ার্কস্পেসে ফিরে যান')}
          </span>
        </Link>

        <div className="max-w-2xl mx-auto">
          {/* Progress Header */}
          <div className="mb-6 flex items-center justify-between border-b border-moss-200 pb-4">
            <div>
              <span className="text-caption font-bold text-moss-400 normal-case tracking-wider block">
                {order.title} · #{order.id}
              </span>
              <h1 className="text-h3 font-bold text-moss-900 tracking-tight">
                {c('Order Dispute Resolution', 'অর্ডার বিরোধ নিষ্পত্তি')}
              </h1>
            </div>
            <div className="text-caption text-moss-500 font-medium">
              {c(`Step ${step} of 3`, `ধাপ ৩ এর ${step}`)}
            </div>
          </div>

          {/* STEP 1: Reason and explanation */}
          {step === 1 && (
            <Card variant="flat" className="space-y-6">
              <div className="flex items-start gap-3 p-3.5 bg-amber-50/70 border border-amber-200 rounded-sm text-small text-amber-900">
                <AlertTriangle
                  size={18}
                  className="text-amber-700 shrink-0 mt-0.5"
                />
                <p>
                  {c(
                    'Opening a dispute freezes the escrow payout. Both parties will be asked to present evidence for moderator review.',
                    'বিরোধ শুরু করলে এসক্রো অর্থ স্থগিত হবে। পর্যালোচনার জন্য উভয় পক্ষকে প্রমাণ উপস্থাপনের সুযোগ দেওয়া হবে।',
                  )}
                </p>
              </div>

              <form onSubmit={handleStep1Next} className="space-y-5">
                <div>
                  <label className="block text-small font-bold text-moss-900 mb-2">
                    {c(
                      'Select primary dispute reason',
                      'বিরোধের মূল কারণ নির্বাচন করুন',
                    )}
                  </label>
                  <SegmentedControl
                    options={[
                      {
                        value: 'Work not delivered',
                        label: c('Work not delivered', 'কাজ সরবরাহ করা হয়নি'),
                      },
                      {
                        value: 'Quality not as agreed',
                        label: c('Quality mismatch', 'কাজের মান মিল নেই'),
                      },
                      {
                        value: 'Communication breakdown',
                        label: c('Communication', 'যোগাযোগহীনতা'),
                      },
                      { value: 'Other', label: c('Other', 'অন্যান্য') },
                    ]}
                    value={reason}
                    onChange={setReason}
                  />
                </div>

                <div>
                  <Textarea
                    label={c(
                      'Describe the issue in detail (min 50 characters)',
                      'সমস্যাটি বিস্তারিত লিখুন (কমপক্ষে ৫০ অক্ষর)',
                    )}
                    placeholder={c(
                      'Explain clearly what was agreed in the initial order, what was delivered (if anything), and why resolution was not reached in chat…',
                      'শুরুর অর্ডারে কী চুক্তি ছিল, বাস্তবে কী সরবরাহ করা হয়েছে এবং চ্যাটে সমাধান কেন হয়নি তা পরিষ্কারভাবে লিখুন…',
                    )}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    required
                  />
                  <div className="flex justify-between items-center text-caption mt-1.5">
                    <span
                      className={
                        description.trim().length >= 50
                          ? 'text-deep-600 font-medium'
                          : 'text-moss-400'
                      }
                    >
                      {description.trim().length} / 50{' '}
                      {c('characters minimum', 'অক্ষর ন্যূনতম')}
                    </span>
                    {description.trim().length >= 50 && (
                      <span className="text-deep-700 flex items-center gap-1 font-medium">
                        <CheckCircle2 size={12} />{' '}
                        {c('Valid length', 'যথেষ্ট দৈর্ঘ্য')}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={description.trim().length < 50}
                  >
                    {c('Continue to evidence', 'প্রমাণ যুক্ত করতে এগিয়ে যান')}
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* STEP 2: Supporting Evidence */}
          {step === 2 && (
            <Card variant="flat" className="space-y-6">
              <div>
                <h2 className="text-h4 font-bold text-moss-900 mb-1">
                  {c('Add supporting evidence', 'সহায়ক প্রমাণাদি যুক্ত করুন')}
                </h2>
                <p className="text-small text-moss-600">
                  {c(
                    'Upload screenshots, draft files, or delivery comparisons. Evidence is visible only to the dispute moderator.',
                    'স্ক্রিনশট, ড্রাফট ফাইল বা চ্যাট রেকর্ডের প্রমাণ আপলোড করুন। এই তথ্য শুধুমাত্র বিরোধ সমাধানকারী দেখতে পাবেন।',
                  )}
                </p>
              </div>

              <FileDropzone
                label={c(
                  'Upload screenshots or document files (PDF/Images, max 10MB)',
                  'স্ক্রিনশট বা নথিপত্র আপলোড করুন (পিডিএফ বা ছবি, সর্বোচ্চ ১০ মেগাবাইট)',
                )}
                accept=".pdf,.png,.jpg,.jpeg"
                maxSizeMb={10}
                onFileSelect={(f: File) => setFiles([f])}
              />

              {files.length > 0 && (
                <div className="p-3 bg-moss-50 rounded-sm text-small text-moss-700">
                  <strong>{files.length}</strong>{' '}
                  {c(
                    'files attached as evidence',
                    'টি ফাইল প্রমাণ হিসেবে সংযুক্ত হয়েছে',
                  )}
                </div>
              )}

              <Textarea
                label={c(
                  'Additional notes for the moderator (optional)',
                  'পর্যবেক্ষকের জন্য অতিরিক্ত তথ্য (ঐচ্ছিক)',
                )}
                placeholder={c(
                  'Any specific timestamps or context you would like the team to note…',
                  'যেকোনো নির্দিষ্ট সময় বা তথ্য যা পর্যবেক্ষণ দলের জানা প্রয়োজন…',
                )}
                value={additionalContext}
                onChange={(e) => setAdditionalContext(e.target.value)}
                rows={3}
              />

              <div className="flex items-center justify-between pt-4 border-t border-moss-100">
                <Button
                  type="button"
                  variant="tertiary"
                  onClick={() => setStep(1)}
                >
                  {c('← Back to reason', '← কারণ পরিবর্তনে ফিরুন')}
                </Button>

                <button
                  type="button"
                  disabled={submitting}
                  onClick={handleDisputeSubmit}
                  className="px-5 py-2.5 rounded-sm font-medium text-small bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 transition-colors cursor-pointer"
                >
                  {submitting
                    ? c('Freezing escrow…', 'স্থগিত করা হচ্ছে…')
                    : c('Submit formal dispute', 'আনুষ্ঠানিক বিরোধ দাখিল করুন')}
                </button>
              </div>
            </Card>
          )}

          {/* STEP 3: Dispute Submitted Confirmation */}
          {step === 3 && (
            <div className="space-y-6">
              <Card variant="flat" className="text-center py-8 px-6">
                <div className="w-14 h-14 bg-deep-100 text-deep-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} />
                </div>

                <h2 className="text-h3 font-bold text-moss-900 tracking-tight mb-2">
                  {c('Dispute submitted', 'বিরোধ দাখিল সম্পন্ন হয়েছে')}
                </h2>

                <p className="text-body text-moss-700 max-w-md mx-auto leading-relaxed mb-6">
                  {c(
                    'An AI dispute assistant is analyzing the timeline, chat history, and submitted evidence. A human compliance officer will issue a binding decision within 24–48 hours.',
                    'এআই সহকারী অর্ডারের সময়রেখা, চ্যাট হিস্ট্রি এবং জমাকৃত প্রমাণ বিশ্লেষণ করছে। আগামী ২৪-৪৮ ঘণ্টার মধ্যে একজন দায়িত্বশীল মানব পর্যবেক্ষক চূড়ান্ত রায় প্রদান করবেন।',
                  )}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <Link to={`/${role}/orders/${order.id}`}>
                    <Button variant="secondary">
                      {c(
                        'View order workspace',
                        'অর্ডার ওয়ার্কস্পেসে ফিরে যান',
                      )}
                    </Button>
                  </Link>
                  <Link to={`/${role}/messages`}>
                    <Button variant="tertiary">
                      {c('Open order messages', 'অর্ডার চ্যাট খুলুন')}
                    </Button>
                  </Link>
                </div>
              </Card>

              {/* Escrow Status Summary */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-small font-bold text-moss-800">
                  <ShieldAlert size={16} className="text-amber-600" />
                  <span>
                    {c('Escrow Protection Active', 'এসক্রো নিরাপত্তা সক্রিয়')}
                  </span>
                </div>
                <EscrowSummary amount={order.price} feeRate={0.1} />
              </div>
            </div>
          )}
        </div>
      </LayoutContainer>
    </div>
  );
}
