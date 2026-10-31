import { type HTMLAttributes, type ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: 'flat' | 'raised' | 'moss';
  className?: string;
}

// RULE: Radius 12 for cards. Padding 24 desktop, 16 mobile. Elevation e1 only.
export function Card({
  children,
  variant = 'flat',
  className = '',
  ...props
}: CardProps) {
  const variantClasses = {
    flat: 'bg-white border border-moss-200 text-moss-900',
    raised: 'bg-white border border-moss-200 text-moss-900 shadow-e1',
    moss: 'bg-moss-900 border border-moss-800 text-white shadow-e1',
  }[variant];

  return (
    <div
      className={`rounded-md p-4 sm:p-6 transition-all duration-150 ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export interface StatTileProps {
  label: string;
  value: ReactNode;
  sublabel: string;
  icon?: ReactNode;
  className?: string;
}

// RULE: Specific sublabel for every stat tile (e.g. "2 awaiting delivery", never generic filler).
// Numbers are tabular figures.
export function StatTile({
  label,
  value,
  sublabel,
  icon,
  className = '',
}: StatTileProps) {
  return (
    <Card
      variant="flat"
      className={`flex flex-col justify-between ${className}`}
    >
      <div className="flex items-center justify-between text-small text-moss-500 mb-2">
        <span>{label}</span>
        {icon && <span className="text-moss-400">{icon}</span>}
      </div>
      <div className="text-h2 font-bold text-moss-900 font-sans tracking-tight font-variant-numeric tabular-nums mb-1">
        {value}
      </div>
      <div className="text-caption text-moss-500 font-normal">{sublabel}</div>
    </Card>
  );
}
