import { useState } from 'react';
import { UserCheck, ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';
import { LayoutContainer } from '../../components/layout/LayoutContainer';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Avatar } from '../../components/ui/Avatar';
import { Badge } from '../../components/ui/Badge';
import { Checkbox, Textarea } from '../../components/ui/Input';
import { useApp, useCopy } from '../../app/context';

type VerifTab = 'level1' | 'level2' | 'level3';

interface VerifItem {
  id: string;
  name: string;
  initials: string;
  date: string;
  docType: string;
  level: number;
}

const VERIF_DATA: Record<VerifTab, VerifItem[]> = {
  level1: [
    {
      id: 'v-101',
      name: 'Tanvir Hossain',
      initials: 'TH',
      date: 'Today, 2:15 PM',
      docType: 'Selfie + Phone SMS',
      level: 1,
    },
    {
      id: 'v-102',
      name: 'Nusrat Jahan',
      initials: 'NJ',
      date: 'Yesterday',
      docType: 'Selfie + Phone SMS',
      level: 1,
    },
  ],
  level2: [
    {
      id: 'v-201',
      name: 'Farhana Akter',
      initials: 'FA',
      date: 'Today, 10:45 AM',
      docType: 'Smart National ID (NID)',
      level: 2,
    },
    {
      id: 'v-202',
      name: 'Kamal Ahmed',
      initials: 'KA',
      date: 'Oct 29, 2026',
      docType: 'Smart National ID (NID)',
      level: 2,
    },
    {
      id: 'v-203',
      name: 'Sadia Rahman',
      initials: 'SR',
      date: 'Oct 28, 2026',
      docType: 'Smart National ID (NID)',
      level: 2,
    },
  ],
  level3: [
    {
      id: 'v-301',
      name: 'Zubair Hossain',
      initials: 'ZH',
      date: 'Today, 11:20 AM',
      docType: 'UI/UX Training Certificate + Portfolio',
      level: 3,
    },
    {
      id: 'v-302',
      name: 'Anika Tabassum',
      initials: 'AT',
      date: 'Oct 30, 2026',
      docType: 'Python Web Development Diploma',
      level: 3,
    },
  ],
};

export function AdminVerification() {
  const { notify } = useApp();
  const c = useCopy();

  const [activeTab, setActiveTab] = useState<VerifTab>('level2');
  const items = VERIF_DATA[activeTab];
  const [selectedItem, setSelectedItem] = useState<VerifItem | null>(
    items[0] ?? null,
  );

  // Verification Checklist state
  const [faceMatches, setFaceMatches] = useState(false);
  const [docNotExpired, setDocNotExpired] = useState(false);
  const [nameMatches, setNameMatches] = useState(false);
  const [notes, setNotes] = useState('');

  const handleDecision = (decision: 'approved' | 'rejected') => {
    if (!selectedItem) return;
    notify(
      c(
        `Provider ${selectedItem.name} ${decision} for Level ${selectedItem.level}.`,
        `প্রোভাইডার ${selectedItem.name} লেভেল ${selectedItem.level}-এর জন্য ${decision === 'approved' ? 'অনুমোদিত' : 'প্রত্যাখ্যাত'} হয়েছে।`,
      ),
    );
    setSelectedItem(null);
    setFaceMatches(false);
    setDocNotExpired(false);
    setNameMatches(false);
    setNotes('');
  };

  return (
    <div className="w-full py-8">
      <LayoutContainer variant="app">
        {/* Header */}
        <div className="pb-4 mb-6 border-b border-moss-200">
          <div className="flex items-center gap-2 mb-1">
            <UserCheck size={20} className="text-deep-600" />
            <h1 className="text-h3 font-bold text-moss-900 tracking-tight">
              {c(
                'Identity & Credential Verification',
                'পরিচয় ও যোগ্যতা যাচাই পর্যালোচনা',
              )}
            </h1>
          </div>
          <p className="text-small text-moss-600">
            {c(
              'Secure internal review of government identity documents and skill credentials. Downloads are disabled by policy.',
              'সরকারি পরিচয়পত্র ও সনদের অভ্যন্তরীণ পর্যালোচনা। নীতিমালা অনুযায়ী ডাউনলোড নিষ্ক্রিয় রাখা হয়েছে।',
            )}
          </p>
        </div>

        {/* Tab switcher: Level 1, 2, 3 */}
        <div className="flex gap-2 border-b border-moss-200 mb-6">
          <button
            onClick={() => {
              setActiveTab('level1');
              setSelectedItem(VERIF_DATA.level1[0] ?? null);
            }}
            className={`min-h-[44px] px-4 text-small font-medium rounded-t-sm transition-colors ${
              activeTab === 'level1'
                ? 'bg-deep-100 text-deep-700 border-b-2 border-deep-600 font-bold'
                : 'text-moss-600 hover:text-moss-900'
            }`}
          >
            {c('Level 1: Phone & Selfie', 'লেভেল ১: ফোন ও সেলফি')} (
            {VERIF_DATA.level1.length})
          </button>
          <button
            onClick={() => {
              setActiveTab('level2');
              setSelectedItem(VERIF_DATA.level2[0] ?? null);
            }}
            className={`min-h-[44px] px-4 text-small font-medium rounded-t-sm transition-colors ${
              activeTab === 'level2'
                ? 'bg-deep-100 text-deep-700 border-b-2 border-deep-600 font-bold'
                : 'text-moss-600 hover:text-moss-900'
            }`}
          >
            {c('Level 2: National ID', 'লেভেল ২: জাতীয় পরিচয়পত্র')} (
            {VERIF_DATA.level2.length})
          </button>
          <button
            onClick={() => {
              setActiveTab('level3');
              setSelectedItem(VERIF_DATA.level3[0] ?? null);
            }}
            className={`min-h-[44px] px-4 text-small font-medium rounded-t-sm transition-colors ${
              activeTab === 'level3'
                ? 'bg-deep-100 text-deep-700 border-b-2 border-deep-600 font-bold'
                : 'text-moss-600 hover:text-moss-900'
            }`}
          >
            {c('Level 3: Skill Credential', 'লেভেল ৩: দক্ষতা ও সনদ')} (
            {VERIF_DATA.level3.length})
          </button>
        </div>

        {/* 2-Pane Review Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Queue list (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-md border border-moss-200 shadow-e1 overflow-hidden">
            <div className="p-3 bg-mist border-b border-moss-200 text-caption font-bold text-moss-700">
              {c('SUBMISSIONS AWAITING AUDIT', 'অপেক্ষারত আবেদনসমূহ')}
            </div>
            <div className="divide-y divide-moss-100">
              {items.map((it) => {
                const isSelected = selectedItem?.id === it.id;
                return (
                  <div
                    key={it.id}
                    onClick={() => setSelectedItem(it)}
                    className={`p-4 cursor-pointer transition-colors flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-deep-50/70 border-l-4 border-l-deep-600'
                        : 'hover:bg-mist/40'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar initials={it.initials} size="md" />
                      <div className="min-w-0">
                        <strong className="text-small font-bold text-moss-900 truncate block">
                          {it.name}
                        </strong>
                        <p className="text-caption text-moss-500 truncate">
                          {it.docType}
                        </p>
                        <span className="text-caption text-moss-400 font-variant-numeric tabular-nums block mt-0.5">
                          {it.date}
                        </span>
                      </div>
                    </div>
                    <Badge tone="warning">{c('Inspect', 'পর্যবেক্ষণ')}</Badge>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Inspection & Decision Card (7 cols) */}
          <div className="lg:col-span-7">
            {selectedItem ? (
              <Card variant="flat" className="space-y-5">
                <div className="flex items-center justify-between border-b border-moss-100 pb-3">
                  <div>
                    <h2 className="text-h4 font-bold text-moss-900">
                      {selectedItem.name}
                    </h2>
                    <span className="text-caption text-moss-500">
                      {selectedItem.docType} · Level {selectedItem.level}{' '}
                      applicant
                    </span>
                  </div>
                  <Badge tone="neutral">{selectedItem.id}</Badge>
                </div>

                {/* Secure Image Preview Placeholder (No download) */}
                <div className="space-y-2">
                  <div className="h-52 bg-moss-900 text-white rounded-sm flex flex-col items-center justify-center p-6 text-center border border-moss-800 relative select-none">
                    <Lock size={24} className="text-mint-400 mb-2 opacity-80" />
                    <strong className="text-small font-bold">
                      {c(
                        'Encrypted Document Render',
                        'এনক্রিপ্টেড নথি প্রদর্শন',
                      )}
                    </strong>
                    <p className="text-caption text-moss-300 max-w-sm mt-1">
                      {c(
                        'Smart National ID front & back preview rendered in protected canvas buffer.',
                        'স্মার্ট এনআইডির উভয় পাশের প্রিভিউ সুরক্ষিত বাফারে প্রদর্শিত হচ্ছে।',
                      )}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-caption text-moss-500 px-1">
                    <span className="flex items-center gap-1">
                      <ShieldCheck size={14} className="text-deep-600" />
                      {c(
                        'Right-click and file downloads disabled',
                        'ডাউনলোড সম্পূর্ণ নিষিদ্ধ',
                      )}
                    </span>
                    <span>MD5: 8f4b…19e2</span>
                  </div>
                </div>

                {/* Checklist */}
                <div className="p-4 bg-mist rounded-sm border border-moss-200 space-y-3">
                  <span className="text-caption font-bold text-moss-700 uppercase tracking-wider block">
                    {c('Compliance Audit Checklist', 'সম্মতি যাচাইকরণ তালিকা')}
                  </span>
                  <div className="space-y-2.5">
                    <Checkbox
                      label={c(
                        'Live camera selfie matches identity card photo',
                        'লাইভ সেলফির চেহারা পরিচয়পত্রের ছবির সাথে মিলেছে',
                      )}
                      checked={faceMatches}
                      onChange={setFaceMatches}
                    />
                    <Checkbox
                      label={c(
                        'Document shows unexpired validity and clear government seals',
                        'নথিটির মেয়াদ রয়েছে ও সরকারি সিলমোহর স্পষ্ট',
                      )}
                      checked={docNotExpired}
                      onChange={setDocNotExpired}
                    />
                    <Checkbox
                      label={c(
                        'Full legal name matches mobile wallet registration (+880)',
                        'পূর্ণ আইনি নাম মোবাইল ওয়ালেট রেজিস্ট্রেশনের সাথে মিলেছে',
                      )}
                      checked={nameMatches}
                      onChange={setNameMatches}
                    />
                  </div>
                </div>

                {/* Notes & Actions */}
                <Textarea
                  label={c(
                    'Reviewer internal remarks',
                    'পর্যবেক্ষকের অভ্যন্তরীণ মন্তব্য',
                  )}
                  placeholder={c(
                    'Notes on resolution, document clarity or discrepancies…',
                    'নথির স্পষ্টতা বা কোনো গরমিল সম্পর্কিত তথ্য…',
                  )}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                />

                <div className="flex items-center justify-between pt-2 border-t border-moss-100">
                  <button
                    type="button"
                    onClick={() => handleDecision('rejected')}
                    className="px-4 py-2 text-small font-medium rounded-sm border border-red-300 text-red-700 bg-red-50 hover:bg-red-100 transition-colors"
                  >
                    {c('Reject submission', 'আবেদন প্রত্যাখ্যান')}
                  </button>

                  <Button
                    variant="primary"
                    disabled={!faceMatches || !docNotExpired || !nameMatches}
                    onClick={() => handleDecision('approved')}
                  >
                    {c('Approve & issue badge', 'অনুমোদন ও ব্যাজ প্রদান')}
                  </Button>
                </div>
              </Card>
            ) : (
              <Card variant="flat" className="p-8 text-center text-moss-500">
                <CheckCircle2 size={32} className="mx-auto mb-2 opacity-40" />
                <p className="text-small font-medium">
                  {c(
                    'Select a submission to review.',
                    'পর্যালোচনার জন্য আবেদন নির্বাচন করুন।',
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
