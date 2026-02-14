'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/shared/Button';
import ImageSlider from '@/components/shared/ImageSlider';
import Logo from '@/shared/ui/components/Logo';
import { FaRocket, FaStar } from 'react-icons/fa';
import { toast } from 'sonner';
import {
  useRegisterDonor,
  useRegisterCampaignCreator,
  RegisterDonorDto,
  RegisterCampaignCreatorDto,
} from '@/lib/api';
import { PENDING_REGISTRATION_KEY } from '@/app/auth/register/page';
import { ROUTES } from '@/shared/constants/routes';
import { useAuth } from '@/providers/AuthProvider';
import type { LoginUserDto } from '@/lib/api/hooks/useAuth';

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

export type PendingRegistration = {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  password: string;
};

const RoleSelectionPage = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <RoleSelectionPageContent />
    </React.Suspense>
  );
};

const RoleSelectionPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAuthData } = useAuth();
  const [pending, setPending] = useState<PendingRegistration | null>(null);
  const [selectedRole, setSelectedRole] = useState<'donor' | 'creator' | null>(null);
  const [step, setStep] = useState<'welcome' | 'choice'>('welcome');

  const { mutate: registerDonor, isPending: isRegisteringDonor } = useRegisterDonor();
  const { mutate: registerCreator, isPending: isRegisteringCreator } = useRegisterCampaignCreator();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = sessionStorage.getItem(PENDING_REGISTRATION_KEY);
    if (!raw) {
      router.replace('/auth/register');
      return;
    }
    try {
      setPending(JSON.parse(raw) as PendingRegistration);
    } catch {
      router.replace('/auth/register');
    }
  }, [router]);

  const userName = pending ? `${pending.firstName} ${pending.lastName}` : (searchParams.get('name') || 'بك');

  const clearPending = () => {
    if (typeof window !== 'undefined') sessionStorage.removeItem(PENDING_REGISTRATION_KEY);
  };

  const handleRoleSelect = (role: 'donor' | 'creator') => {
    if (!pending) return;

    const randomPhone = `+97059${Math.floor(100000 + Math.random() * 900000)}`;

    if (role === 'donor') {
      const payload: RegisterDonorDto = {
        firstName: pending.firstName,
        lastName: pending.lastName,
        email: pending.email,
        password: pending.password,
        dateOfBirth: pending.dateOfBirth,
        phoneNumber: randomPhone,
        country: 'Palestine',
        notes: 'New donor from web app',
        donorProfile: {
          areasOfInterest: 'Education and Health',
          preferredCampaignTypes: 'Charitable and Social',
          geographicScope: 'local',
          targetAudience: 'Children and needy families',
          preferredCampaignSize: 10000,
          preferredCampaignVisibility: 'Public',
        },
      };
      registerDonor(payload, {
        onSuccess: (response) => {
          clearPending();
          setAuthData({
            token: response.token,
            userId: response.user.id,
            user: {
              id: response.user.id,
              firstName: response.user.firstName,
              lastName: response.user.lastName,
              email: response.user.email,
              role: 'DONOR',
              country: response.user.country ?? '',
            },
          });
          setSelectedRole('donor');
          setStep('welcome');
          toast.success('تم إنشاء حساب المتبرع بنجاح');
        },
        onError: (err: Error) => {
          toast.error(err.message || 'حدث خطأ أثناء إنشاء حساب المتبرع');
        },
      });
    } else {
      const dateOfBirthISO = new Date(pending.dateOfBirth).toISOString();
      const payload: RegisterCampaignCreatorDto = {
        firstName: pending.firstName,
        lastName: pending.lastName,
        email: pending.email,
        password: pending.password,
        confirmPassword: pending.password,
        phoneNumber: randomPhone,
        country: 'Palestine',
        type: 'INDIVIDUAL',
        dateOfBirth: dateOfBirthISO,
        notes: 'Campaign creator account',
      };
      registerCreator(payload, {
        onSuccess: (response) => {
          clearPending();
          const userForAuth: LoginUserDto = {
            id: response.userData.id,
            firstName: response.userData.firstName,
            lastName: response.userData.lastName,
            email: response.userData.email,
            role: 'CAMPAIGN_CREATOR',
            country: response.userData.country ?? '',
          };
          setAuthData({
            token: response.token,
            userId: response.userData.id,
            user: userForAuth,
          });
          setSelectedRole('creator');
          setStep('welcome');
          toast.success('تم إنشاء حساب منشئ الحملة بنجاح');
        },
        onError: (err: Error) => {
          toast.error(err.message || 'حدث خطأ أثناء إنشاء حساب منشئ الحملة');
        },
      });
    }
  };

  const isRegistering = isRegisteringDonor || isRegisteringCreator;

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

           <Link href={ROUTES.DONOR_DASHBOARD} className="w-full">
             <Button variant="primary" fullWidth size="lg">
               الانتقال الى لوحة التحكم
             </Button>
           </Link>
        </div>
      );
    }
    
    // Creator View flow
    if (step === 'welcome') {
      return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-xl text-right">
          <h1 className="text-2xl md:text-[28px] font-bold text-[#0F172A] mb-2 flex items-center justify-center gap-2">
             <span className="text-2xl">✨</span>
             كيف تعمل نجومي لمنشئ الحملات؟ 
          </h1>
          <p className="text-[#6B7280] mb-8 text-center text-sm md:text-base">
            ثلاث خطوات بسيطة تفصلك عن إطلاق حملتك ومشاركة قصتك مع الداعمين.
          </p>

          <div className="flex flex-col gap-4 mb-8">
            {/* Step 1 */}
            <div className="flex items-center gap-4 p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
               <div className="flex-1">
                 <h3 className="font-bold text-[#0F172A] mb-1">أنشئ حملتك</h3>
                 <p className="text-sm text-[#6B7280]">
                   اكتب قصة حملتك، حدد الهدف، وأضف التفاصيل التي تهم الداعمين.
                 </p>
               </div>
               <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-2xl border border-[#E2E8F0]">
                 📝
               </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-4 p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
               <div className="flex-1">
                 <h3 className="font-bold text-[#0F172A] mb-1">توثيق ومراجعة</h3>
                 <p className="text-sm text-[#6B7280]">
                   نقوم بمراجعة حملتك لضمان الشفافية وحماية الجميع.
                 </p>
               </div>
               <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-2xl border border-[#E2E8F0]">
                 🛡️
               </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-4 p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl">
               <div className="flex-1">
                 <h3 className="font-bold text-[#0F172A] mb-1">اجمع النجوم</h3>
                 <p className="text-sm text-[#6B7280]">
                   بعد الموافقة، تبدأ النجوم بالوصول وتتابع تقدم حملتك لحظة بلحظة.
                 </p>
               </div>
               <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-2xl border border-[#E2E8F0]">
                 ⭐
               </div>
            </div>
          </div>

          <Button 
            variant="primary" 
            fullWidth 
            size="lg"
            onClick={() => setStep('choice')}
          >
            متابعة
          </Button>
        </div>
      );
    }

    // Step === 'choice'
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full max-w-2xl text-center">
        <h1 className="text-2xl md:text-[28px] font-bold text-[#0F172A] mb-4">
           ماذا تود أن تفعل الآن؟
        </h1>
        <p className="text-[#6B7280] mb-12">
           اختر الخطوة التي تناسبك في هذه المرحلة، يمكنك دائماً العودة وتعديل اختيارك لاحقاً دون أي التزام.
        </p>

        <div className="grid md:grid-cols-2 gap-6 w-full text-right">
           {/* Setup Profile */}
           <div className="flex flex-col items-center p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl hover:border-[#2563EB] transition-colors group">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                 {/* Placeholder for illustration */}
                 <span className="text-4xl">👤</span> 
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2 text-center">إعداد الحساب الشخصي</h3>
              <p className="text-sm text-[#6B7280] text-center mb-6">
                أكمل بياناتك الأساسية.
              </p>
              <Link href="/profile/setup" className="w-full mt-auto">
                <Button variant="primary" fullWidth>
                  إعداد الحساب الان
                </Button>
              </Link>
           </div>

           {/* Create Campaign */}
           <div className="flex flex-col items-center p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl hover:border-[#2563EB] transition-colors group">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                 {/* Placeholder for illustration */}
                 <span className="text-4xl">🚀</span>
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2 text-center"> أنشئ حملتك الأولى ✨</h3>
              <p className="text-sm text-[#6B7280] text-center mb-6">
                 أنشئ حملتك الأولى
              </p>
              <Link href="/campaigns/create" className="w-full mt-auto">
                <Button variant="primary" fullWidth>
                   إبدأ إنشاء الحملة
                </Button>
              </Link>
           </div>
        </div>
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
            
            {!pending ? (
              <div className="text-center text-[#6B7280]">جاري التحميل...</div>
            ) : selectedRole ? (
              renderWelcomeContent()
            ) : (
              // Selection View – choose role after basic info from register
              <div className="text-center w-full">
                <h1 className="text-3xl md:text-[32px] font-bold text-[#0F172A] mb-4">
                  كيف ترغب باستخدام نجومي؟
                </h1>
                <p className="text-[#6B7280] mb-12">
                  اختر نوع حسابك، يمكنك تغييرها لاحقاً
                </p>

                <div className="grid md:grid-cols-2 gap-6 w-full">
                  {/* Donor Card */}
                  <div 
                    onClick={() => !isRegistering && handleRoleSelect('donor')}
                    className="cursor-pointer flex flex-col items-center p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl hover:border-[#2563EB] transition-all duration-200 group hover:shadow-lg disabled:opacity-70"
                  >
                    <div className="w-14 h-14 bg-[#DBEAFE] rounded-full flex items-center justify-center text-[#2563EB] mb-6 group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                      <FaStar size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-[#0F172A] mb-2">متبرع</h3>
                    <p className="text-sm text-[#6B7280] text-center mb-6">
                      دعم الحملات، التبرع بالنجوم، ومتابعة الأثر
                    </p>
                    <div className="w-full">
                      <Button variant="primary" fullWidth disabled={isRegistering}>
                        {isRegistering ? 'جاري إنشاء الحساب...' : 'متابعة كمتبرع'}
                      </Button>
                    </div>
                  </div>

                  {/* Creator Card */}
                  <div 
                    onClick={() => !isRegistering && handleRoleSelect('creator')}
                    className="cursor-pointer flex flex-col items-center p-8 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl hover:border-[#2563EB] transition-all duration-200 group hover:shadow-lg disabled:opacity-70"
                  >
                    <div className="w-14 h-14 bg-[#DBEAFE] rounded-full flex items-center justify-center text-[#2563EB] mb-6 group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                      <FaRocket size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-[#0F172A] mb-2">منشئ حملة</h3>
                    <p className="text-sm text-[#6B7280] text-center mb-6">
                      إنشاء حملات، جمع التبرعات، وإدارة الأرباح
                    </p>
                    <div className="w-full">
                      <Button variant="primary" fullWidth disabled={isRegistering}>
                        {isRegistering ? 'جاري إنشاء الحساب...' : 'متابعة كمنشئ حملة'}
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
