'use client';

import { Button } from '@/components/shared/Button';
import ImageSlider from '@/components/shared/ImageSlider';
import HeaderSubtitle from '@/components/shared/HeaderSubtitle';
import Logo from '@/shared/ui/components/Logo';
import Link from 'next/link';

const sliderImages = [
  {
    src: '/images/sliderImage1.png',
    alt: 'طفلة تنظر إلى نجمة مضيئة في يد شخص بالغ',
  },
  {
    src: '/images/sliderImage2.png',
    alt: 'صورة توضيحية لحملات التبرع',
  },
  {
    src: '/images/sliderImage3.png',
    alt: 'صورة توضح التضامن والعطاء',
  },
  {
    src: '/images/sliderImage4.png',
    alt: 'صورة تعبر عن الأمل والتفاؤل',
  },
];

const AuthLandingPage = () => {
  return (
    <div 
      className="flex items-center justify-center"
      style={{
        width: '100%',
        height: '750px',
        background: '#F8FAFC',
        gap: '10px',
        paddingTop: '24px',
        paddingLeft: '20px',
        paddingRight: '20px',
        boxSizing: 'border-box',
      }}
    >
      <div 
        className="flex flex-row-reverse items-stretch relative"
        style={{
          width: '100%',
          height: '730px',
          gap: '40px',
        }}
      >
        <div className="absolute top-8 right-16 z-10">
          <Logo />
        </div>

        <div 
          className="hidden md:block"
          style={{
            flex: '0 0 34%',
            height: '730px',
            padding: '24px',
            paddingTop: '0px',
            borderRadius: '40px',
          }}
        >
          <ImageSlider
            images={sliderImages}
            autoPlay
            autoPlayInterval={6000}
            className="w-full h-full rounded-[40px]"
          />
        </div>

        <div 
          className="flex flex-col border border-[#E5E7EB] bg-white"
          style={{
            flex: '1 1 0',
            height: '705px',
            padding: '64px',
            borderRadius: '40px',
            justifyContent: 'space-between',
          }}
        >
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="text-center w-full max-w-[520px] mx-auto">
              <HeaderSubtitle
                title="مرحبًا بك في نجومي"
                subtitle="منصة تبرعات شفافة، حيث كل نجمة تمثّل أثرًا حقيقيًا."
                className="gap-3 mb-8"
                titleClassName="text-3xl md:text-[32px] font-bold text-[#0F172A]"
                subtitleClassName="text-sm md:text-base text-[#6B7280] leading-relaxed"
              />

              <div className="flex flex-col gap-3 items-stretch">
                <Button variant="primary" size="lg" fullWidth>
                  تسجيل الدخول
                </Button>

                <Link href="/auth/register" className="w-full">
                  <Button
                    variant="subtle"
                    size="lg"
                    fullWidth
                    className="!bg-white border border-[#CBD5E1] text-[#0F172A]"
                  >
                    إنشاء حساب جديد
                  </Button>
                </Link>

                <div className="flex items-center gap-3 my-2 text-xs text-[#9CA3AF]">
                  <span className="flex-1 h-px bg-[#E5E7EB]" />
                  <span>أو</span>
                  <span className="flex-1 h-px bg-[#E5E7EB]" />
                </div>

                <button className="text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8] underline-offset-4 hover:underline cursor-pointer">
                  تصفح كضيف
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLandingPage;
