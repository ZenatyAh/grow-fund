'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/shared/Button';
import ImageSlider from '@/components/shared/ImageSlider';
import HeaderSubtitle from '@/components/shared/HeaderSubtitle';
import Logo from '@/shared/ui/components/Logo';
import Input from '@/shared/ui/components/Input';
import Link from 'next/link';
import { FaSpinner, FaLock } from 'react-icons/fa';
import { useResetPassword } from '@/lib/api/hooks/useAuth';

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

const ResetPasswordPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [resetToken, setResetToken] = useState<string | null>(null);

  const { mutate: resetPassword, isPending } = useResetPassword();

  useEffect(() => {
    // Get token from session storage
    if (typeof window !== 'undefined') {
      const token = sessionStorage.getItem('resetToken');
      if (!token) {
        // If no token, redirect to forgot password
        router.push('/auth/forgot-password');
      } else {
        setResetToken(token);
      }
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!password || !confirmPassword) {
      setError('يرجى ملء جميع الحقول');
      return;
    }

    if (password !== confirmPassword) {
      setError('كلمات المرور غير متطابقة');
      return;
    }

    // Basic password validation
    if (password.length < 8) {
      setError('يجب أن تتكون كلمة المرور من 8 أحرف على الأقل');
      return;
    }

    if (!resetToken) {
      setError('رمز إعادة التعيين مفقود. يرجى إعادة طلب الرمز.');
      return;
    }

    resetPassword(
      { resetToken, password },
      {
        onSuccess: () => {
          setSuccess(true);
          // Clear session storage
          sessionStorage.removeItem('resetToken');
          sessionStorage.removeItem('resetEmail');
        },
        onError: (err: Error) => {
          setError(err.message || 'فشل تحديث كلمة المرور. يرجى المحاولة مرة أخرى.');
        },
      }
    );
  };

  const getPasswordStrength = (pass: string) => {
    let strength = 0;
    if (pass.length >= 8) strength += 1;
    if (/[0-9]/.test(pass)) strength += 1;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pass)) strength += 1;
    return strength; // 0 to 3
  };

  const strength = getPasswordStrength(password);

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
              {success ? (
                // Success State
                <div className="flex flex-col items-center">
                  {/* Thumbs Up Image/Icon Placeholder - The user provided image shows a 3D hand */}
                  <div className="mb-6 text-6xl shadow-sm">
                    👍
                  </div>

                  <h2 className="flex items-center gap-3 text-2xl md:text-3xl font-bold text-[#0F172A] mb-2">
                    <span className="bg-green-500 text-white rounded p-1 text-lg">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    تم تحديث كلمة المرور بنجاح
                  </h2>
                  
                  <p className="text-[#6B7280] text-sm md:text-base mb-8">
                    يمكنك الآن تسجيل الدخول بأمان
                  </p>

                  <Link href="/auth/login" className="w-full block">
                    <Button variant="primary" size="lg" fullWidth className="bg-[#2563EB] hover:bg-[#1D4ED8]">
                      الانتقال إلى تسجيل الدخول
                    </Button>
                  </Link>
                </div>
              ) : (
                // Form State
                <>
                  <HeaderSubtitle
                    title=" تعيين كلمة مرور جديدة 🔑"
                    subtitle="اختر كلمة مرور قوية لحماية حسابك"
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
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-right">
                    {/* Password */}
                    <Input
                      type="password"
                      inputName="password"
                      label="كلمة المرور"
                      placeholder="*************"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      variant="secondary"
                      otherClassName="w-full h-12 rounded-xl"
                      inputClassName="text-left"
                      showPassStrength={true}
                      passwordStrengthLevel={strength}
                    />

                     {/* Confirm Password */}
                     <Input
                      type="password"
                      inputName="confirmPassword"
                      label="تأكيد كلمة المرور"
                      placeholder="*************"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      variant="secondary"
                      otherClassName="w-full h-12 rounded-xl"
                      inputClassName="text-left"
                    />

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
                        'تحديث كلمة المرور'
                      )}
                    </Button>
                  </form>

                  {/* Validation Hints (Static for now based on mockup requirements) */}
                  <div className="mt-4 text-right text-sm text-[#6B7280] space-y-2" dir="rtl">
                      <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded flex items-center justify-center ${password.length >= 8 ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                             {password.length >= 8 && <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                          </div>
                          <span>8 أحرف على الأقل</span>
                      </div>
                      <div className="flex items-center gap-2">
                           <div className={`w-4 h-4 rounded flex items-center justify-center ${/[0-9]/.test(password) ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                             {/[0-9]/.test(password) && <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                          </div>
                          <span>تحتوي على رقم</span>
                      </div>
                       <div className="flex items-center gap-2">
                           <div className={`w-4 h-4 rounded flex items-center justify-center ${/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>
                             {/[!@#$%^&*(),.?":{}|<>]/.test(password) && <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                          </div>
                          <span>تحتوي على رمز خاص</span>
                      </div>
                  </div>
                </>
              )}

              {/* Privacy Note */}
              <p className="text-center text-[#94A3B8] text-xs mt-8 flex items-center justify-center gap-1">
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

export default ResetPasswordPage;
