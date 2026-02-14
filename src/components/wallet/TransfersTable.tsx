const rows = [
  { id: '#TRX-998', amount: '10,000 ش', status: 'تم التحويل' },
  { id: '#TRX-999', amount: '20,000 ش', status: 'قيد المعالجة' },
  { id: '#TRX-1000', amount: '7,000 ش', status: 'مرفوضة' },
];

export function TransfersTable() {
  return (
    <div className="rounded-xl border bg-white p-4">
      <h3 className="font-semibold mb-3">سجل التحويلات</h3>

      <table className="w-full text-sm">
        <thead className="text-gray-500">
          <tr>
            <th className="text-right py-2">رقم العملية</th>
            <th className="text-right">المبلغ</th>
            <th className="text-right">الحالة</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="border-t">
              <td className="py-2">{r.id}</td>
              <td>{r.amount}</td>
              <td>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
