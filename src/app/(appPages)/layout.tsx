import MainLayout from '@/components/layout/MainLayout';
import React from 'react';

const MainAppLayout = ({ children }: { children: React.ReactNode }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default MainAppLayout;
