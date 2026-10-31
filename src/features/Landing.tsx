import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  FileText,
  Code2,
  PenTool,
  Languages,
  Camera,
  GraduationCap,
  ClipboardList,
  MapPin,
  ShieldCheck,
  Check,
  Plus,
} from 'lucide-react';
import { useCopy, useMarket, useMoney } from '../app/context';
import { ProviderCard, SectionLink } from '../components/interface';
const categories = [
  ['CV & documents', 'সিভি ও ডকুমেন্ট', FileText],
  ['Web development', 'ওয়েব ডেভেলপমেন্ট', Code2],
  ['Design & creative', 'ডিজাইন', PenTool],
  ['Writing & translation', 'লেখা ও অনুবাদ', Languages],
  ['Photography', 'ফটোগ্রাফি', Camera],
  ['Tutoring', 'পড়াশোনা', GraduationCap],
  ['Admin & data entry', 'ডেটা এন্ট্রি', ClipboardList],
  ['Local services', 'স্থানীয় সেবা', MapPin],
] as const;
export function Component() {
  const c = useCopy();
  const nav = useNavigate();
  const money = useMoney();
  const { providers } = useMarket();
  const [prompt, setPrompt] = useState('');
  const start = (value = prompt) => {
    sessionStorage.setItem('nagale.brief', value);
    nav('/client/new');
  };
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" />
            {c('For work across Bangladesh', 'বাংলাদেশজুড়ে কাজের জন্য')}
          </p>
          <h1 tabIndex={-1}>
            {c('Tell us what', 'কী কাজ প্রয়োজন,')}
            <br />
            {c('needs doing.', 'বলুন আমাদের।')}
          </h1>
          <p className="hero-description">
            {c(
              'Find the right person for your next task. Describe the work, compare proposals, and agree on a price before you start.',
              'কাজের বিবরণ দিন, প্রস্তাব তুলনা করুন এবং শুরু করার আগে দাম ঠিক করুন।',
            )}
          </p>
          <form
            className="request-box"
            onSubmit={(e) => {
              e.preventDefault();
              start();
            }}
          >
            <label htmlFor="home-brief" className="sr-only">
              {c('Describe your task', 'কাজের বিবরণ')}
            </label>
            <textarea
              id="home-brief"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={c(
                'I need a CV for my first job application…',
                'আমার প্রথম চাকরির জন্য একটি সিভি দরকার…',
              )}
              rows={3}
            />
            <div>
              <span className="small muted">
                {c(
                  'A few words are enough to begin.',
                  'শুরু করতে কয়েকটি কথাই যথেষ্ট।',
                )}
              </span>
              <button className="button">
                {c('Build my brief', 'বিবরণ তৈরি করুন')}
                <ArrowRight size={18} />
              </button>
            </div>
          </form>
          <div className="suggestions">
            <span>{c('Try', 'দেখুন')}</span>
            {['Write my CV', 'Build a website', 'Book a photographer'].map(
              (s) => (
                <button key={s} onClick={() => start(s)}>
                  {s}
                  <Plus size={12} />
                </button>
              ),
            )}
          </div>
        </div>
        <div className="hero-preview">
          <div className="preview-top">
            <span className="small">
              {c(
                'From your idea to a clear brief',
                'আপনার ভাবনা থেকে কাজের বিবরণ',
              )}
            </span>
            <span className="badge badge--green">
              <Check size={12} /> {c('Example', 'উদাহরণ')}
            </span>
          </div>
          <div className="brief-paper">
            <div className="paper-head">
              <FileText size={24} strokeWidth={1.5} />
              <span>01 / {c('Your brief', 'কাজের বিবরণ')}</span>
            </div>
            <h2>
              {c(
                'A CV that gets to the point.',
                'একটি পরিষ্কার, সংক্ষিপ্ত সিভি।',
              )}
            </h2>
            <p className="muted">
              {c(
                'One-page graduate CV, an editable copy, and one round of revisions.',
                'এক পৃষ্ঠার সিভি, এডিট করার কপি ও একবার সংশোধন।',
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
                <dd>{c('Within 3 days', '৩ দিনের মধ্যে')}</dd>
              </div>
              <div>
                <dt>{c('Work type', 'কাজের ধরন')}</dt>
                <dd>{c('Digital', 'ডিজিটাল')}</dd>
              </div>
            </dl>
            <div className="preview-divider" />
            <div className="match-label">
              <span>02 / {c('Compare proposals', 'প্রস্তাব তুলনা করুন')}</span>
              <span className="small muted">{c('Demo', 'ডেমো')}</span>
            </div>
            <div className="mini-person">
              <span className="avatar">NJ</span>
              <div>
                <strong>
                  Nusrat Jahan <ShieldCheck size={14} />
                </strong>
                <span>
                  {c(
                    'CV writer · Identity verified',
                    'সিভি লেখক · পরিচয় যাচাই করা',
                  )}
                </span>
              </div>
              <strong>{money(1200)}</strong>
            </div>
            <div className="mini-person">
              <span className="avatar avatar--light">FA</span>
              <div>
                <strong>
                  Farhana Akter <ShieldCheck size={14} />
                </strong>
                <span>{c('Document designer', 'ডকুমেন্ট ডিজাইনার')}</span>
              </div>
              <strong>{money(1500)}</strong>
            </div>
          </div>
          <div className="preview-foot">
            <ShieldCheck size={18} />
            <span>
              {c(
                'Payment stays held until you approve the work.',
                'কাজ অনুমোদন না করা পর্যন্ত টাকা সুরক্ষিত থাকে।',
              )}
            </span>
          </div>
        </div>
      </section>
      <section className="category-section section-wrap">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              {c('Start with a task', 'কাজ দিয়ে শুরু করুন')}
            </p>
            <h2>
              {c('What do you need help with?', 'কোন কাজে সাহায্য দরকার?')}
            </h2>
          </div>
          <SectionLink to="/provider">
            {c('Explore all jobs', 'সব কাজ দেখুন')}
          </SectionLink>
        </div>
        <div className="categories">
          {categories.map(([en, bn, Icon], i) => (
            <button onClick={() => start(en)} key={en}>
              <span className="category-number">0{i + 1}</span>
              <Icon size={25} strokeWidth={1.5} />
              <span>{c(en, bn)}</span>
              <ArrowUpRight size={17} />
            </button>
          ))}
        </div>
      </section>
      <section className="process-section">
        <div className="section-wrap process-layout">
          <div>
            <p className="eyebrow">
              {c('A clear way to work', 'কাজ করার সহজ উপায়')}
            </p>
            <h2>
              {c('Agree first.', 'আগে সম্মতি।')}
              <br />
              {c('Then get to work.', 'তারপর কাজ।')}
            </h2>
            <p className="muted">
              {c(
                'Each step stays in your workspace, so both sides know what happens next.',
                'প্রতিটি ধাপ একই জায়গায় থাকে, যাতে দুজনই পরের ধাপ জানতে পারেন।',
              )}
            </p>
            <SectionLink to="/trust">
              {c('How Nagale works', 'নাগালে যেভাবে কাজ করে')}
            </SectionLink>
          </div>
          <div className="steps">
            {[
              [
                c('Describe the job', 'কাজের বিবরণ দিন'),
                c(
                  'Set the scope, budget and deadline. Edit every detail before posting.',
                  'কাজের পরিধি, বাজেট ও সময় ঠিক করুন।',
                ),
              ],
              [
                c('Choose a proposal', 'প্রস্তাব বেছে নিন'),
                c(
                  'Compare experience, price and delivery time. Both sides accept the agreement.',
                  'অভিজ্ঞতা, দাম ও সময় তুলনা করে দুজন সম্মতি দিন।',
                ),
              ],
              [
                c('Fund the order', 'অর্ডারে টাকা রাখুন'),
                c(
                  'Payment is held while the provider works. Keep messages and files together.',
                  'কাজ চলার সময় টাকা সুরক্ষিত থাকে।',
                ),
              ],
              [
                c('Review and approve', 'দেখে অনুমোদন করুন'),
                c(
                  'Check the delivery, request a revision if needed, then release payment.',
                  'কাজ দেখুন, প্রয়োজন হলে সংশোধন চান, তারপর পেমেন্ট ছাড়ুন।',
                ),
              ],
            ].map(([title, body], i) => (
              <div className="step" key={title}>
                <span>0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
                <Check size={18} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-wrap talent-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              {c('People behind the work', 'কাজের পেছনের মানুষ')}
            </p>
            <h2>
              {c('Skills you can look into.', 'দক্ষতা যাচাই করে বেছে নিন।')}
            </h2>
          </div>
          <span className="small muted">
            {c('Sample profiles for the demo', 'ডেমোর নমুনা প্রোফাইল')}
          </span>
        </div>
        <div className="provider-grid">
          {providers.slice(0, 3).map((p) => (
            <ProviderCard key={p.id} provider={p} compact />
          ))}
        </div>
      </section>
      <section className="provider-cta section-wrap">
        <div>
          <p className="eyebrow">
            {c('For independent professionals', 'স্বাধীন পেশাজীবীদের জন্য')}
          </p>
          <h2>{c('Put your skills to work.', 'আপনার দক্ষতায় কাজ করুন।')}</h2>
          <p>
            {c(
              'Build a profile, find relevant tasks and send a proposal with your price.',
              'প্রোফাইল তৈরি করুন, প্রাসঙ্গিক কাজ খুঁজুন ও নিজের দামে প্রস্তাব দিন।',
            )}
          </p>
          <Link to="/provider" className="button button--mint">
            {c('Explore provider dashboard', 'সেবাদাতার ড্যাশবোর্ড দেখুন')}
            <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="cta-job">
          <span className="badge">
            {c('Example matched job', 'মিলে যাওয়া কাজের উদাহরণ')}
          </span>
          <h3>
            {c(
              'Design a presentation for a university project',
              'বিশ্ববিদ্যালয়ের প্রজেক্টের জন্য প্রেজেন্টেশন',
            )}
          </h3>
          <div>
            <span>{c('Design · Digital', 'ডিজাইন · ডিজিটাল')}</span>
            <strong>{money(2500)}</strong>
          </div>
          <p>
            <Check size={16} />
            {c(
              'Matches your design skills',
              'আপনার ডিজাইনের দক্ষতার সঙ্গে মিলে',
            )}
          </p>
        </div>
      </section>
      <section className="learning-strip section-wrap">
        <GraduationCap size={32} strokeWidth={1.5} />
        <div>
          <h3>{c('Make room to learn.', 'শেখার জন্য সময় রাখুন।')}</h3>
          <p>
            {c(
              'Short, practical guides for your first brief, proposal and delivery.',
              'প্রথম কাজের বিবরণ, প্রস্তাব ও ডেলিভারির জন্য ছোট গাইড।',
            )}
          </p>
        </div>
        <SectionLink to="/learning">
          {c('Explore learning', 'শেখার বিষয় দেখুন')}
        </SectionLink>
      </section>
    </>
  );
}
