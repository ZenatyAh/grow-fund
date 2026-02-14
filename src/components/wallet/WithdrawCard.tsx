export function WithdrawCard() {
  return (
    <div className="rounded-xl border bg-white p-4 space-y-4">
      <h3 className="font-semibold">سحب الرصيد</h3>

      <div className="text-sm text-gray-600 space-y-1">
        <p>
          الرصيد المتاح: <b>10,000 ش</b>
        </p>
      </div>

      <button className="w-full rounded-lg bg-blue-600 py-2 text-white text-sm">
        سحب الرصيد المتاح
      </button>
    </div>
  );
}
