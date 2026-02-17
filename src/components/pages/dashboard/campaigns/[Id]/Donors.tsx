"use client"
import { StatusBadge } from '@/components/campaign-balances/StatusBadge'
import { Pagination } from '@/components/transfers/Pagination'
import Breadcrumbs from '@/shared/ui/components/Breadcrumbs'
import Table from '@/shared/ui/components/Table'
import { useState } from 'react'

const DonorsPage = () => {
  const [progressValue] = useState(50);

  const updatesColumns = [
    { key: 'donor', label: 'المتبرع' },
    { key: 'price', label: 'المبلغ' },
    { key: 'time', label: 'الوقت' },
    { key: 'status', label: 'الحالة' },
  ];

  const datTable = [
    {
      id: 1,
      donor: 'فاعل خير',
      price: '10 نجوم',
      time: 'منذ 5 دقائق',
      status: 'منشور',
    }
  ];

  return (
    <div>
      <Breadcrumbs
        className="mb-6"
        currentLabel="عرض المتبرعين"
        labelMap={{
          campaigns: 'الحملات',
        }}
      />
      <div className='flex items-end gap-4'>
        <h1 className='text-(--text-third) text-5xl font-bold'>حملة سلة الخير</h1>
        <StatusBadge value={progressValue < 100 ? "نشطة" : 'مكتملة'} variant="success" otherClassName="text-base!" />
      </div>
      <Table title='أحدث التبرعات' columns={updatesColumns} data={datTable} otherClassName='mt-8' />
      <Pagination />
    </div>
  )
}

export default DonorsPage