import { Breadcrumbs } from '@/components/transfers/Breadcrumbs';
import { Pagination } from '@/components/transfers/Pagination';
import { TransfersTable } from '@/components/transfers/TransfersTable';

export default function Dashboard() {
  return (
    <main dir="rtl" className="min-h-screen bg-gray-50 p-8 space-y-6">
      <Breadcrumbs />

      <h1 className="text-2xl font-bold">سجل التحويلات</h1>

      <TransfersTable />

      <Pagination />
    </main>
  );
}
