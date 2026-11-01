import { useEffect, useState, useId } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Store,
  GraduationCap,
  Camera,
  ClipboardList,
  Lock,
} from 'lucide-react';
import { useApp, useMarket, useMoney } from '../../app/context';
import { parseBriefInput } from '../landing/briefParser';
import { gateContent, type GateKey } from '../../content/gate';
const options = [
  ['cv', 'Write my CV', FileText],
  ['web', 'Build a shop website', Store],
  ['tutor', 'Maths tuition in Uttara', GraduationCap],
  ['photo', 'Photograph my products', Camera],
  ['visa', 'Visa form help', ClipboardList],
] as const;
export function BriefDemo() {
  const { bn, lite } = useApp();
  const inputId = useId();
  const text = gateContent[bn ? 'bn' : 'en'];
  const { providers } = useMarket();
  const money = useMoney();
  const [input, setInput] = useState('');
  const [parsed, setParsed] = useState('');
  const [interacted, setInteracted] = useState(false);
  const [chosen, setChosen] = useState<number | null>(null);
  const [showProposals, setShowProposals] = useState(false);
  const brief = parseBriefInput(parsed);
  useEffect(() => {
    const timer = setTimeout(() => {
      setParsed(input);
      setChosen(null);
    }, 250);
    return () => clearTimeout(timer);
  }, [input]);
  useEffect(() => {
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (interacted) return;
    if (lite || reduced) {
      setInput(bn ? 'আমার সিভি লিখুন' : 'Write my CV');
      return;
    }
    const timer = setTimeout(
      () => setInput(bn ? 'আমার সিভি লিখুন' : 'Write my CV'),
      1200,
    );
    return () => clearTimeout(timer);
  }, [bn, lite, interacted]);
  useEffect(() => {
    setShowProposals(false);
    const timer = setTimeout(() => setShowProposals(true), lite ? 0 : 240);
    return () => clearTimeout(timer);
  }, [parsed, lite]);
  const update = (value: string) => {
    setInteracted(true);
    setInput(value);
  };
  const remember = () => sessionStorage.setItem('nagale.brief', input);
  return (
    <div
      className="brief-demo"
      onPointerDown={() => setInteracted(true)}
      onFocus={() => setInteracted(true)}
    >
      <div className="demo-chips">
        {options.map(([key, value, Icon]) => (
          <button key={key} onClick={() => update(bn ? text[key] : value)}>
            <Icon size={16} />
            {text[key]}
          </button>
        ))}
      </div>
      <label className="sr-only" htmlFor={inputId}>
        {text.need}
      </label>
      <input
        id={inputId}
        className="demo-input"
        placeholder={text.need}
        value={input}
        onChange={(e) => update(e.target.value)}
        maxLength={180}
      />
      <section
        className="demo-brief"
        aria-label={text.example}
        aria-live="polite"
      >
        <div className="demo-brief-heading">
          <strong>
            {input ? (brief.category ? brief.title : text.unknown) : text.empty}
          </strong>
          {brief.category && <span>{text[brief.type]}</span>}
        </div>
        {brief.category && (
          <>
            <div className="demo-brief-meta">
              <span>
                {text.budget}
                <strong>
                  {money(brief.budgetMin)}
                  {brief.budgetMax !== brief.budgetMin
                    ? '–' + money(brief.budgetMax)
                    : ''}
                </strong>
              </span>
              <span>
                {text.delivery}
                <strong>{brief.deadline.replace('days', text.days)}</strong>
              </span>
            </div>
            {showProposals && chosen === null && (
              <div className="demo-prices">
                {providers.slice(0, 3).map((p, i) => {
                  const price = Math.round(
                    brief.budgetMin +
                      ((brief.budgetMax - brief.budgetMin) * (i + 1)) / 4,
                  );
                  return (
                    <button
                      key={p.id}
                      aria-label={`${text.choose}: ${p.name}, ${money(price)}`}
                      onClick={() => setChosen(price)}
                    >
                      <span>{p.name.split(' ')[0]}</span>
                      <strong>{money(price)}</strong>
                    </button>
                  );
                })}
              </div>
            )}
            {chosen !== null && (
              <div className="demo-held">
                <Lock size={16} />
                <strong>{money(chosen)}</strong>
                <span>{text.held}</span>
              </div>
            )}
          </>
        )}
      </section>
      <div className="demo-caption">
        <span>{text.example}</span>
        <Link
          onClick={remember}
          to="/auth?mode=signup&returnTo=%2Fclient%2Fnew"
        >
          {text.post}
        </Link>
      </div>
    </div>
  );
}
export function GateLinks() {
  const { bn } = useApp();
  const text = gateContent[bn ? 'bn' : 'en'];
  return (
    <>
      {(
        [
          'trust',
          'fees',
          'learning',
          'support',
          'terms',
          'privacy',
        ] as GateKey[]
      ).map((key) => (
        <Link key={key} to={'/' + key}>
          {text[key]}
        </Link>
      ))}
    </>
  );
}
