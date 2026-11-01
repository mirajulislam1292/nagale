import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../../components/ui/Logo';
import { ArrowRight } from 'lucide-react';
import { useApp } from '../../app/context';
import { gateContent, gateRoles } from '../../content/gate';
import { GateLinks } from './BriefDemo';
export function Component() {
  const { bn, setBn, lite, setLite } = useApp();
  const text = gateContent[bn ? 'bn' : 'en'];
  const [roleIndex, setRoleIndex] = useState(0);
  const [motion, setMotion] = useState(false);
  const roleCopy = gateRoles[bn ? 'bn' : 'en'][roleIndex === 0 ? 0 : 1];
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setMotion(!lite && !media.matches && !document.hidden);
    sync();
    media.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);
    return () => {
      media.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
    };
  }, [lite]);
  useEffect(() => {
    if (!motion) return;
    const timer = window.setInterval(
      () => setRoleIndex((index) => 1 - index),
      6000,
    );
    return () => window.clearInterval(timer);
  }, [motion]);
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const nav = useNavigate();
  useEffect(() => {
    document.title = bn ? 'নাগালে — লগইন' : 'Nagale — Log in';
  }, [bn]);
  return (
    <div className="gate-screen gate-editorial" data-motion={motion}>
      <div className="gate-orbit-field" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <span
            className="gate-orbit"
            key={i}
            style={{ animationDelay: `${i * -1.5}s` }}
          />
        ))}
        <span className="gate-orbit-dot" />
      </div>
      <header className="gate-header">
        <Link to="/" className="gate-brand">
          <Logo size="mark" accessibleName="Nagale" />
          <strong>{bn ? 'নাগালে' : 'Nagale'}</strong>
        </Link>
        <div>
          <button
            onClick={() => setBn(!bn)}
            aria-label={bn ? 'Switch to English' : 'Switch to Bangla'}
          >
            {bn ? 'EN' : 'বাংলা'}
          </button>
          <Link to="/about" className="gate-about-link">
            {text.about}
            <ArrowRight size={16} />
          </Link>
        </div>
      </header>
      <main className="gate-main" id="main-content">
        <section className="gate-intro">
          <div className="gate-copy-stage">
            <div key={`${bn}-${roleIndex}`} className="gate-flip-copy">
              <h1>{roleCopy.headline}</h1>
              <p className="gate-subtext">{roleCopy.subtext}</p>
            </div>
          </div>
        </section>
        <section className="gate-login">
          <h2>{text.login}</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const normalized = phone
                .replace(/[০-৯]/g, (d) => String('০১২৩৪৫৬৭৮৯'.indexOf(d)))
                .replace(/\D/g, '');
              const full = normalized.startsWith('0')
                ? normalized
                : '0' + normalized;
              if (!/^01[3-9]\d{8}$/.test(full)) {
                setError(text.invalid);
                return;
              }
              sessionStorage.setItem('nagale.loginPhone', full);
              nav('/auth?mode=login');
            }}
          >
            <label className="sr-only" htmlFor="gate-phone">
              {text.phone}
            </label>
            <div className="gate-phone">
              <span>+880</span>
              <input
                id="gate-phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel-national"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setError('');
                }}
                placeholder="1712 345678"
                aria-invalid={!!error}
              />
            </div>
            {error && (
              <p role="alert" className="gate-error">
                {error}
              </p>
            )}
            <button className="gate-primary">{text.continue}</button>
          </form>
          <div className="gate-divider" />
          <Link className="gate-create-link" to="/auth?mode=signup">
            {text.create}
          </Link>
        </section>
      </main>
      <footer className="gate-footer">
        <nav>
          <GateLinks />
        </nav>
        <button aria-pressed={lite} onClick={() => setLite(!lite)}>
          {text.lite}: {lite ? (bn ? 'চালু' : 'On') : bn ? 'বন্ধ' : 'Off'}
        </button>
        <span>© Nagale</span>
      </footer>
    </div>
  );
}
