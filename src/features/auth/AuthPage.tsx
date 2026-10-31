import { useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  BriefcaseBusiness,
  UserCheck,
  ShieldCheck,
  Lock,
  MessageSquare,
  Camera,
  RotateCcw,
  Check,
  ArrowRight,
} from 'lucide-react';
import { Logo } from '../../components/ui/Logo';
import { Button } from '../../components/ui/Button';
import { PhoneInput, OtpInput, Input } from '../../components/ui/Input';
import { useApp, useCopy } from '../../app/context';
import type { Role } from '../../types/marketplace';

export function AuthPage() {
  const [params] = useSearchParams();
  const initialMode = params.get('mode') === 'signup' ? 'signup' : 'login';
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [role, setSelectedRole] = useState<Role>('client');

  const { setRole, notify } = useApp();
  const c = useCopy();
  const nav = useNavigate();

  // Multi-step signup state: 1: role, 2: phone, 3: otp, 4: name, 5: selfie (provider only)
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [selfieCaptured, setSelfieCaptured] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Validation
  const handleValidateName = (val: string) => {
    setName(val);
    if (!val.trim()) {
      setNameError('');
      return;
    }
    // Reject phone, email or URL text in display name
    if (
      /\d{4,}/.test(val) ||
      /@/.test(val) ||
      /\.(com|net|org|app|io|bd)/i.test(val)
    ) {
      setNameError('Name cannot contain phone numbers, emails, or links.');
    } else {
      setNameError('');
    }
  };

  const handleOtpSubmit = () => {
    if (otp !== '123456') {
      setOtpError('Invalid code. For this prototype, use demo code 123456.');
      return;
    }
    setOtpError('');
    if (mode === 'login') {
      setRole(role);
      nav(`/${role}`);
    } else {
      setStep(4); // Move to name
    }
  };

  const handleFinishSignup = () => {
    if (nameError || !name.trim()) return;
    setRole(role);
    notify(c('Account created successfully.', 'অ্যাকাউন্ট তৈরি সফল হয়েছে।'));
    nav(`/${role}`);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] w-full flex flex-col lg:flex-row bg-white">
      {/* Left 45% Moss Panel on Desktop */}
      <div className="lg:w-[45%] bg-moss-900 text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-moss-800">
        <div>
          <Logo
            variant="onDark"
            size="full"
            accessibleName="Nagale"
            className="mb-10"
          />

          <h1 className="text-h2 font-bold text-white tracking-tight leading-snug mb-4">
            {c(
              'A serious marketplace for work in Bangladesh.',
              'নিরাপদ ও নির্ভরযোগ্য স্বাধীন কাজের প্ল্যাটফর্ম।',
            )}
          </h1>
          <p className="text-body text-moss-300 leading-relaxed max-w-md mb-12">
            {c(
              'Every job has a funded escrow agreement. Every provider has verified credentials. Every message stays protected.',
              'প্রতিটি কাজে সুরক্ষিত এসক্রো ডিপোজিট, যাচাইকৃত পরিচয় এবং নিরাপদ যোগাযোগ নিশ্চিত করা হয়।',
            )}
          </p>
        </div>

        {/* Quiet Trust Trio */}
        <div className="space-y-4 pt-8 border-t border-moss-800">
          <div className="flex items-center gap-3 text-small text-moss-300">
            <Lock size={18} className="text-mint-300 shrink-0" />
            <span>
              {c(
                'Money held in escrow until approval',
                'অনুমোদনের আগে পর্যন্ত টাকা এসক্রোতে সুরক্ষিত',
              )}
            </span>
          </div>
          <div className="flex items-center gap-3 text-small text-moss-300">
            <ShieldCheck size={18} className="text-mint-300 shrink-0" />
            <span>
              {c(
                'Progressive NID and portfolio verification',
                'এনআইডি ও কাজের নমুনা ধাপে ধাপে যাচাই',
              )}
            </span>
          </div>
          <div className="flex items-center gap-3 text-small text-moss-300">
            <MessageSquare size={18} className="text-mint-300 shrink-0" />
            <span>
              {c(
                'Masked contact keeps decisions auditable',
                'সুরক্ষিত মেসেজিং উভয় পক্ষের প্রমাণ সংরক্ষণ করে',
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Right Column: Max 400px Form Column */}
      <div className="lg:w-[55%] flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-[400px]">
          {/* Header Switcher */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-moss-100">
            <h2 className="text-lead font-bold text-moss-900">
              {mode === 'login'
                ? c('Sign in to Nagale', 'নাগালে-তে লগইন করুন')
                : c('Create your account', 'নতুন অ্যাকাউন্ট খুলুন')}
            </h2>
            <button
              type="button"
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login');
                setStep(1);
                setOtpError('');
              }}
              className="text-small font-medium text-deep-600 hover:text-moss-900 underline"
            >
              {mode === 'login'
                ? c('Sign up instead', 'অ্যাকাউন্ট খুলুন')
                : c('Log in instead', 'লগইন করুন')}
            </button>
          </div>

          {/* LOGIN FLOW */}
          {mode === 'login' && (
            <div className="space-y-5">
              {/* Role selection */}
              <div>
                <label className="block text-small font-medium text-moss-700 mb-1.5">
                  {c('Workspace role', 'কাজের ভূমিকা')}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedRole('client')}
                    className={`py-2 px-3 rounded-sm border text-small font-medium transition-colors ${
                      role === 'client'
                        ? 'border-deep-600 bg-deep-50 text-deep-700 font-bold'
                        : 'border-moss-200 bg-white text-moss-700 hover:bg-mist'
                    }`}
                  >
                    Client
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole('provider')}
                    className={`py-2 px-3 rounded-sm border text-small font-medium transition-colors ${
                      role === 'provider'
                        ? 'border-deep-600 bg-deep-50 text-deep-700 font-bold'
                        : 'border-moss-200 bg-white text-moss-700 hover:bg-mist'
                    }`}
                  >
                    Provider
                  </button>
                </div>
              </div>

              {step === 1 ? (
                <>
                  <PhoneInput
                    value={phone}
                    onChange={setPhone}
                    label={c('Mobile number', 'মোবাইল নম্বর')}
                    hint={c('11 digits BD mobile', '১১ ডিজিটের মোবাইল নম্বর')}
                  />
                  <Button
                    size="lg"
                    variant="primary"
                    className="w-full"
                    disabled={phone.length < 11}
                    onClick={() => setStep(2)}
                  >
                    {c('Send verification code', 'যাচাই কোড পাঠান')}
                  </Button>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-small font-medium text-moss-700 mb-1.5">
                      {c('6-digit code sent to', 'ভেরিফিকেশন কোড পাঠানো হয়েছে')}{' '}
                      +880 {phone}
                    </label>
                    <OtpInput
                      value={otp}
                      onChange={setOtp}
                      onComplete={handleOtpSubmit}
                    />
                    {otpError && (
                      <p className="text-caption text-status-danger-text font-medium mt-2">
                        {otpError}
                      </p>
                    )}
                  </div>

                  <p className="text-caption text-moss-500 bg-mist p-2.5 rounded-sm">
                    {c('Demo code: use ', 'ডেমো কোড: ব্যবহার করুন ')}
                    <strong className="text-moss-900 font-mono">123456</strong>
                  </p>

                  <div className="flex gap-3">
                    <Button
                      variant="secondary"
                      onClick={() => setStep(1)}
                      className="flex-1"
                    >
                      {c('Back', 'ফিরে যান')}
                    </Button>
                    <Button
                      variant="primary"
                      className="flex-1"
                      disabled={otp.length < 6}
                      onClick={handleOtpSubmit}
                    >
                      {c('Enter workspace', 'ওয়ার্কস্পেসে যান')}
                    </Button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* SIGNUP FLOW */}
          {mode === 'signup' && (
            <div className="space-y-5">
              {/* Step 1: Role Choice as Two Selectable Rows */}
              {step === 1 && (
                <>
                  <div className="space-y-3">
                    <div
                      onClick={() => setSelectedRole('client')}
                      className={`p-4 rounded-md border-2 cursor-pointer transition-all flex items-start gap-3 ${
                        role === 'client'
                          ? 'border-deep-600 bg-deep-50/50 shadow-e1'
                          : 'border-moss-200 hover:border-moss-300 bg-white'
                      }`}
                    >
                      <div className="w-9 h-9 rounded-full bg-deep-100 text-deep-700 flex items-center justify-center shrink-0 mt-0.5">
                        <BriefcaseBusiness size={18} />
                      </div>
                      <div>
                        <strong className="text-small font-bold text-moss-900 block">
                          {c(
                            'I need work done (Client)',
                            'আমার কাজ করানো প্রয়োজন (ক্লায়েন্ট)',
                          )}
                        </strong>
                        <p className="text-caption text-moss-600 mt-0.5">
                          Post briefs, compare proposals, fund securely in
                          escrow and review work.
                        </p>
                      </div>
                    </div>

                    <div
                      onClick={() => setSelectedRole('provider')}
                      className={`p-4 rounded-md border-2 cursor-pointer transition-all flex items-start gap-3 ${
                        role === 'provider'
                          ? 'border-deep-600 bg-deep-50/50 shadow-e1'
                          : 'border-moss-200 hover:border-moss-300 bg-white'
                      }`}
                    >
                      <div className="w-9 h-9 rounded-full bg-deep-100 text-deep-700 flex items-center justify-center shrink-0 mt-0.5">
                        <UserCheck size={18} />
                      </div>
                      <div>
                        <strong className="text-small font-bold text-moss-900 block">
                          {c(
                            'I want to do work (Provider)',
                            'আমি কাজ করতে চাই (সেবাদাতা)',
                          )}
                        </strong>
                        <p className="text-caption text-moss-600 mt-0.5">
                          Bid on matched tasks, deliver quality results and
                          receive direct bKash/Nagad payouts.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    variant="primary"
                    className="w-full"
                    onClick={() => setStep(2)}
                    icon={<ArrowRight size={16} />}
                  >
                    {c('Continue', 'এগিয়ে যান')}
                  </Button>
                </>
              )}

              {/* Step 2: Phone Input */}
              {step === 2 && (
                <>
                  <PhoneInput
                    value={phone}
                    onChange={setPhone}
                    label={c('Your mobile number', 'আপনার মোবাইল নম্বর')}
                    hint={c(
                      'Standard Bangladesh mobile number',
                      '১১ ডিজিটের মোবাইল নম্বর',
                    )}
                  />
                  <div className="flex gap-3">
                    <Button
                      variant="secondary"
                      onClick={() => setStep(1)}
                      className="flex-1"
                    >
                      {c('Back', 'ফিরে যান')}
                    </Button>
                    <Button
                      variant="primary"
                      className="flex-1"
                      disabled={phone.length < 11}
                      onClick={() => setStep(3)}
                    >
                      {c('Next', 'পরবর্তী')}
                    </Button>
                  </div>
                </>
              )}

              {/* Step 3: OTP Input */}
              {step === 3 && (
                <>
                  <div>
                    <label className="block text-small font-medium text-moss-700 mb-1.5">
                      {c('Enter 6-digit code', '৬ ডিজিটের কোড দিন')}
                    </label>
                    <OtpInput
                      value={otp}
                      onChange={setOtp}
                      onComplete={handleOtpSubmit}
                    />
                    {otpError && (
                      <p className="text-caption text-status-danger-text font-medium mt-2">
                        {otpError}
                      </p>
                    )}
                  </div>

                  <p className="text-caption text-moss-500 bg-mist p-2.5 rounded-sm">
                    {c('Demo code: use ', 'ডেমো কোড: ব্যবহার করুন ')}
                    <strong className="text-moss-900 font-mono">123456</strong>
                  </p>

                  <div className="flex gap-3">
                    <Button
                      variant="secondary"
                      onClick={() => setStep(2)}
                      className="flex-1"
                    >
                      {c('Back', 'ফিরে যান')}
                    </Button>
                    <Button
                      variant="primary"
                      className="flex-1"
                      disabled={otp.length < 6}
                      onClick={handleOtpSubmit}
                    >
                      {c('Verify code', 'কোড যাচাই করুন')}
                    </Button>
                  </div>
                </>
              )}

              {/* Step 4: Display Name */}
              {step === 4 && (
                <>
                  <Input
                    label={c('Full display name', 'আপনার পুরো নাম')}
                    placeholder="e.g. Mahim Rahman"
                    value={name}
                    onChange={(e) => handleValidateName(e.target.value)}
                    error={nameError}
                    hint="Your real name for client agreements."
                  />

                  <Button
                    size="lg"
                    variant="primary"
                    className="w-full"
                    disabled={!name.trim() || Boolean(nameError)}
                    onClick={() => {
                      if (role === 'provider') {
                        setStep(5); // Provider selfie verification step
                      } else {
                        handleFinishSignup();
                      }
                    }}
                  >
                    {role === 'provider'
                      ? c('Continue to selfie step', 'সেলফি ধাপে যান')
                      : c('Finish signup', 'সম্পূর্ণ করুন')}
                  </Button>
                </>
              )}

              {/* Step 5: Provider Selfie Step */}
              {step === 5 && role === 'provider' && (
                <div className="space-y-4">
                  <span className="text-caption text-deep-600 font-bold uppercase tracking-wider block">
                    Level 1 Provider Check
                  </span>
                  <h3 className="text-lead font-bold text-moss-900">
                    {c('Live selfie verification', 'লাইভ সেলফি যাচাই')}
                  </h3>

                  {/* Oval Guide Overlay Box */}
                  <div className="relative w-full aspect-[4/3] bg-moss-900 rounded-md overflow-hidden flex flex-col items-center justify-center p-4">
                    {selfieCaptured ? (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <img
                          src={selfieCaptured}
                          alt="Captured selfie preview"
                          className="max-h-full rounded-sm object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setSelfieCaptured(null)}
                          className="absolute bottom-2 right-2 p-2 bg-moss-800 text-white rounded-sm text-caption flex items-center gap-1 shadow-sm"
                        >
                          <RotateCcw size={14} />
                          <span>Retake</span>
                        </button>
                      </div>
                    ) : (
                      <>
                        {/* Oval guide border */}
                        <div className="w-36 h-48 rounded-[50%] border-2 border-dashed border-mint-300 opacity-80 mb-3 flex items-center justify-center">
                          <Camera size={28} className="text-mint-300" />
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          capture="user"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              const file = e.target.files[0];
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                setSelfieCaptured(
                                  event.target?.result as string,
                                );
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() => fileInputRef.current?.click()}
                          icon={<Camera size={16} />}
                        >
                          Capture photo
                        </Button>
                      </>
                    )}
                  </div>

                  {/* Three-line checklist */}
                  <ul className="text-caption text-moss-600 space-y-1.5 pt-2">
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-deep-600" />
                      <span>Face clearly visible in good lighting</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-deep-600" />
                      <span>No sunglasses, masks, or hats</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-deep-600" />
                      <span>Natural expression facing forward</span>
                    </li>
                  </ul>

                  {/* Privacy contract disclosure */}
                  <p className="text-caption text-moss-500 bg-mist p-2.5 rounded-sm">
                    {c(
                      'Privacy guarantee: Your verification selfie is reviewed securely by compliance staff and is never displayed on your public profile.',
                      'গোপনীয়তার নিশ্চয়তা: আপনার সেলফি শুধুমাত্র ভেরিফিকেশনের জন্য ব্যবহৃত হবে এবং প্রোফাইলে কখনোই দেখানো হবে না।',
                    )}
                  </p>

                  <div className="flex gap-3 pt-2">
                    <Button
                      variant="secondary"
                      onClick={() => setStep(4)}
                      className="flex-1"
                    >
                      {c('Back', 'ফিরে যান')}
                    </Button>
                    <Button
                      variant="primary"
                      className="flex-1"
                      disabled={!selfieCaptured}
                      onClick={handleFinishSignup}
                    >
                      {c('Confirm & Finish', 'যাচাই সম্পন্ন করুন')}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
