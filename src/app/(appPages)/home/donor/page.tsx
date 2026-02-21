import HomeDonorPage from '@/components/pages/home-donor';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'نجومي - الرئيسية للمتبرع',
  description: 'الصفحة الرئيسية المخصصة للمتبرع المسجل في منصة نجومي.',
};

const DonorHome = () => <HomeDonorPage />;

export default DonorHome;
