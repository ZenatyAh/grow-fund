'use client';

import React, { useState } from 'react';
import InfoWarCard from './InfoWarCard';
import { Button } from './Button';
import { IconShield, IconMessage } from '@tabler/icons-react';
import { AuthMethod, cn } from '@/lib/utils';
import TwoFactorWizardModal from './TwoFactorWizardModal';

const TwoFactorAuthForm = () => {
    const [enabledMethod, setEnabledMethod] = useState<string | null>(null);
    const [isWizardOpen, setIsWizardOpen] = useState(false);

    const authMethods: AuthMethod[] = [
        {
            id: 'google-auth',
            title: 'تطبيق المصادقة (Google Authenticator)',
            description: 'استخدام تطبيقًا لتوليد رموز التحقق الخاصة، مثل هذا الخيار آمن للغاية',
            icon: <IconShield size={24} />
        },
        {
            id: 'sms',
            title: 'الرسائل النصية (SMS)',
            description: 'ستتلقى رمز التحقق عبر رسالة نصية إلى رقم هاتفك ***-***-0659',
            icon: <IconMessage size={24} />
        }
    ];

    const handleEnable = (methodId: string) => {
        if (methodId === 'sms') {
            setIsWizardOpen(true);
        } else {
            setEnabledMethod(methodId);
            console.log(`Enabling 2FA method: ${methodId}`);
        }
    };

    const handleWizardComplete = () => {
        setEnabledMethod('sms');
        console.log('2FA SMS enabled successfully');
    };

    return (
        <div
            className="h-[947px] pt-[40px] px-[32px] flex flex-col gap-[24px]"
            style={{ width: '1106px' }}
            dir="rtl"
        >

            <h1 className="text-[32px] font-bold text-[#0F172A] text-right leading-[140%] font-['var(--font-tajawal)'] mb-[8px]">
                المصادقة الثنائية
            </h1>


            <div>
                <InfoWarCard
                    variant="warning"
                    title="تحذير أمني"
                    message="المصادقة الثنائية غير مفعلة، ننصح بتفعيلها في أقرب وقت لحماية حسابك من الاختراق"
                />
            </div>


            <div
                className="bg-white border border-[#E2E8F0] rounded-[24px] p-[32px] flex flex-col gap-[32px]"
                style={{ width: '1050px', height: '719px' }}
            >

                <div className="flex items-center gap-[8px]">
                    <div className="w-6 h-6 bg-[#2563EB] rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold leading-none">!</span>
                    </div>
                    <h3 className="text-[20px] font-bold text-[#0F172A] font-['var(--font-tajawal)'] leading-[150%] text-right">
                        وسائل المصادقة المتاحة
                    </h3>
                </div>


                <div className="flex flex-col gap-[24px]">
                    {authMethods.map((method) => (
                        <div
                            key={method.id}
                            className={cn(
                                "flex items-center justify-between rounded-[24px] border-2 transition-all",
                                enabledMethod === method.id
                                    ? "border-[#2563EB] bg-[#EFF6FF]"
                                    : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1]"
                            )}
                            style={{ width: '986px', height: '104px', padding: '24px' }}
                        >
                            <div className="flex items-start gap-[24px] flex-1">

                                <div className={cn(
                                    "w-[48px] h-[48px] rounded-full flex items-center justify-center shrink-0",
                                    enabledMethod === method.id ? "bg-[#2563EB]" : "bg-[#EFF6FF]"
                                )}>
                                    <div className={enabledMethod === method.id ? "text-white" : "text-[#2563EB]"}>
                                        {method.icon}
                                    </div>
                                </div>


                                <div className="flex flex-col gap-[8px] flex-1">
                                    <h4 className="text-[18px] font-bold text-[#0F264D] font-['var(--font-tajawal)'] text-right">
                                        {method.title}
                                    </h4>
                                    <p className="text-[14px] text-[#64748B] font-['var(--font-tajawal)'] text-right leading-[1.4]">
                                        {method.description}
                                    </p>
                                </div>
                            </div>


                            <Button
                                variant={enabledMethod === method.id ? "subtle" : "primary"}
                                className="w-[103px] h-[48px] rounded-[8px] font-['var(--font-tajawal)'] text-[18px] font-bold px-[32px] py-[16px]"
                                onClick={() => handleEnable(method.id)}
                            >
                                {enabledMethod === method.id ? "مفعّل" : "تفعيل"}
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Two-Factor Wizard Modal */}
            <TwoFactorWizardModal
                isOpen={isWizardOpen}
                onClose={() => setIsWizardOpen(false)}
                onComplete={handleWizardComplete}
            />
        </div>
    );
};

export default TwoFactorAuthForm;