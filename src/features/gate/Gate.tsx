import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../../components/ui/Logo';
import { ArcsPattern } from '../../components/ui/ArcsPattern';
import { useApp } from '../../app/context';
import { gateContent } from '../../content/gate';
import { BriefDemo, GateLinks } from './BriefDemo';
export function Component() {
  const { bn, setBn, lite, setLite } = useApp();
  const text = gateContent[bn ? 'bn' : 'en'];
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const nav = useNavigate();
  useEffect(() => {
    document.title = bn ? 'নাগালে — লগইন' : 'Nagale — Log in';
  }, [bn]);
  return (
    <div className="gate-screen">
      <ArcsPattern variant="hero" />
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
          <Link to="/about">{text.about}</Link>
        </div>
      </header>
      <main className="gate-main" id="main-content">
        <section className="gate-intro">
          <h1>{text.headline}</h1>
          <BriefDemo />
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
                placeholder="1XXXXXXXXX"
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
          <Link className="gate-secondary" to="/auth?mode=signup">
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
