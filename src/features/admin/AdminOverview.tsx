import { useState, useEffect } from 'react';
import {
  ShieldAlert,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  X,
} from 'lucide-react';
import { LayoutContainer } from '../../components/layout/LayoutContainer';
import { Button } from '../../components/ui/Button';
import { Card, StatTile } from '../../components/ui/Card';
import { RiskBadge, Badge } from '../../components/ui/Badge';
import { Textarea } from '../../components/ui/Input';
import { useMarket, useApp, useCopy } from '../../app/context';
import { reviewCase } from '../../api/marketplace';

export function AdminOverview() {
  const { cases } = useMarket();
  const { notify } = useApp();
  const c = useCopy();

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(
    cases[0]?.id ?? null,
  );
  const [actionReason, setActionReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const openCases = cases.filter((c) => c.status === 'open');
  const highRisk = cases.filter((c) => c.risk === 'high');
  const reviewed = cases.filter((c) => c.status === 'reviewed');

  const selectedCase = cases.find((item) => item.id === selectedCaseId);

  // Keyboard navigation: j/k down/up, Enter to select, Esc to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when typing in textarea or input
      if (['TEXTAREA', 'INPUT'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.key === 'j' || e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => {
          const next = Math.min(prev + 1, cases.length - 1);
          const targetCase = cases[next];
          if (targetCase) setSelectedCaseId(targetCase.id);
          return next;
        });
      } else if (e.key === 'k' || e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => {
          const next = Math.max(prev - 1, 0);
          const targetCase = cases[next];
          if (targetCase) setSelectedCaseId(targetCase.id);
          return next;
        });
      } else if (e.key === 'Escape') {
        setSelectedCaseId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cases]);

  const handleAction = async (
    actionType: 'dismiss' | 'warn' | 'limit' | 'suspend' | 'ban',
  ) => {
    if (!selectedCaseId) return;
    setSubmitting(true);
    try {
      const finalNote = actionReason.trim()
        ? `[${actionType.toUpperCase()}] ${actionReason.trim()}`
        : `[${actionType.toUpperCase()}] Decision recorded by compliance reviewer`;
      await reviewCase(selectedCaseId, finalNote);
      notify(
        c(
          `Action '${actionType}' applied to case ${selectedCaseId}.`,
          `কেস ${selectedCaseId}-এ '${actionType}' ব্যবস্থা গৃহীত হয়েছে।`,
        ),
      );
      setActionReason('');
      setSelectedCaseId(null);
    } catch {
      notify('Failed to record review.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full py-8">
      <LayoutContainer variant="app">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-moss-200 gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ShieldAlert size={20} className="text-amber-600" />
              <h1 className="text-h3 font-bold text-moss-900 tracking-tight">
                {c('Moderation & Risk Queue', 'তদারকি ও ঝুঁকি পর্যালোচনা')}
              </h1>
            </div>
            <p className="text-small text-moss-600">
              {c(
                'AI detects policy violations. Human moderators make final account and payout decisions.',
                'এআই নীতি লঙ্ঘন চিহ্নিত করে; চূড়ান্ত সিদ্ধান্ত মানব মডারেটর গ্রহণ করেন।',
              )}
            </p>
          </div>
          <div className="text-caption text-moss-500 bg-moss-50 px-3 py-1.5 rounded-sm border border-moss-200">
            {c(
              'Keyboard nav: [j/k] navigate · [Esc] close',
              'কীবোর্ড: [j/k] নেভিগেশন · [Esc] বন্ধ',
            )}
          </div>
        </div>

        {/* 3 Stat Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatTile
            label={c('Open cases', 'উন্মুক্ত কেস')}
            value={openCases.length}
            sublabel={c(
              'Awaiting moderator inspection',
              'পর্যবেক্ষণের অপেক্ষায়',
            )}
          />
          <StatTile
            label={c('High risk flags', 'উচ্চ ঝুঁকির ফ্ল্যাগ')}
            value={highRisk.length}
            sublabel={c(
              'Contact sharing or evasion patterns',
              'যোগাযোগ তথ্য বা নীতিমালা পরিহার',
            )}
          />
          <StatTile
            label={c('Reviewed today', 'আজ পর্যালোচিত')}
            value={reviewed.length}
            sublabel={c('Logged audit trail entries', 'অডিট ট্রেইল এন্ট্রি')}
          />
        </div>

        {/* 2-Pane Case Explorer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Panel: Case List (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-md border border-moss-200 shadow-e1 overflow-hidden">
            <div className="p-3.5 bg-mist border-b border-moss-200 flex justify-between items-center text-caption font-bold text-moss-700">
              <span>{c('CASES IN QUEUE', 'সারির কেসসমূহ')}</span>
              <span className="font-variant-numeric tabular-nums">
                {cases.length} {c('total', 'মোট')}
              </span>
            </div>

            <div className="divide-y divide-moss-100">
              {cases.map((cs, idx) => {
                const isSelected = cs.id === selectedCaseId;
                const isFocused = idx === selectedIndex;
                return (
                  <div
                    key={cs.id}
                    onClick={() => {
                      setSelectedIndex(idx);
                      setSelectedCaseId(cs.id);
                    }}
                    className={`p-4 cursor-pointer transition-colors flex items-center justify-between gap-4 ${
                      isSelected
                        ? 'bg-deep-50/70 border-l-4 border-l-deep-600'
                        : isFocused
                          ? 'bg-mist/50'
                          : 'hover:bg-mist/30'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <strong className="text-small font-bold text-moss-900 truncate">
                          {cs.subject}
                        </strong>
                        <span className="text-caption text-moss-400 font-mono">
                          {cs.id}
                        </span>
                      </div>
                      <p className="text-caption text-moss-600 truncate">
                        {cs.reason}
                      </p>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      <RiskBadge level={cs.risk} />
                      <Badge
                        tone={cs.status === 'reviewed' ? 'success' : 'neutral'}
                      >
                        {cs.status}
                      </Badge>
                      <ChevronRight size={16} className="text-moss-400" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Panel: Selected Case Evidence & Actions (5 cols) */}
          <div className="lg:col-span-5">
            {selectedCase ? (
              <Card variant="flat" className="space-y-5">
                <div className="flex justify-between items-start border-b border-moss-100 pb-3">
                  <div>
                    <span className="text-caption font-mono text-moss-500 uppercase tracking-wider block">
                      {selectedCase.id}
                    </span>
                    <h2 className="text-h4 font-bold text-moss-900">
                      {selectedCase.subject}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedCaseId(null)}
                    className="p-1 text-moss-400 hover:text-moss-700 rounded-sm"
                    aria-label="Close case detail"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* AI Detection Summary */}
                <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-sm text-small text-amber-900 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-amber-800">
                    <AlertCircle size={15} />
                    <span>
                      {c(
                        'Automated Inspection Signal',
                        'স্বয়ংক্রিয় শনাক্তকরণ সংকেত',
                      )}
                    </span>
                  </div>
                  <p className="text-caption text-amber-800">
                    {c(
                      'AI flagged: Contact evasion patterns detected in order message payload (phone number sequence disguised with word spacing).',
                      'এআই সংকেত: চ্যাট মেসেজে যোগাযোগ তথ্য আদান-প্রদানের ধরন শনাক্ত হয়েছে (শব্দের ফাঁকে লুকানো ফোন নম্বর)।',
                    )}
                  </p>
                </div>

                {/* Case Details */}
                <div className="text-small space-y-2">
                  <div className="flex justify-between py-1.5 border-b border-moss-100">
                    <span className="text-moss-500">
                      {c('Reported reason', 'অভিযোগের কারণ')}
                    </span>
                    <strong className="text-moss-900">
                      {selectedCase.reason}
                    </strong>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-moss-100">
                    <span className="text-moss-500">
                      {c('Calculated risk', 'নির্ধারিত ঝুঁকি')}
                    </span>
                    <RiskBadge level={selectedCase.risk} />
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-moss-100">
                    <span className="text-moss-500">
                      {c('Current status', 'বর্তমান অবস্থা')}
                    </span>
                    <Badge
                      tone={
                        selectedCase.status === 'reviewed'
                          ? 'success'
                          : 'neutral'
                      }
                    >
                      {selectedCase.status}
                    </Badge>
                  </div>
                </div>

                {/* Moderator Decision Form */}
                <div className="space-y-3 pt-2">
                  <Textarea
                    label={c('Moderator audit notes', 'মডারেটরের অডিট নোট')}
                    placeholder={c(
                      'Reason for dismiss, warning or account limitation…',
                      'নিষ্পত্তি, সতর্কতা বা বিধিনিষেধের যৌক্তিক কারণ…',
                    )}
                    value={actionReason}
                    onChange={(e) => setActionReason(e.target.value)}
                    rows={3}
                  />

                  {/* Actions Row */}
                  <div className="space-y-2">
                    <span className="text-caption font-bold text-moss-600 uppercase tracking-wider block">
                      {c('Execute Decision', 'সিদ্ধান্ত বাস্তবায়ন')}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        disabled={submitting}
                        onClick={() => handleAction('dismiss')}
                      >
                        {c('Dismiss', 'বাতিল')}
                      </Button>
                      <button
                        type="button"
                        disabled={submitting}
                        onClick={() => handleAction('warn')}
                        className="px-3 py-1.5 text-small font-medium rounded-sm border border-amber-300 text-amber-800 bg-amber-50/50 hover:bg-amber-100 transition-colors"
                      >
                        {c('Warn', 'সতর্কতা')}
                      </button>
                      <Button
                        variant="secondary"
                        size="sm"
                        disabled={submitting}
                        onClick={() => handleAction('limit')}
                      >
                        {c('Limit', 'সীমিত')}
                      </Button>
                      <button
                        type="button"
                        disabled={submitting}
                        onClick={() => handleAction('suspend')}
                        className="px-3 py-1.5 text-small font-medium rounded-sm border border-red-300 text-red-700 bg-red-50/50 hover:bg-red-100 transition-colors"
                      >
                        {c('Suspend', 'স্থগিত')}
                      </button>
                      <button
                        type="button"
                        disabled={submitting}
                        onClick={() => handleAction('ban')}
                        className="px-3 py-1.5 text-small font-medium rounded-sm bg-red-50 text-red-700 border border-red-300 hover:bg-red-100 transition-colors"
                      >
                        {c('Ban', 'নিষিদ্ধ')}
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ) : (
              <Card variant="flat" className="p-8 text-center text-moss-500">
                <CheckCircle2 size={32} className="mx-auto mb-2 opacity-40" />
                <p className="text-small font-medium">
                  {c(
                    'Select a case from the queue to view evidence.',
                    'প্রমাণ ও বিস্তারিত দেখতে তালিকা থেকে কেস নির্বাচন করুন।',
                  )}
                </p>
              </Card>
            )}
          </div>
        </div>
      </LayoutContainer>
    </div>
  );
}
