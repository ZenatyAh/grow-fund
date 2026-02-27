import { TransferStatus } from './types';

export function TransferStatusBadge({ status }: { status: TransferStatus }) {
  const map = {
    'تم التحويل': 'bg-green-100 text-green-700',
    'قيد المعالجة': 'bg-orange-100 text-orange-700',
    مرفوضة: 'bg-red-100 text-red-700',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${map[status]}`}
    >
      ● {status}
    </span>
  );
}
