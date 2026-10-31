import { useState } from 'react';
import { GraduationCap, Clock, Bell, CheckCircle2 } from 'lucide-react';
import { LayoutContainer } from '../../components/layout/LayoutContainer';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { DigitalBadge, LocalBadge, Badge } from '../../components/ui/Badge';
import { useApp, useCopy } from '../../app/context';

interface CourseItem {
  id: string;
  title: string;
  bnTitle: string;
  category: 'digital' | 'local';
  durationMinutes: number;
}

const COURSES: CourseItem[] = [
  {
    id: 'c-1',
    title: 'Writing a winning job proposal',
    bnTitle: 'কার্যকর ও বিশ্বাসযোগ্য জব প্রস্তাবনা তৈরি',
    category: 'digital',
    durationMinutes: 12,
  },
  {
    id: 'c-2',
    title: 'Setting your rate and negotiating micro-gigs',
    bnTitle: 'কাজের পারিশ্রমিক নির্ধারণ ও আলোচনা কৌশল',
    category: 'digital',
    durationMinutes: 18,
  },
  {
    id: 'c-3',
    title: 'Communication without sharing personal contacts',
    bnTitle: 'ব্যক্তিগত ফোন বা লিংক ছাড়া প্ল্যাটফর্মে যোগাযোগ',
    category: 'digital',
    durationMinutes: 8,
  },
  {
    id: 'c-4',
    title: 'Understanding the escrow protection system',
    bnTitle: 'এসক্রো নিরাপত্তা ও পেমেন্ট রিলিজ প্রক্রিয়া',
    category: 'digital',
    durationMinutes: 10,
  },
  {
    id: 'c-5',
    title: 'High-quality photography for local service providers',
    bnTitle: 'লোকাল সার্ভিসের জন্য ভালো ছবি তোলার কৌশল',
    category: 'local',
    durationMinutes: 15,
  },
  {
    id: 'c-6',
    title: 'Building a verified provider profile that converts',
    bnTitle: 'যাচাইকৃত শক্তিশালী প্রোভাইডার প্রোফাইল গঠন',
    category: 'digital',
    durationMinutes: 20,
  },
];

export function LearningPage() {
  const { notify } = useApp();
  const c = useCopy();
  const [subscribed, setSubscribed] = useState(false);

  const handleNotify = () => {
    setSubscribed(true);
    notify(
      c(
        'You will be notified as soon as interactive lessons publish.',
        'নতুন কোর্স প্রকাশিত হওয়া মাত্র আপনাকে নোটিফিকেশন দেওয়া হবে।',
      ),
    );
  };

  return (
    <div className="w-full py-10 md:py-16">
      <LayoutContainer variant="page" className="max-w-[720px]">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-moss-200">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <GraduationCap size={22} className="text-deep-600" />
              <h1 className="text-h2 font-bold text-moss-900 tracking-tight">
                {c('Nagale Learning', 'নাগালে লার্নিং')}
              </h1>
            </div>
            <p className="text-body text-moss-600">
              {c(
                'Free, concise skills curriculum for micro-gig providers in Bangladesh.',
                'বাংলাদেশের ফ্রিল্যান্সার ও দক্ষ কর্মীদের জন্য বিনামূল্যে বাস্তবমুখী কোর্স।',
              )}
            </p>
          </div>

          <div className="shrink-0">
            {subscribed ? (
              <span className="inline-flex items-center gap-1.5 text-small font-bold text-deep-700 bg-deep-100 px-3.5 py-2 rounded-sm">
                <CheckCircle2 size={16} />
                {c('Notifications enabled', 'নোটিফিকেশন সক্রিয়')}
              </span>
            ) : (
              <Button
                variant="secondary"
                size="md"
                icon={<Bell size={16} />}
                iconPosition="left"
                onClick={handleNotify}
              >
                {c('Notify me when courses launch', 'কোর্স চালু হলে জানান')}
              </Button>
            )}
          </div>
        </div>

        {/* Compact Course List */}
        <Card
          variant="flat"
          className="p-0 overflow-hidden divide-y divide-moss-100 shadow-e1"
        >
          {COURSES.map((course) => (
            <div
              key={course.id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-mist/30 transition-colors"
            >
              <div className="flex items-start sm:items-center gap-3 min-w-0">
                {course.category === 'digital' ? (
                  <DigitalBadge />
                ) : (
                  <LocalBadge />
                )}
                <div>
                  <h2 className="text-body font-bold text-moss-900 hover:text-deep-700 transition-colors cursor-pointer">
                    {c(course.title, course.bnTitle)}
                  </h2>
                  <div className="flex items-center gap-2 text-caption text-moss-500 mt-0.5">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      <span className="font-variant-numeric tabular-nums">
                        {course.durationMinutes}
                      </span>{' '}
                      {c('min', 'মিনিট')}
                    </span>
                    <span>·</span>
                    <span>{c('Practical micro-module', 'ব্যবহারিক পাঠ')}</span>
                  </div>
                </div>
              </div>

              <div className="shrink-0 self-start sm:self-center">
                <Badge tone="neutral">{c('Coming soon', 'শীঘ্রই আসছে')}</Badge>
              </div>
            </div>
          ))}
        </Card>

        {/* Trust & Ethics Guarantee */}
        <div className="mt-8 p-4 bg-mist rounded-md border border-moss-200 text-small text-moss-700">
          <p className="leading-relaxed">
            {c(
              'All Nagale learning courses are completely free. We never charge providers for training, placement, or profile verification badges.',
              'নাগালের সকল লার্নিং কোর্স সম্পূর্ণ বিনামূল্যে প্রদান করা হয়। প্রশিক্ষণ বা প্রোফাইল ব্যাজের জন্য কখনো কোনো অর্থ নেওয়া হয় না।',
            )}
          </p>
        </div>
      </LayoutContainer>
    </div>
  );
}
