// BACKEND: Create a partner enquiry ticket; this prototype only acknowledges the local form.
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, ShieldCheck, MessageSquare } from 'lucide-react';
import { aboutContent } from '../../content/about';
import { useApp, useMarket, useMoney } from '../../app/context';
import { Logo } from '../../components/ui/Logo';
import { ArcsPattern } from '../../components/ui/ArcsPattern';
import { BriefDemo, GateLinks } from './BriefDemo';
export function Component() {
  const { bn, setBn } = useApp();
  const [sent, setSent] = useState(false);
  const c = aboutContent[bn ? 'bn' : 'en'];
  const { providers, feeRate } = useMarket();
  const money = useMoney();
  const [step, setStep] = useState(0);
  const [amount, setAmount] = useState(2000);
  const [released, setReleased] = useState(false);
  useEffect(() => {
    document.title = bn ? 'নাগালে — পরিচিতি' : 'Nagale — About';
  }, [bn]);
  return (
    <div className="about-page">
      <header className="about-header">
        <div className="about-container">
          <Link to="/" className="gate-brand">
            <Logo size="mark" accessibleName="Nagale" />
            <strong>{bn ? 'নাগালে' : 'Nagale'}</strong>
          </Link>
          <nav>
            <button
              onClick={() => setBn(!bn)}
              aria-label={bn ? 'Switch to English' : 'Switch to Bangla'}
            >
              {bn ? 'EN' : 'বাংলা'}
            </button>
            <Link to="/">{c.login}</Link>
            <Link className="gate-primary" to="/auth?mode=signup">
              {c.start}
            </Link>
          </nav>
        </div>
      </header>
      <main>
        <section className="about-hero about-container">
          <div>
            <h1>{c.headline}</h1>
            <p>{c.lead}</p>
            <Link className="gate-primary" to="/auth?mode=signup">
              {c.start}
            </Link>
          </div>
          <BriefDemo />
        </section>
        <section className="about-section about-container">
          <h2>{c.problemTitle}</h2>
          <div className="about-problems">
            {c.problems.map((p, i) => {
              const Icon = [MessageSquare, Lock, ShieldCheck][i] || Lock;
              return (
                <div key={p}>
                  <Icon size={24} />
                  <h3>{p}</h3>
                </div>
              );
            })}
          </div>
        </section>
        <section className="about-section about-container">
          <h2>{c.processTitle}</h2>
          <div className="about-tabs" role="tablist">
            {c.steps.map((s, i) => (
              <button
                role="tab"
                aria-selected={step === i}
                key={s.title}
                onClick={() => setStep(i)}
              >
                {s.title}
              </button>
            ))}
          </div>
          <div className="about-process" role="tabpanel">
            <h3>{c.steps[step]?.title}</h3>
            <p>{c.steps[step]?.line}</p>
            {step === 0 ? (
              <BriefDemo />
            ) : step === 1 ? (
              <div className="about-matches">
                {providers.slice(0, 3).map((p) => (
                  <div key={p.id}>
                    <span>{p.initials}</span>
                    <strong>{p.name}</strong>
                    <span>{money(p.price)}</span>
                  </div>
                ))}
              </div>
            ) : step === 2 ? (
              <div className="about-payment">
                <Lock size={32} />
                <strong>{money(amount)}</strong>
                <span>{c.trust[0]?.line}</span>
              </div>
            ) : (
              <button
                className="gate-primary"
                disabled={released}
                onClick={() => setReleased(true)}
              >
                {released ? c.released : c.steps[3]?.title}
              </button>
            )}
          </div>
        </section>
        <section className="about-dark">
          <div className="about-container">
            <h2>{c.trustTitle}</h2>
            <div className="about-trust">
              {c.trust.map((x, i) => {
                const Icon = [Lock, ShieldCheck, MessageSquare][i] || Lock;
                return (
                  <div key={x.title}>
                    <Icon size={24} />
                    <div>
                      <h3>{x.title}</h3>
                      <p>{x.line}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <label className="about-slider">
              {c.order}
              <input
                type="range"
                min={500}
                max={50000}
                step={500}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </label>
            <div className="about-figures">
              {[
                [amount, c.order],
                [Math.round(amount * feeRate), c.fee],
                [amount - Math.round(amount * feeRate), c.net],
              ].map(([n, label]) => (
                <div key={label}>
                  <strong>{money(Number(n))}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="about-provider">
          <ArcsPattern variant="cta" />
          <div className="about-container">
            <h2>{c.providerTitle}</h2>
            {c.providerFacts.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <Link className="gate-secondary" to="/auth?mode=signup">
              {c.providerAction}
            </Link>
            <div className="about-feed">
              <strong>{providers[0]?.headline}</strong>
              <span>{c.why}</span>
            </div>
          </div>
        </section>
        <section className="about-section about-container">
          <h2>{c.showcaseTitle}</h2>
          <p className="about-sample">{c.sample}</p>
          <div className="about-profiles">
            {providers.slice(0, 3).map((p) => (
              <Link to={'/p/' + p.id} key={p.id}>
                <span className="about-avatar">{p.initials}</span>
                <strong>{p.name}</strong>
                <ShieldCheck size={20} />
                <span>{p.area.split(',')[0]}</span>
                <b>
                  {new Intl.NumberFormat(bn ? 'bn-BD' : 'en').format(p.rating)}{' '}
                  / 5
                </b>
              </Link>
            ))}
          </div>
        </section>
        <section className="about-learning about-container">
          <h3>{c.learning}</h3>
          <Link to="/learning">{c.learnAction} →</Link>
        </section>
        <section className="about-section about-container">
          <h2>{c.partnerTitle}</h2>
          <form
            className="about-partner"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              e.currentTarget.reset();
            }}
          >
            <label>
              {c.name}
              <input required maxLength={80} />
            </label>
            <label>
              {c.role}
              <select>
                {c.roles.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </label>
            <label>
              {c.message}
              <textarea required maxLength={500} rows={3} />
            </label>
            <button className="gate-primary">{c.send}</button>
            {sent && <p role="status">{c.sent}</p>}
          </form>
        </section>
      </main>
      <footer className="about-footer">
        <div className="about-container">
          <Link to="/">
            <Logo size="mark" accessibleName="Nagale" />
          </Link>
          <nav>
            <GateLinks />
          </nav>
          <p>{c.footer}</p>
        </div>
      </footer>
    </div>
  );
}
