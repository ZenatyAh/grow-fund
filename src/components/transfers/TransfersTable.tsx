import { TransferStatusBadge } from './TransferStatusBadge';
import { Transfer } from './types';

const rows: Transfer[] = [
  {
    id: '#TRX-998',
    amount: '10,000 ش',
    bank: 'بنك فلسطين',
    date: '15 ديسمبر 2025',
    status: 'تم التحويل',
  },
  {
    id: '#TRX-999',
    amount: '20,000 ش',
    bank: 'بنك فلسطين',
    date: '15 ديسمبر 2025',
    status: 'تم التحويل',
  },
  {
    id: '#TRX-1000',
    amount: '7,000 ش',
    bank: 'بنك فلسطين',
    date: '15 ديسمبر 2025',
    status: 'قيد المعالجة',
  },
  {
    id: '#TRX-1001',
    amount: '10,000 ش',
    bank: 'بنك فلسطين',
    date: '15 ديسمبر 2025',
    status: 'مرفوضة',
  },
  {
    id: '#TRX-1002',
    amount: '100 ش',
    bank: 'بنك فلسطين',
    date: '15 ديسمبر 2025',
    status: 'قيد المعالجة',
  },
];

export function TransfersTable() {
  return (
    <div className="rounded-xl border bg-white p-4">
      <h2 className="font-semibold mb-4">سجل التحويلات</h2>

      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-500">
          <tr>
            <th className="py-3 text-right">رقم العملية</th>
            <th className="text-right">التاريخ</th>
            <th className="text-right">المبلغ المسحوب</th>
            <th className="text-right">البنك المستلم</th>
            <th className="text-right">الحالة</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t">
              <td className="py-3 text-blue-600 font-medium">{row.id}</td>
              <td className="text-gray-500">{row.date}</td>
              <td className="font-medium">{row.amount}</td>
              <td>{row.bank}</td>
              <td>
                <TransferStatusBadge status={row.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
