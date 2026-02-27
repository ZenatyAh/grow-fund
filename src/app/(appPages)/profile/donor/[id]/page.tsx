'use client';

import React, { useState } from 'react';
import { CheckCircle2, RotateCcw, Eye, Bell } from 'lucide-react';
import ProfileCard from '@/components/shared/ProfileCard';
import InfoWarCard from '@/components/shared/InfoWarCard';
import EditProfileForm from '@/components/shared/EditProfileForm';
import DonationPreferencesForm from '@/components/shared/DonationPreferencesForm';
import ChangePasswordForm from '@/components/shared/ChangePasswordForm';
import TwoFactorAuthForm from '@/components/shared/TwoFactorAuthForm';
import DonationHistorySection from '@/components/shared/DonationHistorySection';
import NotificationSettingsSection from '@/components/shared/NotificationSettings';
import AccountVerificationSection from '@/components/shared/AccountVerification';
import { DonationRecord } from '@/lib/utils';

const DonorProfilePage = ({ params: _params }: { params: { id: string } }) => {
  const [activeSection, setActiveSection] = useState('edit-data');

  const sampleDonations: DonationRecord[] = [
    {
      id: '1',
      amount: 100,
      title: 'حملة تعليمية - حملة خيرية لبناء مدرسة اساسية',
      date: '15 مارس 2025',
      imageUrl: '/images/donation-record.jpg',
      isCompleted: false,
      progressValue: 50,
      goalLabel: 'الهدف : 5000 نجمة',
      indicatorValue: '50',
      buttons: [
        {
          label: 'تبرع مرة أخرى',
          icon: <RotateCcw size={16} />,
          variant: 'primary',
          onClick: () => console.log('Donate again clicked'),
        },
        {
          label: 'مشاهدة التفاصيل',
          icon: <Eye size={16} />,
          variant: 'subtle',
          onClick: () => console.log('View details clicked'),
        },
      ],
    },
    {
      id: '2',
      amount: 100,
      title: 'حملة تعليمية - حملة خيرية لبناء مدرسة اساسية',
      date: '15 مارس 2025',
      imageUrl: '/images/donation-record.jpg',
      isCompleted: true,
      completedMessage: 'اكتمل الهدف 5000',
      completedIcon: <CheckCircle2 size={16} className="text-white hidden" />, // Hiding icon as it's not visible in screenshot text flow
      buttons: [
        {
          label: 'مشاهدة التحديثات',
          icon: <Bell size={16} />,
          variant: 'primary',
          onClick: () => console.log('View updates clicked'),
        },
      ],
    },
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen w-full" dir="rtl">
      <div className="flex flex-col gap-6 w-full py-2 md:py-4">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 items-start">
          <aside className="flex flex-col gap-6 w-full lg:w-[372px] lg:shrink-0">
            <ProfileCard
              type="individual"
              name="محمد شاهين"
              location="فلسطين، غزة"
              typeLabel="فرد"
              profileStrength={80}
              isDonor={true}
              activeItemId={activeSection}
              onMenuItemClick={(id) => setActiveSection(id)}
            />

            <InfoWarCard
              variant="info"
              title="لماذا التنبيهات ؟"
              message="تغيير كلمة المرور بشكل دوري يحمي استثماراتك وبياناتك المالية من الوصول غير المصرح به."
            />
          </aside>

          <main className="flex-1 w-full min-w-0">
            {activeSection === 'edit-data' && <EditProfileForm />}
            {activeSection === 'donation-preferences' && <DonationPreferencesForm />}
            {activeSection === 'change-password' && <ChangePasswordForm />}
            {activeSection === '2fa' && <TwoFactorAuthForm />}
            {activeSection === 'notifications' && <NotificationSettingsSection />}
            {activeSection === 'verification' && <AccountVerificationSection />}
            {activeSection === 'donation-record' && <DonationHistorySection donations={sampleDonations} />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DonorProfilePage;
