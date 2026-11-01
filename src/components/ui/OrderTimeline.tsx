import { Check } from 'lucide-react';
import type { OrderStatus } from '../../types/marketplace';

// RULE: 6-step OrderTimeline: Accepted, Escrow funded, Details unlocked, Delivered, Review, Payout.
const ORDER_STEPS = [
  { id: 'accepted', label: 'Accepted', bnLabel: 'সম্মতি' },
  { id: 'escrow_funded', label: 'Escrow funded', bnLabel: 'টাকা সুরক্ষিত' },
  { id: 'details_unlocked', label: 'Details unlocked', bnLabel: 'কাজ শুরু' },
  { id: 'delivered', label: 'Delivered', bnLabel: 'ডেলিভারি' },
  { id: 'review', label: 'Review', bnLabel: 'পর্যালোচনা' },
  { id: 'payout', label: 'Payout', bnLabel: 'পেমেন্ট সম্পন্ন' },
] as const;

function getStepIndex(status: OrderStatus): number {
  switch (status) {
    case 'accepted':
      return 0;
    case 'escrow_funded':
      return 1;
    case 'details_unlocked':
      return 2;
    case 'delivered':
      return 3;
    case 'completed':
      return 5;
    case 'disputed':
      return 3;
    default:
      return 0;
  }
}

export function OrderTimeline({
  status,
  isBn = false,
  className = '',
}: {
  status: OrderStatus;
  isBn?: boolean;
  className?: string;
}) {
  const currentIndex = getStepIndex(status);

  return (
    <nav aria-label="Order progress" className={`w-full py-4 ${className}`}>
      <ol className="flex items-center justify-between gap-1 sm:gap-2">
        {ORDER_STEPS.map((step, index) => {
          const isDone = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <li
              key={step.id}
              className="flex-1 flex flex-col items-center text-center relative"
            >
              {/* Connector line behind */}
              {index > 0 && (
                <div
                  className={`absolute top-3.5 right-1/2 w-full h-[2px] -z-0 transition-colors ${
                    index <= currentIndex ? 'bg-deep-600' : 'bg-moss-200'
                  }`}
                  aria-hidden="true"
                />
              )}

              {/* Step indicator circle */}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-caption font-bold transition-all relative z-10 select-none ${
                  isDone
                    ? 'bg-deep-600 text-white'
                    : isCurrent
                      ? 'bg-mint-500 text-moss-900 ring-4 ring-mint-100'
                      : 'bg-white border-2 border-moss-200 text-moss-400'
                }`}
              >
                {isDone ? (
                  <Check size={14} strokeWidth={2.5} />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>

              {/* Label */}
              <span
                className={`mt-2 text-caption font-medium max-w-[80px] sm:max-w-none truncate ${
                  isCurrent
                    ? 'text-moss-900 font-bold'
                    : isDone
                      ? 'text-moss-700'
                      : 'text-moss-400'
                }`}
              >
                {isBn ? step.bnLabel : step.label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
