import CampaignStatisticsCard from '@/shared/ui/components/CampaignStatisticsCard';
import { Clock, DollarSign, Eye, Users } from 'lucide-react';

const CampaignStatistics = () => {
  const CampaignStatisticsData = [
    {
      id: 1,
      icon: DollarSign,
      title: 'إجمالي التبرعات',
      value: "$12,500"
    },
    {
      id: 2,
      icon: Users,
      title: 'عدد الداعمين',
      value: "1250"
    },
    {
      id: 3,
      icon: Clock,
      title: 'تاريخ الانتهاء',
      value: "15 أكتوبر 2025"
    },
    {
      id: 4,
      icon: Eye,
      title: 'عدد الزيارات',
      value: "5,300"
    },
  ]

  return (
    <div className='mt-10'>
      <p className='text-(--slate-700) text-lg font-normal mb-8'>هنا يمكنك إدارة حملتك ومتابعة الأثر. </p>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6'>
        {CampaignStatisticsData.map((card) => {
          const { id, icon, title, value } = card;
          return (
            <CampaignStatisticsCard key={id} Icon={icon} title={title} label={value} otherClassName='shadow-none!' />
          )
        })}
      </div>
    </div>
  )
}

export default CampaignStatistics