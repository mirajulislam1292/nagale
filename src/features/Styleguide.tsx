import { useCopy } from '../app/context';
import { Badge, AsyncButton } from '../components/interface';
export function Component() {
  const c = useCopy();
  return (
    <div className="premium-container styleguide">
      <h1>{c('Interface foundations', 'ইন্টারফেসের ভিত্তি')}</h1>
      <section className="panel">
        <h2>{c('Type scale', 'লেখার মাপ')}</h2>
        <div className="display-specimen">
          {c('Good work starts here.', 'ভালো কাজের শুরু এখানেই।')}
        </div>
        {[40, 28, 20, 16, 14, 12].map((size) => (
          <p style={{ fontSize: size }} key={size}>
            {size} ·{' '}
            {c(
              'A clear brief makes better work.',
              'পরিষ্কার বিবরণে ভালো কাজ হয়।',
            )}
          </p>
        ))}
      </section>
      <section className="panel">
        <h2>{c('Actions', 'করণীয়')}</h2>
        <div className="button-row">
          <button className="button">{c('Primary action', 'মূল কাজ')}</button>
          <button className="button button--moss">
            {c('Strong neutral', 'গাঢ় বোতাম')}
          </button>
          <button className="button button--outline">
            {c('Secondary action', 'বিকল্প কাজ')}
          </button>
          <button disabled className="button">
            {c('Unavailable', 'এখন নয়')}
          </button>
          <AsyncButton onClick={() => new Promise((r) => setTimeout(r, 1200))}>
            {c('Try pending state', 'অপেক্ষার অবস্থা দেখুন')}
          </AsyncButton>
        </div>
      </section>
      <section className="panel">
        <h2>{c('Status', 'অবস্থা')}</h2>
        <div className="button-row">
          <Badge>Digital</Badge>
          <Badge tone="green">Verified</Badge>
          <Badge tone="amber">Needs review</Badge>
        </div>
      </section>
    </div>
  );
}
