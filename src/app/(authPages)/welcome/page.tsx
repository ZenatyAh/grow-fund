import AuthLandingPage from '@/components/pages/auth-landing';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'نجومي - مرحبًا بك',
  description:
    'منصة إنسانية تهدف لدعم المبادرات الخيرية وحملات التبرع، وتسهيل المساهمة في إحداث أثر إيجابي في المجتمع.',
};

const Welcome = () => <AuthLandingPage />;

export default Welcome;
