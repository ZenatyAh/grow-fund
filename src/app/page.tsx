import AuthLandingPage from '@/components/pages/auth-landing';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'نجومي - مرحبًا بك',
  description:
    'منصة إنسانية تهدف لدعم المبادرات الخيرية وحملات التبرع، وتسهيل المساهمة في إحداث أثر إيجابي في المجتمع.',
};

const RootPage = () => <AuthLandingPage />;

export default RootPage;
