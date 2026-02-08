import React from 'react';
import SharedHeader from '@/components/shared/SharedHeader';

const CampaignCreatorProfilePage = ({ params }: { params: { id: string } }) => {
  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] py-10">
      <div className="max-w-[1728px] mx-auto px-[120px] flex flex-col gap-[10px]">
        <SharedHeader />
      </div>
    </div>
  );
};

export default CampaignCreatorProfilePage;
