import {
  ShieldCheck,
  Lock,
  AlertTriangle,
  FileText,
  CheckCircle2,
} from 'lucide-react';

// Fee breakdown component
export function FeeBreakdown({
  gross,
  rate = 0.1,
  className = '',
}: {
  gross: number;
  rate?: number;
  className?: string;
}) {
  const fee = Math.round(gross * rate);
  const net = gross - fee;

  return (
    <dl className={`text-small divide-y divide-moss-100 ${className}`}>
      <div className="flex justify-between py-2 text-moss-700">
        <dt>Order value (Client pays)</dt>
        <dd className="font-medium font-variant-numeric tabular-nums text-moss-900">
          ৳
          {gross.toLocaleString(
            document.documentElement.lang === 'bn' ? 'bn-BD' : 'en-BD',
          )}
        </dd>
      </div>
      <div className="flex justify-between py-2 text-moss-500">
        <dt>Nagale fee ({rate * 100}%)</dt>
        <dd className="font-variant-numeric tabular-nums">
          ৳
          {fee.toLocaleString(
            document.documentElement.lang === 'bn' ? 'bn-BD' : 'en-BD',
          )}
        </dd>
      </div>
      <div className="flex justify-between py-2 text-moss-900 font-bold">
        <dt>Provider receives</dt>
        <dd className="font-variant-numeric tabular-nums">
          ৳
          {net.toLocaleString(
            document.documentElement.lang === 'bn' ? 'bn-BD' : 'en-BD',
          )}
        </dd>
      </div>
    </dl>
  );
}

// Dark EscrowSummary card: held amount at 40px white, fee breakdown, release rules
export function EscrowSummary({
  amount,
  feeRate = 0.1,
  isBn = false,
  className = '',
}: {
  amount: number;
  feeRate?: number;
  isBn?: boolean;
  className?: string;
}) {
  const fee = Math.round(amount * feeRate);
  const net = amount - fee;

  return (
    <div
      className={`bg-moss-900 text-white rounded-md p-6 sm:p-8 shadow-e1 border border-moss-800 ${className}`}
    >
      <div className="flex items-center gap-2 text-mint-300 text-small font-medium mb-3">
        <Lock size={16} />
        <span>{isBn ? 'এসক্রো সুরক্ষা' : 'Escrow protection'}</span>
      </div>

      <div className="text-caption text-moss-300 mb-1">
        {isBn ? 'সুরক্ষিত মোট পরিমাণ' : 'Total held in escrow'}
      </div>
      <div className="text-[40px] font-bold leading-tight tracking-tight text-white font-variant-numeric tabular-nums mb-6">
        ৳
        {amount.toLocaleString(
          document.documentElement.lang === 'bn' ? 'bn-BD' : 'en-BD',
        )}
      </div>

      <div className="border-t border-moss-700/80 pt-4 mb-6">
        <div className="flex justify-between text-small text-moss-300 mb-2">
          <span>{isBn ? 'অর্ডারের মূল্য' : 'Agreed order value'}</span>
          <span className="text-white font-medium font-variant-numeric tabular-nums">
            ৳
            {amount.toLocaleString(
              document.documentElement.lang === 'bn' ? 'bn-BD' : 'en-BD',
            )}
          </span>
        </div>
        <div className="flex justify-between text-small text-moss-300 mb-2">
          <span>
            {isBn ? 'নাগালে সার্ভিস ফি (১০%)' : 'Platform service fee (10%)'}
          </span>
          <span className="text-white font-variant-numeric tabular-nums">
            ৳
            {fee.toLocaleString(
              document.documentElement.lang === 'bn' ? 'bn-BD' : 'en-BD',
            )}
          </span>
        </div>
        <div className="flex justify-between text-small text-mint-300 font-medium pt-2 border-t border-moss-700/50">
          <span>
            {isBn
              ? 'অনুমোদনের পর সেবাদাতা পাবেন'
              : 'Provider payout on approval'}
          </span>
          <span className="font-bold font-variant-numeric tabular-nums">
            ৳
            {net.toLocaleString(
              document.documentElement.lang === 'bn' ? 'bn-BD' : 'en-BD',
            )}
          </span>
        </div>
      </div>

      <div className="flex items-start gap-2.5 text-caption text-moss-300 bg-moss-800/80 p-3 rounded-sm border border-moss-700/50">
        <ShieldCheck size={16} className="text-mint-300 shrink-0 mt-0.5" />
        <p>
          {isBn
            ? 'কাজ সম্পন্ন ও ক্লায়েন্ট অনুমোদন না করা পর্যন্ত টাকা নিরাপদে সংরক্ষিত থাকে।'
            : 'Funds are held securely until you inspect the delivery and confirm your approval.'}
        </p>
      </div>
    </div>
  );
}

// DeliveryPreview with repeating "Nagale preview" watermark, no download allowed until approved
export function DeliveryPreview({
  title = 'Delivered draft',
  notes,
  filename,
  isApproved = false,
  className = '',
}: {
  title?: string;
  notes?: string;
  filename?: string;
  isApproved?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`border border-moss-200 rounded-md overflow-hidden bg-white ${className}`}
    >
      {/* Header */}
      <div className="p-4 bg-mist border-b border-moss-200 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <FileText size={20} className="text-deep-600" />
          <span className="text-small font-bold text-moss-900">{title}</span>
        </div>
        <span
          className={`text-caption px-2.5 py-1 rounded-sm font-medium ${
            isApproved
              ? 'bg-deep-100 text-deep-700'
              : 'bg-moss-200 text-moss-700'
          }`}
        >
          {isApproved ? 'Approved & Ready' : 'Watermarked Preview'}
        </span>
      </div>

      {/* Watermarked Preview Area */}
      <div className="relative p-6 sm:p-10 min-h-[220px] bg-white flex flex-col justify-center items-center overflow-hidden select-none">
        {/* Repeating Watermark Overlay if not yet approved */}
        {!isApproved && (
          <div
            className="absolute inset-0 pointer-events-none delivery-watermark"
            aria-hidden="true"
          />
        )}

        {/* Content mock */}
        <div className="relative z-10 w-full max-w-md p-5 bg-mist/60 border border-moss-100 rounded-sm">
          <div className="flex items-center gap-2.5 mb-2">
            <CheckCircle2 size={18} className="text-deep-600" />
            <strong className="text-small text-moss-900">
              {filename || 'Delivery_Handover_v1.pdf'}
            </strong>
          </div>
          {notes && (
            <p className="text-small text-moss-700 leading-relaxed italic">
              "{notes}"
            </p>
          )}
        </div>

        {!isApproved && (
          <p className="relative z-10 text-caption text-moss-500 mt-4">
            Protected preview. Direct downloads unlock upon final approval and
            payment release.
          </p>
        )}
      </div>
    </div>
  );
}

// Masking notice states: nudge, warning, soft block
export function MaskingNotice({
  state,
  onEdit,
}: {
  state: 'nudge' | 'warning' | 'soft-block';
  onEdit?: () => void;
}) {
  const content = {
    nudge: {
      tone: 'bg-moss-100 border-moss-200 text-moss-800',
      icon: <ShieldCheck size={18} className="text-deep-600 shrink-0" />,
      title: 'Keep messages on Nagale',
      body: 'Phone numbers, email addresses and links are hidden to protect both parties and ensure your order record remains safe.',
    },
    warning: {
      tone: 'bg-[#FBF3E0] border-[#F3E2BD] text-[#7A5200]',
      icon: <AlertTriangle size={18} className="shrink-0" />,
      title: 'Communication warning',
      body: 'Repeated attempts to exchange contact details outside Nagale can restrict account privileges.',
    },
    'soft-block': {
      tone: 'bg-[#FBECEA] border-[#F5D2CD] text-[#9A2F2F]',
      icon: <AlertTriangle size={18} className="shrink-0" />,
      title: 'Message held for review',
      body: 'This message cannot be sent because contact details were detected. Please remove them to proceed.',
    },
  }[state];

  return (
    <div
      role="alert"
      className={`p-3.5 rounded-sm border flex items-start gap-3 my-2 text-small ${content.tone}`}
    >
      <div className="mt-0.5">{content.icon}</div>
      <div className="flex-1">
        <strong className="block font-medium mb-0.5">{content.title}</strong>
        <p className="text-caption opacity-90">{content.body}</p>
        {state === 'soft-block' && onEdit && (
          <button
            type="button"
            onClick={onEdit}
            className="mt-2 text-caption font-bold underline"
          >
            Edit message
          </button>
        )}
      </div>
    </div>
  );
}

// MaskedChip
export function MaskedChip({ label = 'contact hidden' }: { label?: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-sm text-caption bg-moss-200/80 text-moss-700 tabular-nums select-none">
      [{label}]
    </span>
  );
}
