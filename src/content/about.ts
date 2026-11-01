interface AboutContent {
  headline: string;
  login: string;
  released: string;
  lead: string;
  start: string;
  problemTitle: string;
  problems: string[];
  processTitle: string;
  steps: { title: string; line: string }[];
  trustTitle: string;
  trust: { title: string; line: string }[];
  order: string;
  fee: string;
  net: string;
  providerTitle: string;
  providerFacts: string[];
  providerAction: string;
  why: string;
  showcaseTitle: string;
  sample: string;
  learning: string;
  learnAction: string;
  partnerTitle: string;
  name: string;
  role: string;
  roles: string[];
  message: string;
  send: string;
  sent: string;
  footer: string;
}
const en: AboutContent = {
  headline: 'Describe. Agree. Get it done.',
  login: 'Log in',
  released: 'Payment released',
  lead: 'A shared place for small jobs, clear agreements and protected payments.',
  start: 'Get started',
  problemTitle: 'Small jobs need more trust.',
  problems: [
    'Strangers arrange work without a shared record.',
    'Payment and delivery can feel uncertain.',
    'Decisions get scattered across chats.',
  ],
  processTitle: 'One clear record, start to finish.',
  steps: [
    { title: 'Describe', line: 'Set the outcome, budget and deadline.' },
    {
      title: 'Get matched',
      line: 'Compare relevant people, prices and delivery times.',
    },
    {
      title: 'Pay into escrow',
      line: 'Both accept. Payment stays held during the work.',
    },
    {
      title: 'Approve and release',
      line: 'Review the result before releasing payment.',
    },
  ],
  trustTitle: 'Approval comes before payment release.',
  trust: [
    {
      title: 'Escrow protected',
      line: 'Payment stays held until the agreed work is approved.',
    },
    {
      title: 'Verified providers',
      line: 'Phone and selfie, identity, and skills are separate checks.',
    },
    {
      title: 'Contacts stay masked',
      line: 'Keep decisions and messages inside the order.',
    },
  ],
  order: 'Order value',
  fee: 'Nagale fee',
  net: 'Provider receives',
  providerTitle: 'Put your skills to work.',
  providerFacts: [
    'Bid with your price, work samples and delivery time.',
    'Payout options are designed for bKash and Nagad.',
  ],
  providerAction: 'Become a provider',
  why: 'Why you see this: matches your skills.',
  showcaseTitle: 'Work builds a reputation.',
  sample: 'Sample profiles',
  learning: 'Nagale Learning, coming soon',
  learnAction: 'Explore learning',
  partnerTitle: 'Build with us.',
  name: 'Name',
  role: 'Role',
  roles: ['Partner', 'Investor', 'Community'],
  message: 'Message',
  send: 'Send message',
  sent: 'Message saved in this prototype. No message was sent.',
  footer: 'Interactive prototype. No real payments are processed.',
};
const bn: AboutContent = {
  headline: 'বলুন। সম্মতি দিন। কাজ হোক।',
  login: 'লগইন',
  released: 'পেমেন্ট ছাড়া হয়েছে',
  lead: 'ছোট কাজ, পরিষ্কার চুক্তি ও সুরক্ষিত পেমেন্টের একটি জায়গা।',
  start: 'শুরু করুন',
  problemTitle: 'ছোট কাজেও আস্থা দরকার।',
  problems: [
    'অপরিচিত মানুষের কাজে সিদ্ধান্তের লিখিত রেকর্ড থাকে না।',
    'পেমেন্ট ও ডেলিভারি নিয়ে অনিশ্চয়তা থাকে।',
    'কথাবার্তা বিভিন্ন চ্যাটে ছড়িয়ে যায়।',
  ],
  processTitle: 'শুরু থেকে শেষ, একই রেকর্ডে।',
  steps: [
    { title: 'বিবরণ দিন', line: 'কাজের ফলাফল, বাজেট ও সময় ঠিক করুন।' },
    { title: 'মানুষ খুঁজুন', line: 'প্রাসঙ্গিক মানুষ, দাম ও সময় তুলনা করুন।' },
    {
      title: 'টাকা সুরক্ষিত রাখুন',
      line: 'দুজন সম্মতি দিন। কাজ চলার সময় টাকা রাখা থাকবে।',
    },
    { title: 'অনুমোদন ও পেমেন্ট', line: 'ফলাফল দেখে পেমেন্ট ছাড়ুন।' },
  ],
  trustTitle: 'আগে কাজের অনুমোদন, তারপর পেমেন্ট।',
  trust: [
    {
      title: 'টাকা সুরক্ষিত',
      line: 'সম্মত কাজ অনুমোদন না হওয়া পর্যন্ত টাকা রাখা থাকে।',
    },
    {
      title: 'যাচাই করা সেবাদাতা',
      line: 'ফোন ও সেলফি, পরিচয় এবং দক্ষতা আলাদা করে যাচাই হয়।',
    },
    {
      title: 'যোগাযোগের তথ্য গোপন',
      line: 'সিদ্ধান্ত ও বার্তা অর্ডারের মধ্যেই রাখুন।',
    },
  ],
  order: 'অর্ডারের মূল্য',
  fee: 'নাগালে ফি',
  net: 'সেবাদাতা পান',
  providerTitle: 'আপনার দক্ষতায় কাজ করুন।',
  providerFacts: [
    'নিজের দাম, কাজের নমুনা ও সময় দিয়ে প্রস্তাব দিন।',
    'পেমেন্ট নেওয়ার জন্য bKash ও Nagad-এর ব্যবস্থা থাকবে।',
  ],
  providerAction: 'সেবাদাতা হোন',
  why: 'যে কারণে দেখছেন: আপনার দক্ষতার সঙ্গে মিলে।',
  showcaseTitle: 'কাজেই তৈরি হয় পরিচিতি।',
  sample: 'নমুনা প্রোফাইল',
  learning: 'নাগালে লার্নিং শিগগির আসছে',
  learnAction: 'শেখার বিষয় দেখুন',
  partnerTitle: 'আমাদের সঙ্গে গড়ুন।',
  name: 'নাম',
  role: 'ভূমিকা',
  roles: ['অংশীদার', 'বিনিয়োগকারী', 'কমিউনিটি'],
  message: 'বার্তা',
  send: 'বার্তা পাঠান',
  sent: 'এই প্রোটোটাইপে বার্তা রাখা হয়েছে। কাউকে পাঠানো হয়নি।',
  footer: 'ইন্টারঅ্যাকটিভ প্রোটোটাইপ। প্রকৃত পেমেন্ট হয় না।',
};
export const aboutContent = { en, bn };
