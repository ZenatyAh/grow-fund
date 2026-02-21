'use client';

import { Star, Compass } from 'lucide-react';
import { Button } from './Button';
import { CampaignCard } from './CampaignCard';
import { DonationHistoryProps } from '@/interfaces';


const DonationHistorySection = ({ donations = [], onExploreClick }: DonationHistoryProps) => {
    const isEmpty = donations.length === 0;

    if (isEmpty) {
        return (
            <div
                className="w-full max-w-full pt-2 md:pt-4 flex flex-col gap-6"
                dir="rtl"
            >
                <h1 className="text-[32px] font-bold text-[#0F172A] text-right leading-[140%] font-['var(--font-tajawal)'] mb-[8px]">
                    سجل التبرع
                </h1>

                <p className="text-[20px] font-bold text-[#334155] text-right font-['var(--font-tajawal)'] leading-[150%] mb-[16px]">
                    هنا يمكنك الاطلاع على جميع التبرعات التي قمت بها وتتبع أثرها
                </p>


                <div className="flex flex-col items-center justify-center flex-1">
                    <div className="flex flex-col items-center gap-[12px] max-w-[500px]">

                        <div className="w-[120px] h-[120px] rounded-full bg-[#EFF6FF] flex items-center justify-center">
                            <Star size={60} className="text-[#2563EB] fill-[#2563EB]" />
                        </div>


                        <h2 className="text-[32px] font-bold text-[#0F172A] text-center font-['var(--font-tajawal)'] leading-[140%]">
                            لا توجد تبرعات بعد
                        </h2>


                        <p className="text-[18px] text-[#64748B] text-center font-['var(--font-tajawal)'] leading-[160%]">
                            ابدأ بدعم حملة لإحداث أثر
                        </p>


                        <Button
                            variant="primary"
                            className="w-[250px] h-[56px] flex items-center justify-center rounded-[12px] px-6"
                            onClick={onExploreClick}
                        >
                            <span className="flex items-center gap-2 font-bold text-[18px]">
                                <Compass size={20} />
                                استكشاف حملات جديدة
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="w-full max-w-full pt-2 md:pt-4 flex flex-col gap-6"
            dir="rtl"
        >

            <h1 className="text-[32px] font-bold text-[#0F172A] text-right leading-[140%] font-['var(--font-tajawal)'] mb-[8px]">
                سجل التبرع
            </h1>


            <p className="text-[20px] font-bold text-[#334155] text-right font-['var(--font-tajawal)'] leading-[150%] mb-[16px]">
                هنا يمكنك الاطلاع على جميع التبرعات التي قمت بها وتتبع أثرها
            </p>

            <div className="flex flex-col gap-[24px]">
                {donations.map((donation) => (
                    <CampaignCard
                        key={donation.id}
                        amount={donation.amount}
                        title={donation.title}
                        date={donation.date}
                        imageUrl={donation.imageUrl}
                        isCompleted={donation.isCompleted}
                        progressValue={donation.progressValue}
                        goalLabel={donation.goalLabel}
                        indicatorValue={donation.indicatorValue}
                        completedMessage={donation.completedMessage}
                        completedIcon={donation.completedIcon}
                        buttons={donation.buttons}
                    />
                ))}
            </div>
        </div>
    );
};

export default DonationHistorySection;
