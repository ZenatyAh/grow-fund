"use client"
import { StatusBadge } from '@/components/campaign-balances/StatusBadge';
import { Card } from '@/components/shared/Card';
import { Button } from '@/components/ui/button';
import Breadcrumbs from '@/shared/ui/components/Breadcrumbs';
import { Progress } from '@/shared/ui/components/progress';
import { Star } from 'lucide-react';
import { useState } from 'react';
import { MdPauseCircleFilled } from 'react-icons/md';
import CampaignStatistics from './Sections/CampaignStatistics';
import CampaignOverview from './Sections/CampaignOverview';

const DashboardCampaignDetailsPage = () => {
  const [progressValue] = useState(50);

  return (
    <div>
      <Breadcrumbs
        className="mb-6"
        // currentLabel={campaign.title}
        currentLabel="حملة سلة الخير"
        labelMap={{
          campaigns: 'الحملات',
        }}
      />
      <div className='flex items-center justify-between gap-5 mt-8'>
        <div className='flex items-end gap-4'>
          <h1 className='text-(--text-third) text-5xl font-bold'>حملة سلة الخير</h1>
          <StatusBadge value={progressValue < 100 ? "نشطة" : 'مكتملة'} variant="success" otherClassName="text-base!" />
        </div>
        <Button className={progressValue < 100 ? "bg-(--bg-red-light) hover:bg-(--bg-red-dark)!" : "bg-(--bg-green-light) hover:bg-(--bg-green-dark)!"}>
          {progressValue < 100 ? (
            <div className='flex items-center justify-center gap-2'>
              <span>إيقاف مؤقت للحملة</span>
              <MdPauseCircleFilled size={16} />
            </div>
          ) : "تصدير البيانات"}
        </Button>
      </div>
      <CampaignStatistics />
      <Card className='mt-10'>
        <Progress value={progressValue} indicatorColor={progressValue < 100 ? "var(--bg-bold-blue)" : "var(--bg-green-dark)"} valueLabelClassName={`${progressValue < 100 ? "text-(--bg-bold-blue)" : "text-(--bg-green-dark)"} text-xl font-bold`} label='جاري التنفيذ' labelClassName={`${progressValue < 100 ? "bg-(--bg-light-blue) text-(--bg-bold-blue)" : "bg-green-100 text-green-700"} text-sm rounded-md px-3 py-2 w-fit`} subLabel="500 نجمة مجمعة" valueSubLabelClassName="text-(--bg-slate-600) text-sm" subLabelClassName="text-(--text-third) text-base" subLabelIconClassName="text-(--text-third)" SubLabelIcon={Star} bottomDisplayValue='الهدف 1000 نجمة' showSubValue showValueOutside />
      </Card>
      <CampaignOverview />
    </div>
  )
}

export default DashboardCampaignDetailsPage