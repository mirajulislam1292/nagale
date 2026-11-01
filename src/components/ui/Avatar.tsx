import { Star } from 'lucide-react';

interface AvatarProps {
  initials?: string;
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

// RULE: Circles for avatars only. Radii elsewhere are 6, 12, or 20.
export function Avatar({
  initials = 'N',
  src,
  alt = '',
  size = 'md',
  className = '',
}: AvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-caption',
    md: 'w-10 h-10 text-small font-medium',
    lg: 'w-14 h-14 text-lead font-bold',
    xl: 'w-24 h-24 text-h2 font-bold',
  }[size];

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`rounded-full object-cover shrink-0 select-none ${sizeClasses} ${className}`}
      />
    );
  }

  return (
    <span
      className={`rounded-full bg-deep-100 text-deep-700 inline-flex items-center justify-center shrink-0 select-none font-sans ${sizeClasses} ${className}`}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

export function Rating({
  rating,
  reviewsCount,
  compact = false,
}: {
  rating: number;
  reviewsCount?: number;
  compact?: boolean;
}) {
  return (
    <div className="inline-flex items-center gap-1.5 text-small select-none">
      <Star size={15} className="fill-moss-900 text-moss-900 shrink-0" />
      <span className="font-bold text-moss-900 font-variant-numeric tabular-nums">
        {rating.toFixed(1)}
      </span>
      {!compact && <span className="text-moss-500">/ 5</span>}
      {reviewsCount !== undefined && (
        <span className="text-moss-500 font-normal">· {reviewsCount}</span>
      )}
    </div>
  );
}
