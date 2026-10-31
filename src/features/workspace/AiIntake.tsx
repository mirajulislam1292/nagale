import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Send, Paperclip, ArrowRight, ShieldCheck, Edit2 } from 'lucide-react';
import { LayoutContainer } from '../../components/layout/LayoutContainer';
import { Button } from '../../components/ui/Button';
import {
  Input,
  Select,
  MoneyInput,
  SegmentedControl,
} from '../../components/ui/Input';
import { Logo } from '../../components/ui/Logo';
import { JobBriefCard } from '../../components/ui/JobBriefCard';
import { MaskingNotice } from '../../components/ui/MarketplaceComponents';
import { parseBriefInput, type ParsedBrief } from '../landing/briefParser';
import { createGig, maskContacts } from '../../api/marketplace';
import { useApp, useCopy } from '../../app/context';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
}

export function AiIntake() {
  const [params] = useSearchParams();
  const c = useCopy();
  const nav = useNavigate();
  const { notify } = useApp();

  const initialBrief =
    sessionStorage.getItem('nagale.brief') || params.get('category') || '';

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [maskingNudge, setMaskingNudge] = useState(false);
  const [manualEditMode, setManualEditMode] = useState(false);

  // Chat conversation history
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'm-init',
      sender: 'ai',
      text: c(
        'Hello Mahim. Describe what you need accomplished. I will structure it into a verified brief and match providers.',
        'স্বাগতম মাহিম। আপনার কী কাজ প্রয়োজন তা বলুন। আমি কাজের বিবরণ তৈরি করে উপযুক্ত সেবাদাতাদের সাথে যুক্ত করব।',
      ),
    },
  ]);

  // Live parsed brief
  const [brief, setBrief] = useState<ParsedBrief>(() =>
    parseBriefInput(initialBrief || 'Write my graduate CV'),
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend = inputMessage) => {
    const text = textToSend.trim();
    if (!text) return;

    // Mask check for phone/contact numbers
    if (maskContacts(text) !== text) {
      setMaskingNudge(true);
    } else {
      setMaskingNudge(false);
    }

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Update parsed brief
    const updated = parseBriefInput(text);
    setBrief((prev) => ({
      ...prev,
      ...updated,
      title: updated.title || prev.title,
      category: updated.category || prev.category,
      budgetMin: updated.budgetMin || prev.budgetMin,
      budgetMax: updated.budgetMax || prev.budgetMax,
      deadline: updated.deadline || prev.deadline,
    }));

    // AI simulated follow up response
    setTimeout(() => {
      setIsTyping(false);
      let reply = 'Got it. I have updated your brief parameters on the right.';

      if (updated.missingFields.length > 0) {
        reply = `I have captured the core request. Could you confirm your target budget (৳) or expected deadline?`;
      } else {
        reply = `Your brief is ready! We matched 3 verified providers. You can review the details on the right or post now.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: reply,
        },
      ]);
    }, 700);
  };

  const handlePostBrief = async () => {
    try {
      const gig = await createGig({
        title: brief.title || 'Untitled job brief',
        summary:
          brief.title +
          '. ' +
          (brief.area ? `Location: ${brief.area}` : 'Digital service'),
        category: brief.category || 'General',
        type: brief.type,
        budget: brief.budgetMin || 1500,
        deadline: brief.deadline || '3 days',
        area:
          brief.type === 'local'
            ? brief.area || 'Dhanmondi, Dhaka'
            : 'Anywhere in Bangladesh',
      });
      notify('Job posted successfully! Proposals will arrive shortly.');
      sessionStorage.removeItem('nagale.brief');
      nav(`/client/gigs/${gig.id}`);
    } catch (e) {
      notify(e instanceof Error ? e.message : 'Error posting job');
    }
  };

  return (
    <div className="w-full py-8 md:py-10">
      <LayoutContainer variant="app">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-moss-200 gap-4">
          <div>
            <h1 className="text-h3 font-bold text-moss-900 tracking-tight">
              {c('Start with what you need.', 'আপনার প্রয়োজন দিয়ে শুরু করুন।')}
            </h1>
            <p className="text-small text-moss-600">
              {c(
                'Our intake assistant turns your goals into a structured brief with budget, deadline and provider matching.',
                'আপনার লক্ষ্য ও বাজেট অনুযায়ী সুনির্দিষ্ট কাজের বিবরণ তৈরি করুন।',
              )}
            </p>
          </div>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setManualEditMode(!manualEditMode)}
            icon={<Edit2 size={14} />}
          >
            {manualEditMode
              ? c('Switch to chat', 'চ্যাটে ফিরে যান')
              : c('Manual edit mode', 'ম্যানুয়াল এডিট')}
          </Button>
        </div>

        {maskingNudge && (
          <div className="mb-6">
            <MaskingNotice state="nudge" />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Chat Conversation Intake (or Manual Form) */}
          <div className="lg:col-span-7 bg-white border border-moss-200 rounded-md p-4 sm:p-6 shadow-e1">
            {!manualEditMode ? (
              <div className="flex flex-col h-[520px]">
                {/* Chat Message History */}
                <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                  {messages.map((m) => {
                    const isAi = m.sender === 'ai';
                    return (
                      <div
                        key={m.id}
                        className={`flex gap-3 ${isAi ? 'items-start' : 'items-start flex-row-reverse'}`}
                      >
                        {isAi && (
                          <div className="w-8 h-8 rounded-full bg-mist flex items-center justify-center shrink-0 border border-moss-200">
                            <Logo size="mark" accessibleName="Nagale" />
                          </div>
                        )}
                        <div
                          className={`p-3.5 rounded-md text-small max-w-[85%] leading-relaxed ${
                            isAi
                              ? 'bg-mist text-moss-900 border border-moss-200'
                              : 'bg-mint-500 text-moss-900 font-medium'
                          }`}
                        >
                          {m.text}
                        </div>
                      </div>
                    );
                  })}

                  {isTyping && (
                    <div className="flex items-center gap-2 text-caption text-moss-500 py-1">
                      <div className="w-2 h-2 rounded-full bg-deep-600 animate-bounce" />
                      <div className="w-2 h-2 rounded-full bg-deep-600 animate-bounce [animation-delay:0.2s]" />
                      <div className="w-2 h-2 rounded-full bg-deep-600 animate-bounce [animation-delay:0.4s]" />
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Reply Chips */}
                <div className="pt-3 pb-2 flex flex-wrap gap-2 border-t border-moss-100">
                  {[
                    'Budget: ৳1,500',
                    'Budget: ৳3,000',
                    'Within 3 days',
                    'Urgent 24h',
                  ].map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => handleSendMessage(chip)}
                      className="px-2.5 py-1 text-caption bg-mist hover:bg-moss-100 text-moss-700 rounded-sm border border-moss-200 transition-colors"
                    >
                      {chip}
                    </button>
                  ))}
                </div>

                {/* Composer Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2 pt-2 border-t border-moss-100"
                >
                  <button
                    type="button"
                    aria-label="Attach file"
                    className="p-2 text-moss-400 hover:text-moss-700 rounded-sm"
                  >
                    <Paperclip size={18} />
                  </button>
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={c(
                      'Type your answer or task details…',
                      'কাজের বিস্তারিত লিখুন…',
                    )}
                    className="flex-1 min-h-[44px] px-3.5 bg-mist border border-moss-200 rounded-sm text-body text-moss-900 focus:outline-none focus:border-deep-600"
                  />
                  <Button
                    size="md"
                    variant="primary"
                    type="submit"
                    disabled={!inputMessage.trim()}
                  >
                    <Send size={16} />
                  </Button>
                </form>
              </div>
            ) : (
              /* Manual Fallback Form */
              <div className="space-y-4">
                <h3 className="text-lead font-bold text-moss-900 mb-2">
                  {c('Manual Brief Editor', 'ম্যানুয়াল এডিটর')}
                </h3>
                <Input
                  label="Job Title"
                  value={brief.title}
                  onChange={(e) =>
                    setBrief({ ...brief, title: e.target.value })
                  }
                />
                <div className="grid grid-cols-2 gap-4">
                  <Select
                    label="Category"
                    value={brief.category}
                    onChange={(e) =>
                      setBrief({ ...brief, category: e.target.value })
                    }
                    options={[
                      { value: 'CV writing', label: 'CV writing' },
                      { value: 'Web development', label: 'Web development' },
                      { value: 'Design', label: 'Design' },
                      { value: 'Photography', label: 'Photography' },
                      { value: 'Tutoring', label: 'Tutoring' },
                      { value: 'Admin help', label: 'Admin help' },
                      { value: 'Writing', label: 'Writing' },
                    ]}
                  />
                  <div>
                    <label className="block text-small font-medium text-moss-700 mb-1.5">
                      Work Type
                    </label>
                    <SegmentedControl
                      options={[
                        { value: 'digital', label: 'Digital' },
                        { value: 'local', label: 'Local' },
                      ]}
                      value={brief.type}
                      onChange={(t) => setBrief({ ...brief, type: t })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <MoneyInput
                    label="Budget (৳)"
                    value={brief.budgetMin}
                    onChange={(val) =>
                      setBrief({ ...brief, budgetMin: val, budgetMax: val })
                    }
                  />
                  <Input
                    label="Deadline"
                    value={brief.deadline}
                    onChange={(e) =>
                      setBrief({ ...brief, deadline: e.target.value })
                    }
                  />
                </div>

                {brief.type === 'local' && (
                  <Select
                    label="Approximate Area (No exact address in public brief)"
                    value={brief.area || 'Dhanmondi, Dhaka'}
                    onChange={(e) =>
                      setBrief({ ...brief, area: e.target.value })
                    }
                    options={[
                      { value: 'Dhanmondi, Dhaka', label: 'Dhanmondi, Dhaka' },
                      { value: 'Mirpur, Dhaka', label: 'Mirpur, Dhaka' },
                      { value: 'Uttara, Dhaka', label: 'Uttara, Dhaka' },
                      { value: 'Gulshan, Dhaka', label: 'Gulshan, Dhaka' },
                      {
                        value: 'Agrabad, Chattogram',
                        label: 'Agrabad, Chattogram',
                      },
                      {
                        value: 'Zindabazar, Sylhet',
                        label: 'Zindabazar, Sylhet',
                      },
                    ]}
                  />
                )}
              </div>
            )}
          </div>

          {/* Right Column: Live Brief So Far Panel & Confirm Step */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-moss-100">
              <span className="text-caption uppercase tracking-wider text-deep-600 font-bold">
                {c('Brief so far', 'বর্তমান কাজের বিবরণ')}
              </span>
              <span className="text-caption text-moss-500">Live preview</span>
            </div>

            {/* Real JobBriefCard */}
            <JobBriefCard brief={brief} missingFields={brief.missingFields} />

            {/* Privacy notice banner */}
            <div className="p-4 bg-mist rounded-md border border-moss-200 text-caption text-moss-700 space-y-2">
              <div className="flex items-center gap-2 font-bold text-moss-900">
                <ShieldCheck size={16} className="text-deep-600" />
                <span>Privacy & safety contract</span>
              </div>
              <p>
                3 verified providers match your parameters. Exact contact
                details and physical address are shared only after both parties
                accept and escrow is funded.
              </p>
            </div>

            {/* Confirm & Post Button */}
            <Button
              size="lg"
              variant="primary"
              className="w-full"
              onClick={handlePostBrief}
              disabled={!brief.title || !brief.budgetMin}
              icon={<ArrowRight size={18} />}
            >
              {c('Confirm & post brief', 'নিশ্চিত ও পোস্ট করুন')}
            </Button>
          </div>
        </div>
      </LayoutContainer>
    </div>
  );
}
