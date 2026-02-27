import { AlertBanner } from '../wallet/AlertBanner';
import { BankCard } from '../wallet/BankCard';
import { EarningsCard } from '../wallet/EarningsCard';
import { StatsCards } from '../wallet/StatsCards';
import { TransfersTable } from '../wallet/TransfersTable';
import { WalletHeader } from '../wallet/WalletHeader';
import { WalletTable } from '../wallet/WalletTable';
import { WithdrawCard } from '../wallet/WithdrawCard';

export default function Dashboard() {
  return (
    <main dir="rtl" className="min-h-screen bg-gray-50 p-6 space-y-6">
      <WalletHeader />
      <AlertBanner />
      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="space-y-4">
          <BankCard />
          <WithdrawCard />
          <EarningsCard />
        </div>

        <div className="lg:col-span-3 space-y-6">
          <WalletTable />
          <TransfersTable />
        </div>
      </div>
    </main>
  );
}
