import { useState } from 'react';
import { ShieldCheck, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { LayoutContainer } from '../../components/layout/LayoutContainer';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { FileDropzone } from '../../components/ui/FileDropzone';
import { useApp, useCopy } from '../../app/context';

export function VerificationPage() {
  const { notify } = useApp();
  const c = useCopy();

  const [step3Status, setStep3Status] = useState<'not_started' | 'in_review'>(
    'not_started',
  );
  const [certName, setCertName] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmitStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    setStep3Status('in_review');
    notify(
      c(
        'Demo verification submitted. No identity document was collected.',
        'ডেমো যাচাইকরণ জমা দেওয়া হয়েছে। কোনো পরিচয় নথি সংরক্ষণ করা হয়নি।',
      ),
    );
  };

  return (
    <div className="w-full py-8 md:py-10">
      <LayoutContainer variant="app">
        {/* Header */}
        <div className="max-w-2xl mb-8">
          <Badge tone="info" className="mb-2">
            {c('Provider Identity & Trust', 'প্রোভাইডার পরিচয় ও বিশ্বাস')}
          </Badge>
          <h1 className="text-h2 font-bold text-moss-900 tracking-tight mb-2">
            {c(
              'Build a profile clients can trust',
              'ক্লায়েন্টদের বিশ্বাসযোগ্য প্রোফাইল তৈরি করুন',
            )}
          </h1>
          <p className="text-body text-moss-600">
            {c(
              'Verification documents stay private. Only your approved badge and level appear on your public profile.',
              'যাচাইকরণ নথিগুলো সম্পূর্ণ গোপন থাকে। শুধুমাত্র অনুমোদিত ব্যাজ ও স্তর আপনার প্রোফাইলে দৃশ্যমান হয়।',
            )}
          </p>
        </div>

        {/* 3 Steps Stack */}
        <div className="max-w-3xl space-y-6">
          {/* Step 1: Phone & selfie */}
          <Card variant="flat" className="relative">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-deep-100 text-deep-700 font-bold text-small flex items-center justify-center shrink-0">
                  01
                </span>
                <div>
                  <h2 className="text-h4 font-bold text-moss-900">
                    {c('Phone & selfie verification', 'ফোন ও সেলফি যাচাইকরণ')}
                  </h2>
                  <p className="text-small text-moss-600 mt-0.5">
                    {c(
                      'Your mobile phone (+880) was verified and real-time live selfie confirmed.',
                      'আপনার মোবাইল ফোন নম্বর (+৮৮০) ও রিয়েল-টাইম লাইভ সেলফি যাচাই সম্পন্ন হয়েছে।',
                    )}
                  </p>
                </div>
              </div>
              <Badge tone="success">
                <span className="flex items-center gap-1">
                  <CheckCircle2 size={12} />
                  {c('Approved', 'অনুমোদিত')}
                </span>
              </Badge>
            </div>
          </Card>

          {/* Step 2: National ID (NID) */}
          <Card variant="flat">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-bold text-small flex items-center justify-center shrink-0">
                  02
                </span>
                <div>
                  <h2 className="text-h4 font-bold text-moss-900">
                    {c(
                      'National ID (Smart NID)',
                      'জাতীয় পরিচয়পত্র (স্মার্ট এনআইডি)',
                    )}
                  </h2>
                  <p className="text-small text-moss-600 mt-0.5">
                    {c(
                      'Official government identity document inspection by human compliance staff.',
                      'দায়িত্বশীল মানব পর্যবেক্ষক দ্বারা সরকারি জাতীয় পরিচয়পত্র পর্যালোচনা।',
                    )}
                  </p>
                </div>
              </div>
              <Badge tone="warning">
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {c('Under review', 'পর্যালোচনাধীন')}
                </span>
              </Badge>
            </div>

            <div className="bg-amber-50/60 border border-amber-200 rounded-sm p-4 text-small text-amber-900 flex items-start gap-3 mt-4">
              <AlertCircle
                size={18}
                className="text-amber-700 shrink-0 mt-0.5"
              />
              <div>
                <strong className="block font-medium">
                  {c('Review in progress', 'পর্যালোচনা চলছে')}
                </strong>
                <p className="text-amber-800 text-caption mt-0.5">
                  {c(
                    'Your documents are being checked against national records. We will notify you within 24 hours. No further action is required.',
                    'আপনার নথি যাচাই করা হচ্ছে। ২৪ ঘণ্টার মধ্যে আপনাকে নোটিফিকেশন পাঠানো হবে। এই মুহূর্তে অন্য কোনো পদক্ষেপের প্রয়োজন নেই।',
                  )}
                </p>
              </div>
            </div>
          </Card>

          {/* Step 3: Skill review */}
          <Card variant="flat">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-moss-100 text-moss-800 font-bold text-small flex items-center justify-center shrink-0">
                  03
                </span>
                <div>
                  <h2 className="text-h4 font-bold text-moss-900">
                    {c(
                      'Skill assessment & certificates',
                      'দক্ষতা মূল্যায়ন ও সার্টিফিকেট',
                    )}
                  </h2>
                  <p className="text-small text-moss-600 mt-0.5">
                    {c(
                      'Share verifiable portfolio samples or training credentials to earn the Level 3 badge.',
                      'লেভেল ৩ ব্যাজ অর্জনের জন্য আপনার কাজের নমুনা বা প্রাতিষ্ঠানিক সার্টিফিকেট যুক্ত করুন।',
                    )}
                  </p>
                </div>
              </div>
              <Badge tone={step3Status === 'in_review' ? 'warning' : 'neutral'}>
                {step3Status === 'in_review'
                  ? c('In review', 'পর্যালোচনাধীন')
                  : c('Not started', 'শুরু হয়নি')}
              </Badge>
            </div>

            {step3Status === 'in_review' ? (
              <div className="bg-deep-50 border border-deep-200 rounded-sm p-4 text-small text-deep-900 flex items-start gap-3">
                <Clock size={18} className="text-deep-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-medium">
                    {c('Work samples submitted', 'নমুনা কাজ জমা হয়েছে')}
                  </strong>
                  <p className="text-deep-800 text-caption mt-0.5">
                    {c(
                      'Our specialist review team is inspecting your portfolio materials.',
                      'আমাদের বিশেষজ্ঞ রিভিউ টিম আপনার পোর্টফোলিও মূল্যায়ন করছে।',
                    )}
                  </p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmitStep3}
                className="space-y-4 pt-2 border-t border-moss-100"
              >
                <Input
                  label={c(
                    'Relevant certificate or course name',
                    'সার্টিফিকেট বা কোর্সের নাম',
                  )}
                  placeholder={c(
                    'e.g. Bangladesh Skills Institute - UI/UX Design',
                    'যেমন: বাংলাদেশ স্কিলস ইনস্টিটিউট - ইউআই ডিজাইন',
                  )}
                  value={certName}
                  onChange={(e) => setCertName(e.target.value)}
                />

                <FileDropzone
                  label={c(
                    'Work samples or certificates (PDF or Image, max 5MB)',
                    'কাজের নমুনা বা সার্টিফিকেট (পিডিএফ বা ছবি, সর্বোচ্চ ৫ মেগাবাইট)',
                  )}
                  accept=".pdf,.png,.jpg,.jpeg"
                  maxSizeMb={5}
                  onFileSelect={(f: File) => setFiles([f])}
                />

                {files.length > 0 && (
                  <p className="text-caption text-moss-600">
                    {files.length} {c('file selected', 'টি ফাইল নির্বাচিত')}
                  </p>
                )}

                <div className="flex justify-end pt-2">
                  <Button type="submit" variant="primary">
                    {c(
                      'Submit for skill review',
                      'দক্ষতা পর্যালোচনার জন্য জমা দিন',
                    )}
                  </Button>
                </div>
              </form>
            )}
          </Card>

          {/* Privacy Guarantee Banner */}
          <div className="p-4 bg-mist rounded-md border border-moss-200 flex items-start gap-3">
            <ShieldCheck size={20} className="text-deep-600 shrink-0 mt-0.5" />
            <div className="text-small text-moss-700 space-y-1">
              <strong className="text-moss-900 font-bold block">
                {c(
                  'Privacy & security contract',
                  'গোপনীয়তা ও নিরাপত্তা চুক্তি',
                )}
              </strong>
              <p>
                {c(
                  'Your NID number and selfie are never displayed back to you or anyone else on Nagale. Only your verified tier status appears on your public profile. Files are held in encrypted cold storage and audited under strict data privacy regulations.',
                  'আপনার জাতীয় পরিচয়পত্র নম্বর বা সেলফি নাগালে কারো কাছে দৃশ্যমান হয় না। শুধুমাত্র যাচাইকরণের স্তর প্রোফাইলে প্রদর্শিত হয়। সমস্ত ফাইল এনক্রিপ্ট করে কঠোর নিরাপত্তা নিয়মে সংরক্ষণ করা হয়।',
                )}
              </p>
            </div>
          </div>
        </div>
      </LayoutContainer>
    </div>
  );
}
