type Props = {
  bankName: string;
  maskedNumber: string;
  onChange?: () => void;
};

export function BankAccountCard({ bankName, maskedNumber, onChange }: Props) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold">
          🏦
        </div>
        <div>
          <p className="text-sm text-gray-500">الحساب البنكي النشط للتحويل</p>
          <p className="font-semibold">
            {bankName} {maskedNumber}
          </p>
        </div>
      </div>

      {onChange && (
        <button
          onClick={onChange}
          className="rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white"
        >
          تغيير الحساب
        </button>
      )}
    </div>
  );
}
