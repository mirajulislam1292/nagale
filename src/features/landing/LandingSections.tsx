import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FileText,
  Code2,
  PenTool,
  Languages,
  Camera,
  GraduationCap,
  ClipboardList,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Lock,
  MessageSquare,
  Check,
} from 'lucide-react';
import { LayoutContainer } from '../../components/layout/LayoutContainer';
import { Button } from '../../components/ui/Button';
import { ArcsPattern } from '../../components/ui/ArcsPattern';
import { Avatar, Rating } from '../../components/ui/Avatar';
import { VerifiedBadge } from '../../components/ui/Badge';
import { Card } from '../../components/ui/Card';
import { useCopy, useMarket } from '../../app/context';

// 8 Editorial Categories with specific icons and pricing
const CATEGORIES = [
  {
    id: 'cv',
    nameEn: 'CV & documents',
    nameBn: 'সিভি ও ক্যারিয়ার ডকুমেন্ট',
    icon: FileText,
    from: 500,
  },
  {
    id: 'web',
    nameEn: 'Web development',
    nameBn: 'ওয়েবসাইট ও টেক ডেভেলপমেন্ট',
    icon: Code2,
    from: 8000,
  },
  {
    id: 'design',
    nameEn: 'Design & creative',
    nameBn: 'ডিজাইন ও প্রেজেন্টেশন',
    icon: PenTool,
    from: 1500,
  },
  {
    id: 'translation',
    nameEn: 'Writing & translation',
    nameBn: 'লেখা ও অনুবাদ',
    icon: Languages,
    from: 500,
  },
  {
    id: 'photography',
    nameEn: 'Photography',
    nameBn: 'ফটোগ্রাফি ও মিডিয়া',
    icon: Camera,
    from: 4000,
  },
  {
    id: 'tutoring',
    nameEn: 'Tutoring',
    nameBn: 'পড়াশোনা ও গৃহশিক্ষক',
    icon: GraduationCap,
    from: 3000,
  },
  {
    id: 'admin',
    nameEn: 'Admin & data entry',
    nameBn: 'অ্যাডমিন ও ডেটা এন্ট্রি',
    icon: ClipboardList,
    from: 500,
  },
  {
    id: 'local',
    nameEn: 'Local services',
    nameBn: 'স্থানীয় সমন্বয় সেবা',
    icon: MapPin,
    from: 500,
  },
];

export function CategoriesSection() {
  const c = useCopy();
  const nav = useNavigate();

  const handleSelect = (catName: string) => {
    sessionStorage.setItem('nagale.brief', `Looking for ${catName} help`);
    nav(`/client/new?category=${encodeURIComponent(catName)}`);
  };

  return (
    <section
      id="categories"
      className="w-full bg-mist py-20 border-b border-moss-200"
    >
      <LayoutContainer>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-caption uppercase tracking-wider text-deep-600 font-bold block mb-2">
              {c('Disciplines', 'কাজের ক্ষেত্র')}
            </span>
            <h2 className="text-h2 font-bold text-moss-900 tracking-tight">
              {c(
                'Find help for the job at hand.',
                'আপনার কাজের জন্য সঠিক সহায়তা নিন।',
              )}
            </h2>
          </div>
          <Link
            to="/provider"
            className="inline-flex items-center gap-1.5 text-small font-bold text-deep-600 hover:text-moss-900 group"
          >
            <span>{c('Browse all jobs', 'সব কাজ দেখুন')}</span>
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        {/* 8-category 2-column editorial list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-moss-200 border border-moss-200 rounded-md overflow-hidden">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const name = c(cat.nameEn, cat.nameBn);

            return (
              <div
                key={cat.id}
                onClick={() => handleSelect(cat.nameEn)}
                className="group flex items-center justify-between p-5 sm:p-6 min-h-[72px] bg-white hover:bg-deep-50/40 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-sm bg-mist flex items-center justify-center text-moss-700 group-hover:text-deep-600 transition-colors">
                    <Icon size={22} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-lead font-bold text-moss-900 group-hover:text-deep-700 transition-colors">
                      {name}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-small text-moss-500 font-variant-numeric tabular-nums">
                    {c('From', 'শুরু')} ৳{cat.from.toLocaleString('en-IN')}
                  </span>
                  <ArrowRight
                    size={18}
                    className="text-moss-400 group-hover:text-deep-600 group-hover:translate-x-1 transition-all"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </LayoutContainer>
    </section>
  );
}

// How It Works: 4 steps with segmented tab control and live UI panel beneath
export function HowItWorksSection() {
  const c = useCopy();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 'describe',
      num: '01',
      title: c('Describe', 'বিবরণ দিন'),
      summary: c(
        'Explain the task in your own words with budget and deadline.',
        'নিজের ভাষায় আপনার কাজের লক্ষ্য, বাজেট ও সময় উল্লেখ করুন।',
      ),
      panel: (
        <Card variant="flat" className="p-6 bg-white border border-moss-200">
          <div className="flex items-center gap-2 text-deep-600 text-small font-medium mb-3">
            <FileText size={18} />
            <span>Graduate CV & Internship Cover Letter</span>
          </div>
          <div className="p-4 bg-mist rounded-sm mb-4 text-small text-moss-700">
            "I need an editable single-page graduate CV tailored for business
            internship applications by Thursday."
          </div>
          <div className="flex justify-between text-caption text-moss-500 border-t border-moss-100 pt-3">
            <span>Budget: ৳1,500</span>
            <span>Turnaround: 3 days</span>
          </div>
        </Card>
      ),
    },
    {
      id: 'match',
      num: '02',
      title: c('Get matched', 'প্রস্তাব পান'),
      summary: c(
        'Verified providers review your brief and send clear proposals.',
        'যাচাইকৃত সেবাদাতারা আপনার বিবরণ দেখে সুনির্দিষ্ট প্রস্তাব পাঠান।',
      ),
      panel: (
        <div className="space-y-3">
          <div className="p-4 bg-white border border-moss-200 rounded-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar initials="NJ" size="sm" />
              <div>
                <p className="text-small font-bold text-moss-900">
                  Nusrat Jahan
                </p>
                <p className="text-caption text-moss-500">
                  Verified Level 2 · 4.9 ★
                </p>
              </div>
            </div>
            <span className="text-body font-bold text-moss-900 font-variant-numeric tabular-nums">
              ৳1,500 · 2 days
            </span>
          </div>
          <div className="p-4 bg-white border border-moss-200 rounded-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar initials="FA" size="sm" />
              <div>
                <p className="text-small font-bold text-moss-900">
                  Farhana Akter
                </p>
                <p className="text-caption text-moss-500">
                  Verified Level 1 · 4.9 ★
                </p>
              </div>
            </div>
            <span className="text-body font-bold text-moss-900 font-variant-numeric tabular-nums">
              ৳1,800 · 3 days
            </span>
          </div>
        </div>
      ),
    },
    {
      id: 'escrow',
      num: '03',
      title: c('Pay into escrow', 'টাকা সুরক্ষিত রাখুন'),
      summary: c(
        'Both sides confirm the agreement. Payment stays held while work progresses.',
        'উভয়ের সম্মতির পর পেমেন্ট জমা হয়। কাজ চলাকালীন টাকা সম্পূর্ণ নিরাপদ থাকে।',
      ),
      panel: (
        <Card
          variant="flat"
          className="p-6 bg-moss-900 text-white border-moss-800"
        >
          <div className="flex items-center gap-2 text-mint-300 text-small font-medium mb-2">
            <Lock size={16} />
            <span>Escrow Agreement Active</span>
          </div>
          <div className="text-h2 font-bold text-white font-variant-numeric tabular-nums mb-2">
            ৳1,500 Held
          </div>
          <p className="text-caption text-moss-300">
            Payment is held securely in escrow. The provider works confidently
            knowing funds are guaranteed.
          </p>
        </Card>
      ),
    },
    {
      id: 'approve',
      num: '04',
      title: c('Approve & release', 'অনুমোদন ও পেমেন্ট'),
      summary: c(
        'Review the watermarked preview and release payout once satisfied.',
        'জলছাপযুক্ত প্রিভিউ দেখে কাজ পরীক্ষা করুন এবং সন্তুষ্ট হলে পেমেন্ট ছাড়ুন।',
      ),
      panel: (
        <Card variant="flat" className="p-6 bg-white border border-moss-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Check size={18} className="text-deep-600" />
              <span className="text-small font-bold text-moss-900">
                First Draft Delivered
              </span>
            </div>
            <span className="text-caption bg-deep-100 text-deep-700 px-2 py-0.5 rounded-sm">
              Ready for review
            </span>
          </div>
          <div className="p-3 bg-mist rounded-sm mb-4 text-caption text-moss-600">
            Watermarked preview inspected. Direct files unlock upon release.
          </div>
          <Button size="md" variant="primary" className="w-full">
            Approve & Release ৳1,500
          </Button>
        </Card>
      ),
    },
  ];

  return (
    <section
      id="how-it-works"
      className="w-full bg-white py-20 border-b border-moss-200"
    >
      <LayoutContainer>
        <div className="max-w-2xl mb-12">
          <span className="text-caption uppercase tracking-wider text-deep-600 font-bold block mb-2">
            {c('Process', 'কার্যপ্রণালী')}
          </span>
          <h2 className="text-h2 font-bold text-moss-900 tracking-tight">
            {c(
              'From brief to approved completion.',
              'কাজের শুরু থেকে সফল সমাপ্তি পর্যন্ত।',
            )}
          </h2>
        </div>

        {/* Step tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-1.5 bg-mist rounded-md border border-moss-200 mb-8">
          {steps.map((s, idx) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveStep(idx)}
              className={`p-3 sm:p-4 text-left rounded-sm transition-all select-none ${
                activeStep === idx
                  ? 'bg-white shadow-e1 text-moss-900'
                  : 'text-moss-600 hover:text-moss-900'
              }`}
            >
              <span className="text-caption font-mono text-deep-600 font-bold block mb-1">
                {s.num}
              </span>
              <span className="text-small sm:text-body font-bold block">
                {s.title}
              </span>
            </button>
          ))}
        </div>

        {/* Active step panel display */}
        {(() => {
          const step = steps[activeStep] || steps[0];
          if (!step) return null;
          return (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-mist/60 border border-moss-200 rounded-md p-6 sm:p-10">
              <div className="md:col-span-6">
                <span className="text-caption font-mono text-deep-600 font-bold">
                  Step {step.num}
                </span>
                <h3 className="text-h3 font-bold text-moss-900 mt-1 mb-3">
                  {step.title}
                </h3>
                <p className="text-body text-moss-700 leading-relaxed max-w-md">
                  {step.summary}
                </p>
              </div>

              <div className="md:col-span-6 w-full">{step.panel}</div>
            </div>
          );
        })()}
      </LayoutContainer>
    </section>
  );
}

// Trust Section: Moss surface, statement, 3 pillars, live fee calculator slider (৳500 - ৳50,000)
export function TrustSection() {
  const c = useCopy();
  const [orderAmount, setOrderAmount] = useState(2000);
  const fee = Math.round(orderAmount * 0.1);
  const providerReceives = orderAmount - fee;

  return (
    <section className="w-full bg-moss-900 text-white py-20 border-b border-moss-800">
      <LayoutContainer>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Left statement */}
          <div className="lg:col-span-5">
            <span className="text-caption uppercase tracking-wider text-mint-300 font-bold block mb-3">
              {c('Security standard', 'নিরাপত্তা মানদণ্ড')}
            </span>
            <h2 className="text-[36px] sm:text-[40px] font-bold leading-tight text-white tracking-tight mb-4 text-balance">
              {c(
                'Your money stays held until you inspect and approve.',
                'আপনি কাজ দেখে অনুমোদন না করা পর্যন্ত আপনার টাকা সুরক্ষিত।',
              )}
            </h2>
            <p className="text-body text-moss-300 leading-relaxed mb-6">
              {c(
                'Fair agreements require zero compromises on safety. Nagale connects clients and providers with audited escrow protection.',
                'নিরাপদ কাজের জন্য কোনো আপস নেই। নাগালে প্রতিটি ধাপে আর্থিক ও প্রাতিষ্ঠানিক সুরক্ষা নিশ্চিত করে।',
              )}
            </p>
            <Link
              to="/trust"
              className="text-small font-bold text-mint-300 hover:text-mint-200 inline-flex items-center gap-1.5"
            >
              <span>
                {c(
                  'Read platform safeguards',
                  'প্ল্যাটফর্মের সুরক্ষা নিয়ম পড়ুন',
                )}
              </span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Right: 3 core trust rows */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="flex items-start gap-4 p-5 bg-moss-800/80 rounded-md border border-moss-700">
              <div className="w-10 h-10 rounded-sm bg-moss-700 text-mint-300 flex items-center justify-center shrink-0">
                <Lock size={20} />
              </div>
              <div>
                <h3 className="text-lead font-bold text-white mb-1">
                  {c('Escrow protected', 'এসক্রো সুরক্ষা')}
                </h3>
                <p className="text-small text-moss-300 leading-relaxed">
                  {c(
                    'Both sides agree on scope and price before funding. You review the delivery before releasing payment.',
                    'কাজের পরিধি ও মূল্যে উভয় পক্ষ সম্মত হলে টাকা এসক্রোতে জমা হয়। অনুমোদনের পরেই পেমেন্ট ছাড় দেওয়া হয়।',
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-moss-800/80 rounded-md border border-moss-700">
              <div className="w-10 h-10 rounded-sm bg-moss-700 text-mint-300 flex items-center justify-center shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h3 className="text-lead font-bold text-white mb-1">
                  {c('Verified providers', 'যাচাইকৃত সেবাদাতা')}
                </h3>
                <p className="text-small text-moss-300 leading-relaxed">
                  {c(
                    'Phone and live selfie, national ID, and portfolio review are three distinct verification tiers.',
                    'ফোন ও সেলফি, জাতীয় পরিচয়পত্র এবং কাজের নমুনা—এই তিনটি আলাদা ধাপে সেবাদাতা যাচাই করা হয়।',
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-moss-800/80 rounded-md border border-moss-700">
              <div className="w-10 h-10 rounded-sm bg-moss-700 text-mint-300 flex items-center justify-center shrink-0">
                <MessageSquare size={20} />
              </div>
              <div>
                <h3 className="text-lead font-bold text-white mb-1">
                  {c('Contacts stay masked', 'যোগাযোগের তথ্য সুরক্ষিত')}
                </h3>
                <p className="text-small text-moss-300 leading-relaxed">
                  {c(
                    'Phone numbers and email remain masked until an order is accepted and funded, keeping decisions auditable.',
                    'অর্ডার চূড়ান্ত ও অর্থ জমা না হওয়া পর্যন্ত ব্যক্তিগত যোগাযোগের তথ্য গোপন রাখা হয় যাতে কোনো ভুল বোঝাবুঝি না হয়।',
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Live Interactive Fee Calculator (৳500 to ৳50,000) */}
        <div className="p-6 sm:p-8 bg-moss-800 border border-moss-700 rounded-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lead font-bold text-white">
                {c('Interactive fee calculator', 'স্বচ্ছ ফি হিসাবকারী')}
              </h3>
              <p className="text-caption text-moss-300">
                {c(
                  '10% transparent platform fee paid by the provider. No hidden charges for clients.',
                  'সেবাদাতা কর্তৃক প্রদত্ত ১০% স্পষ্ট প্ল্যাটফর্ম ফি। ক্লায়েন্টের জন্য কোনো লুকানো চার্জ নেই।',
                )}
              </p>
            </div>
            <Link
              to="/fees"
              className="text-caption font-bold text-mint-300 hover:underline"
            >
              {c('View full fee terms →', 'সম্পূর্ণ ফির নিয়মাবলী →')}
            </Link>
          </div>

          {/* Range Slider */}
          <div className="mb-6">
            <div className="flex justify-between text-caption text-moss-400 mb-2 font-variant-numeric tabular-nums">
              <span>৳500</span>
              <span className="text-white font-bold text-body">
                ৳{orderAmount.toLocaleString('en-IN')}
              </span>
              <span>৳50,000</span>
            </div>
            <input
              type="range"
              min={500}
              max={50000}
              step={250}
              value={orderAmount}
              onChange={(e) => setOrderAmount(Number(e.target.value))}
              className="w-full accent-mint-500 cursor-pointer h-2 bg-moss-700 rounded-full"
            />
          </div>

          {/* Three large tabular figures */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-moss-700">
            <div>
              <span className="text-caption text-moss-400 block mb-1">
                {c(
                  'Client funds (Order value)',
                  'ক্লায়েন্ট দেন (অর্ডারের মূল্য)',
                )}
              </span>
              <span className="text-h3 font-bold text-white font-variant-numeric tabular-nums">
                ৳{orderAmount.toLocaleString('en-IN')}
              </span>
            </div>
            <div>
              <span className="text-caption text-moss-400 block mb-1">
                {c('Nagale service fee (10%)', 'নাগালে সার্ভিস ফি (১০%)')}
              </span>
              <span className="text-h3 font-bold text-moss-300 font-variant-numeric tabular-nums">
                ৳{fee.toLocaleString('en-IN')}
              </span>
            </div>
            <div>
              <span className="text-caption text-mint-300 block mb-1">
                {c('Provider receives', 'সেবাদাতা পান')}
              </span>
              <span className="text-h3 font-bold text-mint-500 font-variant-numeric tabular-nums">
                ৳{providerReceives.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
}

// Provider CTA: Mint band, Moss text, arcs motif in moss at low opacity
export function ProviderCtaSection() {
  const c = useCopy();
  const nav = useNavigate();
  const [activeFeedIndex, setActiveFeedIndex] = useState(0);

  const feedExamples = [
    {
      title: 'A presentation for a university project',
      titleBn: 'বিশ্ববিদ্যালয়ের প্রজেক্টের প্রেজেন্টেশন',
      tag: 'Design · Digital',
      budget: 2500,
      why: 'Matches your design skills and presentation portfolio.',
      whyBn: 'আপনার ডিজাইন দক্ষতা ও প্রেজেন্টেশন পোর্টফোলিওর সঙ্গে মিলে।',
    },
    {
      title: 'One-page executive CV for MBA graduate',
      titleBn: 'এমবিএ গ্র্যাজুয়েটের জন্য এক্সিকিউটিভ সিভি',
      tag: 'Writing · Digital',
      budget: 2000,
      why: 'Matches your CV writing skill and career document history.',
      whyBn: 'আপনার সিভি লেখার দক্ষতা ও ক্যারিয়ার ডকুমেন্টের সঙ্গে মিলে।',
    },
    {
      title: 'Product photoshoot for 12 leather goods',
      titleBn: '১২টি চামড়ার পণ্যের কমার্শিয়াল ফটোশুট',
      tag: 'Photography · Local',
      budget: 4500,
      why: 'Matches your photography skill and Dhanmondi area.',
      whyBn: 'আপনার ফটোগ্রাফির দক্ষতা ও ধানমন্ডি এলাকার সাথে মিলে।',
    },
  ];

  const currentExample = feedExamples[activeFeedIndex] || feedExamples[0];
  if (!currentExample) return null;

  const cycleExample = () => {
    setActiveFeedIndex((prev) => (prev + 1) % feedExamples.length);
  };

  return (
    <section className="relative w-full bg-mint-500 text-moss-900 py-16 sm:py-20 overflow-hidden">
      {/* Signature Arcs in moss at low opacity */}
      <ArcsPattern variant="cta" />

      <LayoutContainer className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <h2 className="text-h2 font-bold tracking-tight text-moss-900 mb-4 text-balance">
              {c(
                'Make your skills your independent income.',
                'আপনার দক্ষতায় স্বাধীন আয়ের নতুন সুযোগ তৈরি করুন।',
              )}
            </h2>
            <p className="text-body text-moss-800 leading-relaxed mb-6 max-w-xl">
              {c(
                'Bid with your price, portfolio samples and delivery ETA. Payouts transfer directly to your bKash or Nagad wallet upon client approval.',
                'নিজের দাম, পোর্টফোলিও ও সময়ে প্রস্তাব দিন। ক্লায়েন্ট কাজ অনুমোদন করলে সরাসরি বিকাশ বা নগদ ওয়ালেটে পেমেন্ট বুঝে নিন।',
              )}
            </p>
            <Button
              size="lg"
              variant="strong"
              onClick={() => nav('/auth?mode=signup')}
              icon={<ArrowRight size={18} />}
            >
              {c('Become a provider', 'সেবাদাতা হিসেবে যোগ দিন')}
            </Button>
          </div>

          {/* Interactive feed preview item with "Why you see this" */}
          <div className="lg:col-span-5">
            <div
              onClick={cycleExample}
              className="p-6 bg-white rounded-md shadow-e1 border border-moss-200 cursor-pointer hover:shadow-e2 transition-all select-none"
              title="Click to cycle example jobs"
            >
              <div className="flex items-center justify-between text-caption font-medium text-moss-600 mb-2">
                <span>{currentExample.tag}</span>
                <span className="text-small font-bold text-moss-900 font-variant-numeric tabular-nums">
                  ৳{currentExample.budget.toLocaleString('en-IN')}
                </span>
              </div>
              <h3 className="text-lead font-bold text-moss-900 mb-3">
                {c(currentExample.title, currentExample.titleBn)}
              </h3>
              <div className="flex items-start gap-2 text-caption text-deep-700 bg-deep-50 p-2.5 rounded-sm border border-deep-100">
                <Check size={14} className="shrink-0 mt-0.5 text-deep-600" />
                <p>
                  <strong>{c('Why you see this:', 'যে কারণে দেখছেন:')} </strong>
                  {c(currentExample.why, currentExample.whyBn)}
                </p>
              </div>
              <p className="text-caption text-moss-400 text-right mt-3">
                {c(
                  'Click card to see next match →',
                  'পরের কাজের উদাহরণ দেখতে ক্লিক করুন →',
                )}
              </p>
            </div>
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
}

// Sample Providers Section
export function SampleProfilesSection() {
  const c = useCopy();
  const { providers } = useMarket();

  return (
    <section className="w-full bg-white py-20 border-b border-moss-200">
      <LayoutContainer>
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-caption uppercase tracking-wider text-deep-600 font-bold block mb-2">
              {c('Talent', 'দক্ষ মানুষ')}
            </span>
            <h2 className="text-h2 font-bold text-moss-900 tracking-tight">
              {c(
                'Meet verified local specialists.',
                'যাচাইকৃত স্থানীয় বিশেষজ্ঞদের দেখুন।',
              )}
            </h2>
          </div>
          <span className="text-caption text-moss-500 font-normal">
            {c('Sample profiles', 'নমুনা প্রোফাইল')}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {providers.slice(0, 3).map((p) => (
            <Card
              key={p.id}
              variant="flat"
              className="p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar initials={p.initials} size="md" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/p/${p.id}`}
                        className="text-body font-bold text-moss-900 hover:text-deep-600 truncate"
                      >
                        {p.name}
                      </Link>
                      <VerifiedBadge />
                    </div>
                    <p className="text-caption text-moss-500 flex items-center gap-1 mt-0.5">
                      <MapPin size={12} />
                      <span className="truncate">{p.area}</span>
                    </p>
                  </div>
                </div>

                <h3 className="text-small font-bold text-moss-800 mb-2 line-clamp-1">
                  {p.headline}
                </h3>
                <p className="text-caption text-moss-600 line-clamp-2 mb-4 leading-relaxed">
                  {p.bio}
                </p>
              </div>

              <div className="pt-4 border-t border-moss-100 flex items-center justify-between text-small">
                <Rating rating={p.rating} reviewsCount={p.completed} compact />
                <span className="font-bold text-moss-900 font-variant-numeric tabular-nums">
                  {c('From', 'শুরু')} ৳{p.price.toLocaleString('en-IN')}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </LayoutContainer>
    </section>
  );
}

// Learning Teaser Section
export function LearningTeaser() {
  const c = useCopy();

  return (
    <section className="w-full bg-mist py-8 border-b border-moss-200">
      <LayoutContainer>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-sm bg-deep-100 text-deep-700 flex items-center justify-center shrink-0">
              <GraduationCap size={22} />
            </div>
            <div>
              <strong className="text-small font-bold text-moss-900 block">
                {c('Nagale Learning', 'নাগালে লার্নিং')}
              </strong>
              <p className="text-caption text-moss-600">
                {c(
                  'Short practical guides on brief writing, pricing and delivery.',
                  'কাজের বিবরণ তৈরি, মূল্য নির্ধারণ ও ডেলিভারির নির্দেশিকা।',
                )}
              </p>
            </div>
          </div>
          <Link
            to="/learning"
            className="inline-flex items-center gap-1.5 text-small font-bold text-deep-600 hover:text-moss-900 whitespace-nowrap"
          >
            <span>{c('Explore guides', 'নির্দেশিকা দেখুন')}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </LayoutContainer>
    </section>
  );
}
