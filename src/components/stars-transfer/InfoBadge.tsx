type Props = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

export function InfoBadge({ label, value, icon }: Props) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border bg-white p-4 min-w-[220px]">
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-bold text-gray-900 mt-1">{value}</p>
      </div>

      {icon && (
        <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
          {icon}
        </div>
      )}
    </div>
  );
}
