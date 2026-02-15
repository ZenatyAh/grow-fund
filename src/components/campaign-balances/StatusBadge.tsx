import { getStatusColor, getStatusIcon } from "@/utils/statusHelpers";

type Props = {
  value: string;
  badgeStatus?: string;
  showValueIcon?: boolean;
  variant?: 'success' | 'warning';
  otherClassName?: string;
};

/**
 * StatusBadge usage examples:
 *
 * 1️⃣ Using badgeStatus to determine color and icon:
 * <StatusBadge value="Waiting for payment" badgeStatus="pending" />
 * <StatusBadge value="Order completed" badgeStatus="completed" />
 * <StatusBadge value="Draft version" badgeStatus="draft" />
 *
 * 2️⃣ Using badgeStatus but hiding the icon:
 * <StatusBadge value="Draft" badgeStatus="draft" showValueIcon={false} />
 *
 * 3️⃣ Using variant only (fallback colors) without badgeStatus:
 * <StatusBadge value="Operation Successful" variant="success" showValueIcon={false} />
 * <StatusBadge value="Check Input" variant="warning" showValueIcon={false} />
 */

export function StatusBadge({ value, variant, badgeStatus, showValueIcon = false, otherClassName }: Props) {
  const colorClasses = badgeStatus
    ? getStatusColor(badgeStatus)
    : variant === 'success'
      ? 'bg-green-100 text-green-700'
      : variant === 'warning'
        ? 'bg-orange-100 text-orange-700'
        : 'bg-gray-100 text-gray-800';

  const Icon = showValueIcon && badgeStatus ? getStatusIcon(badgeStatus) : null;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${colorClasses} ${otherClassName}`}
    >
      {Icon}
      {value}
    </span>
  );
}
