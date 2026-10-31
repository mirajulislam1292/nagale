// The signature brand device: the logo's "( • )" radiating concentric arcs.
// RULE: Used ONLY on (a) hero backdrop anchored to prompt box, (b) provider CTA band, (c) 404 page.
// Drawn as thin SVG line pattern in mint-300 / moss-700 at 8-14% opacity.
export function ArcsPattern({
  variant = 'hero',
  className = '',
}: {
  variant?: 'hero' | 'cta' | 'error';
  className?: string;
}) {
  const isHero = variant === 'hero';
  const isCta = variant === 'cta';

  // Opacity 8% to 14% as required
  const strokeColor = isCta ? '#0C2A24' : '#8DE5C7'; // moss-900 or mint-300
  const opacity = isHero ? 0.11 : isCta ? 0.09 : 0.12;

  return (
    <div
      className={`arcs-pattern pointer-events-none absolute inset-0 overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke={strokeColor} strokeOpacity={opacity} strokeWidth="1.25">
          {/* Central dot */}
          <circle
            cx="600"
            cy="400"
            r="3.5"
            fill={strokeColor}
            fillOpacity={opacity * 1.5}
          />

          {/* Left radiating arcs */}
          <path d="M 570 370 A 42 42 0 0 0 570 430" />
          <path d="M 540 340 A 85 85 0 0 0 540 460" />
          <path d="M 500 300 A 140 140 0 0 0 500 500" />
          <path d="M 450 250 A 210 210 0 0 0 450 550" />
          <path d="M 390 190 A 295 295 0 0 0 390 610" />
          <path d="M 320 120 A 395 395 0 0 0 320 680" />
          <path d="M 240 40 A 510 510 0 0 0 240 760" />
          <path d="M 150 -50 A 640 640 0 0 0 150 850" />

          {/* Right radiating arcs */}
          <path d="M 630 370 A 42 42 0 0 1 630 430" />
          <path d="M 660 340 A 85 85 0 0 1 660 460" />
          <path d="M 700 300 A 140 140 0 0 1 700 500" />
          <path d="M 750 250 A 210 210 0 0 1 750 550" />
          <path d="M 810 190 A 295 295 0 0 1 810 610" />
          <path d="M 880 120 A 395 395 0 0 1 880 680" />
          <path d="M 960 40 A 510 510 0 0 1 960 760" />
          <path d="M 1050 -50 A 640 640 0 0 1 1050 850" />
        </g>
      </svg>
    </div>
  );
}
