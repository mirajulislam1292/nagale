import { useEffect, type ReactNode } from 'react';
import { X, AlertCircle, Info, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';

// Toast Notification
export function Toast({
  message,
  onDismiss,
  type = 'info',
}: {
  message: string;
  onDismiss: () => void;
  type?: 'info' | 'success' | 'warning';
}) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 5000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const icons = {
    info: <Info size={18} className="text-moss-400 shrink-0" />,
    success: <CheckCircle2 size={18} className="text-mint-500 shrink-0" />,
    warning: (
      <AlertCircle size={18} className="text-status-warning-text shrink-0" />
    ),
  }[type];

  return (
    <div
      role="status"
      className="fixed bottom-6 right-6 z-50 max-w-md w-full bg-moss-900 text-white rounded-md shadow-e2 p-4 flex items-center justify-between gap-3 border border-moss-800 animate-in fade-in slide-in-from-bottom-2 duration-200"
    >
      <div className="flex items-center gap-2.5 text-small">
        {icons}
        <span>{message}</span>
      </div>
      <button
        onClick={onDismiss}
        aria-label="Dismiss message"
        className="text-moss-300 hover:text-white p-1 rounded-sm focus:outline-none focus:ring-1 focus:ring-white"
      >
        <X size={18} />
      </button>
    </div>
  );
}

// Skeleton loader
export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-moss-100 rounded-sm ${className}`}
      aria-hidden="true"
    />
  );
}

// Empty State
export function EmptyState({
  title,
  description,
  action,
  icon,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-md border border-moss-200 bg-white">
      {icon && <div className="text-moss-400 mb-3">{icon}</div>}
      <h3 className="text-lead font-bold text-moss-900 mb-1">{title}</h3>
      {description && (
        <p className="text-small text-moss-500 max-w-sm mb-4">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

// Error State
export function ErrorState({
  title = 'Something interrupted this page',
  message,
  onRetry,
}: {
  title?: string;
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-md border border-status-danger-border bg-status-danger-bg/40 max-w-lg mx-auto my-8">
      <AlertCircle size={36} className="text-status-danger-text mb-3" />
      <h3 className="text-lead font-bold text-moss-900 mb-1">{title}</h3>
      {message && <p className="text-small text-moss-600 mb-4">{message}</p>}
      {onRetry && (
        <Button variant="secondary" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}

// Modal with focus trap, ESC listener, and backdrop
export function Modal({
  open,
  onClose,
  title,
  children,
  maxWidth = 'max-w-lg',
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  maxWidth?: string;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-moss-900/60 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Dialog box - Radius 20 for modal */}
      <div
        role="dialog"
        aria-modal="true"
        className={`relative z-10 w-full ${maxWidth} bg-white rounded-lg p-6 shadow-e2 border border-moss-200 overflow-hidden`}
      >
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-moss-100">
          {title && (
            <h2 className="text-lead font-bold text-moss-900">{title}</h2>
          )}
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1 text-moss-400 hover:text-moss-700 rounded-sm"
          >
            <X size={20} />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
