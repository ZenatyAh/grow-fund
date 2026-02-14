'use client';

import { useState } from 'react';
import { Button } from '@/components/shared/Button';
import ImageSlider from '@/components/shared/ImageSlider';
import HeaderSubtitle from '@/components/shared/HeaderSubtitle';
import Logo from '@/shared/ui/components/Logo';
import Input from '@/shared/ui/components/Input';
import Link from 'next/link';
import { FaSpinner, FaLock } from 'react-icons/fa';
import { useForgotPassword, useVerifyOtp, VerifyOtpResponse } from '@/lib/api/hooks/useAuth';
import { useRouter } from 'next/navigation';

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

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  
  const { mutate: forgotPassword, isPending: isSendingEmail } = useForgotPassword();
  const { mutate: verifyOtp, isPending: isVerifyingOtp } = useVerifyOtp();

  const isValidEmail = (emailValue: string) => /\S+@\S+\.\S+/.test(emailValue);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError('يرجى إدخال البريد الإلكتروني');
      return;
    }

    if (!isValidEmail(email)) {
      setError('يرجى إدخال بريد إلكتروني صحيح');
      return;
    }

    forgotPassword(
      { email },
      {
        onSuccess: () => {
          setStep('otp');
        },
        onError: (err: Error) => {
          setError(err.message || 'حدث خطأ. يرجى المحاولة مرة أخرى.');
        },
      }
    );
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Handle backspace to focus previous input
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError('يرجى إدخال رمز التحقق كاملاً');
      return;
    }

    verifyOtp(
      { email, otp: otpValue },
      {
        onSuccess: (response: VerifyOtpResponse) => {
           // Store reset token and email for the next step (Reset Password Page)
           sessionStorage.setItem('resetToken', response.resetToken);
           sessionStorage.setItem('resetEmail', email);
           router.push('/auth/reset-password');
        },
        onError: (err: Error) => {
          setError(err.message || 'رمز التحقق غير صحيح. يرجى المحاولة مرة أخرى.');
        },
      }
    );
  };

  const maskEmail = (emailStr: string) => {
    const [name, domain] = emailStr.split('@');
    if (!name || !domain) return emailStr;
    const maskedName = name.substring(0, 3) + '****';
    return `${maskedName}@${domain}`;
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
              {step === 'otp' ? (
                // OTP Step
                <>
                  <HeaderSubtitle
                    title="أدخل رمز التحقق"
                    subtitle={`أرسلنا رمز تحقق مكون من 6 أرقام إلى بريدك الإلكتروني. الرجاء إدخال الرمز لإكمال العملية.`}
                    className="gap-3 mb-2"
                    titleClassName="text-3xl md:text-[32px] font-bold text-[#0F172A]"
                    subtitleClassName="text-sm md:text-base text-[#6B7280] leading-relaxed"
                  />
                   <p className="text-base font-semibold text-[#0F172A] mb-8" dir="rtl">
                    تم الإرسال إلى: <span dir="ltr">{maskEmail(email)}</span>
                  </p>

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-right animate-in fade-in slide-in-from-top-2">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleOtpSubmit} className="flex flex-col gap-8 text-right">
                    <div className="flex justify-center gap-3 flex-row-reverse">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          id={`otp-${index}`}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          className="w-12 h-12 md:w-14 md:h-14 border border-[#E2E8F0] rounded-lg text-center text-xl font-bold bg-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 outline-none transition-all"
                        />
                      ))}
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      disabled={isVerifyingOtp}
                    >
                      {isVerifyingOtp ? (
                        <FaSpinner className="animate-spin" size={20} />
                      ) : (
                        'تأكيد الرمز'
                      )}
                    </Button>
                  </form>
                   <p className="text-center text-sm text-[#6B7280] mt-4">
                    لم يصلك الرمز؟ <button onClick={() => forgotPassword({ email })} className="text-[#6B7280] hover:text-[#0F172A] disabled:opacity-50" disabled={isSendingEmail}>إعادة الإرسال (بعد 30 ثانية)</button>
                  </p>
                </>
              ) : (
                // Email Step
                <>
                  <HeaderSubtitle
                    title="نسيت كلمة المرور؟ لا تقلق"
                    subtitle="أدخل بريدك الإلكتروني المسجل لدينا وسنرسل لك رابطًا آمنًا لإعادة تعيين كلمة المرور"
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
                  <form onSubmit={handleEmailSubmit} className="flex flex-col gap-5 text-right">
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

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      fullWidth
                      disabled={isSendingEmail}
                    >
                      {isSendingEmail ? (
                        <FaSpinner className="animate-spin" size={20} />
                      ) : (
                        'إرسال رمز التحقق'
                      )}
                    </Button>
                  </form>

                  {/* Back to Login Link */}
                  <div className="text-center mt-6">
                    <Link
                      href="/auth/login"
                      className="text-sm font-semibold text-[#2563EB] hover:underline"
                    >
                      العودة إلى تسجيل الدخول
                    </Link>
                  </div>
                </>
              )}

              {/* Privacy Note */}
              <p className="text-center text-[#94A3B8] text-xs mt-10 flex items-center justify-center gap-1">
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

export default ForgotPasswordPage;
