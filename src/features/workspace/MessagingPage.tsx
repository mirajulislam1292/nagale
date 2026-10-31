import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Send,
  Paperclip,
  ShieldCheck,
  ArrowRight,
  MessagesSquare,
} from 'lucide-react';
import { LayoutContainer } from '../../components/layout/LayoutContainer';
import { Button } from '../../components/ui/Button';
import { Avatar } from '../../components/ui/Avatar';
import {
  MaskingNotice,
  MaskedChip,
} from '../../components/ui/MarketplaceComponents';
import { useMarket, useApp, useCopy } from '../../app/context';
import { sendMessage } from '../../api/marketplace';

export function MessagingPage() {
  const { messages } = useMarket();
  const { role, notify } = useApp();
  const c = useCopy();

  const [activeThreadId, setActiveThreadId] = useState('t-1042');
  const [inputText, setInputMessage] = useState('');
  const [maskingState, setMaskingState] = useState<
    'nudge' | 'warning' | 'soft-block' | null
  >(null);

  // Threads list derived from orders
  const threads = [
    {
      id: 't-1042',
      orderId: 'N-1042',
      title: 'Graduate CV and cover letter',
      counterpart: role === 'provider' ? 'Mahim Rahman' : 'Nusrat Jahan',
      initials: role === 'provider' ? 'MR' : 'NJ',
      lastMessage:
        'Understood. I will share a first draft here for your review.',
      unread: 0,
      time: '09:35',
    },
    {
      id: 't-1041',
      orderId: 'N-1041',
      title: 'Social media launch templates',
      counterpart: role === 'provider' ? 'Mahim Rahman' : 'Farhana Akter',
      initials: role === 'provider' ? 'MR' : 'FA',
      lastMessage: 'Working on the color palette now.',
      unread: 1,
      time: 'Yesterday',
    },
  ];

  const activeThread =
    threads.find((t) => t.id === activeThreadId) ?? threads[0];

  // Guard: no threads (empty state)
  if (!activeThread) {
    return (
      <div className="w-full py-16 flex flex-col items-center justify-center text-center text-moss-500">
        <MessagesSquare size={32} className="mb-3 opacity-40" />
        <p className="text-body font-medium text-moss-700">
          {c('No conversations yet', 'এখনো কোনো বার্তা নেই')}
        </p>
        <p className="text-small mt-1">
          {c(
            'Order conversations appear here once work begins.',
            'কাজ শুরু হলে এখানে অর্ডারের বার্তা দেখা যাবে।',
          )}
        </p>
      </div>
    );
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    try {
      const wasMasked = await sendMessage(inputText);
      setInputMessage('');
      if (wasMasked) {
        setMaskingState('nudge');
      } else {
        setMaskingState(null);
      }
    } catch (err) {
      setMaskingState('soft-block');
      notify(err instanceof Error ? err.message : 'Message held');
    }
  };

  return (
    <div className="w-full py-8">
      <LayoutContainer variant="app">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-moss-200 gap-3">
          <div>
            <h1 className="text-h3 font-bold text-moss-900 tracking-tight">
              {c('Messages & order chat', 'বার্তা ও কথোপকথন')}
            </h1>
            <p className="text-small text-moss-600">
              {c(
                'Keep decisions, files and agreements in one auditable place.',
                'কাজের সমস্ত সিদ্ধান্ত ও ফাইল এক জায়গায় সুরক্ষিত রাখুন।',
              )}
            </p>
          </div>

          {/* Demo trigger controls for masking states */}
          <div className="flex items-center gap-2">
            <span className="text-caption text-moss-500 hidden sm:inline">
              Demo trigger:
            </span>
            <button
              onClick={() => setMaskingState('nudge')}
              className="px-2 py-1 text-caption bg-moss-100 hover:bg-moss-200 rounded-sm font-medium text-moss-700"
            >
              Nudge
            </button>
            <button
              onClick={() => setMaskingState('warning')}
              className="px-2 py-1 text-caption bg-amber-100 hover:bg-amber-200 rounded-sm font-medium text-amber-800"
            >
              Warning
            </button>
            <button
              onClick={() => setMaskingState('soft-block')}
              className="px-2 py-1 text-caption bg-red-100 hover:bg-red-200 rounded-sm font-medium text-red-800"
            >
              Soft Block
            </button>
            {maskingState && (
              <button
                onClick={() => setMaskingState(null)}
                className="px-2 py-1 text-caption text-moss-400 hover:text-moss-700 underline"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Two-Pane Messaging Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 bg-white border border-moss-200 rounded-md shadow-e1 overflow-hidden min-h-[580px]">
          {/* Left Pane: Threads List (340px / 4 cols) */}
          <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-moss-200 flex flex-col justify-between bg-mist/30">
            <div className="p-3 border-b border-moss-100">
              <span className="text-caption font-bold text-moss-500 uppercase tracking-wider block mb-2 px-2">
                Order Conversations
              </span>
              <div className="space-y-1">
                {threads.map((t) => {
                  const isActive = t.id === activeThreadId;
                  return (
                    <div
                      key={t.id}
                      onClick={() => setActiveThreadId(t.id)}
                      className={`p-3 rounded-sm cursor-pointer transition-colors flex items-start gap-3 ${
                        isActive
                          ? 'bg-white shadow-e1 border border-moss-200'
                          : 'hover:bg-mist'
                      }`}
                    >
                      <Avatar initials={t.initials} size="sm" />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-0.5">
                          <strong className="text-small font-bold text-moss-900 truncate">
                            {t.counterpart}
                          </strong>
                          <span className="text-caption text-moss-400 font-variant-numeric tabular-nums">
                            {t.time}
                          </span>
                        </div>
                        <p className="text-caption text-moss-500 truncate">
                          {t.title}
                        </p>
                        <p className="text-caption text-moss-600 truncate mt-1">
                          {t.lastMessage}
                        </p>
                      </div>
                      {t.unread > 0 && (
                        <span className="w-2 h-2 rounded-full bg-deep-600 shrink-0 mt-2" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sidebar Security Notice */}
            <div className="p-4 border-t border-moss-100 bg-white text-caption text-moss-600 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-moss-900">
                <ShieldCheck size={16} className="text-deep-600" />
                <span>Automated contact masking</span>
              </div>
              <p>
                Phone numbers and links are hidden in conversations to preserve
                your official order warranty.
              </p>
            </div>
          </div>

          {/* Right Pane: Active Conversation */}
          <div className="lg:col-span-8 flex flex-col justify-between h-full bg-white">
            {/* Conversation Header */}
            <div className="p-4 border-b border-moss-100 flex items-center justify-between gap-4 bg-white">
              <div className="flex items-center gap-3">
                <Avatar initials={activeThread.initials} size="md" />
                <div>
                  <strong className="text-small font-bold text-moss-900 block">
                    {activeThread.counterpart}
                  </strong>
                  <span className="text-caption text-moss-500">
                    {activeThread.title} · Order {activeThread.orderId}
                  </span>
                </div>
              </div>

              <Link
                to={`/${role}/orders/${activeThread.orderId}`}
                className="text-small font-bold text-deep-600 hover:underline flex items-center gap-1"
              >
                <span>View order workspace</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Active Masking Notice if triggered */}
            {maskingState && (
              <div className="px-6 pt-3">
                <MaskingNotice
                  state={maskingState}
                  onEdit={() => setMaskingState(null)}
                />
              </div>
            )}

            {/* Messages Scroll Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4">
              <div className="text-center my-2">
                <span className="text-caption text-moss-400 bg-mist px-3 py-1 rounded-sm select-none">
                  Today
                </span>
              </div>

              {messages.map((m) => {
                const isOwn = m.sender === 'you';
                return (
                  <div
                    key={m.id}
                    className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`p-3.5 rounded-md text-small max-w-[80%] leading-relaxed ${
                        isOwn
                          ? 'bg-mint-500 text-moss-900 font-medium'
                          : 'bg-mist text-moss-900 border border-moss-200'
                      }`}
                    >
                      {/* Masked chips representation */}
                      {m.body.includes('[contact hidden]') ? (
                        <span>
                          {m.body.replace('[contact hidden]', '')}
                          <MaskedChip label="contact hidden" />
                        </span>
                      ) : (
                        m.body
                      )}
                    </div>
                    <span className="text-[11px] text-moss-400 mt-1 px-1 font-variant-numeric tabular-nums">
                      {m.at}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Message Composer */}
            <form
              onSubmit={handleSend}
              className="p-4 border-t border-moss-100 flex items-center gap-3 bg-white"
            >
              <button
                type="button"
                aria-label="Upload attachment"
                className="p-2 text-moss-400 hover:text-moss-700 rounded-sm"
              >
                <Paperclip size={20} />
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Write a message to your order counterpart…"
                className="flex-1 min-h-[44px] px-3.5 bg-mist border border-moss-200 rounded-sm text-body text-moss-900 focus:outline-none focus:border-deep-600"
              />

              <Button
                size="md"
                variant="primary"
                type="submit"
                disabled={!inputText.trim()}
              >
                <Send size={16} />
              </Button>
            </form>
          </div>
        </div>
      </LayoutContainer>
    </div>
  );
}
