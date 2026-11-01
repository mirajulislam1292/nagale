import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Lock,
  ShieldCheck,
  MessageSquare,
  Scale,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { LayoutContainer } from '../../components/layout/LayoutContainer';
import { Button } from '../../components/ui/Button';
import { Input, Textarea, Select } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { ArcsPattern } from '../../components/ui/ArcsPattern';
import { useCopy, useApp } from '../../app/context';

// Reading Layout container (640px max width centered for longform reading)
function ReadingContainer({ children }: { children: React.ReactNode }) {
  return (
    <LayoutContainer className="py-16 md:py-24">
      <div className="max-w-[640px] mx-auto">{children}</div>
    </LayoutContainer>
  );
}

// 1. Trust & Safety (/trust)
export function TrustPage() {
  const c = useCopy();

  const safeguards = [
    {
      icon: <Lock size={22} className="text-deep-600" />,
      title: c(
        '1. Escrow holds your payment',
        '১. এসক্রো আপনার টাকা সুরক্ষিত রাখে',
      ),
      description: c(
        'Both sides agree on deliverables and price before payment is funded. The money stays held while work is performed and is released only when the client inspects and approves the delivery.',
        'কাজের পরিধি ও মূল্যে উভয় পক্ষ সম্মত হওয়ার পর টাকা এসক্রোতে জমা হয়। কাজ চলাকালীন টাকা সুরক্ষিত থাকে এবং ক্লায়েন্ট কাজ দেখে অনুমোদন করলেই তা ছাড়া হয়।',
      ),
      fragment: (
        <div className="p-4 bg-mist rounded-sm border border-moss-200 flex items-center justify-between text-small my-3">
          <span className="font-bold text-moss-900">৳1,500 held in Escrow</span>
          <span className="text-caption bg-deep-100 text-deep-700 px-2 py-0.5 rounded-sm">
            Protected
          </span>
        </div>
      ),
    },
    {
      icon: <ShieldCheck size={22} className="text-deep-600" />,
      title: c(
        '2. Multi-tier provider verification',
        '২. ধাপে ধাপে সেবাদাতা যাচাই',
      ),
      description: c(
        'Verification is progressive: Level 1 confirms phone and live selfie; Level 2 verifies national identity (NID); Level 3 evaluates verified skill samples. Personal identity documents are never displayed publicly.',
        'যাচাইকরণ কয়েকটি ধাপে সম্পন্ন হয়: প্রথম ধাপে ফোন ও সেলফি, দ্বিতীয় ধাপে জাতীয় পরিচয়পত্র এবং তৃতীয় ধাপে দক্ষতার পোর্টফোলিও। ব্যক্তিগত নথিপত্র কখনোই জনসম্মুখে প্রকাশ করা হয় না।',
      ),
      fragment: (
        <div className="p-3 bg-white rounded-sm border border-moss-200 flex items-center gap-2 text-caption text-moss-700 my-3">
          <CheckCircle2 size={16} className="text-deep-600 shrink-0" />
          <span>Level 2 Identity Verified · NID reviewed securely</span>
        </div>
      ),
    },
    {
      icon: <MessageSquare size={22} className="text-deep-600" />,
      title: c('3. Masked communication', '৩. যোগাযোগের তথ্য গোপন ও নিরাপদ'),
      description: c(
        'Phone numbers, email addresses and direct links are masked until both parties accept an agreement and escrow is funded. This preserves an auditable record and protects both parties.',
        'চুক্তি চূড়ান্ত ও অর্থ জমা না হওয়া পর্যন্ত ব্যক্তিগত ফোন নম্বর বা ইমেইল গোপন থাকে। এর ফলে সমস্ত কাজের স্বচ্ছ প্রমাণ সংরক্ষিত থাকে।',
      ),
      fragment: (
        <div className="p-3 bg-moss-100 rounded-sm text-caption font-mono text-moss-700 my-3">
          "Please check my proposal. [contact hidden] until escrow funded."
        </div>
      ),
    },
    {
      icon: <Scale size={22} className="text-deep-600" />,
      title: c(
        '4. Human dispute resolution',
        '৪. মানবীয় নিরপেক্ষ বিরোধ নিষ্পত্তি',
      ),
      description: c(
        'If an order hits an impasse, either side can open a dispute. Evidence from the order workspace is compiled, and a human compliance officer reviews the case to determine fair release, split or refund.',
        'যদি কোনো অর্ডারে মতবিরোধ দেখা দেয়, তবে বিরোধ নিষ্পত্তির আবেদন করা যায়। একজন দায়িত্বশীল কর্মকর্তা উভয় পক্ষের প্রমাণ পর্যালোচনা করে ন্যায়সঙ্গত সিদ্ধান্ত নেন।',
      ),
      fragment: (
        <div className="p-3 bg-status-warning-bg border border-status-warning-border rounded-sm text-caption text-status-warning-text my-3">
          Dispute workflow: Evidence submitted · Neutral human review
        </div>
      ),
    },
  ];

  return (
    <ReadingContainer>
      <span className="text-caption uppercase tracking-wider text-deep-600 font-bold block mb-2">
        {c('Safeguards', 'সুরক্ষা')}
      </span>
      <h1 className="text-h2 sm:text-[40px] font-bold text-moss-900 tracking-tight leading-tight mb-4">
        {c(
          'Know how your work and payment stay protected.',
          'আপনার কাজ এবং পেমেন্ট কীভাবে নিরাপদ থাকে জানুন।',
        )}
      </h1>
      <p className="text-lead text-moss-600 leading-relaxed mb-10">
        {c(
          'Nagale operates on four strict architectural safeguards designed for Bangladesh: escrow funding, verified tiers, masked contact, and fair human resolution.',
          'নাগালে প্ল্যাটফর্মে রয়েছে চারটি সুস্পষ্ট প্রাতিষ্ঠানিক সুরক্ষা: এসক্রো ডিপোজিট, যাচাইকৃত প্রোফাইল, সুরক্ষিত মেসেজিং এবং নিরপেক্ষ নিষ্পত্তি।',
        )}
      </p>

      <div className="space-y-12">
        {safeguards.map((item, idx) => (
          <div
            key={idx}
            className="pb-8 border-b border-moss-100 last:border-b-0"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-sm bg-mist flex items-center justify-center">
                {item.icon}
              </div>
              <h2 className="text-h3 font-bold text-moss-900">{item.title}</h2>
            </div>
            <p className="text-body text-moss-700 leading-relaxed mt-2 mb-3">
              {item.description}
            </p>
            {item.fragment}
          </div>
        ))}
      </div>
    </ReadingContainer>
  );
}

// 2. Fees Page (/fees)
export function FeesPage() {
  const c = useCopy();
  const [val, setVal] = useState(2500);
  const fee = Math.round(val * 0.1);
  const net = val - fee;

  return (
    <ReadingContainer>
      <span className="text-caption uppercase tracking-wider text-deep-600 font-bold block mb-2">
        {c('Pricing', 'মূল্য ও ফি')}
      </span>
      <h1 className="text-h2 sm:text-[40px] font-bold text-moss-900 tracking-tight leading-tight mb-4">
        {c(
          'Transparent 10% platform fee.',
          'সম্পূর্ণ স্বচ্ছ ১০% প্ল্যাটফর্ম ফি।',
        )}
      </h1>
      <p className="text-lead text-moss-600 leading-relaxed mb-10">
        {c(
          'Clients pay the agreed order price without surprise surcharges. Providers contribute a single 10% service fee upon successful completion.',
          'ক্লায়েন্ট শুধুমাত্র সম্মত অর্ডারের মূল্য প্রদান করেন। কাজ সফলভাবে সম্পন্ন হলে সেবাদাতার কাছ থেকে ১০% সার্ভিস ফি কর্তন করা হয়।',
        )}
      </p>

      {/* Live Fee Calculator */}
      <Card
        variant="flat"
        className="p-6 bg-mist/70 border border-moss-200 mb-10"
      >
        <h2 className="text-lead font-bold text-moss-900 mb-4">
          {c('Calculate fee for any order', 'যেকোনো অর্ডারের ফি হিসাব করুন')}
        </h2>
        <div className="mb-6">
          <label className="block text-small font-medium text-moss-700 mb-1.5">
            {c('Order value (BDT)', 'অর্ডারের মূল্য (টাকা)')}
          </label>
          <div className="flex items-center bg-white border border-moss-200 rounded-sm px-3 py-2">
            <span className="text-moss-900 font-bold mr-2">৳</span>
            <input
              type="number"
              min={100}
              max={100000}
              step={100}
              value={val}
              onChange={(e) => setVal(Math.max(0, Number(e.target.value)))}
              className="w-full text-body font-bold text-moss-900 focus:outline-none font-variant-numeric tabular-nums"
            />
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t border-moss-200 text-small">
          <div className="flex justify-between text-moss-700">
            <span>
              {c(
                'Client pays (held in escrow)',
                'ক্লায়েন্ট দেন (এসক্রোতে সুরক্ষিত)',
              )}
            </span>
            <span className="font-bold text-moss-900 font-variant-numeric tabular-nums">
              ৳{val.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="flex justify-between text-moss-600">
            <span>
              {c('Nagale platform fee (10%)', 'নাগালে সার্ভিস ফি (১০%)')}
            </span>
            <span className="font-variant-numeric tabular-nums">
              ৳{fee.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="flex justify-between text-deep-700 font-bold pt-2 border-t border-moss-200 text-body">
            <span>{c('Provider net payout', 'সেবাদাতার নিট আয়')}</span>
            <span className="font-variant-numeric tabular-nums">
              ৳{net.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </Card>

      {/* Worked examples */}
      <h2 className="text-h3 font-bold text-moss-900 mb-4">
        {c('Worked examples', 'কাজের বাস্তব উদাহরণ')}
      </h2>
      <div className="space-y-4">
        <div className="p-4 bg-white border border-moss-200 rounded-sm">
          <strong className="text-small font-bold text-moss-900 block mb-1">
            CV Writing · ৳1,500 order
          </strong>
          <p className="text-caption text-moss-600">
            Client deposits ৳1,500 into escrow. Upon client approval, Nagale
            deducts ৳150 (10%) and the provider receives ৳1,350 directly to
            bKash/Nagad.
          </p>
        </div>
        <div className="p-4 bg-white border border-moss-200 rounded-sm">
          <strong className="text-small font-bold text-moss-900 block mb-1">
            Small Business Website · ৳20,000 order
          </strong>
          <p className="text-caption text-moss-600">
            Client deposits ৳20,000 into escrow. Upon handover and approval,
            Nagale service fee is ৳2,000 and the provider receives ৳18,000.
          </p>
        </div>
      </div>
    </ReadingContainer>
  );
}

// 3. Support Page (/support)
export function SupportPage() {
  const c = useCopy();
  const { notify } = useApp();
  const [topic, setTopic] = useState('Using Nagale');
  const [orderId, setOrderId] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSubmitted(true);
    notify('Support message received. We respond within 24 hours.');
  };

  return (
    <ReadingContainer>
      <span className="text-caption uppercase tracking-wider text-deep-600 font-bold block mb-2">
        {c('Helpdesk', 'সহায়তা')}
      </span>
      <h1 className="text-h2 sm:text-[40px] font-bold text-moss-900 tracking-tight leading-tight mb-4">
        {c('Tell us what needs attention.', 'আপনার সমস্যার কথা জানান।')}
      </h1>
      <p className="text-lead text-moss-600 leading-relaxed mb-8">
        {c(
          'For questions about ongoing orders, messaging or payouts, our human support team is ready to assist.',
          'চলমান অর্ডার, মেসেজ বা পেমেন্ট সংক্রান্ত যেকোনো সহায়তায় আমাদের সাপোর্ট টিম আপনার পাশে আছে।',
        )}
      </p>

      {submitted ? (
        <Card
          variant="flat"
          className="p-8 text-center bg-deep-50 border-deep-100"
        >
          <CheckCircle2 size={36} className="text-deep-600 mx-auto mb-3" />
          <h2 className="text-lead font-bold text-moss-900 mb-2">
            {c('Support request received', 'আপনার অনুরোধ গ্রহণ করা হয়েছে')}
          </h2>
          <p className="text-small text-moss-600 mb-6">
            {c(
              'A support specialist will review your request and get back to you.',
              'আমাদের প্রতিনিধি দ্রুত আপনার অনুরোধটি পর্যালোচনা করবেন।',
            )}
          </p>
          <Button variant="secondary" onClick={() => setSubmitted(false)}>
            {c('Send another query', 'অন্য প্রশ্ন পাঠান')}
          </Button>
        </Card>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label={c('Topic', 'বিষয়')}
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            options={[
              { value: 'Using Nagale', label: 'Using Nagale / সাধারণ ব্যবহার' },
              {
                value: 'Order or payment',
                label: 'Order or payment / অর্ডার ও পেমেন্ট',
              },
              {
                value: 'Account or verification',
                label: 'Account or verification / ভেরিফিকেশন',
              },
              { value: 'Report a concern', label: 'Report a concern / অভিযোগ' },
            ]}
          />

          <Input
            label={c('Order ID (optional)', 'অর্ডার আইডি (ঐচ্ছিক)')}
            placeholder="N-1042"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
          />

          <Textarea
            label={c('Your message', 'আপনার বার্তা')}
            rows={5}
            placeholder={c(
              'Describe clearly what happened and how we can help…',
              'কী ঘটেছে এবং কীভাবে সাহায্য করতে পারি বিস্তারিত লিখুন…',
            )}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />

          <div className="pt-2">
            <Button
              size="lg"
              variant="primary"
              type="submit"
              disabled={!message.trim()}
            >
              {c('Submit support request', 'অনুরোধ জমা দিন')}
            </Button>
          </div>
        </form>
      )}
    </ReadingContainer>
  );
}

// 4. Terms of Service (/terms)
export function TermsPage() {
  const c = useCopy();

  return (
    <ReadingContainer>
      <span className="text-caption uppercase tracking-wider text-deep-600 font-bold block mb-2">
        {c('Agreement', 'চুক্তি')}
      </span>
      <h1 className="text-h2 sm:text-[40px] font-bold text-moss-900 tracking-tight leading-tight mb-4">
        {c('Terms of Service', 'ব্যবহারের শর্তাবলী')}
      </h1>
      <p className="text-lead text-moss-600 leading-relaxed mb-8">
        {c(
          'Plain-language terms governing order creation, escrow protection, and acceptable marketplace conduct.',
          'নাগালে প্ল্যাটফর্মে কাজ তৈরি, এসক্রো সুরক্ষা এবং পারস্পরিক আচরণের মূল শর্তসমূহ।',
        )}
      </p>

      <div className="prose text-body text-moss-700 space-y-6">
        <div>
          <h2 className="text-h3 font-bold text-moss-900 mb-2">
            1. The Escrow Contract
          </h2>
          <p>
            When a client accepts a provider's proposal and funds the order, the
            full agreed price is held by Nagale in escrow. Funds are transferred
            to the provider only after the client approves the completed work.
          </p>
        </div>

        <div>
          <h2 className="text-h3 font-bold text-moss-900 mb-2">
            2. Provider Responsibilities
          </h2>
          <p>
            Providers agree to deliver original work matching the specifications
            and timeline agreed in the brief. Work delivered must not infringe
            copyright or third-party intellectual property.
          </p>
        </div>

        <div>
          <h2 className="text-h3 font-bold text-moss-900 mb-2">
            3. On-Platform Communication
          </h2>
          <p>
            To ensure transactions and agreements are verifiable in case of a
            dispute, all communications, deliverables, and payments must remain
            within the Nagale order workspace.
          </p>
        </div>

        <div>
          <h2 className="text-h3 font-bold text-moss-900 mb-2">
            4. Dispute Resolution
          </h2>
          <p>
            Either party may initiate a dispute if deliverables do not match the
            agreement or if communication ceases. Nagale moderation conducts
            impartial human review and may issue full refunds, partial splits,
            or completed payouts.
          </p>
        </div>
      </div>
    </ReadingContainer>
  );
}

// 5. Privacy Policy (/privacy)
export function PrivacyPage() {
  const c = useCopy();

  return (
    <ReadingContainer>
      <span className="text-caption uppercase tracking-wider text-deep-600 font-bold block mb-2">
        {c('Privacy contract', 'গোপনীয়তা নীতি')}
      </span>
      <h1 className="text-h2 sm:text-[40px] font-bold text-moss-900 tracking-tight leading-tight mb-4">
        {c('Privacy Policy', 'গোপনীয়তা ও ডেটা সুরক্ষা')}
      </h1>
      <p className="text-lead text-moss-600 leading-relaxed mb-8">
        {c(
          'How Nagale handles identity documents, masking, and personal data with strict privacy boundaries.',
          'নাগালে কীভাবে পরিচয়পত্র, এনআইডি এবং ব্যক্তিগত তথ্য কঠোর গোপনীয়তার সাথে সংরক্ষণ করে।',
        )}
      </p>

      <div className="prose text-body text-moss-700 space-y-6">
        <div>
          <h2 className="text-h3 font-bold text-moss-900 mb-2">
            1. Identity & NID Protection
          </h2>
          <p>
            Identity documents (such as NID cards and verification selfies) are
            processed exclusively for security checks by authorized reviewers.
            They are never rendered on public profiles or shared with other
            users.
          </p>
        </div>

        <div>
          <h2 className="text-h3 font-bold text-moss-900 mb-2">
            2. Public Information Boundaries
          </h2>
          <p>
            Public profiles display only approximate geographical areas (such as
            "Mirpur, Dhaka"), verified achievement badges, reviews, and
            portfolio work. Exact physical addresses and phone numbers are never
            made public.
          </p>
        </div>

        <div>
          <h2 className="text-h3 font-bold text-moss-900 mb-2">
            3. Masked Contact Details
          </h2>
          <p>
            Automated platform filters mask phone numbers, email addresses, and
            external handles in messages prior to escrow funding, preventing
            off-platform fraud.
          </p>
        </div>

        <div>
          <h2 className="text-h3 font-bold text-moss-900 mb-2">
            4. Data Retention & Cookies
          </h2>
          <p>
            Session cookies are used solely for authenticated session state and
            preferred language (EN/BN). No tracking cookies are sold or
            distributed to third-party ad networks.
          </p>
        </div>
      </div>
    </ReadingContainer>
  );
}

// 6. 404 Not Found (/404 or *)
export function NotFoundPage() {
  const c = useCopy();
  useEffect(() => {
    let meta = document.querySelector<HTMLMetaElement>('meta[name=robots]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'robots';
      document.head.append(meta);
    }
    meta.content = 'noindex';
    return () => meta?.remove();
  }, []);

  return (
    <div className="relative w-full min-h-[600px] flex items-center justify-center bg-mist py-20 overflow-hidden">
      <ArcsPattern variant="error" />

      <LayoutContainer className="relative z-10 max-w-lg">
        <span className="text-caption font-mono uppercase tracking-widest text-deep-600 font-bold block mb-3">
          404
        </span>
        <h1 className="text-h2 sm:text-h1 font-bold text-moss-900 mb-4 tracking-tight">
          {c('This page could not be found.', 'পৃষ্ঠাটি খুঁজে পাওয়া যায়নি।')}
        </h1>
        <p className="text-body text-moss-600 mb-8 leading-relaxed">
          {c(
            'The link you followed may be incomplete or expired. Your workspace and active orders remain intact.',
            'লিংকটি অসম্পূর্ণ বা পরিবর্তিত হতে পারে। আপনার ড্যাশবোর্ড ও সক্রিয় অর্ডারগুলো নিরাপদ আছে।',
          )}
        </p>
        <Link to="/">
          <Button size="lg" variant="primary" icon={<ArrowRight size={18} />}>
            {c('Return to Nagale home', 'মূল পাতায় ফিরে যান')}
          </Button>
        </Link>
      </LayoutContainer>
    </div>
  );
}
