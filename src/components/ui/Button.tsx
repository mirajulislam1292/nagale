import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { LoaderCircle } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'strong' | 'secondary' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  children?: ReactNode;
}

// RULE: Buttons never use pill shapes.
// Heights: 36 (sm), 44 (md), 52 (lg).
// Primary = Mint fill + Moss text.
// Strong = Moss fill + White text.
// Secondary = White fill + 1px Deep Mint / Moss-200 border.
// Tertiary = transparent text link.
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconPosition = 'right',
      children,
      className = '',
      disabled,
      ...props
    },
    ref,
  ) {
    const sizeClasses = {
      sm: 'min-h-[36px] h-9 px-3 text-small rounded-sm gap-2',
      md: 'min-h-[44px] h-11 px-4 text-small font-medium rounded-sm gap-2',
      lg: 'min-h-[52px] h-[52px] px-6 text-body font-medium rounded-sm gap-2',
    }[size];

    const variantClasses = {
      // Primary: Mint fill + Moss text. Hover: mint-600.
      primary:
        'bg-mint-500 text-moss-900 border border-mint-500 hover:bg-mint-600 hover:border-mint-600 active:bg-mint-600',
      // Strong: Moss fill + White text. Hover: moss-800.
      strong:
        'bg-moss-900 text-white border border-moss-900 hover:bg-moss-800 hover:border-moss-800 active:bg-moss-900',
      // Secondary: White + 1px Deep Mint border. Hover: deep-50.
      secondary:
        'bg-white text-deep-600 border border-deep-600 hover:bg-deep-50 active:bg-deep-100',
      // Tertiary: text only with hover background.
      tertiary:
        'bg-transparent text-moss-700 hover:text-moss-900 hover:bg-moss-100 border border-transparent',
    }[variant];

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={`inline-flex items-center justify-center font-sans tracking-normal transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-600 disabled:opacity-50 disabled:cursor-not-allowed select-none ${sizeClasses} ${variantClasses} ${className}`}
        {...props}
      >
        {loading && (
          <LoaderCircle size={18} className="animate-spin text-current" />
        )}
        {!loading && icon && iconPosition === 'left' && (
          <span className="inline-flex shrink-0">{icon}</span>
        )}
        {children && <span>{children}</span>}
        {!loading && icon && iconPosition === 'right' && (
          <span className="inline-flex shrink-0">{icon}</span>
        )}
      </button>
    );
  },
);

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'strong' | 'secondary' | 'tertiary';
  children: ReactNode;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      label,
      size = 'md',
      variant = 'tertiary',
      children,
      className = '',
      ...props
    },
    ref,
  ) {
    const sizeClasses = {
      sm: 'w-9 h-9 min-h-[36px] rounded-sm',
      md: 'w-11 h-11 min-h-[44px] rounded-sm',
      lg: 'w-[52px] h-[52px] min-h-[52px] rounded-sm',
    }[size];

    const variantClasses = {
      primary: 'bg-mint-500 text-moss-900 hover:bg-mint-600',
      strong: 'bg-moss-900 text-white hover:bg-moss-800',
      secondary: 'bg-white text-deep-600 border border-moss-200 hover:bg-mist',
      tertiary:
        'bg-transparent text-moss-600 hover:text-moss-900 hover:bg-moss-100',
    }[variant];

    return (
      <button
        ref={ref}
        aria-label={label}
        title={label}
        className={`inline-flex items-center justify-center transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-deep-600 disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses} ${variantClasses} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  },
);
