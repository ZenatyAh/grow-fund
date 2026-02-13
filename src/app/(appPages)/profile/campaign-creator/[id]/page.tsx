'use client';

import React, { useState } from 'react';
import SharedHeader from '@/components/shared/SharedHeader';
import ProfileCard from '@/components/shared/ProfileCard';
import InfoWarCard from '@/components/shared/InfoWarCard';
import EditProfileForm from '@/components/shared/EditProfileForm';
import ChangePasswordForm from '@/components/shared/ChangePasswordForm';
import TwoFactorAuthForm from '@/components/shared/TwoFactorAuthForm';
import NotificationSettingsSection from '@/components/shared/NotificationSettings';
import AccountVerificationSection from '@/components/shared/AccountVerification';

const CampaignCreatorProfilePage = ({ params }: { params: { id: string } }) => {
  const [activeSection, setActiveSection] = useState('edit-data');

  return (
    <div
      className="bg-[#F8FAFC] mx-auto overflow-x-hidden w-[1728px]"
      style={{ width: '1728px', height: '1429px', paddingTop: '40px' }}
      dir="rtl"
    >
      <div className="flex flex-col gap-[24px] w-full px-[120px]" style={{ paddingLeft: '120px', paddingRight: '120px' }}>
        <SharedHeader />

        <div className="flex flex-row gap-[10px] items-start">
          <aside className="flex flex-col gap-[24px] w-[372px]">
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

          <main className="flex-1">
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
