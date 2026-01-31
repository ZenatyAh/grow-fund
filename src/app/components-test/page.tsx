'use client';

import { Share2, Star, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { VerticalStepper } from '@/components/shared/VerticalStepper';
import { Button } from '@/components/shared/Button';
import { useState } from 'react';
import { mergeClasses as cn } from '@/lib/utils';
import { Card } from '@/components/shared/Card';
import ProfileCard from '@/components/shared/ProfileCard';
import InfoWarCard from '@/components/shared/InfoWarCard';
import { ImageSlider } from '@/components/shared/ImageSlider';

const STEPS = [
  { id: 'step-1', label: 'نوع المنشئ' },
  { id: 'step-2', label: 'نوع الحملات' },
  { id: 'step-3', label: 'الخبرة والنية' },
  { id: 'step-4', label: 'معلومات أساسة' },
];

export default function ComponentsTestPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [activeSection, setActiveSection] = useState({
    id: 'edit-data',
    label: 'تعديل بياناتي',
  });

  return (
    <div
      className="flex min-h-screen flex-col items-center bg-slate-50 font-sans p-8"
      dir="rtl"
    >
      <main className="flex w-full max-w-7xl flex-col gap-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-slate-800">
            components examples
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 min-h-[600px] items-stretch">
          <div
            className={cn(
              'w-full lg:w-[380px] rounded-xl shadow-sm p-8 flex flex-col justify-center transition-colors duration-300 bg-white'
            )}
          >
            <VerticalStepper
              steps={STEPS}
              currentStep={currentStep}
              onStepClick={setCurrentStep}
            />
          </div>

          <div className="flex-1 bg-white rounded-xl shadow-sm p-12 flex flex-col items-start justify-center transition-all duration-300">
            <div className="max-w-lg w-full space-y-6">
              <h2 className="text-3xl font-bold text-slate-800">
                {currentStep < STEPS.length
                  ? STEPS[currentStep].label
                  : 'تمت العملية بنجاح'}
              </h2>

              <div className="space-y-4">
                <div
                  className="w-full bg-slate-100 rounded-lg transition-all duration-500 ease-in-out"
                  style={{ height: `${(currentStep + 1) * 120 + 100}px` }}
                >
                  <div className="p-4 text-slate-400 text-sm">
                    Dynamic Content Height: {(currentStep + 1) * 120 + 100}px
                  </div>
                </div>
              </div>
              {currentStep < STEPS.length && (
                <div className="flex gap-3 pt-6">
                  <button className="px-6 py-2.5 rounded-full border border-gray-300 text-slate-600 hover:bg-gray-50 transition-colors">
                    إلغاء
                  </button>
                  <button
                    onClick={() =>
                      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length))
                    }
                    className="px-6 py-2.5 rounded-full bg-amber-500 text-white hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/20"
                  >
                    {currentStep === STEPS.length - 1 ? 'إنهاء' : 'متابعة'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Button Showcase */}
        <div className="bg-white rounded-xl shadow-sm p-12 space-y-12">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-8">
              Button Variations & Sizes
            </h2>

            <div className="space-y-12">
              {/* Primary Buttons */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-500">
                  Primary (Blue)
                </h3>
                <div className="space-y-8">
                  <div className="flex flex-wrap gap-8 items-end">
                    <div className="flex flex-col gap-3 items-center">
                      <span className="text-xs text-slate-400">
                        Small (h-48)
                      </span>
                      <Button variant="primary" size="sm">
                        تسجيل
                      </Button>
                    </div>
                    <div className="flex flex-col gap-3 items-center">
                      <span className="text-xs text-slate-400">
                        Medium (117x48)
                      </span>
                      <Button variant="primary" size="md">
                        تسجيل الدخول
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 items-start w-full max-w-[780px]">
                    <span className="text-xs text-slate-400">
                      Large (780x48)
                    </span>
                    <Button variant="primary" size="lg">
                      إنشاء حساب جديد تماماً
                    </Button>
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Subtle Buttons */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-500">
                  Subtle (Grey)
                </h3>
                <div className="space-y-8">
                  <div className="flex flex-wrap gap-8 items-end">
                    <div className="flex flex-col gap-3 items-center">
                      <span className="text-xs text-slate-400">
                        Small (h-48)
                      </span>
                      <Button variant="subtle" size="sm">
                        تخطي
                      </Button>
                    </div>
                    <div className="flex flex-col gap-3 items-center">
                      <span className="text-xs text-slate-400">
                        Medium (117x48)
                      </span>
                      <Button variant="subtle" size="md">
                        إلغاء الأمر
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 items-start w-full max-w-[780px]">
                    <span className="text-xs text-slate-400">
                      Large (780x48)
                    </span>
                    <Button variant="subtle" size="lg">
                      العودة إلى الصفحة السابقة
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm p-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-8">
            Profile Card
          </h2>
          <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
            <ProfileCard
              name="محمد شاهين"
              type="individual"
              location="فلسطين ، خانيونس"
              typeLabel="فرد"
              profileStrength={85}
              activeItemId={activeSection.id}
              onMenuItemClick={(id, label) => setActiveSection({ id, label })}
            />
            <div className="flex-1 min-h-[838px] w-full max-w-2xl bg-[#F8FAFC] border border-[#E2E8F0] rounded-[24px] p-10 flex flex-col gap-6">
              <div className="flex items-center justify-between border-b pb-6 border-[#E2E8F0]">
                <h3 className="text-2xl font-bold text-[#0F172A]">
                  {activeSection.label}
                </h3>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start justify-center mt-8">
            <ProfileCard
              name="الجمعية الفلسطينة"
              location="فلسطين ، خانيونس"
              type="institution"
              typeLabel="مؤسسة"
              profileStrength={85}
              activeItemId={activeSection.id}
              onMenuItemClick={(id, label) => setActiveSection({ id, label })}
            />
            <div className="flex-1 min-h-[838px] w-full max-w-2xl bg-[#F8FAFC] border border-[#E2E8F0] rounded-[24px] p-10 flex flex-col gap-6">
              <div className="flex items-center justify-between border-b pb-6 border-[#E2E8F0]">
                <h3 className="text-2xl font-bold text-[#0F172A]">
                  {activeSection.label}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Card Showcase */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {['card-1', 'card-2', 'card-3', 'card-4'].map((item) => (
            <Card
              key={item}
              className="p-0 overflow-hidden bg-white border border-slate-200 text-slate-800 shadow-xl rounded-3xl group transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative h-56 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000&auto=format&fit=crop"
                  alt="Campaign"
                  fill
                  className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-60"></div>

                <div className="absolute top-4 right-4 bg-white/40 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-medium text-slate-800 border border-slate-200">
                  التعليم
                </div>
              </div>

              <div className="px-5 pb-6 pt-2 space-y-5">
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-slate-800 leading-tight">
                    لوازم مدرسية للأطفال
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed max-w-[95%]">
                    حملة تهدف لتوفير لوازم مدرسية أساسية للأطفال، لدعم تعليمهم
                    ومنحهم بداية دراسية أفضل.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-medium text-slate-500">
                    <span>الهدف : 5000 نجمة</span>
                    <div className="flex items-center gap-1.5 text-amber-500">
                      <span className="text-base font-bold text-amber-500">
                        50
                      </span>
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    </div>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 w-[50%] rounded-full shadow-[0_0_12px_-2px_rgba(245,158,11,0.6)]"></div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between gap-3">
                  <span className="text-xs font-medium text-zinc-500">
                    منذ أسبوع
                  </span>

                  <div className="flex items-center gap-2 flex-1 justify-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('Share clicked');
                      }}
                      className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center border border-slate-200 cursor-pointer"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log('View campaign clicked');
                      }}
                      className="flex-1 max-w-[140px] bg-amber-500 hover:bg-amber-400 text-black font-bold py-2.5 px-4 rounded-full transition-colors flex items-center justify-center gap-2 text-sm shadow-lg shadow-amber-900/20 cursor-pointer"
                    >
                      <span>عرض الحملة</span>
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* InfoWarCard */}
        <div className="p-12 space-y-8 gap-10">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            InfoWarCard with ProfileCard Integration
          </h2>

          <div className="flex flex-row items-start gap-[10px]">
            <div
              className="flex flex-col"
              style={{
                width: '372px',
                gap: '24px',
              }}
            >
              <ProfileCard
                name="الجمعية الفلسطينة"
                location="فلسطين ، خانيونس"
                type="institution"
                typeLabel="مؤسسة"
                profileStrength={85}
                activeItemId={activeSection.id}
                onMenuItemClick={(id, label) => setActiveSection({ id, label })}
              />
              <InfoWarCard
                variant="info"
                message="يرجى التأكد من جميع المعلومات قبل المتابعة وتأكيد عملية التوثيق"
              />
            </div>
            <div
              className="bg-[#F8FAFC] rounded-[24px] flex flex-col min-h-[600px]"
              style={{
                width: '900px',
                padding: '40px',
                gap: '24px',
              }}
            >
              <div className="flex items-center justify-between border-b pb-6 border-[#E2E8F0]">
                <h3 className="text-2xl font-bold text-[#0F172A]">
                  {activeSection.label}
                </h3>
              </div>
              <InfoWarCard
                variant="warning"
                title="تحذير أمني"
                message="المصادقة الثنائية غير مفعلة، ننصح بتفعيلها في أقرب وقت لحماية حسابك من الاختراق"
              />
            </div>
          </div>
        </div>

        {/* Image Slider Showcase */}
        <div className="bg-white rounded-xl shadow-sm p-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-8">
            Image Slider 
          </h2>
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
            <div className="w-[400px] h-[700px] rounded-[32px] border border-slate-200 shadow-xl overflow-hidden">
              <ImageSlider
                images={[
                  {
                    src: '/images/sliderImage1.png',
                    alt: 'Slider image 1',
                  },
                  {
                    src: '/images/sliderImage2.png',
                    alt: 'Slider image 2',
                  },
                  {
                    src: '/images/sliderImage3.png',
                    alt: 'Slider image 3',
                  },
                  {
                    src: '/images/sliderImage4.png',
                    alt: 'Slider image 4',
                  },
                ]}
                autoPlay
                autoPlayInterval={4000}
              />
            </div>

            
          </div>
        </div>
      </main>
    </div>
  );
}
