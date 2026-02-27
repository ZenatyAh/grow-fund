import { StatItem } from '@/interfaces';

const stats: StatItem[] = [
  { label: 'إجمالي النجوم', value: '5,000 نجمة', icon: '⭐' },
  { label: 'الرصيد المتاح للسحب', value: '10,000 ش', icon: '💰' },
  { label: 'رصيد معلّق', value: '5,000 ش', icon: '⏳' },
  { label: 'إجمالي السحوبات', value: '5,000 ش', icon: '📤' },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-xl border bg-white p-4 flex items-center justify-between"
        >
          <div>
            <p className="text-sm text-gray-500">{s.label}</p>
            <p className="font-bold mt-1">{s.value}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center">
            {s.icon}
          </div>
        </div>
      ))}
    </div>
  );
}
