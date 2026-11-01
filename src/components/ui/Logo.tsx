import { useApp } from '../../app/context';
interface LogoProps {
  variant?: 'onLight' | 'onDark';
  size?: 'mark' | 'full';
  accessibleName?: string;
  className?: string;
  glyphOnly?: boolean;
  markSize?: 24 | 32;
}
export function Logo({
  variant = 'onLight',
  size = 'full',
  accessibleName = 'Nagale',
  className = '',
  glyphOnly = false,
  markSize = 32,
}: LogoProps) {
  const { bn } = useApp();
  return (
    <span
      role="img"
      aria-label={accessibleName}
      className={`inline-flex shrink-0 items-center gap-3 ${variant === 'onDark' ? 'text-white' : 'text-moss-900'} ${className}`}
    >
      <svg
        aria-hidden="true"
        width={markSize}
        height={markSize}
        viewBox="0 0 390 390"
        style={{ flexShrink: 0, color: glyphOnly ? 'currentColor' : '#fff' }}
      >
        {!glyphOnly && <rect width="390" height="390" rx="73" fill="#3FD3A2" />}
        <path
          fill="currentColor"
          d="M234.724 195a39.7 39.7 0 0 1-4.69 18.726 39.7 39.7 0 0 1-12.965 14.303 39.7 39.7 0 0 1-14.32 5.931 39.7 39.7 0 0 1-15.499 0 39.7 39.7 0 0 1-17.45-8.253 39.7 39.7 0 0 1-11.5-15.505 39.7 39.7 0 0 1-2.832-19.096 39.7 39.7 0 0 1 4.499-14.832 39.7 39.7 0 0 1 12.964-14.303 39.7 39.7 0 0 1 18.175-6.503 39.7 39.7 0 0 1 22.62 4.499 39.7 39.7 0 0 1 14.303 12.964 39.7 39.7 0 0 1 5.931 14.32 39.7 39.7 0 0 1 .764 7.749"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          style={{ strokeWidth: 34.526 }}
          d="M136.714 110.355a106.9 106.9 0 0 0-38.82 60.438 106.9 106.9 0 0 0 0 48.414 106.9 106.9 0 0 0 25.348 48.065 107 107 0 0 0 13.472 12.373m116.572-169.29a106.9 106.9 0 0 1 30.636 37.488 106.9 106.9 0 0 1 10.265 34.974 106.9 106.9 0 0 1-5.517 48.099 106.9 106.9 0 0 1-17.916 31.742 107 107 0 0 1-17.468 16.987"
        />
      </svg>
      {size === 'full' && (
        <strong
          className={`text-lead font-bold ${bn ? 'font-bengali' : 'font-sans'}`}
        >
          {bn ? 'নাগালে' : 'Nagale'}
        </strong>
      )}
    </span>
  );
}
