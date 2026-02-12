export function AlertBanner() {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-green-100 px-4 py-3 text-green-700">
      <span className="w-6 h-6 flex items-center justify-center rounded-full bg-green-500 text-white">
        ✓
      </span>
      <p className="text-sm">
        تم توثيق الحساب البنكي بنجاح — يمكنك تحويل النجوم إلى أرباح
      </p>
    </div>
  );
}
