import HomePage from '@/components/pages/home';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'نجومي - الصفحة الرئيسية',
  // Temporary description in Arabic
  description:
    'منصة إنسانية تهدف لدعم المبادرات الخيرية وحملات التبرع، وتسهيل المساهمة في إحداث أثر إيجابي في المجتمع.',
};

const Home = () => <HomePage />;

export default Home;
