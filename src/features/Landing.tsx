import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  FileText,
  Code2,
  PenTool,
  Languages,
  Camera,
  GraduationCap,
  ClipboardList,
  MapPin,
  ShieldCheck,
  LockKeyhole,
  Paperclip,
  Check,
  UsersRound,
  MessageSquare,
} from 'lucide-react';
import { useCopy, useMarket, useMoney } from '../app/context';
import { ProviderCard, SectionLink } from '../components/interface';
const categories = [
  ['CV & documents', 'সিভি ও ডকুমেন্ট', FileText, 500],
  ['Web development', 'ওয়েব ডেভেলপমেন্ট', Code2, 8000],
  ['Design & creative', 'ডিজাইন', PenTool, 1500],
  ['Writing & translation', 'লেখা ও অনুবাদ', Languages, 500],
  ['Photography', 'ফটোগ্রাফি', Camera, 4000],
  ['Tutoring', 'পড়াশোনা', GraduationCap, 3000],
  ['Admin & data entry', 'ডেটা এন্ট্রি', ClipboardList, 500],
  ['Local services', 'স্থানীয় সেবা', MapPin, 200],
] as const;
export function Component() {
  const c = useCopy();
  const nav = useNavigate();
  const money = useMoney();
  const { providers, feeRate } = useMarket();
  const [prompt, setPrompt] = useState('');
  const [file, setFile] = useState('');
  const start = (value = prompt) => {
    sessionStorage.setItem('nagale.brief', value);
    nav('/client/new');
  };
  return (
    <>
      <section className="premium-hero">
        <div className="premium-container hero-columns">
          <div className="hero-copy">
            <h1 tabIndex={-1}>
              {c('Good work starts here.', 'ভালো কাজের শুরু এখানেই।')}
            </h1>
            <p className="hero-description">
              {c(
                'Describe your task. Find the right person. Keep the work and payment in one place.',
                'কাজের বিবরণ দিন, সঠিক মানুষ খুঁজুন। কাজ ও পেমেন্ট একই জায়গায় রাখুন।',
              )}
            </p>
            <form
              className="request-box"
              onSubmit={(e) => {
                e.preventDefault();
                start();
              }}
            >
              <label className="sr-only" htmlFor="home-brief">
                {c('Describe your task', 'কাজের বিবরণ')}
              </label>
              <textarea
                id="home-brief"
                rows={3}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={c(
                  'What do you need help with?',
                  'কোন কাজে সাহায্য দরকার?',
                )}
              />
              <div>
                <label className="attach-control">
                  <Paperclip size={20} />
                  <span>{file || c('Attach a brief', 'বিবরণ যুক্ত করুন')}</span>
                  <input
                    type="file"
                    accept=".pdf,.txt,.png,.jpg"
                    onChange={(e) => setFile(e.target.files?.[0]?.name || '')}
                  />
                </label>
                <button className="button">
                  {c('Describe my job', 'আমার কাজের বিবরণ দিন')}
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>
            <div className="suggestions">
              {[
                ['Write my CV', 'সিভি লিখুন'],
                ['Build a website', 'ওয়েবসাইট তৈরি'],
                ['Book a photographer', 'ফটোগ্রাফার খুঁজুন'],
              ].map(([en, bn]) => (
                <button key={en} onClick={() => start(en)}>
                  {c(en || '', bn || '')}
                  <ArrowRight size={14} />
                </button>
              ))}
            </div>
          </div>
          <div className="product-stack">
            <div className="stack-brief">
              <div className="stack-heading">
                <FileText size={22} />
                <span>{c('Your job brief', 'কাজের বিবরণ')}</span>
                <span className="badge">{c('Digital', 'ডিজিটাল')}</span>
              </div>
              <h2>
                {c(
                  'A clear, confident graduate CV.',
                  'একটি পরিষ্কার ও সুন্দর সিভি।',
                )}
              </h2>
              <p>
                {c(
                  'One page. Editable copy. One revision.',
                  'এক পৃষ্ঠা। এডিট করার কপি। একবার সংশোধন।',
                )}
              </p>
              <dl className="brief-facts">
                <div>
                  <dt>{c('Budget', 'বাজেট')}</dt>
                  <dd>
                    {money(1000)}–{money(2000)}
                  </dd>
                </div>
                <div>
                  <dt>{c('Delivery', 'ডেলিভারি')}</dt>
                  <dd>{c('3 days', '৩ দিন')}</dd>
                </div>
              </dl>
            </div>
            {providers
              .filter((p) => ['nusrat', 'farhana'].includes(p.id))
              .map((p, i) => (
                <div
                  className={`stack-proposal stack-proposal--${i}`}
                  key={p.id}
                >
                  <span className="avatar">{p.initials}</span>
                  <div>
                    <strong>
                      {p.name}
                      <ShieldCheck size={15} />
                    </strong>
                    <p>
                      {c('Verified provider', 'যাচাই করা সেবাদাতা')} ·{' '}
                      {p.rating}/5
                    </p>
                  </div>
                  <strong>
                    {money(i ? 1500 : 1200)}
                    <small>{c('Proposal', 'প্রস্তাব')}</small>
                  </strong>
                </div>
              ))}
            <p className="stack-caption">
              {c(
                'A brief. Two proposals. Your choice.',
                'একটি বিবরণ। দুটি প্রস্তাব। সিদ্ধান্ত আপনার।',
              )}
            </p>
          </div>
        </div>
      </section>
      <section className="editorial-categories">
        <div className="premium-container">
          <div className="section-heading">
            <h2>
              {c(
                'Find help for the job at hand.',
                'আপনার প্রয়োজনের কাজে সাহায্য নিন।',
              )}
            </h2>
            <SectionLink to="/provider">
              {c('Browse work', 'কাজ দেখুন')}
            </SectionLink>
          </div>
          <div className="editorial-list">
            {categories.map(([en, bn, Icon, price]) => (
              <button key={en} onClick={() => start(en)}>
                <Icon size={24} />
                <span>{c(en, bn)}</span>
                <small>
                  {c('From', 'শুরু')} {money(price)}
                </small>
                <ArrowRight className="category-arrow" size={18} />
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="premium-process premium-container">
        <h2>
          {c('From a task to a job well done.', 'কাজের শুরু থেকে শেষ পর্যন্ত।')}
        </h2>
        <div className="process-sequence">
          {[
            [
              c('Describe', 'বিবরণ দিন'),
              c(
                'Tell us the outcome, your budget and when you need it.',
                'ফলাফল, বাজেট ও সময় বলুন।',
              ),
              <div className="mini-fragment" key="brief">
                <MessageSquare size={18} />
                {c('I need a graduate CV…', 'আমার একটি সিভি দরকার…')}
              </div>,
            ],
            [
              c('Get matched', 'সঠিক মানুষ খুঁজুন'),
              c(
                'Compare relevant providers and agree on a proposal.',
                'প্রাসঙ্গিক প্রস্তাব তুলনা করে সম্মতি দিন।',
              ),
              <div className="mini-fragment" key="match">
                <UsersRound size={18} />
                {c('3 proposals to compare', 'তুলনা করার জন্য ৩টি প্রস্তাব')}
              </div>,
            ],
            [
              c('Pay into escrow', 'টাকা সুরক্ষিত রাখুন'),
              c(
                'Fund the agreed order. Payment stays held while work happens.',
                'কাজ চলার সময় অর্ডারের টাকা সুরক্ষিত থাকে।',
              ),
              <div className="mini-fragment" key="pay">
                <LockKeyhole size={18} />
                {money(2000)} {c('held', 'সুরক্ষিত')}
              </div>,
            ],
            [
              c('Approve and release', 'অনুমোদন ও পেমেন্ট'),
              c(
                'Review the delivery, then release payment when it is ready.',
                'ডেলিভারি দেখে পেমেন্ট ছাড়ুন।',
              ),
              <Link
                className="mini-fragment mini-approval"
                key="approve"
                to="/client/orders/N-1042"
              >
                <Check size={18} />
                {c('Review delivery', 'ডেলিভারি দেখুন')}
              </Link>,
            ],
          ].map(([title, body, fragment], i) => (
            <article key={i}>
              <h3>{title}</h3>
              <p>{body}</p>
              {fragment}
            </article>
          ))}
        </div>
      </section>
      <section className="premium-trust">
        <div className="premium-container">
          <div className="trust-columns">
            <div>
              <h2>
                {c(
                  'Your money stays held until you approve.',
                  'আপনার অনুমোদন পর্যন্ত টাকা সুরক্ষিত।',
                )}
              </h2>
              <SectionLink to="/trust">
                {c('Understand the safeguards', 'সুরক্ষার নিয়ম জানুন')}
              </SectionLink>
            </div>
            <div className="trust-rows">
              {[
                [
                  LockKeyhole,
                  c('Escrow protected', 'টাকা সুরক্ষিত'),
                  c(
                    'Both sides agree before funding. You review before release.',
                    'দুজনের সম্মতির পর টাকা রাখুন। ছাড়ার আগে কাজ দেখুন।',
                  ),
                ],
                [
                  ShieldCheck,
                  c('Verification with clear levels', 'ধাপে ধাপে যাচাই'),
                  c(
                    'Phone and selfie, identity, and skill review are separate checks.',
                    'ফোন ও সেলফি, পরিচয় এবং দক্ষতা আলাদা করে যাচাই হয়।',
                  ),
                ],
                [
                  MessageSquare,
                  c('Contacts stay masked', 'যোগাযোগের তথ্য গোপন'),
                  c(
                    'Keep messages and decisions together in your order.',
                    'বার্তা ও সিদ্ধান্ত অর্ডারের মধ্যেই রাখুন।',
                  ),
                ],
              ].map(([Icon, title, body]) => {
                const I = Icon as typeof ShieldCheck;
                return (
                  <div key={String(title)}>
                    <I size={24} />
                    <section>
                      <h3>{String(title)}</h3>
                      <p>{String(body)}</p>
                    </section>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="fee-moment">
            {[
              [money(2000), c('Order value', 'অর্ডারের মূল্য')],
              [money(Math.round(2000 * feeRate)), c('Nagale fee', 'নাগালে ফি')],
              [
                money(2000 - Math.round(2000 * feeRate)),
                c('To the provider', 'সেবাদাতা পান'),
              ],
            ].map(([value, label]) => (
              <div key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
            <SectionLink to="/fees">
              {c('Calculate your fee', 'আপনার ফি হিসাব করুন')}
            </SectionLink>
          </div>
        </div>
      </section>
      <section className="premium-talent premium-container">
        <div className="section-heading">
          <h2>
            {c(
              'Meet the people behind the work.',
              'কাজের পেছনের মানুষদের দেখুন।',
            )}
          </h2>
          <span className="small muted">
            {c('Sample profiles', 'নমুনা প্রোফাইল')}
          </span>
        </div>
        <div className="provider-grid">
          {providers.slice(0, 3).map((p) => (
            <ProviderCard key={p.id} provider={p} compact />
          ))}
        </div>
      </section>
      <section className="mint-band">
        <div className="premium-container mint-columns">
          <div>
            <h2>
              {c(
                'Make your skills your next opportunity.',
                'আপনার দক্ষতায় পরের সুযোগ তৈরি করুন।',
              )}
            </h2>
            <p>
              {c(
                'Find relevant tasks and send a proposal on your terms.',
                'প্রাসঙ্গিক কাজ খুঁজুন, নিজের শর্তে প্রস্তাব দিন।',
              )}
            </p>
            <Link className="button button--moss" to="/provider">
              {c('Find your next job', 'পরের কাজ খুঁজুন')}
              <ArrowRight size={18} />
            </Link>
          </div>
          <article className="mint-feed">
            <div>
              <PenTool size={24} />
              <span>{c('Design · Digital', 'ডিজাইন · ডিজিটাল')}</span>
              <strong>{money(2500)}</strong>
            </div>
            <h3>
              {c(
                'A presentation for a university project',
                'বিশ্ববিদ্যালয়ের প্রজেক্টের প্রেজেন্টেশন',
              )}
            </h3>
            <p>
              <Check size={16} />
              {c(
                'Why you see this: matches your design skills.',
                'যে কারণে দেখছেন: আপনার ডিজাইনের দক্ষতার সঙ্গে মিলে।',
              )}
            </p>
          </article>
        </div>
      </section>
      <section className="learning-strip premium-container">
        <GraduationCap size={28} />
        <p>
          {c(
            'Build the skills for your next project.',
            'পরের প্রজেক্টের জন্য দক্ষতা বাড়ান।',
          )}
        </p>
        <SectionLink to="/learning">
          {c('Explore learning', 'শেখার বিষয় দেখুন')}
        </SectionLink>
      </section>
    </>
  );
}
