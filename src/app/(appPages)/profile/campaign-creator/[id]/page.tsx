'use client';

import React, { useState } from 'react';
import ProfileCard from '@/components/shared/ProfileCard';
import InfoWarCard from '@/components/shared/InfoWarCard';
import EditProfileForm from '@/components/shared/EditProfileForm';
import ChangePasswordForm from '@/components/shared/ChangePasswordForm';
import TwoFactorAuthForm from '@/components/shared/TwoFactorAuthForm';
import NotificationSettingsSection from '@/components/shared/NotificationSettings';
import AccountVerificationSection from '@/components/shared/AccountVerification';

const CampaignCreatorProfilePage = ({ params: _params }: { params: { id: string } }) => {
  const [activeSection, setActiveSection] = useState('edit-data');

  return (
    <div className="bg-[#F8FAFC] min-h-screen w-full" dir="rtl">
      <div className="flex flex-col gap-6 w-full py-2 md:py-4">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 items-start">
          <aside className="flex flex-col gap-6 w-full lg:w-[372px] lg:shrink-0">
            <ProfileCard
              type="individual"
              name="محمد شاهين"
              location="فلسطين، غزة"
              typeLabel="منشئ حملة"
              profileStrength={65}
              activeItemId={activeSection}
              onMenuItemClick={(id) => setActiveSection(id)}
            />

            <InfoWarCard
              variant="info"
              title="نصيحة أمنية"
              message="تأكد من تحديث بيانات مؤسستك بشكل دوري لضمان مصداقية حملاتك."
            />
          </aside>

          <main className="flex-1 w-full min-w-0">
            {activeSection === 'edit-data' && <EditProfileForm />}
            {activeSection === 'change-password' && <ChangePasswordForm />}
            {activeSection === '2fa' && <TwoFactorAuthForm />}
            {activeSection === 'notifications' && <NotificationSettingsSection />}
            {activeSection === 'verification' && <AccountVerificationSection />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default CampaignCreatorProfilePage;
