import { Link } from 'react-router-dom';
import { PanelLeft } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { LayoutContainer } from './LayoutContainer';
import { useApp, useCopy } from '../../app/context';

export function Footer() {
  const { bn, setBn, lite, setLite } = useApp();
  const c = useCopy();

  return (
    <footer className="w-full bg-moss-900 text-white border-t border-moss-800 pt-16 pb-12">
      <LayoutContainer>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-moss-800">
          {/* Brand & mission */}
          <div className="md:col-span-1">
            <Link to="/" aria-label="Nagale home" className="inline-block mb-4">
              <Logo variant="onDark" size="full" accessibleName="Nagale" />
            </Link>
            <p className="text-small text-moss-300 leading-relaxed max-w-xs">
              {c(
                'A Bangladesh-first micro-gig marketplace with held escrow, verified skills and masked communication.',
                'নিরাপদ এসক্রো ও যাচাইকৃত দক্ষতায় বাংলাদেশের স্বাধীন কাজের প্ল্যাটফর্ম।',
              )}
            </p>
          </div>

          {/* Links Column 1: Marketplace */}
          <div>
            <h4 className="text-caption uppercase tracking-wider text-moss-400 font-bold mb-4">
              {c('Platform', 'প্ল্যাটফর্ম')}
            </h4>
            <ul className="space-y-2.5 text-small text-moss-300">
              <li>
                <Link
                  to="/#how-it-works"
                  className="hover:text-white transition-colors"
                >
                  {c('How it works', 'যেভাবে কাজ করে')}
                </Link>
              </li>
              <li>
                <Link
                  to="/#categories"
                  className="hover:text-white transition-colors"
                >
                  {c('Explore categories', 'ক্যাটাগরি দেখুন')}
                </Link>
              </li>
              <li>
                <Link
                  to="/provider"
                  className="hover:text-white transition-colors"
                >
                  {c('Become a provider', 'সেবাদাতা হিসেবে যোগ দিন')}
                </Link>
              </li>
              <li>
                <Link
                  to="/learning"
                  className="hover:text-white transition-colors"
                >
                  {c('Nagale Learning', 'নাগালে লার্নিং')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Trust & Safety */}
          <div>
            <h4 className="text-caption uppercase tracking-wider text-moss-400 font-bold mb-4">
              {c('Trust & Safety', 'নিরাপত্তা ও বিশ্বাস')}
            </h4>
            <ul className="space-y-2.5 text-small text-moss-300">
              <li>
                <Link
                  to="/trust"
                  className="hover:text-white transition-colors"
                >
                  {c('Escrow safeguards', 'এসক্রো সুরক্ষা')}
                </Link>
              </li>
              <li>
                <Link to="/fees" className="hover:text-white transition-colors">
                  {c('Fee transparency', 'স্বচ্ছ ফি হিসাব')}
                </Link>
              </li>
              <li>
                <Link
                  to="/provider/onboarding"
                  className="hover:text-white transition-colors"
                >
                  {c('Verification tiers', 'যাচাইয়ের ধাপ')}
                </Link>
              </li>
              <li>
                <Link
                  to="/support"
                  className="hover:text-white transition-colors"
                >
                  {c('Disputes & Support', 'সহায়তা ও বিরোধ')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 3: Legal & Settings */}
          <div>
            <h4 className="text-caption uppercase tracking-wider text-moss-400 font-bold mb-4">
              {c('Legal & Preferences', 'শর্ত ও নিয়ম')}
            </h4>
            <ul className="space-y-2.5 text-small text-moss-300">
              <li>
                <Link
                  to="/terms"
                  className="hover:text-white transition-colors"
                >
                  {c('Terms of Service', 'ব্যবহারের শর্তাবলী')}
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-white transition-colors"
                >
                  {c('Privacy Policy', 'গোপনীয়তা নীতি')}
                </Link>
              </li>
              <li className="pt-2 flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setBn(!bn)}
                  className="px-2 py-1 text-caption font-bold bg-moss-800 text-moss-200 hover:text-white rounded-sm transition-colors"
                >
                  {bn ? 'English' : 'বাংলা'}
                </button>
                <button
                  type="button"
                  onClick={() => setLite(!lite)}
                  className="inline-flex items-center gap-1.5 text-caption text-moss-300 hover:text-white"
                >
                  <PanelLeft size={14} />
                  <span>Lite mode: {lite ? 'On' : 'Off'}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Demo notice and copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-caption text-moss-400">
          <p>
            {c(
              'Interactive prototype. Profiles, jobs and payments are demonstration data. No real payments are processed.',
              'ইন্টারঅ্যাক্টিভ প্রোটোটাইপ। প্রোফাইল, কাজ এবং পেমেন্ট প্রদর্শনমূলক। এখানে কোন প্রকৃত লেনদেন হয় না।',
            )}
          </p>
          <p>
            © {new Date().getFullYear()} Nagale (নাগালে). All rights reserved.
          </p>
        </div>
      </LayoutContainer>
    </footer>
  );
}
