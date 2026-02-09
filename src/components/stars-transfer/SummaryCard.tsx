type Props = {
  title: string;
  value: string;
  icon?: React.ReactNode;
};

export function SummaryCard({ title, value, icon }: Props) {
  return (
    <div className="flex items-center justify-between rounded-xl border p-4 bg-white">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-lg font-bold mt-1">{value}</p>
      </div>
      {icon && (
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600">
          {icon}
        </div>
      )}
    </div>
  );
}
