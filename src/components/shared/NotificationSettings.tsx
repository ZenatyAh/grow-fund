'use client';

import React, { useState } from 'react';
import { Bell, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NotificationSettingItemProps, NotificationGroupProps } from '@/interfaces';

const NotificationItem = ({ id, title, description, isEnabled, onToggle }: NotificationSettingItemProps) => {
    return (
        <div className="flex items-center justify-between w-full min-h-[104px] p-4 md:p-6 bg-white border-[2px] border-[#E2E8F0] rounded-[24px] gap-4 md:gap-6">


            <div className="flex items-center gap-[24px]">
                <div className="w-[40px] h-[40px] rounded-full bg-[#EFF6FF] border border-[#E2E8F0] flex items-center justify-center text-[#2563EB] flex-shrink-0">
                    <Bell size={20} className="fill-[#2563EB]" />
                </div>

                <div className="flex flex-col gap-[8px] text-right">

                    <h4 style={{
                        fontFamily: 'Tajawal',
                        fontWeight: 700,
                        fontSize: '16px',
                        lineHeight: '160%',
                        letterSpacing: '0%',
                    }} className="text-[#0F172A]">
                        {title}
                    </h4>


                    <p style={{
                        fontFamily: 'Tajawal',
                        fontWeight: 400,
                        fontSize: '12px',
                        lineHeight: '140%',
                        letterSpacing: '0%',
                        textAlign: 'right',
                        color: '#334155'
                    }} className="">
                        {description}
                    </p>
                </div>
            </div>


            <button
                onClick={() => onToggle(id)}
                className={cn(
                    "w-[44px] h-[24px] rounded-full relative transition-colors duration-200 ease-in-out focus:outline-none flex-shrink-0",
                    isEnabled ? "bg-[#2563EB]" : "bg-[#E2E8F0]"
                )}
            >
                <span
                    className={cn(
                        "absolute top-[2px] bg-white rounded-full shadow-sm transition-all duration-200 ease-in-out w-[20px] h-[20px]",
                        isEnabled ? "right-[2px]" : "right-[calc(100%-22px)]"
                    )}
                />
            </button>
        </div>
    );
};



const NotificationGroup = ({ title, items, state, onToggle }: NotificationGroupProps) => {
    return (
        <div className="w-full bg-white border border-[#E2E8F0] rounded-[24px] p-4 md:p-6 flex flex-col gap-6">
            <div className="flex items-center justify-start gap-[8px]">
                <AlertCircle size={24} className="fill-[#2563EB] text-white" />
                <h3 className="text-[20px] font-bold text-[#0F172A] font-['var(--font-tajawal)'] leading-[150%] text-right">
                    {title}
                </h3>
            </div>
            <div className="flex flex-col gap-[16px]">
                {items.map((item) => (
                    <NotificationItem
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        description={item.description}
                        isEnabled={state[item.id] || false}
                        onToggle={onToggle}
                    />
                ))}
            </div>
        </div>
    );
};

const NotificationSettingsSection = () => {
    const [settings, setSettings] = useState<Record<string, boolean>>({
        impact_updates: true,
        campaign_progress: true,
        new_campaigns: true,
        campaign_completion: true,
        account_alerts: true,
        account_updates: true,
    });

    const handleToggle = (id: string) => {
        setSettings((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const notificationGroups = [
        {
            title: 'إشعارات الأثر',
            items: [
                {
                    id: 'impact_updates',
                    title: 'تحديثات أثر تبرعاتك',
                    description: 'تلق إشعارات عندما يتحقق أثر حقيقي لتبرعك أو تظهر نتائج جديدة.',
                },
                {
                    id: 'campaign_progress',
                    title: 'تقدم الحملات التي دعمتها',
                    description: 'تلق إشعارات عند وصول الحملة إلى مراحل مهمة أو اقترابها من تحقيق هدفها.',
                },
            ],
        },
        {
            title: 'إشعارات الحملات',
            items: [
                {
                    id: 'new_campaigns',
                    title: 'حملات جديدة تناسب اهتماماتك',
                    description: 'إشعار عن حملات قريبة من المجالات التي تهمك، في حال رغبت بذلك.',
                },
                {
                    id: 'campaign_completion',
                    title: 'حملات قريبة من الاكتمال',
                    description: 'إشعار عند اقتراب حملة من تحقيق هدفها لتكون جزءًا من لحظتها الأخيرة.',
                },
            ],
        },
        {
            title: 'إشعارات النظام',
            items: [
                {
                    id: 'account_alerts',
                    title: 'تنبيهات الحساب والأمان',
                    description: 'إشعارات مهمة متعلقة بتسجيل الدخول أو تغييرات الأمان في حسابك.',
                },
                {
                    id: 'account_updates',
                    title: 'تحديثات الحساب',
                    description: 'نخبرك بأي تحديثات ضرورية متعلقة بحسابك أو إعداداته.',
                },
            ],
        },
    ];

    return (
        <div
            className="w-full max-w-full pt-2 md:pt-4 flex flex-col gap-6 pb-4"
            dir="rtl"
        >
            <h1 className="text-[32px] font-bold text-[#0F172A] text-right leading-[140%] font-['var(--font-tajawal)'] mb-[8px]">
                إعدادات الإشعارات
            </h1>

            <div className="flex flex-col gap-6 pb-4">
                {notificationGroups.map((group, index) => (
                    <NotificationGroup
                        key={index}
                        title={group.title}
                        items={group.items}
                        state={settings}
                        onToggle={handleToggle}
                    />
                ))}
            </div>
        </div>
    );
};

export default NotificationSettingsSection;
