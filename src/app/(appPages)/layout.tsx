import React from 'react';
import MainLayout from '@/components/layout/MainLayout';

const MainAppLayout = ({ children }: { children: React.ReactNode }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default MainAppLayout;
