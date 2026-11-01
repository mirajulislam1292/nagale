// Additive bilingual keys shared by all presentation components.
const copy = {
  en: {
    accepted: 'Accepted',
    escrow_funded: 'Funded',
    details_unlocked: 'In progress',
    delivered: 'Delivered',
    review: 'In review',
    completed: 'Completed',
    disputed: 'Disputed',
    open: 'Open',
    closed: 'Closed',
    in_progress: 'In progress',
    proposal_one: '{{count}} proposal',
    proposal_other: '{{count}} proposals',
  },
  bn: {
    accepted: 'গৃহীত',
    escrow_funded: 'অর্থ জমা',
    details_unlocked: 'চলমান',
    delivered: 'জমা হয়েছে',
    review: 'পর্যালোচনায়',
    completed: 'সম্পন্ন',
    disputed: 'বিরোধে',
    open: 'খোলা',
    closed: 'বন্ধ',
    in_progress: 'চলমান',
    proposal_one: '{{count}}টি প্রস্তাব',
    proposal_other: '{{count}}টি প্রস্তাব',
  },
};
export function formatNumber(
  value: number,
  bn = typeof document !== 'undefined' &&
    document.documentElement.lang === 'bn',
) {
  return new Intl.NumberFormat(bn ? 'bn-BD' : 'en-BD', {
    maximumFractionDigits: 0,
  }).format(value);
}
export function formatBDT(
  value: number,
  bn = typeof document !== 'undefined' &&
    document.documentElement.lang === 'bn',
) {
  return `৳${formatNumber(value, bn)}`;
}
export function formatDate(
  value: string,
  bn = typeof document !== 'undefined' &&
    document.documentElement.lang === 'bn',
  year = false,
) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat(bn ? 'bn-BD' : 'en-GB', {
    day: 'numeric',
    month: 'short',
    ...(year ? ({ year: 'numeric' } as const) : {}),
    timeZone: 'Asia/Dhaka',
  }).format(date);
}
export function statusLabel(
  status: string,
  bn = typeof document !== 'undefined' &&
    document.documentElement.lang === 'bn',
) {
  const dictionary = copy[bn ? 'bn' : 'en'];
  return (
    dictionary[status as keyof typeof dictionary] ??
    (bn ? 'অপেক্ষমাণ' : 'Pending')
  );
}
export function proposalCount(
  count: number,
  bn = typeof document !== 'undefined' &&
    document.documentElement.lang === 'bn',
) {
  return copy[bn ? 'bn' : 'en'][
    count === 1 ? 'proposal_one' : 'proposal_other'
  ].replace('{{count}}', formatNumber(count, bn));
}
export function humanBriefId(id: string) {
  const n = Number(id.replace(/^g/, ''));
  return Number.isFinite(n) ? `B-${2030 + n}` : 'New brief';
}
