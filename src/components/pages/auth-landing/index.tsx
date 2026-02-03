'use client';

import React from 'react';
import Link from 'next/link';
import { ImageSlider } from '@/components/shared/ImageSlider';
import Logo from '@/shared/ui/components/Logo';
import { Button } from '@/components/shared/Button';
import HeaderSubtitle from '@/components/shared/HeaderSubtitle';

const sliderImages = [
  { src: '/images/sliderImage1.png', alt: 'أطفال يحتاجون الدعم' },
  { src: '/images/sliderImage2.png', alt: 'مبادرات خيرية' },
  { src: '/images/sliderImage3.png', alt: 'دعم المجتمع' },
  { src: '/images/sliderImage4.png', alt: 'إحداث أثر إيجابي' },
];

const AuthLandingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 md:p-12 lg:p-20 bg-[var(--Light-grayish-blue)]">
      <div className="w-full min-h-[600px] md:h-[750px] flex flex-col md:flex-row gap-8 md:gap-12 items-stretch justify-center" dir="ltr">

        <div className="hidden md:block md:w-[35%] h-64 md:h-full">
          <ImageSlider 
            images={sliderImages} 
            autoPlay 
            autoPlayInterval={5000} 
            className="rounded-[32px] h-full shadow-lg" 
          />
        </div>

        <div className="w-full md:w-[65%] relative flex flex-col items-center justify-center px-8 py-10 md:px-20 md:py-12 text-right bg-white rounded-[32px] shadow-lg" dir="rtl">

          <div className="absolute top-8 right-8 md:top-12 md:right-12">
            <Logo otherClassName="flex-row-reverse" />
          </div>

          <div className="mb-8 md:mb-12 mt-12 md:mt-0 w-full">
            <HeaderSubtitle 
              title="مرحبًا بك في نجومي"
              subtitle="منصة تبرعات شفافة . حيث كل نجمة تمثل أثرا حقيقيا ."
              showStars={true}
              titleClassName="text-[var(--text-primary)] mb-4"
              subtitleClassName="text-[var(--text-secondary)] md:text-lg"
            />
          </div>

          <div className="w-full max-w-[600px] space-y-4 md:space-y-6">

            <Link href="/login" className="block w-full">
              <Button variant="primary" size="lg" className="w-full h-14 text-lg">
                تسجيل الدخول
              </Button>
            </Link>


            <Link href="/signup" className="block w-full">
              <Button variant="subtle" size="lg" className="w-full h-14 text-lg">
                إنشاء حساب جديد
              </Button>
            </Link>


            <div className="flex items-center gap-4 py-2">
              <div className="flex-1 h-px bg-[var(--border)]"></div>
              <span className="text-base text-[var(--text-muted)]">أو</span>
              <div className="flex-1 h-px bg-[var(--border)]"></div>
            </div>


            <div className="text-center">
              <Link
                href="/home"
                className="text-base font-bold text-[var(--bg-bold-blue)] hover:underline transition-all"
              >
                تصفح كضيف
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLandingPage;
