export function BankCard() {
  return (
    <div className="rounded-xl border bg-white p-4 space-y-3">
      <div className="h-36 rounded-lg bg-gradient-to-br from-rose-700 to-rose-900 text-white flex items-end p-4 font-bold">
        بنك فلسطين
      </div>

      <button className="w-full rounded-lg bg-blue-600 py-2 text-white text-sm">
        تغيير الحساب
      </button>
    </div>
  );
}
