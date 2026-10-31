interface LogoProps {
  variant?: 'onLight' | 'onDark';
  size?: 'mark' | 'full';
  accessibleName: string;
}

// WHY: The supplied full lockup has no dark-surface variant. Its original
// artwork stays on its original surface instead of recoloring the wordmark.
export function Logo({
  variant = 'onLight',
  size = 'full',
  accessibleName,
}: LogoProps) {
  const source =
    size === 'mark'
      ? 'logo-mark.svg'
      : variant === 'onDark'
        ? 'logo-mint-on-moss.svg'
        : 'logo-mint-on-white.svg';
  return (
    <span className={`logo logo--${size} logo--${variant}`}>
      <img
        src={`/brand/${source}`}
        alt={accessibleName}
        width={size === 'mark' ? 40 : 144}
        height={size === 'mark' ? 40 : 50}
      />
    </span>
  );
}
