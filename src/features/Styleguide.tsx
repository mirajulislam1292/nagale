import { demoDate } from '../mocks/seed';
import {
  formatDate,
  formatBDT,
  statusLabel,
  proposalCount,
} from '../lib/format';
import { tokens } from '../lib/tokens';
import { useState } from 'react';
import { Lock, Search, ShieldAlert } from 'lucide-react';
import { LayoutContainer } from '../components/layout/LayoutContainer';
import { Button, IconButton } from '../components/ui/Button';
import {
  Badge,
  VerifiedBadge,
  DigitalBadge,
  LocalBadge,
  EscrowBadge,
  RiskBadge,
  OrderStatusBadge,
} from '../components/ui/Badge';
import {
  Input,
  Textarea,
  Select,
  PhoneInput,
  OtpInput,
  MoneyInput,
  Checkbox,
  Switch,
  SegmentedControl,
} from '../components/ui/Input';
import { Card, StatTile } from '../components/ui/Card';
import { Avatar, Rating } from '../components/ui/Avatar';
import { FileDropzone } from '../components/ui/FileDropzone';
import {
  Toast,
  Skeleton,
  EmptyState,
  ErrorState,
  Modal,
} from '../components/ui/Feedback';
import { OrderTimeline } from '../components/ui/OrderTimeline';
import { JobBriefCard } from '../components/ui/JobBriefCard';
import {
  ProposalCard,
  ProposalCompareTable,
} from '../components/ui/ProposalCard';
import {
  FeeBreakdown,
  EscrowSummary,
  DeliveryPreview,
  MaskingNotice,
  MaskedChip,
} from '../components/ui/MarketplaceComponents';
import { Logo } from '../components/ui/Logo';
import { useApp, useCopy } from '../app/context';

export function Component() {
  const { bn, setBn, lite, setLite } = useApp();
  const c = useCopy();

  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('123456');
  const [money, setMoney] = useState(2500);
  const [checked, setChecked] = useState(true);
  const [switchVal, setSwitchVal] = useState(false);
  const [segmented, setSegmented] = useState<'all' | 'digital' | 'local'>(
    'all',
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);

  const sampleProposal = {
    id: 'p-demo',
    providerId: 'nusrat',
    name: 'Nusrat Jahan',
    initials: 'NJ',
    rating: 4.9,
    completedJobs: 38,
    area: 'Dhanmondi, Dhaka',
    price: 1500,
    days: 2,
    message:
      'I can structure your experience into a clean graduate CV with one revision included.',
    verifiedLevel: 2 as const,
  };

  const sampleProposals = [
    sampleProposal,
    {
      id: 'p-demo2',
      providerId: 'farhana',
      name: 'Farhana Akter',
      initials: 'FA',
      rating: 4.8,
      completedJobs: 46,
      area: 'Mirpur, Dhaka',
      price: 1800,
      days: 3,
      message: 'Professional CV layout matching modern recruitment standards.',
      verifiedLevel: 1 as const,
    },
  ];

  return (
    <div className="w-full bg-mist py-12">
      <LayoutContainer>
        {/* Header and Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-moss-200 mb-12 gap-4">
          <div>
            <span className="text-caption tabular-nums normal-case tracking-widest text-deep-600 font-bold">
              Design System Specimen
            </span>
            <h1 className="text-h2 font-bold text-moss-900 tracking-tight">
              {c('Nagale Component Library', 'নাগালে কম্পোনেন্ট লাইব্রেরি')}
            </h1>
            <section
              aria-label="Shared foundation"
              className="my-8 flex flex-wrap gap-6 items-center rounded-md border border-moss-200 p-6"
            >
              <Logo />
              <Logo glyphOnly size="mark" />
              <Logo markSize={24} />
              <span>
                {formatBDT(1500)} · {formatDate(demoDate)} ·{' '}
                {statusLabel('details_unlocked')} · {proposalCount(1)}
              </span>
              <span lang="bn">
                {formatBDT(1500, true)} · {formatDate(demoDate, true)} ·{' '}
                {statusLabel('details_unlocked', true)} ·{' '}
                {proposalCount(3, true)}
              </span>
            </section>
            <p className="text-body text-moss-600 mt-1">
              Every token, primitive, control, and composite widget in English
              and বাংলা.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setBn(!bn)}
              className="px-3 py-1.5 bg-white border border-moss-200 rounded-sm text-small font-bold text-moss-900 shadow-e1 hover:bg-mist"
            >
              Locale: {bn ? 'বাংলা (BN)' : 'English (EN)'}
            </button>
            <button
              onClick={() => setLite(!lite)}
              className="px-3 py-1.5 bg-white border border-moss-200 rounded-sm text-small font-bold text-moss-900 shadow-e1 hover:bg-mist"
            >
              Lite mode: {lite ? 'Active' : 'Off'}
            </button>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-h3">{c('Brand colours', 'ব্র্যান্ডের রং')}</h2>
          <div className="flex gap-4 flex-wrap mt-6">
            {Object.entries({
              Mint: tokens.colors.mint[500],
              Moss: tokens.colors.moss[900],
              Deep: tokens.colors.deep[600],
              Mist: tokens.colors.mist,
            }).map(([name, color]) => (
              <div key={name}>
                <div
                  style={{ backgroundColor: color, width: 64, height: 64 }}
                />
                <p>{name}</p>
                <p>{color}</p>
              </div>
            ))}
          </div>
        </section>
        {/* Section 1: Brand & Logo */}
        <section className="mb-14">
          <h2 className="text-h3 font-bold text-moss-900 mb-6">
            01. Logo & Mark
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card
              variant="flat"
              className="p-6 flex flex-col items-center justify-center gap-3 bg-white"
            >
              <Logo size="full" variant="onLight" accessibleName="Nagale" />
              <span className="text-caption text-moss-500">
                Full Lockup on Light
              </span>
            </Card>
            <Card
              variant="flat"
              className="p-6 flex flex-col items-center justify-center gap-3 bg-moss-900"
            >
              <Logo size="full" variant="onDark" accessibleName="Nagale" />
              <span className="text-caption text-moss-300">
                Full Lockup on Dark
              </span>
            </Card>
            <Card
              variant="flat"
              className="p-6 flex flex-col items-center justify-center gap-3 bg-white"
            >
              <Logo size="mark" accessibleName="Nagale" />
              <span className="text-caption text-moss-500">
                Mark Only (36px)
              </span>
            </Card>
          </div>
        </section>

        {/* Section 2: Typography Scale */}
        <section className="mb-14">
          <h2 className="text-h3 font-bold text-moss-900 mb-6">
            02. Type Scale
          </h2>
          <Card variant="flat" className="p-6 space-y-4">
            <div>
              <span className="text-caption text-moss-400">
                Display 72/76 (Bangla 60/80)
              </span>
              <p className="text-display font-bold text-moss-900 tracking-tight">
                {c('Good work starts here.', 'ভালো কাজের শুরু এখানেই।')}
              </p>
            </div>
            <div>
              <span className="text-caption text-moss-400">H1 56/60</span>
              <p className="text-h1 font-bold text-moss-900">
                {c('Describe the outcome.', 'আপনার কাজের লক্ষ্য বলুন।')}
              </p>
            </div>
            <div>
              <span className="text-caption text-moss-400">H2 40/48</span>
              <p className="text-h2 font-bold text-moss-900">
                {c(
                  'Your money stays held in escrow.',
                  'টাকা এসক্রোতে সুরক্ষিত থাকে।',
                )}
              </p>
            </div>
            <div>
              <span className="text-caption text-moss-400">H3 28/36</span>
              <p className="text-h3 font-bold text-moss-900">
                {c('Agree before you begin.', 'শুরু করার আগে চুক্তিতে আসুন।')}
              </p>
            </div>
            <div>
              <span className="text-caption text-moss-400">Lead 20/30</span>
              <p className="text-lead text-moss-700">
                {c(
                  'Turn your request into a clear brief.',
                  'আপনার অনুরোধ থেকে কাজের বিবরণ তৈরি করুন।',
                )}
              </p>
            </div>
            <div>
              <span className="text-caption text-moss-400">Body 16/26</span>
              <p className="text-body text-moss-700">
                {c(
                  'Post your outcome, receive matched proposals with clear prices, and hold payment safely in escrow.',
                  'আপনার চাহিদা লিখুন, সুনির্দিষ্ট দামের প্রস্তাব পান এবং কাজ দেখে সন্তুষ্ট না হওয়া পর্যন্ত টাকা সুরক্ষিত রাখুন।',
                )}
              </p>
            </div>
            <div>
              <span className="text-caption text-moss-400">
                Small 14/22 & Caption 12/18
              </span>
              <p className="text-small text-moss-600">
                Small UI text for metadata and secondary labels.
              </p>
              <p className="text-caption text-moss-500 font-variant-numeric tabular-nums">
                Caption text: ৳1,500 · 3 days delivery
              </p>
            </div>
          </Card>
        </section>

        {/* Section 3: Buttons & Actions */}
        <section className="mb-14">
          <h2 className="text-h3 font-bold text-moss-900 mb-6">
            03. Buttons & Actions
          </h2>
          <Card variant="flat" className="p-6">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <Button size="lg" variant="primary">
                Primary Mint (52px)
              </Button>
              <Button size="md" variant="primary">
                Primary (44px)
              </Button>
              <Button size="sm" variant="primary">
                Primary (36px)
              </Button>
              <Button size="md" variant="strong">
                Strong Moss
              </Button>
              <Button size="md" variant="secondary">
                Secondary Outline
              </Button>
              <Button size="md" variant="tertiary">
                Tertiary Text
              </Button>
              <Button size="md" variant="primary" disabled>
                Disabled
              </Button>
              <Button size="md" variant="primary" loading>
                Loading
              </Button>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-moss-100">
              <span className="text-caption text-moss-500 mr-2">
                Icon buttons:
              </span>
              <IconButton label="Search" variant="secondary" size="md">
                <Search size={18} />
              </IconButton>
              <IconButton label="Lock" variant="primary" size="md">
                <Lock size={18} />
              </IconButton>
              <IconButton label="Alert" variant="tertiary" size="md">
                <ShieldAlert size={18} />
              </IconButton>
            </div>
          </Card>
        </section>

        {/* Section 4: Badges */}
        <section className="mb-14">
          <h2 className="text-h3 font-bold text-moss-900 mb-6">
            04. Badge Set
          </h2>
          <Card
            variant="flat"
            className="p-6 flex flex-wrap items-center gap-3"
          >
            <VerifiedBadge level={1} />
            <VerifiedBadge level={2} />
            <VerifiedBadge level={3} />
            <DigitalBadge />
            <LocalBadge />
            <EscrowBadge />
            <RiskBadge level="low" />
            <RiskBadge level="medium" />
            <RiskBadge level="high" />
            <OrderStatusBadge status="accepted" label="Awaiting Agreement" />
            <OrderStatusBadge status="delivered" label="Delivered" />
            <OrderStatusBadge status="completed" label="Completed" />
            <Badge tone="neutral">Custom neutral</Badge>
          </Card>
        </section>

        {/* Section 5: Form Inputs */}
        <section className="mb-14">
          <h2 className="text-h3 font-bold text-moss-900 mb-6">
            05. Form Inputs
          </h2>
          <Card variant="flat" className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Standard Input" placeholder="e.g. Mahim Rahman" />
              <Input
                label="Input with Error"
                value="invalid-entry"
                error="Please enter a valid format."
                readOnly
              />
              <Select
                label="Select Dropdown"
                options={[
                  { value: 'cv', label: 'CV writing' },
                  { value: 'web', label: 'Web development' },
                  { value: 'design', label: 'Design' },
                ]}
              />
              <MoneyInput
                label="Money Input (৳ taka)"
                value={money}
                onChange={setMoney}
              />
              <PhoneInput
                label="Phone Input (+880 BD Mobile)"
                value={phone}
                onChange={setPhone}
              />
              <div>
                <label className="block text-small font-medium text-moss-700 mb-1.5">
                  6-Box OTP Input
                </label>
                <OtpInput value={otp} onChange={setOtp} />
              </div>
            </div>

            <Textarea
              label="Textarea"
              rows={3}
              placeholder="Describe your job details here…"
            />

            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-moss-100">
              <Checkbox
                label="Checkbox option"
                checked={checked}
                onChange={setChecked}
              />
              <Switch
                label="Switch toggle"
                checked={switchVal}
                onChange={setSwitchVal}
              />
              <SegmentedControl
                options={[
                  { value: 'all', label: 'All' },
                  { value: 'digital', label: 'Digital' },
                  { value: 'local', label: 'Local' },
                ]}
                value={segmented}
                onChange={setSegmented}
              />
            </div>
          </Card>
        </section>

        {/* Section 6: File Dropzone */}
        <section className="mb-14">
          <h2 className="text-h3 font-bold text-moss-900 mb-6">
            06. File Dropzone
          </h2>
          <Card variant="flat" className="p-6">
            <FileDropzone maxSizeMb={10} onFileSelect={() => {}} />
          </Card>
        </section>

        {/* Section 7: Avatars & Ratings */}
        <section className="mb-14">
          <h2 className="text-h3 font-bold text-moss-900 mb-6">
            07. Avatar & Rating
          </h2>
          <Card
            variant="flat"
            className="p-6 flex flex-wrap items-center gap-6"
          >
            <Avatar initials="MR" size="sm" />
            <Avatar initials="NJ" size="md" />
            <Avatar initials="FA" size="lg" />
            <Avatar initials="TA" size="xl" />
            <div className="border-l border-moss-200 pl-6 space-y-2">
              <Rating rating={4.9} reviewsCount={38} />
              <Rating rating={5.0} compact />
            </div>
          </Card>
        </section>

        {/* Section 8: Cards & StatTiles */}
        <section className="mb-14">
          <h2 className="text-h3 font-bold text-moss-900 mb-6">
            08. Cards & StatTiles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatTile
              label="Active orders"
              value="3"
              sublabel="Across current jobs"
            />
            <StatTile
              label="Payment held"
              value="৳4,500"
              sublabel="2 awaiting delivery"
            />
            <StatTile
              label="Completed jobs"
              value="38"
              sublabel="100% completion rate"
            />
          </div>
        </section>

        {/* Section 9: Order Timeline (6 steps) */}
        <section className="mb-14">
          <h2 className="text-h3 font-bold text-moss-900 mb-6">
            09. Order Timeline (6 Steps)
          </h2>
          <Card variant="flat" className="p-6">
            <OrderTimeline status="details_unlocked" />
          </Card>
        </section>

        {/* Section 10: Marketplace Cards & Previews */}
        <section className="mb-14">
          <h2 className="text-h3 font-bold text-moss-900 mb-6">
            10. Job Brief & Proposals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <JobBriefCard
              brief={{
                title: 'Write a graduate CV for business internship',
                category: 'CV writing',
                type: 'digital',
                budgetMin: 1000,
                budgetMax: 2000,
                deadline: '3 days',
              }}
            />
            <ProposalCard
              proposal={sampleProposal}
              onSelect={() => setCompareOpen(true)}
              onAccept={() => setModalOpen(true)}
            />
          </div>

          {compareOpen && (
            <ProposalCompareTable
              proposals={sampleProposals}
              onChoose={() => setCompareOpen(false)}
              onClose={() => setCompareOpen(false)}
            />
          )}
        </section>

        {/* Section 11: Escrow & Watermarked Delivery Preview */}
        <section className="mb-14">
          <h2 className="text-h3 font-bold text-moss-900 mb-6">
            11. Escrow & Watermark Delivery Preview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EscrowSummary amount={1500} />
            <DeliveryPreview
              title="First Draft CV.pdf"
              notes="Please review the education section structure."
            />
          </div>
        </section>

        {/* Section 12: Masking Notices */}
        <section className="mb-14">
          <h2 className="text-h3 font-bold text-moss-900 mb-6">
            12. Masking States
          </h2>
          <Card variant="flat" className="p-6 space-y-4">
            <MaskingNotice state="nudge" />
            <MaskingNotice state="warning" />
            <MaskingNotice state="soft-block" onEdit={() => {}} />
            <div className="pt-2 flex items-center gap-2">
              <span className="text-small text-moss-600">Masked chips:</span>
              <MaskedChip label="contact hidden" />
              <MaskedChip label="link hidden" />
              <MaskedChip label="handle hidden" />
            </div>
          </Card>
        </section>

        {/* Section 13: Feedback & Dialogs */}
        <section className="mb-14">
          <h2 className="text-h3 font-bold text-moss-900 mb-6">
            13. Feedback, Modals & Empty States
          </h2>
          <div className="space-y-6">
            <Card
              variant="flat"
              className="p-6 flex flex-wrap gap-4 items-center"
            >
              <Button
                size="md"
                variant="secondary"
                onClick={() => setModalOpen(true)}
              >
                Open Modal Sample
              </Button>
              <Button
                size="md"
                variant="secondary"
                onClick={() => setShowToast(true)}
              >
                Trigger Toast
              </Button>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white border border-moss-200 rounded-md space-y-3">
                <span className="text-caption text-moss-500">
                  Skeleton Loaders:
                </span>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
              <EmptyState
                title="No active jobs"
                description="Your posted requests will appear here once submitted."
                action={<Button size="sm">Post a job</Button>}
              />
              <ErrorState
                title="Connection interrupted"
                message="Could not reach the mock gateway. Please check connection."
                onRetry={() => {}}
              />
            </div>
          </div>
        </section>

        {/* Modal component demo */}
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Confirm Order Agreement"
        >
          <div className="space-y-4">
            <p className="text-small text-moss-700 leading-relaxed">
              Accepting Nusrat Jahan's proposal will initiate an order of
              ৳1,500. Funds will be held in escrow until you approve the
              delivered files.
            </p>
            <FeeBreakdown gross={1500} rate={0.1} />
            <div className="flex justify-end gap-3 pt-3">
              <Button variant="secondary" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setModalOpen(false);
                  setShowToast(true);
                }}
              >
                Confirm and fund escrow
              </Button>
            </div>
          </div>
        </Modal>

        {/* Toast demo */}
        {showToast && (
          <Toast
            message="Agreement confirmed. Funds deposited in escrow."
            type="success"
            onDismiss={() => setShowToast(false)}
          />
        )}
      </LayoutContainer>
    </div>
  );
}
