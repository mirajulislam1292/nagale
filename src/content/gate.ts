const en = {
  headline: 'Work safely. Get it done.',
  login: 'Log in',
  continue: 'Continue',
  create: 'Create account',
  about: 'About',
  need: 'Describe a task',
  post: 'Post this job',
  example: 'Example',
  empty: 'Your brief appears here',
  unknown: 'Needs more detail',
  budget: 'Budget',
  delivery: 'Delivery',
  choose: 'Choose proposal',
  held: 'held until you approve',
  digital: 'Digital',
  local: 'Local',
  phone: 'Mobile number',
  invalid: 'Enter an 11-digit mobile number.',
  lite: 'Lite mode',
  cv: 'Write my CV',
  web: 'Shop website',
  tutor: 'Maths tutor',
  photo: 'Photographer',
  visa: 'Visa help',
  trust: 'Trust',
  fees: 'Fees',
  learning: 'Learning',
  support: 'Support',
  terms: 'Terms',
  privacy: 'Privacy',
  days: 'days',
};
const bn: Record<keyof typeof en, string> = {
  headline: 'কাজ হোক নিশ্চিন্তে।',
  login: 'লগইন',
  continue: 'এগিয়ে যান',
  create: 'অ্যাকাউন্ট খুলুন',
  about: 'পরিচিতি',
  need: 'কাজের বিবরণ দিন',
  post: 'কাজ পোস্ট করুন',
  example: 'উদাহরণ',
  empty: 'বিবরণ এখানে দেখা যাবে',
  unknown: 'আরও বিস্তারিত বলুন',
  budget: 'বাজেট',
  delivery: 'ডেলিভারি',
  choose: 'প্রস্তাব বাছুন',
  held: 'আপনার অনুমোদন পর্যন্ত সুরক্ষিত',
  digital: 'ডিজিটাল',
  local: 'স্থানীয়',
  phone: 'মোবাইল নম্বর',
  invalid: '১১ অঙ্কের মোবাইল নম্বর দিন।',
  lite: 'লাইট মোড',
  cv: 'সিভি লিখুন',
  web: 'দোকানের ওয়েবসাইট',
  tutor: 'গণিত টিউশন',
  photo: 'ফটোগ্রাফার',
  visa: 'ভিসায় সাহায্য',
  trust: 'আস্থা',
  fees: 'ফি',
  learning: 'শেখা',
  support: 'সহায়তা',
  terms: 'শর্তাবলি',
  privacy: 'গোপনীয়তা',
  days: 'দিন',
};
export const gateContent = { en, bn };
export type GateKey = keyof typeof en;

export const gateRoles = {
  en: [
    {
      headline: 'Get it done. Pay safely.',
      subtext:
        'Find the right person. Agree on the work. Release payment when you approve.',
    },
    {
      headline: 'Use your skill. Get paid.',
      subtext:
        'Find work that fits you. Agree on the price. Get paid for what you deliver.',
    },
  ],
  bn: [
    {
      headline: 'কাজ হবে। টাকা থাকবে নিরাপদ।',
      subtext:
        'উপযুক্ত মানুষ খুঁজুন। কাজের শর্ত ঠিক করুন। অনুমোদনের পর টাকা ছাড়ুন।',
    },
    {
      headline: 'দক্ষতা কাজে লাগান। আয় করুন।',
      subtext:
        'আপনার উপযুক্ত কাজ খুঁজুন। পারিশ্রমিক ঠিক করুন। কাজ বুঝিয়ে দিয়ে টাকা পান।',
    },
  ],
} as const;
