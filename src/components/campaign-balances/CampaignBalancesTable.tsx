import { CampaignBalance } from '@/interfaces';
import { StatusBadge } from './StatusBadge';

const rows: CampaignBalance[] = [
  {
    id: '1',
    name: 'حملة كسوة الشتاء',
    stars: 1000,
    amount: '10,000 ش',
    date: '15 ديسمبر 2025',
    status: 'مكتملة',
    balanceStatus: 'مكتمل',
  },
  {
    id: '2',
    name: 'حملة كسوة الشتاء',
    stars: 700,
    amount: '7,000 ش',
    date: '15 ديسمبر 2025',
    status: 'نشطة',
    balanceStatus: 'معلق',
  },
  {
    id: '3',
    name: 'حملة كسوة الشتاء',
    stars: 10,
    amount: '100 ش',
    date: '15 ديسمبر 2025',
    status: 'نشطة',
    balanceStatus: 'معلق',
  },
];

export function CampaignBalancesTable() {
  return (
    <div className="rounded-xl border bg-white p-4">
      <h2 className="font-semibold mb-4">أرصدة الحملات</h2>

      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-500">
          <tr>
            <th className="py-3 text-right">اسم الحملة</th>
            <th className="text-right">عدد النجوم</th>
            <th className="text-right">المبلغ</th>
            <th className="text-right">التاريخ</th>
            <th className="text-right">الحالة</th>
            <th className="text-right">حالة الرصيد</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t">
              <td className="py-3 text-gray-700">{row.name}</td>
              <td>{row.stars} نجمة</td>
              <td className="font-medium">{row.amount}</td>
              <td className="text-gray-500">{row.date}</td>
              <td>
                <StatusBadge value={row.status} variant="success" />
              </td>
              <td>
                <StatusBadge
                  value={row.balanceStatus}
                  variant={
                    row.balanceStatus === 'مكتمل' ? 'success' : 'warning'
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
