import { useState } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Star,
  ShieldCheck,
  Edit2,
  Eye,
  X,
  Plus,
} from 'lucide-react';
import { LayoutContainer } from '../../components/layout/LayoutContainer';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Avatar, Rating } from '../../components/ui/Avatar';
import { Badge, VerifiedBadge } from '../../components/ui/Badge';
import { Input, Textarea } from '../../components/ui/Input';
import { useApp, useMarket, useCopy, useMoney } from '../../app/context';

type TabKey = 'about' | 'portfolio' | 'certificates' | 'reviews';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'about', label: 'About' },
  { key: 'portfolio', label: 'Portfolio' },
  { key: 'certificates', label: 'Certificates' },
  { key: 'reviews', label: 'Reviews' },
];

const REVIEW_DIST: { stars: number; count: number }[] = [
  { stars: 5, count: 34 },
  { stars: 4, count: 9 },
  { stars: 3, count: 2 },
  { stars: 2, count: 1 },
  { stars: 1, count: 1 },
];

const SAMPLE_REVIEWS: {
  initials: string;
  name: string;
  rating: number;
  text: string;
  date: string;
}[] = [
  {
    initials: 'MR',
    name: 'Mahim Rahman',
    rating: 5,
    text: 'Delivered exactly what was agreed. Communication was clear throughout.',
    date: '3 days ago',
  },
  {
    initials: 'SR',
    name: 'Samira Reza',
    rating: 5,
    text: 'Professional work. Would hire again without hesitation.',
    date: '2 weeks ago',
  },
  {
    initials: 'TI',
    name: 'Tanvir Islam',
    rating: 4,
    text: 'Good quality, minor revision requested and resolved promptly.',
    date: '1 month ago',
  },
];

const PORTFOLIO_TILES: { title: string }[] = [
  { title: 'Brand identity package' },
  { title: 'Social media kit' },
  { title: 'Product catalogue layout' },
];

const CERT_ROWS: { name: string; issuer: string; year: number }[] = [
  {
    name: 'Graphic Design Fundamentals',
    issuer: 'Bangladesh Skills Institute',
    year: 2022,
  },
  {
    name: 'Digital Freelancing Certificate',
    issuer: 'Bangladesh Youth Foundation',
    year: 2023,
  },
];

export function ProviderProfile() {
  const { providerId } = useParams<{ providerId?: string }>();
  const { pathname } = useLocation();
  const isPublic = pathname.startsWith('/p/');

  const { notify } = useApp();
  const c = useCopy();
  const format = useMoney();
  const { providers } = useMarket();

  const provider =
    (providerId ? providers.find((p) => p.id === providerId) : undefined) ||
    providers[0];

  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>('about');
  const [headlineEdit, setHeadlineEdit] = useState(provider?.headline ?? '');
  const [bioEdit, setBioEdit] = useState(provider?.bio ?? '');
  const [skillsEdit, setSkillsEdit] = useState<string[]>(
    provider?.skills ?? [],
  );
  const [newSkill, setNewSkill] = useState('');

  if (!provider || provider.accountStatus === 'suspended') {
    return (
      <div className="py-16 text-center">
        <p className="text-moss-600">Profile unavailable</p>
        <Link to="/" className="text-deep-600 underline mt-2 inline-block">
          Return home
        </Link>
      </div>
    );
  }

  const totalReviews = provider.reviews ?? 0;
  const totalDist = REVIEW_DIST.reduce((s, r) => s + r.count, 0);

  function handleAddSkill() {
    const trimmed = newSkill.trim();
    if (trimmed && !skillsEdit.includes(trimmed)) {
      setSkillsEdit((prev) => [...prev, trimmed]);
    }
    setNewSkill('');
  }

  function handleRemoveSkill(skill: string) {
    setSkillsEdit((prev) => prev.filter((s) => s !== skill));
  }

  return (
    <div className="w-full py-8 md:py-10">
      <LayoutContainer variant={isPublic ? 'page' : 'app'}>
        {/* Back link */}
        <Link
          to={isPublic ? '/' : '/provider'}
          className="inline-flex items-center gap-1.5 text-small text-moss-500 hover:text-moss-900 mb-6"
        >
          <ArrowLeft size={14} />
          <span>
            {isPublic
              ? c('Explore Nagale', 'নাগালে অন্বেষণ করুন')
              : c('Dashboard', 'ড্যাশবোর্ড')}
          </span>
        </Link>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Main column */}
          <div className="flex-1 min-w-0 space-y-6">
            {/* Hero row */}
            <Card variant="flat">
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <Avatar initials={provider.initials} size="xl" />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h1 className="text-h3 font-bold text-moss-900 tracking-tight">
                      {provider.name}
                    </h1>
                    <VerifiedBadge level={(provider.level ?? 1) as 1 | 2 | 3} />
                  </div>
                  <p className="text-small text-moss-500 mb-1">
                    {provider.area}
                  </p>
                  <Rating
                    rating={provider.rating}
                    reviewsCount={totalReviews}
                  />
                  <p className="text-small text-moss-700 mt-2">
                    {editMode && !isPublic ? headlineEdit : provider.headline}
                  </p>
                </div>
                {/* Own profile: edit toggle */}
                {!isPublic && (
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={editMode ? <Eye size={14} /> : <Edit2 size={14} />}
                    iconPosition="left"
                    onClick={() => setEditMode((v) => !v)}
                  >
                    {editMode
                      ? c('Preview as client', 'ক্লায়েন্ট হিসেবে দেখুন')
                      : c('Edit profile', 'প্রোফাইল সম্পাদনা করুন')}
                  </Button>
                )}
              </div>

              {/* Edit mode panel */}
              {editMode && !isPublic && (
                <div className="mt-6 space-y-4 border-t border-moss-100 pt-6">
                  <Input
                    label={c('Headline', 'শিরোনাম')}
                    value={headlineEdit}
                    onChange={(e) => setHeadlineEdit(e.target.value)}
                  />
                  <Textarea
                    label={c('Bio', 'জীবনী')}
                    value={bioEdit}
                    rows={4}
                    onChange={(e) => setBioEdit(e.target.value)}
                  />
                  {/* Skills chips */}
                  <div>
                    <p className="text-small font-medium text-moss-700 mb-2">
                      {c('Skills', 'দক্ষতা')}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {skillsEdit.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1 bg-moss-100 text-moss-700 rounded-sm px-2.5 py-1 text-small"
                        >
                          {skill}
                          <button
                            type="button"
                            aria-label={`Remove ${skill}`}
                            onClick={() => handleRemoveSkill(skill)}
                            className="text-moss-500 hover:text-moss-900 ml-0.5"
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder={c('Add a skill…', 'দক্ষতা যোগ করুন…')}
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddSkill();
                          }
                        }}
                      />
                      <Button
                        variant="secondary"
                        size="md"
                        icon={<Plus size={14} />}
                        iconPosition="left"
                        onClick={handleAddSkill}
                      >
                        {c('Add', 'যোগ করুন')}
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      variant="primary"
                      onClick={() => {
                        setEditMode(false);
                        notify(
                          c(
                            'Profile saved (demo only).',
                            'প্রোফাইল সংরক্ষিত (শুধু ডেমো)।',
                          ),
                        );
                      }}
                    >
                      {c('Save changes', 'পরিবর্তন সংরক্ষণ করুন')}
                    </Button>
                  </div>
                </div>
              )}
            </Card>

            {/* Tab bar */}
            <div className="flex gap-1 border-b border-moss-200">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`min-h-[44px] px-4 text-small font-medium rounded-t-sm transition-colors ${
                    activeTab === tab.key
                      ? 'bg-deep-100 text-deep-700 border-b-2 border-deep-600'
                      : 'text-moss-600 hover:text-moss-900 hover:bg-moss-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            {activeTab === 'about' && (
              <Card variant="flat">
                <p className="text-body text-moss-800 leading-relaxed mb-4">
                  {editMode && !isPublic ? bioEdit : provider.bio}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(editMode && !isPublic ? skillsEdit : provider.skills).map(
                    (skill) => (
                      <span
                        key={skill}
                        className="bg-moss-100 text-moss-700 rounded-sm px-2.5 py-1 text-small"
                      >
                        {skill}
                      </span>
                    ),
                  )}
                </div>
                <Badge tone="info">{provider.id}</Badge>
              </Card>
            )}

            {activeTab === 'portfolio' && (
              <Card variant="flat">
                <h2 className="text-small font-bold text-moss-700 normal-case tracking-wider mb-4">
                  {c('Portfolio', 'পোর্টফোলিও')}
                </h2>
                <div className="flex flex-wrap gap-4">
                  {PORTFOLIO_TILES.map((tile) => (
                    <div
                      key={tile.title}
                      className="w-[160px] bg-mist rounded-md p-4 border border-moss-200"
                    >
                      <div className="h-20 bg-moss-100 rounded-sm mb-3" />
                      <p className="text-small font-medium text-moss-900">
                        {tile.title}
                      </p>
                      <p className="text-caption text-moss-500">
                        {c('Sample work', 'নমুনা কাজ')}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'certificates' && (
              <Card variant="flat">
                <h2 className="text-small font-bold text-moss-700 normal-case tracking-wider mb-4">
                  {c('Certificates', 'সার্টিফিকেট')}
                </h2>
                <div className="divide-y divide-moss-100">
                  {CERT_ROWS.map((cert) => (
                    <div key={cert.name} className="py-3">
                      <p className="text-small font-bold text-moss-900">
                        {cert.name}
                      </p>
                      <p className="text-caption text-moss-500">
                        {cert.issuer} · {cert.year}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === 'reviews' && (
              <Card variant="flat">
                {/* Rating distribution */}
                <h2 className="text-small font-bold text-moss-700 normal-case tracking-wider mb-4">
                  {c('Ratings', 'রেটিং')}
                </h2>
                <div className="space-y-2 mb-6">
                  {REVIEW_DIST.map((row) => (
                    <div key={row.stars} className="flex items-center gap-3">
                      <span className="text-caption text-moss-500 w-4 text-right font-variant-numeric tabular-nums">
                        {row.stars}
                      </span>
                      <Star
                        size={12}
                        className="fill-amber-400 text-amber-400 shrink-0"
                      />
                      <div className="flex-1 h-2 bg-moss-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-deep-600 rounded-full"
                          style={{
                            width: `${Math.round((row.count / totalDist) * 100)}%`,
                          }}
                        />
                      </div>
                      <span className="text-caption text-moss-400 w-5 font-variant-numeric tabular-nums">
                        {row.count}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Review rows */}
                <div className="space-y-5">
                  {SAMPLE_REVIEWS.map((review) => (
                    <div key={review.name} className="flex gap-3">
                      <Avatar initials={review.initials} size="sm" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <strong className="text-small font-bold text-moss-900">
                            {review.name}
                          </strong>
                          <Rating rating={review.rating} compact />
                          <span className="text-caption text-moss-400">
                            {review.date}
                          </span>
                        </div>
                        <p className="text-small text-moss-700">
                          {review.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-72 shrink-0 space-y-4">
            {/* At a glance */}
            <Card variant="flat">
              <h2 className="text-small font-bold text-moss-700 normal-case tracking-wider mb-3">
                {c('At a glance', 'এক নজরে')}
              </h2>
              <dl className="text-small divide-y divide-moss-100">
                <div className="flex justify-between py-2.5">
                  <dt className="text-moss-500">{c('Rating', 'রেটিং')}</dt>
                  <dd className="font-medium text-moss-900 font-variant-numeric tabular-nums">
                    ★ {provider.rating.toFixed(1)} · {totalReviews}{' '}
                    {c('reviews', 'রিভিউ')}
                  </dd>
                </div>
                <div className="flex justify-between py-2.5">
                  <dt className="text-moss-500">
                    {c('Jobs completed', 'সম্পন্ন কাজ')}
                  </dt>
                  <dd className="font-medium text-moss-900 font-variant-numeric tabular-nums">
                    {provider.completed}
                  </dd>
                </div>
                <div className="flex justify-between py-2.5">
                  <dt className="text-moss-500">
                    {c('Starting price', 'শুরুর মূল্য')}
                  </dt>
                  <dd className="font-medium text-moss-900 font-variant-numeric tabular-nums">
                    {format(provider.price)}
                  </dd>
                </div>
                <div className="flex justify-between py-2.5">
                  <dt className="text-moss-500">
                    {c('Response time', 'সাড়া দেওয়ার সময়')}
                  </dt>
                  <dd className="font-medium text-moss-900">
                    {c('< 2 hours', '< ২ ঘণ্টা')}
                  </dd>
                </div>
              </dl>
            </Card>

            {/* Invite to job CTA — public only */}
            {isPublic && (
              <Link to="/client/new">
                <Button variant="primary" className="w-full">
                  {c('Invite to a job', 'কাজে আমন্ত্রণ জানান')}
                </Button>
              </Link>
            )}

            {/* Shield notice */}
            <div className="flex items-start gap-2.5 text-caption text-moss-600 bg-mist p-3.5 rounded-md border border-moss-200">
              <ShieldCheck
                size={16}
                className="text-deep-600 shrink-0 mt-0.5"
              />
              <p>
                {c(
                  'Verified, with limits. No phone numbers or identity documents appear on this profile.',
                  'যাচাইকৃত, সীমাবদ্ধতা সহ। এই প্রোফাইলে কোনো ফোন নম্বর বা পরিচয় নথি দেখানো হয় না।',
                )}
              </p>
            </div>

            {/* Level badge explanation */}
            <Card variant="flat">
              <p className="text-caption text-moss-600 leading-relaxed">
                <span className="font-bold text-moss-900 block mb-1">
                  {c('Verification levels', 'যাচাইকরণের স্তর')}
                </span>
                {c(
                  'L1: Phone confirmed. L2: Phone + ID reviewed. L3: Phone + ID + skill assessment. Higher levels unlock more visibility and trust.',
                  'এল১: ফোন নিশ্চিত। এল২: ফোন + আইডি পর্যালোচিত। এল৩: ফোন + আইডি + দক্ষতা মূল্যায়ন। উচ্চতর স্তরে বেশি দৃশ্যমানতা ও বিশ্বাস।',
                )}
              </p>
            </Card>
          </div>
        </div>
      </LayoutContainer>
    </div>
  );
}
