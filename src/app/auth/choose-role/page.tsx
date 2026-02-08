'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/shared/Button';
import ImageSlider from '@/components/shared/ImageSlider';
import Logo from '@/shared/ui/components/Logo';
import { FaRocket, FaStar } from 'react-icons/fa';

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

import { useSearchParams } from 'next/navigation';

const RoleSelectionPage = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <RoleSelectionPageContent />
    </React.Suspense>
  );
};

const RoleSelectionPageContent = () => {
  const [selectedRole, setSelectedRole] = React.useState<'donor' | 'creator' | null>(null);
  const searchParams = useSearchParams();
  const userName = searchParams.get('name') || 'بك';
  // ... rest of component logic (handleRoleSelect, renderWelcomeContent, return JSX) ...


  const handleRoleSelect = (role: 'donor' | 'creator') => {
    setSelectedRole(role);
  };

  const renderWelcomeContent = () => {
    if (selectedRole === 'donor') {
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-lg text-right">
           <h1 className="text-3xl md:text-[32px] font-bold text-[#0F172A] mb-2">
             مرحبا {userName}
           </h1>
           <p className="text-[#6B7280] mb-6">حسابك جاهز</p>

           <p className="text-[#374151] mb-6 leading-relaxed">
             نشكرك لانضمامك إلينا في إحداث فرق. ستساعد مساهماتك في دعم الحملات المؤثرة وإحداث تغيير حقيقي في المجتمعات حول العالم
           </p>

           <div className="mb-8">
             <p className="font-semibold text-[#0F172A] mb-3">يمكنك الان :</p>
             <ul className="list-disc list-inside text-[#374151] space-y-2 marker:text-[#2563EB]">
               <li>اكتشاف الحملات الملهمة</li>
               <li>تتبع تأثير تبرعاتك</li>
               <li>تلقي التحديثات والقصص من الميدان</li>
             </ul>
           </div>

           <Link href="/" className="w-full">
             <Button variant="primary" fullWidth size="lg">
               الانتقال الى لوحة التحكم
             </Button>
           </Link>
        </div>
      );
    }
    
    // Creator View (Keep generic for now or update if needed)
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-lg text-center">
        <h1 className="text-3xl md:text-[32px] font-bold text-[#0F172A] mb-4 flex items-center justify-center gap-2">
           أهلاً بك كمنشئ حملة في نجومي 
           <span className="text-2xl">✨</span>
        </h1>
        <p className="text-[#6B7280] mb-12 max-w-md mx-auto leading-relaxed">
          هنا يمكنك إنشاء حملات، جمع التبرعات، وتتبع الأثر الحقيقي لكل نجمة تصل إليك.
        </p>
        <Link href="/" className="w-full max-w-xs block mx-auto">
          <Button variant="primary" fullWidth size="lg">
            إبدأ الاعداد
          </Button>
        </Link>
      </div>
    );
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-[#F8FAFC] p-6 box-border"
      dir="rtl"
    >
      <div className="flex w-full max-w-[1440px] min-h-[730px] gap-10 relative bg-transparent">
        {/* Logo */}
        <div className="absolute top-8 right-16 z-10">
          <Logo />
        </div>

        {/* Right Side - Content */}
        <div className="flex-1 flex flex-col justify-center items-center bg-white border border-[#E5E7EB] rounded-[40px] p-8 md:p-16">
          <div className="w-full max-w-2xl flex flex-col items-center">
            
            {selectedRole ? (
              renderWelcomeContent()
            ) : (
              // Selection View
              <div className="text-center w-full">
                <h1 className="text-3xl md:text-[32px] font-bold text-[#0F172A] mb-4">
                  كيف ترغب باستخدام نجومي؟
                </h1>
                <p className="text-[#6B7280] mb-12">
                  اختر الطريقة التي تناسبك، يمكنك تغييرها لاحقاً
                </p>

                <div className="grid md:grid-cols-2 gap-6 w-full">
                  {/* Donor Card */}
                  <div 
                    onClick={() => handleRoleSelect('donor')}
                    className="cursor-pointer flex flex-col items-center p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl hover:border-[#2563EB] transition-all duration-200 group hover:shadow-lg"
                  >
                    <div className="w-14 h-14 bg-[#DBEAFE] rounded-full flex items-center justify-center text-[#2563EB] mb-6 group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                      <FaStar size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-[#0F172A] mb-2">متبرع</h3>
                    <p className="text-sm text-[#6B7280] text-center mb-6">
                      دعم الحملات، التبرع بالنجوم، ومتابعة الأثر
                    </p>
                    <div className="w-full">
                      <Button variant="primary" fullWidth>
                        متابعة كمتبرع
                      </Button>
                    </div>
                  </div>

                  {/* Creator Card */}
                  <div 
                    onClick={() => handleRoleSelect('creator')}
                    className="cursor-pointer flex flex-col items-center p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl hover:border-[#2563EB] transition-all duration-200 group hover:shadow-lg"
                  >
                    <div className="w-14 h-14 bg-[#DBEAFE] rounded-full flex items-center justify-center text-[#2563EB] mb-6 group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                      <FaRocket size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-[#0F172A] mb-2">منشئ حملة</h3>
                    <p className="text-sm text-[#6B7280] text-center mb-6">
                      إنشاء حملات، جمع التبرعات، وإدارة الأرباح
                    </p>
                    <div className="w-full">
                      <Button variant="primary" fullWidth>
                         متابعة كمنشئ حملة
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Footer Note */}
            <div className="mt-12 text-center">
               <p className="text-[10px] text-[#9CA3AF] flex items-center justify-center gap-1">
                 <span className="text-amber-400">🔒</span>
                 بياناتك محمية ولا تتم مشاركة أي معلومات بدون إذنك.
               </p>
            </div>

          </div>
        </div>



        {/* Left Side - Image Slider (Hidden on mobile) */}
        <div className="hidden lg:block w-[34%] rounded-[40px] overflow-hidden min-h-[730px]">
          <ImageSlider
            images={sliderImages}
            autoPlay
            autoPlayInterval={6000}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionPage;
