export function WalletHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">المحفظة والأرصدة</h1>
        <p className="text-gray-500 text-sm">إدارة الرصيد والعمليات والسحب</p>
      </div>

      <button className="rounded-lg bg-blue-600 px-4 py-2 text-white text-sm font-medium">
        تحويل الأثر
      </button>
    </div>
  );
}
