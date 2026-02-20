'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/shared/Button';
import ImageSlider from '@/components/shared/ImageSlider';
import HeaderSubtitle from '@/components/shared/HeaderSubtitle';
import Logo from '@/shared/ui/components/Logo';
import Input from '@/shared/ui/components/Input';
import Link from 'next/link';
import { FaEye, FaEyeSlash, FaApple, FaSpinner, FaLock } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useLogin, LoginResponse } from '@/lib/api/hooks/useAuth';
import { useAuth } from '@/providers/AuthProvider';
import { ROUTES } from '@/shared/constants/routes';

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

const LoginPage = () => {
  const router = useRouter();
  const { setAuthData } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { mutate: login, isPending } = useLogin();

  const isValidEmail = (emailValue: string) => /\S+@\S+\.\S+/.test(emailValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('يرجى إدخال البريد الإلكتروني وكلمة المرور');
      return;
    }

    if (!isValidEmail(email)) {
      setError('يرجى إدخال بريد إلكتروني صحيح');
      return;
    }

    login(
      { email, password },
      {
        onSuccess: (response: LoginResponse) => {
          // Persist auth data via AuthProvider
          setAuthData({
            token: response.token,
            userId: response.user.id,
            user: response.user,
          });

          // Redirect based on role to existing pages
          if (response.user.role === 'DONOR') {
            router.push(`/profile/donor/${response.user.id}`);
          } else if (response.user.role === 'CAMPAIGN_CREATOR') {
            router.push(`/profile/campaign-creator/${response.user.id}`);
          } else {
            router.push('/home');
          }
        },
        onError: (err: Error) => {
          setError(err.message || 'فشل تسجيل الدخول. يرجى التحقق من البيانات.');
        },
      }
    );
  };

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
                title="تسجيل الدخول إلى حسابك"
                subtitle="أدخل بياناتك للوصول إلى حملاتك وتبرعاتك، ومتابعة الأثر الذي تصنعه نجومك ⭐"
                className="gap-3 mb-8"
                titleClassName="text-3xl md:text-[32px] font-bold text-[#0F172A]"
                subtitleClassName="text-sm md:text-base text-[#6B7280] leading-relaxed"
              />

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-right animate-in fade-in slide-in-from-top-2">
                  {error}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-right">
                {/* Email */}
                <Input
                  type="email"
                  inputName="email"
                  label="البريد الإلكتروني"
                  placeholder="eng.mohammeduilux@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  variant="secondary"
                  otherClassName="w-full h-12 rounded-xl"
                  inputClassName="text-left"
                />

                {/* Password */}
                <Input
                  type={showPassword ? 'text' : 'password'}
                  inputName="password"
                  label="كلمة المرور"
                  placeholder="••••••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="secondary"
                  otherClassName="w-full h-12 rounded-xl"
                  inputClassName="text-left"
                  Icon={showPassword ? FaEyeSlash : FaEye}
                  iconClassName="text-[#94A3B8] hover:text-[#64748B] transition-colors"
                  onIconClick={() => setShowPassword(!showPassword)}
                />

                {/* Forgot Password */}
                <div className="text-right">
                  <Link href="/auth/forgot-password" className="text-sm text-[#3B82F6] hover:underline">
                    نسيت كلمة المرور؟
                  </Link>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={isPending}
                >
                  {isPending ? (
                    <FaSpinner className="animate-spin" size={20} />
                  ) : (
                    'تسجيل الدخول'
                  )}
                </Button>
              </form>

              {/* Register Link */}
              <p className="text-center text-[#64748B] mt-4 text-sm">
                ليس لديك حساب؟{' '}
                <Link href="/auth/register" className="text-[#3B82F6] font-medium hover:underline">
                  إنشاء حساب جديد
                </Link>
              </p>

              {/* Divider */}
              <div className="flex items-center gap-3 my-4 text-xs text-[#9CA3AF]">
                <span className="flex-1 h-px bg-[#E5E7EB]" />
                <span>أو</span>
                <span className="flex-1 h-px bg-[#E5E7EB]" />
              </div>

              {/* Social Login */}
              <div className="flex gap-4 w-full">
                <button
                  type="button"
                  className="flex-1 flex items-center justify-center gap-2 bg-white border border-[#E5E7EB] text-[#0F172A] h-12 font-medium rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap px-4"
                >
                  <FaApple size={20} className="shrink-0" />
                  <span>التسجيل باستخدام Apple</span>
                </button>
                <button
                  type="button"
                  className="flex-1 flex items-center justify-center gap-2 bg-white border border-[#E5E7EB] text-[#0F172A] h-12 font-medium rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap px-4"
                >
                  <FcGoogle size={20} className="shrink-0" />
                  <span>التسجيل باستخدام جوجل</span>
                </button>
              </div>

              {/* Privacy Note */}
              <p className="text-center text-[#94A3B8] text-xs mt-6 flex items-center justify-center gap-1">
                <FaLock size={10} />
                بياناتك محمية ولا تتم مشاركتها أي معلومات بدون إذنك
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
