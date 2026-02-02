'use client';
import DataTableBody from '@/shared/ui/components/DataTableBody';
import Table from '@/shared/ui/components/Table';
import React from 'react';

const HomePage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
        <h1 className="bg-amber-300 px-50">Grow Fund Project</h1>
        <Table
          title="أحدث التبرعات"
          columns={['title', 'count', 'date', 'state']}
          data={[
            {
              id: 1,
              title: ' جاري تجهيز وتعليب المواد الغذائية',
              count: 0,
              date: 'أمس',
              state: 'منشور',
            },
            {
              id: 2,
              title: ' جاري تجهيز وتعليب المواد الغذائية',
              count: 0,
              date: 'أمس',
              state: 'منشور',
            },
          ]}
        />
      </main>
    </div>
  );
};

export default HomePage;
