import { Clock, MapPin, Check } from 'lucide-react';
import { Card } from './Card';
import { Avatar, Rating } from './Avatar';
import { VerifiedBadge } from './Badge';
import { Button } from './Button';

export interface ProposalItem {
  id: string;
  providerId: string;
  name: string;
  initials: string;
  headline?: string;
  rating: number;
  completedJobs: number;
  area: string;
  price: number;
  days: number;
  message: string;
  verifiedLevel?: 1 | 2 | 3;
  samples?: string[];
}

export function ProposalCard({
  proposal,
  selected = false,
  onSelect,
  onAccept,
  onShortlist,
  isShortlisted = false,
  showCompare = true,
  className = '',
}: {
  proposal: ProposalItem;
  selected?: boolean;
  onSelect?: (id: string) => void;
  onAccept?: (proposal: ProposalItem) => void;
  onShortlist?: (id: string) => void;
  isShortlisted?: boolean;
  showCompare?: boolean;
  className?: string;
}) {
  return (
    <Card
      variant="flat"
      className={`transition-all hover:border-moss-300 ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
        {/* Provider info */}
        <div className="flex items-start gap-3">
          <Avatar initials={proposal.initials} size="md" />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-body font-bold text-moss-900">
                {proposal.name}
              </span>
              <VerifiedBadge level={proposal.verifiedLevel || 1} />
            </div>
            <div className="flex items-center gap-3 text-caption text-moss-500 mt-1">
              <Rating rating={proposal.rating} compact />
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin size={12} />
                {proposal.area}
              </span>
            </div>
          </div>
        </div>

        {/* Price and timeline */}
        <div className="text-left sm:text-right shrink-0">
          <div className="text-h3 font-bold text-moss-900 font-variant-numeric tabular-nums">
            ৳{proposal.price.toLocaleString('en-IN')}
          </div>
          <div className="text-caption text-moss-500 flex items-center sm:justify-end gap-1 mt-0.5">
            <Clock size={12} />
            <span>{proposal.days} days delivery</span>
          </div>
        </div>
      </div>

      {/* Proposal message */}
      <p className="text-small text-moss-700 mb-4 line-clamp-2 leading-relaxed">
        {proposal.message}
      </p>

      {/* Card actions */}
      <div className="flex items-center justify-between pt-3 border-t border-moss-100 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          {showCompare && onSelect && (
            <label className="inline-flex items-center gap-2 text-small text-moss-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={selected}
                onChange={() => onSelect(proposal.id)}
                className="w-4 h-4 rounded-sm border-moss-300 text-deep-600 focus:ring-deep-600"
              />
              <span>Compare</span>
            </label>
          )}

          {onShortlist && (
            <button
              type="button"
              onClick={() => onShortlist(proposal.id)}
              className={`text-small font-medium transition-colors ${
                isShortlisted
                  ? 'text-deep-600'
                  : 'text-moss-500 hover:text-moss-800'
              }`}
            >
              {isShortlisted ? 'Shortlisted' : 'Shortlist'}
            </button>
          )}
        </div>

        {onAccept && (
          <Button
            size="sm"
            variant="primary"
            onClick={() => onAccept(proposal)}
            icon={<Check size={14} />}
          >
            Accept proposal
          </Button>
        )}
      </div>
    </Card>
  );
}

// Comparison Table View for 2-3 proposals
export function ProposalCompareTable({
  proposals,
  onChoose,
  onClose,
}: {
  proposals: ProposalItem[];
  onChoose: (p: ProposalItem) => void;
  onClose: () => void;
}) {
  if (proposals.length < 2) return null;

  const minPrice = Math.min(...proposals.map((p) => p.price));
  const minDays = Math.min(...proposals.map((p) => p.days));

  return (
    <div className="p-4 sm:p-6 bg-white border border-moss-200 rounded-md shadow-e2 my-4">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-moss-100">
        <h3 className="text-lead font-bold text-moss-900">Compare proposals</h3>
        <button
          onClick={onClose}
          className="text-small text-moss-500 hover:text-moss-900"
        >
          Close comparison
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-small">
          <thead>
            <tr className="border-b border-moss-100 text-caption text-moss-500">
              <th className="py-2 pr-4 font-normal">Metric</th>
              {proposals.map((p) => (
                <th
                  key={p.id}
                  className="py-2 px-3 font-medium text-moss-900 min-w-[140px]"
                >
                  {p.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-moss-100">
            <tr>
              <td className="py-2.5 pr-4 text-moss-500 font-normal">Price</td>
              {proposals.map((p) => (
                <td
                  key={p.id}
                  className="py-2.5 px-3 font-bold text-moss-900 font-variant-numeric tabular-nums"
                >
                  ৳{p.price.toLocaleString('en-IN')}
                  {p.price === minPrice && (
                    <span className="ml-2 text-caption bg-deep-100 text-deep-700 px-1.5 py-0.5 rounded-sm">
                      Lowest
                    </span>
                  )}
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-2.5 pr-4 text-moss-500 font-normal">
                Delivery
              </td>
              {proposals.map((p) => (
                <td key={p.id} className="py-2.5 px-3 text-moss-800">
                  {p.days} days
                  {p.days === minDays && (
                    <span className="ml-2 text-caption bg-deep-100 text-deep-700 px-1.5 py-0.5 rounded-sm">
                      Fastest
                    </span>
                  )}
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-2.5 pr-4 text-moss-500 font-normal">Rating</td>
              {proposals.map((p) => (
                <td key={p.id} className="py-2.5 px-3">
                  <Rating rating={p.rating} compact />
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-2.5 pr-4 text-moss-500 font-normal">
                Completed jobs
              </td>
              {proposals.map((p) => (
                <td
                  key={p.id}
                  className="py-2.5 px-3 font-variant-numeric tabular-nums text-moss-800"
                >
                  {p.completedJobs} jobs
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-2.5 pr-4 text-moss-500 font-normal">Area</td>
              {proposals.map((p) => (
                <td key={p.id} className="py-2.5 px-3 text-moss-800">
                  {p.area}
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-3 pr-4" />
              {proposals.map((p) => (
                <td key={p.id} className="py-3 px-3">
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => onChoose(p)}
                  >
                    Choose
                  </Button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
