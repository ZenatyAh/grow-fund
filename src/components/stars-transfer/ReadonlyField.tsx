type Props = {
  label: string;
  value: string;
};

export function ReadonlyField({ label, value }: Props) {
  return (
    <div className="space-y-1">
      <label className="text-sm text-gray-600">{label}</label>
      <div className="w-full rounded-lg border bg-gray-50 px-4 py-2 text-gray-800">
        {value}
      </div>
    </div>
  );
}
