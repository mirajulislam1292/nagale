import { type ReactNode } from 'react';
import {
  ShieldCheck,
  MapPin,
  Globe,
  Lock,
  AlertTriangle,
  Check,
  Clock,
} from 'lucide-react';

interface BadgeProps {
  children?: ReactNode;
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
  icon?: ReactNode;
  className?: string;
}

export function Badge({
  children,
  tone = 'neutral',
  icon,
  className = '',
}: BadgeProps) {
  const toneClasses = {
    // success: deep-700 text on deep-100 background (WCAG AA 6.77:1)
    success: 'bg-deep-100 text-deep-700 border-transparent',
    // warning: warning-text on warning-bg (WCAG AA 6.26:1)
    warning: 'bg-[#FBF3E0] text-[#7A5200] border-[#F3E2BD]',
    // danger: danger-text on danger-bg (WCAG AA 6.48:1)
    danger: 'bg-[#FBECEA] text-[#9A2F2F] border-[#F5D2CD]',
    // info: moss-600 on moss-100 (WCAG AA 5.59:1)
    info: 'bg-moss-100 text-moss-700 border-transparent',
    // neutral: moss-600 on moss-100
    neutral: 'bg-moss-100 text-moss-700 border-moss-200',
  }[tone];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-caption font-medium border leading-none select-none ${toneClasses} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
}

// Specialized badge variants specified in Section 5
export function VerifiedBadge({
  level = 1,
  label,
}: {
  level?: 1 | 2 | 3;
  label?: string;
}) {
  const text =
    label ||
    (level === 3
      ? 'Verified Level 3'
      : level === 2
        ? 'Verified Level 2'
        : 'Verified');
  return (
    <Badge
      tone="success"
      icon={<ShieldCheck size={13} className="text-deep-700" />}
    >
      {text}
    </Badge>
  );
}

export function DigitalBadge({ label = 'Digital' }: { label?: string }) {
  return (
    <Badge tone="info" icon={<Globe size={13} />}>
      {label}
    </Badge>
  );
}

export function LocalBadge({ label = 'Local' }: { label?: string }) {
  return (
    <Badge tone="info" icon={<MapPin size={13} />}>
      {label}
    </Badge>
  );
}

export function EscrowBadge({
  label = 'Escrow protected',
}: {
  label?: string;
}) {
  return (
    <Badge tone="success" icon={<Lock size={13} />}>
      {label}
    </Badge>
  );
}

export function RiskBadge({ level }: { level: 'low' | 'medium' | 'high' }) {
  const tone =
    level === 'high' ? 'danger' : level === 'medium' ? 'warning' : 'neutral';
  return (
    <Badge tone={tone} icon={<AlertTriangle size={13} />}>
      <span className="capitalize">{level} risk</span>
    </Badge>
  );
}

export function OrderStatusBadge({
  status,
  label,
}: {
  status: string;
  label: string;
}) {
  const tone =
    status === 'completed'
      ? 'success'
      : status === 'delivered'
        ? 'warning'
        : status === 'disputed'
          ? 'danger'
          : 'neutral';

  const icon =
    status === 'completed' ? (
      <Check size={13} />
    ) : status === 'delivered' ? (
      <Clock size={13} />
    ) : (
      <Clock size={13} />
    );

  return (
    <Badge tone={tone} icon={icon}>
      {label}
    </Badge>
  );
}
