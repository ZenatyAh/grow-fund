import Table from '@/shared/ui/components/Table';
import { Eye, PlusCircle, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/shared/Card';
import { Button } from '@/components/ui/button';

const CampaignOverview = () => {
  const actions = [
    {
      label: 'نشر تحديث',
      icon: <PlusCircle />,
      onClick: () => console.log('Publish update'),
    },
    {
      label: 'شكر المتبرعين',
      icon: <Users />,
      onClick: () => console.log('Thank donors'),
    },
    {
      label: 'عرض المتبرعين',
      icon: <Users />,
      link: true
    },
  ];

  const updatesColumns = [
    { key: 'title', label: 'عنوان التحديث' },
    { key: 'views', label: 'عدد المشاهدات' },
    { key: 'date', label: 'التاريخ' },
    { key: 'status', label: 'الحالة' },
  ];

  const datTable = [
    {
      id: 1,
      title: 'انطلاق قوافل التوزيع الأولى',
      views: 100,
      date: 'أمس',
      status: 'منشور',
    }
  ];

  return (
    <div className="mt-8 flex flex-col-reverse gap-8 lg:flex-row-reverse">
      <div className="lg:w-100">
        <h2 className='text-(--text-third) text-xl font-bold'>بطاقة هوية الحملة</h2>
        <Card className='mt-5'>
          <div className="relative w-full h-36">
            <Image
              src="/images/campaign.png"
              alt="campaign"
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          <div className='mt-3 space-y-3'>
            <h2 className='text-(--text-third) text-lg font-bold'>حملة سلة الخير</h2>
            <Link href="#" className='bg-(--bg-bold-blue) text-white py-2 px-4 w-full rounded-lg flex items-center justify-center gap-2'>
              عرض الصفحة العامة
              <Eye size={16} />
            </Link>
          </div>
        </Card>
      </div>

      <div className="flex-1 space-y-6">
        <h2 className='text-(--text-third) text-xl font-bold'>إجراءات سريعة</h2>
        <div className="grid grid-cols-3 gap-6">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={action?.onClick}
              className="flex items-center justify-center gap-2"
              size="lg"
              asChild={action?.link}
            >
              {action?.link ? (
                <Link href="/dashboard/campaigns/1/donors">
                  {action.label}
                  {action.icon}
                </Link>
              ) : (
                <>
                  {action.label}
                  {action.icon}
                </>
              )}
            </Button>
          ))}
        </div>
        <Table title='أحدث التبرعات' columns={updatesColumns} data={datTable} />
      </div>
    </div>
  )
}

export default CampaignOverview