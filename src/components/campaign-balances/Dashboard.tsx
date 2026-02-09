import { Breadcrumbs } from '@/components/campaign-balances/Breadcrumbs';
import { CampaignBalancesTable } from '@/components/campaign-balances/CampaignBalancesTable';
import { Pagination } from '@/components/campaign-balances/Pagination';

export default function Dashboard() {
  return (
    <main dir="rtl" className="min-h-screen bg-gray-50 p-8 space-y-6">
      <Breadcrumbs />

      <h1 className="text-2xl font-bold">أرصدة الحملات</h1>

      <CampaignBalancesTable />

      <Pagination />
    </main>
  );
}
