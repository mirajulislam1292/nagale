import { type ReactNode, type HTMLAttributes } from 'react';

interface LayoutContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  variant?: 'page' | 'app';
}

// RULE: Single layout container used everywhere so headers, content, and footers share exact alignment.
// Page max width: 1200px. App workspace max width: 1120px. Gutters: 16px (mobile), 24px (tablet), 32px (desktop).
export function LayoutContainer({
  children,
  className = '',
  variant = 'page',
  ...props
}: LayoutContainerProps) {
  const maxWidthClass = variant === 'app' ? 'max-w-[1120px]' : 'max-w-[1200px]';
  return (
    <div
      className={`w-full mx-auto px-4 md:px-6 lg:px-8 ${maxWidthClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
