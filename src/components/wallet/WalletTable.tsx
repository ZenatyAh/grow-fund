const rows = [
  { stars: '1000', amount: '10,000 ش', status: 'مكتملة' },
  { stars: '2000', amount: '20,000 ش', status: 'مكتملة' },
  { stars: '700', amount: '7,000 ش', status: 'معلّقة' },
];

export function WalletTable() {
  return (
    <div className="rounded-xl border bg-white p-4">
      <h3 className="font-semibold mb-3">أرصدة الحملات</h3>

      <table className="w-full text-sm">
        <thead className="text-gray-500">
          <tr>
            <th className="text-right py-2">عدد النجوم</th>
            <th className="text-right">المبلغ</th>
            <th className="text-right">الحالة</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t">
              <td className="py-2">{r.stars} نجمة</td>
              <td>{r.amount}</td>
              <td>
                <span
                  className={`rounded-full px-2 py-1 text-xs ${
                    r.status === 'مكتملة'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-orange-100 text-orange-700'
                  }`}
                >
                  {r.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
