import MainAuthLayout from '@/components/layout/MainAuthLayout';
import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <MainAuthLayout>{children}</MainAuthLayout>;
};

export default AuthLayout;
