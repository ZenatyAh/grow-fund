'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/shared/Button';
import ImageSlider from '@/components/shared/ImageSlider';
import Logo from '@/shared/ui/components/Logo';
import Input from '@/shared/ui/components/Input';
import { useRegisterCampaignCreator, RegisterCampaignCreatorDto } from '@/lib/api';
import { toast } from 'sonner';
import Link from 'next/link';
import { IconCalendar, IconEye, IconEyeOff } from '@tabler/icons-react';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';


const registerSchema = z.object({
  firstName: z.string().min(2, 'الاسم الأول مطلوب'),
  lastName: z.string().min(2, 'الاسم الأخير مطلوب'),
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  dateOfBirth: z.string().min(1, 'تاريخ الميلاد مطلوب').refine((val) => {
    const date = new Date(val);
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const m = today.getMonth() - date.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
      age--;
    }
    return age >= 10;
  }, 'يجب أن يكون عمرك 10 سنوات على الأقل للتسجيل'),
  password: z.string().min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل'),
});

type RegisterForminputs = z.infer<typeof registerSchema>;

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

const RegisterPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { mutate: registerCreator, isPending } = useRegisterCampaignCreator();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterForminputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterForminputs) => {
    const randomPhone = `+97059${Math.floor(100000 + Math.random() * 900000)}`;
    const dateOfBirthISO = new Date(data.dateOfBirth).toISOString();

    const payload: RegisterCampaignCreatorDto = {
      ...data,
      confirmPassword: data.password, 
      dateOfBirth: dateOfBirthISO,   
      phoneNumber: randomPhone,      
      country: 'Palestine',           
      type: 'INDIVIDUAL',            
    };

    registerCreator(payload, {
      onSuccess: () => {
        toast.success('تم إنشاء الحساب بنجاح');
      },
      onError: (error: any) => {
        toast.error(error.message || 'حدث خطأ أثناء إنشاء الحساب');
      },
    });
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

        {/* Right Side - Form */}
        <div className="flex-1 flex flex-col bg-white border border-[#E5E7EB] rounded-[40px] p-8 md:p-16">
          <div className="w-full flex flex-col items-center">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-2 text-3xl md:text-[32px] font-bold text-[#0F172A] mb-3">
                <span>أنشئ حسابك في نجومي</span>
                <span className="text-2xl">✨</span>
              </div>
              <p className="text-sm md:text-base text-[#6B7280]">
                أنشئ حسابك للبدء في دعم الحملات أو إنشاء حملتك الخاصة.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
              <div className="flex gap-4">
                <div className="w-1/2">
                  <Input
                    inputName="firstName"
                    label="الاسم الأول"
                    placeholder="محمد"
                    register={register}
                    error={errors}
                    type="text"
                    passwordStrengthLevel={0}
                    otherClassName="!bg-white border border-[#E2E8F0] !rounded-[10px] h-12 w-full"
                    labelClassName="!text-sm !font-medium !text-[#0F172A] !mb-2"
                  />
                </div>
                <div className="w-1/2">
                  <Input
                    inputName="lastName"
                    label="الاسم الأخير"
                    placeholder="شاهين"
                    register={register}
                    error={errors}
                    type="text"
                    passwordStrengthLevel={0}
                    otherClassName="!bg-white border border-[#E2E8F0] !rounded-[10px] h-12 w-full"
                    labelClassName="!text-sm !font-medium !text-[#0F172A] !mb-2"
                  />
                </div>
              </div>

              <Input
                inputName="email"
                label="البريد الإلكتروني"
                placeholder="eng.mohammeduiux@gmail.com"
                register={register}
                error={errors}
                type="email"
                passwordStrengthLevel={0}
                otherClassName="!bg-white border border-[#E2E8F0] !rounded-[10px] h-12 w-full"
                labelClassName="!text-sm !font-medium !text-[#0F172A] !mb-2"
              />

              <Input
                inputName="dateOfBirth"
                label="تاريخ الميلاد"
                placeholder="اليوم/الشهر/السنة"
                register={register}
                error={errors}
                type="date"
                Icon={IconCalendar}
                iconClassName="text-gray-400"
                passwordStrengthLevel={0}
                otherClassName="!bg-white border border-[#E2E8F0] !rounded-[10px] h-12 w-full flex flex-row-reverse"
                labelClassName="!text-sm !font-medium !text-[#0F172A] !mb-2"
              />

              <Input
                inputName="password"
                label="كلمة المرور"
                placeholder="****************"
                register={register}
                error={errors}
                type={showPassword ? 'text' : 'password'}
                Icon={showPassword ? IconEye : IconEyeOff}
                onIconClick={() => setShowPassword(!showPassword)}
                iconClassName="text-gray-400"
                passwordStrengthLevel={0}
                otherClassName="!bg-white border border-[#E2E8F0] !rounded-[10px] h-12 w-full"
                labelClassName="!text-sm !font-medium !text-[#0F172A] !mb-2"
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={isPending}
                className="mt-2 text-base"
              >
                {isPending ? 'جاري الإنشاء...' : 'إنشاء الحساب'}
              </Button>

              <div className="text-center mt-2">
                <Link
                  href="/auth/login"
                  className="text-sm font-semibold text-[#2563EB] hover:underline"
                >
                  لديك حساب بالفعل ؟ تسجيل الدخول
                </Link>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 my-2 text-xs text-[#9CA3AF]">
                <span className="flex-1 h-px bg-[#E5E7EB]" />
                <span>أو</span>
                <span className="flex-1 h-px bg-[#E5E7EB]" />
              </div>

              {/* Social Login */}
              <div className="flex gap-4">
                <Button
                  variant="subtle"
                  fullWidth
                  className="!bg-white border border-[#E5E7EB] text-[#0F172A] h-12 !font-medium"
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    <FaApple size={20} className="shrink-0" />
                    <span>التسجيل باستخدام Apple</span>
                  </span>
                </Button>
                <Button
                  variant="subtle"
                  fullWidth
                  className="!bg-white border border-[#E5E7EB] text-[#0F172A] h-12 !font-medium"
                >
                   <span className="inline-flex items-center justify-center gap-2">
                    <FcGoogle size={20} className="shrink-0" />
                    <span>التسجيل باستخدام جوجل</span>
                  </span>
                </Button>
              </div>

              {/* Footer text */}
              <div className="mt-4 text-center">
                 <p className="text-[10px] text-[#9CA3AF] flex items-center justify-center gap-1">
                   <span className="text-amber-400">🔒</span>
                   بياناتك محمية ولا تتم مشاركة أي معلومات بدون إذنك.
                 </p>
              </div>

            </form>
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

export default RegisterPage;
