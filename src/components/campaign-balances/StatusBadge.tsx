type Props = {
  value: string;
  variant: 'success' | 'warning';
};

export function StatusBadge({ value, variant }: Props) {
  const styles =
    variant === 'success'
      ? 'bg-green-100 text-green-700'
      : 'bg-orange-100 text-orange-700';

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${styles}`}
    >
      ● {value}
    </span>
  );
}
