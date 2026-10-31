import { useState, useEffect, useRef, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Paperclip, Lock, CheckCircle2 } from 'lucide-react';
import { ArcsPattern } from '../../components/ui/ArcsPattern';
import { LayoutContainer } from '../../components/layout/LayoutContainer';
import { Button } from '../../components/ui/Button';
import { JobBriefCard } from '../../components/ui/JobBriefCard';
import {
  ProposalCard,
  type ProposalItem,
} from '../../components/ui/ProposalCard';
import { parseBriefInput, type ParsedBrief } from './briefParser';
import { useApp, useCopy } from '../../app/context';

const SAMPLE_PROPOSALS: ProposalItem[] = [
  {
    id: 'p-nusrat',
    providerId: 'nusrat',
    name: 'Nusrat Jahan',
    initials: 'NJ',
    headline: 'CV writer & career document specialist',
    rating: 4.9,
    completedJobs: 38,
    area: 'Dhanmondi, Dhaka',
    price: 1500,
    days: 2,
    message:
      'I can structure your experience into a clean graduate CV with one revision included.',
    verifiedLevel: 2,
  },
  {
    id: 'p-farhana',
    providerId: 'farhana',
    name: 'Farhana Akter',
    initials: 'FA',
    headline: 'Graphic designer & document specialist',
    rating: 4.9,
    completedJobs: 46,
    area: 'Mirpur, Dhaka',
    price: 1800,
    days: 3,
    message:
      'I will format your CV and prepare an editable version matching modern recruiter standards.',
    verifiedLevel: 1,
  },
  {
    id: 'p-tanvir',
    providerId: 'tanvir',
    name: 'Tanvir Ahmed',
    initials: 'TA',
    headline: 'Frontend & technical document designer',
    rating: 4.8,
    completedJobs: 24,
    area: 'Uttara, Dhaka',
    price: 1400,
    days: 2,
    message:
      'Carefully formatted CV layout with fast turnaround and editable source files.',
    verifiedLevel: 2,
  },
];

const EXAMPLE_CHIPS = [
  { en: 'Write my graduate CV', bn: 'আমার গ্র্যাজুয়েট সিভি লিখুন' },
  { en: 'Build a shop website', bn: 'একটি দোকানের ওয়েবসাইট তৈরি' },
  { en: 'Maths tuition in Uttara', bn: 'উত্তরায় গণিত টিউশন' },
  { en: 'Photograph my products', bn: 'পণ্যগুলোর ছবি তোলা' },
  { en: 'Visa form help', bn: 'ভিসা ফর্ম পূরণে সহায়তা' },
];

export function Hero() {
  const c = useCopy();
  const nav = useNavigate();
  const { bn, lite } = useApp();

  const [prompt, setPrompt] = useState('');
  const [brief, setBrief] = useState<ParsedBrief>(() => parseBriefInput(''));
  const [selectedProposalId, setSelectedProposalId] = useState<string | null>(
    null,
  );
  const [chosenProposal, setChosenProposal] = useState<ProposalItem | null>(
    null,
  );
  const [hasInteracted, setHasInteracted] = useState(false);
  const [attachedFile, setAttachedFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Debounced parsing when user types
  useEffect(() => {
    if (!prompt.trim()) {
      if (
        lite ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        setBrief(parseBriefInput('Write my graduate CV'));
      } else {
        setBrief(parseBriefInput(''));
      }
      return;
    }
    const timer = setTimeout(() => {
      setBrief(parseBriefInput(prompt));
    }, 250);
    return () => clearTimeout(timer);
  }, [prompt, lite]);

  // Auto-typing demo (only once after 1.2s if no interaction, unless reduced-motion or Lite mode)
  useEffect(() => {
    if (lite || hasInteracted) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    const demoText = bn
      ? 'আমার গ্র্যাজুয়েট সিভি লিখুন'
      : 'Write my graduate CV';
    let charIndex = 0;

    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      if (hasInteracted) return;
      interval = setInterval(() => {
        if (hasInteracted || charIndex >= demoText.length) {
          clearInterval(interval);
          return;
        }
        setPrompt(demoText.slice(0, charIndex + 1));
        charIndex++;
      }, 45);

      return () => clearInterval(interval);
    }, 1200);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [hasInteracted, lite, bn]);

  const handleStartInteraction = () => {
    setHasInteracted(true);
  };

  const handleChipClick = (text: string) => {
    setHasInteracted(true);
    setPrompt(text);
    setBrief(parseBriefInput(text));
    setSelectedProposalId(null);
    setChosenProposal(null);
  };

  const handleDescribeSubmit = () => {
    sessionStorage.setItem('nagale.brief', prompt || brief.title);
    nav('/client/new');
  };

  const handleChooseProposal = (proposal: ProposalItem) => {
    setChosenProposal(proposal);
  };

  return (
    <section className="relative w-full min-h-[720px] bg-moss-900 text-white overflow-hidden pt-12 pb-20 md:py-24">
      {/* Signature Concentric Arcs Backdrop radiating from prompt box */}
      <ArcsPattern variant="hero" />

      <LayoutContainer className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column (55%): Display Headline, Supporting, Prompt Box, Chips */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Display Headline */}
            <h1 className="text-display-mobile md:text-display font-bold leading-none tracking-tight text-white mb-6 text-balance">
              {c(
                'Describe a job. Compare proposals.',
                'কাজের বিবরণ দিন। প্রস্তাব তুলনা করুন।',
              )}
            </h1>

            {/* Supporting sentence */}
            <p className="text-lead text-moss-300 font-normal leading-relaxed max-w-xl mb-8">
              {c(
                'Post your outcome, receive matched proposals with clear prices, and hold payment safely in escrow until you approve.',
                'আপনার চাহিদা লিখুন, সুনির্দিষ্ট দামের প্রস্তাব পান এবং কাজ দেখে সন্তুষ্ট না হওয়া পর্যন্ত টাকা এসক্রোতে সুরক্ষিত রাখুন।',
              )}
            </p>

            {/* Prompt Box: White card, Radius 20, Elevation e2 */}
            <div className="w-full bg-white rounded-lg p-5 sm:p-6 shadow-e2 border border-moss-200 text-moss-900 mb-6">
              <label htmlFor="hero-prompt-input" className="sr-only">
                {c('Describe your task', 'আপনার কাজের বিবরণ দিন')}
              </label>
              <textarea
                id="hero-prompt-input"
                rows={3}
                value={prompt}
                onFocus={handleStartInteraction}
                onClick={handleStartInteraction}
                onKeyDown={handleStartInteraction}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                  handleStartInteraction();
                  setPrompt(e.target.value);
                }}
                placeholder={c(
                  'What do you need help with? e.g. Write my graduate CV by Friday for ৳1500',
                  'কোন কাজে সাহায্য প্রয়োজন? যেমন: শুক্রবারের মধ্যে ১৫০০ টাকায় একটি গ্র্যাজুয়েট সিভি তৈরি',
                )}
                className="w-full text-lead text-moss-900 placeholder:text-moss-400 bg-transparent resize-none border-none p-0 focus:outline-none focus:ring-0 leading-relaxed font-sans"
              />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-moss-100 mt-2">
                {/* Attachment trigger */}
                <div className="flex items-center gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setAttachedFile(e.target.files[0].name);
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 text-small text-moss-600 hover:text-moss-900 min-h-[36px]"
                  >
                    <Paperclip size={18} className="text-moss-500" />
                    <span>
                      {attachedFile || c('Attach details', 'ফাইল যুক্ত করুন')}
                    </span>
                  </button>
                </div>

                {/* Primary Mint Action */}
                <Button
                  size="lg"
                  variant="primary"
                  onClick={handleDescribeSubmit}
                  icon={<ArrowRight size={18} />}
                >
                  {c('Describe my job', 'আমার কাজের বিবরণ দিন')}
                </Button>
              </div>
            </div>

            {/* Example chips */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-caption text-moss-400 mr-1 select-none">
                {c('Try an example:', 'উদাহরণ দেখুন:')}
              </span>
              {EXAMPLE_CHIPS.map((chip) => (
                <button
                  key={chip.en}
                  type="button"
                  onClick={() => handleChipClick(bn ? chip.bn : chip.en)}
                  className="px-3 py-1.5 rounded-sm border border-moss-700 hover:border-mint-500 bg-moss-800/60 hover:bg-moss-800 text-caption font-medium text-moss-200 transition-colors"
                >
                  {bn ? chip.bn : chip.en}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column (45%): Live stack of real UI components */}
          <div
            className="lg:col-span-5 w-full flex flex-col gap-4 text-moss-900"
            role="region"
            aria-live="polite"
            aria-label="Live job brief and proposals"
          >
            {/* Real JobBriefCard */}
            {brief.category ? (
              <JobBriefCard
                brief={{
                  title: brief.title || 'Write my graduate CV',
                  category: brief.category || 'CV writing',
                  type: brief.type,
                  budgetMin: brief.budgetMin || 1500,
                  budgetMax: brief.budgetMax || 2000,
                  deadline: brief.deadline || '3 days',
                  area: brief.area,
                }}
                missingFields={brief.missingFields}
                className="transition-all duration-200"
              />
            ) : (
              <div className="p-6 bg-white border border-moss-200 rounded-md">
                <h2 className="text-h3 text-moss-900">
                  {c(
                    'Your brief appears here',
                    'আপনার কাজের বিবরণ এখানে দেখা যাবে',
                  )}
                </h2>
                <p className="text-body text-moss-600 mt-4">
                  {prompt
                    ? c('Needs a little more detail', 'আরেকটু বিস্তারিত বলুন')
                    : c(
                        'Describe your task to begin.',
                        'শুরু করতে আপনার কাজের বিবরণ দিন।',
                      )}
                </p>
              </div>
            )}
            {/* Live Proposals Stack */}
            <div className="flex flex-col gap-3">
              {(brief.category && brief.budgetMin
                ? SAMPLE_PROPOSALS.map((p, i) => ({
                    ...p,
                    price: Math.round(
                      brief.budgetMin +
                        ((brief.budgetMax - brief.budgetMin) * (i + 1)) / 4,
                    ),
                  })).filter(
                    (p) => !chosenProposal || p.id === chosenProposal.id,
                  )
                : []
              ).map((proposal) => {
                const active = chosenProposal
                  ? chosenProposal.id === proposal.id
                  : true;
                if (!active) return null;

                return (
                  <ProposalCard
                    key={proposal.id}
                    proposal={proposal}
                    selected={selectedProposalId === proposal.id}
                    onSelect={(id) =>
                      setSelectedProposalId(
                        selectedProposalId === id ? null : id,
                      )
                    }
                    onAccept={handleChooseProposal}
                    showCompare={!chosenProposal}
                    className="animate-in fade-in slide-in-from-bottom-2 duration-200"
                  />
                );
              })}
            </div>

            {/* Escrow row: when proposal chosen */}
            {chosenProposal && (
              <div className="p-4 bg-moss-800 border border-moss-700 rounded-md text-white flex items-center justify-between gap-3 animate-in fade-in duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-mint-500 text-moss-900 flex items-center justify-center shrink-0">
                    <Lock size={18} />
                  </div>
                  <div>
                    <div className="text-small font-bold text-white font-variant-numeric tabular-nums">
                      ৳{chosenProposal.price.toLocaleString('en-IN')} held until
                      you approve
                    </div>
                    <div className="text-caption text-moss-300">
                      Escrow agreement ready · Funds protected
                    </div>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => nav('/client/orders/N-1042')}
                  icon={<CheckCircle2 size={16} />}
                >
                  Review delivery
                </Button>
              </div>
            )}

            {/* Quiet disclaimer */}
            <p className="text-caption text-moss-500 select-none pt-1">
              {c(
                'Example. Real proposals come from verified providers.',
                'নমুনা প্রদর্শন। প্রকৃত প্রস্তাব যাচাইকৃত সেবাদাতাদের কাছ থেকে আসে।',
              )}
            </p>
          </div>
        </div>
      </LayoutContainer>
    </section>
  );
}
