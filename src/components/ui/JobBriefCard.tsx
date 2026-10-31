import { FileText, Calendar, MapPin, AlertCircle } from 'lucide-react';
import { Card } from './Card';
import { DigitalBadge, LocalBadge } from './Badge';

export interface BriefData {
  title: string;
  category: string;
  type: 'digital' | 'local';
  budgetMin: number;
  budgetMax: number;
  deadline: string;
  area?: string;
  summary?: string;
}

export function JobBriefCard({
  brief,
  missingFields = [],
  className = '',
}: {
  brief: Partial<BriefData>;
  missingFields?: string[];
  className?: string;
}) {
  const isComplete = Boolean(brief.title && brief.category && brief.budgetMin);

  return (
    <Card variant="raised" className={`relative overflow-hidden ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between gap-3 pb-3 mb-3 border-b border-moss-100">
        <div className="flex items-center gap-2 text-moss-700 text-small font-medium">
          <FileText size={18} className="text-deep-600" />
          <span>{brief.category || 'General job brief'}</span>
        </div>
        <div>
          {brief.type === 'local' ? (
            <LocalBadge label="Local" />
          ) : (
            <DigitalBadge label="Digital" />
          )}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-lead sm:text-h3 font-bold text-moss-900 mb-2 leading-snug">
        {brief.title || 'Untitled request'}
      </h3>

      {/* Summary */}
      {brief.summary && (
        <p className="text-small text-moss-600 mb-4 line-clamp-2">
          {brief.summary}
        </p>
      )}

      {/* Key Facts */}
      <dl className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-3 border-t border-moss-100">
        <div>
          <dt className="text-caption text-moss-500 font-normal mb-0.5">
            Budget
          </dt>
          <dd className="text-small font-bold text-moss-900 font-variant-numeric tabular-nums">
            {brief.budgetMin ? (
              brief.budgetMax && brief.budgetMax !== brief.budgetMin ? (
                `৳${brief.budgetMin.toLocaleString('en-IN')} – ৳${brief.budgetMax.toLocaleString('en-IN')}`
              ) : (
                `৳${brief.budgetMin.toLocaleString('en-IN')}`
              )
            ) : (
              <span className="text-moss-400 font-normal">To be agreed</span>
            )}
          </dd>
        </div>

        <div>
          <dt className="text-caption text-moss-500 font-normal mb-0.5">
            Timeline
          </dt>
          <dd className="text-small font-medium text-moss-900 flex items-center gap-1">
            <Calendar size={13} className="text-moss-400 shrink-0" />
            <span>{brief.deadline || '3–5 days'}</span>
          </dd>
        </div>

        {brief.type === 'local' && (
          <div className="col-span-2 sm:col-span-1">
            <dt className="text-caption text-moss-500 font-normal mb-0.5">
              Area
            </dt>
            <dd className="text-small font-medium text-moss-900 flex items-center gap-1">
              <MapPin size={13} className="text-moss-400 shrink-0" />
              <span className="truncate">{brief.area || 'Dhaka'}</span>
            </dd>
          </div>
        )}
      </dl>

      {/* Missing field prompt if any */}
      {!isComplete && missingFields.length > 0 && (
        <div className="mt-3 pt-3 border-t border-moss-100 flex items-center gap-2 text-caption text-status-warning-text bg-status-warning-bg/50 px-2.5 py-1.5 rounded-sm">
          <AlertCircle size={14} className="shrink-0" />
          <span>Needs a little more detail: {missingFields.join(', ')}</span>
        </div>
      )}
    </Card>
  );
}
