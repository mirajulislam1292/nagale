interface LogoProps {
  variant?: 'onLight' | 'onDark';
  size?: 'mark' | 'full';
  accessibleName?: string;
  className?: string;
}

// WHY: The supplied full lockup has a light surface and a dark surface version.
// Original assets in public/brand are used unchanged.
export function Logo({
  variant = 'onLight',
  size = 'full',
  accessibleName = 'Nagale',
  className = '',
}: LogoProps) {
  const source =
    size === 'mark'
      ? '/brand/logo-mark.svg'
      : variant === 'onDark'
        ? '/brand/logo-mint-on-moss.svg'
        : '/brand/logo-mint-on-white.svg';

  const width = size === 'mark' ? 36 : 144;
  const height = size === 'mark' ? 36 : 48;

  return (
    <span className={`inline-flex items-center flex-shrink-0 ${className}`}>
      <img
        src={source}
        alt={accessibleName}
        width={width}
        height={height}
        loading="eager"
        decoding="async"
        className="block h-auto object-contain"
      />
    </span>
  );
}
