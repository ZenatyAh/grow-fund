'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { Bell } from 'lucide-react';
import { useParams } from 'next/navigation';
import Breadcrumbs from '@/shared/ui/components/Breadcrumbs';
import DonationSidebar from './components/DonationSidebar';
import InfoCard from './components/InfoCard';
import SegmentedTabs, { SegmentedTab } from './components/SegmentedTabs';
import OverviewContent from './components/OverviewContent';
import UpdateCard from './components/UpdateCard';
import { CAMPAIGNS } from '../data/campaigns';
import { cn } from '@/lib/utils';
import CampaignLikeButton from '../components/CampaignLikeButton';
import CampaignShareButton from '../components/CampaignShareButton';

const tabs: SegmentedTab[] = [
  { id: 'overview', label: 'نظرة عامة' },
  { id: 'updates', label: 'التحديثات' },
];

const CampaignDetailsPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isFollowing, setIsFollowing] = useState(false);
  const params = useParams<{ id: string }>();
  const campaignId = params?.id;
  const updatesByCampaign: Record<
    number,
    Array<{
      id: string;
      authorName: string;
      authorAvatar: string;
      verified?: boolean;
      timeLabel: string;
      title: string;
      description: string;
      image: string;
      likes: number;
    }>
  > = {
    1: [
      {
        id: 'update-1',
        authorName: 'عبدالله قاسم',
        authorAvatar: '/images/home/background.png',
        verified: true,
        timeLabel: 'أمس',
        title: 'انطلاق القوافل الأولى لسلة الخير',
        description: 'بفضل الله ثم دعمكم تم تجهيز الدفعة الأولى من السلال.',
        image: '/images/home/background.png',
        likes: 128,
      },
      {
        id: 'update-2',
        authorName: 'سارة العيسى',
        authorAvatar: '/images/home/background.png',
        verified: false,
        timeLabel: 'قبل يومين',
        title: 'تجهيز الدفعة الثانية',
        description: 'تم استلام المواد الأساسية وتجهيز السلال للمرحلة التالية.',
        image: '/images/home/background.png',
        likes: 64,
      },
    ],
    2: [
      {
        id: 'update-3',
        authorName: 'مبادرة سقيا',
        authorAvatar: '/images/home/background.png',
        verified: true,
        timeLabel: 'قبل 3 أيام',
        title: 'انتهاء فحص جودة المياه',
        description: 'تم اعتماد نتائج الفحص المخبري للمحطة الجديدة.',
        image: '/images/home/background.png',
        likes: 92,
      },
    ],
    3: [
      {
        id: 'update-4',
        authorName: 'لجنة الإيواء',
        authorAvatar: '/images/home/background.png',
        verified: false,
        timeLabel: 'قبل أسبوع',
        title: 'بدء أعمال الترميم',
        description: 'بدأت فرق الصيانة بإعادة تأهيل الأسقف والجدران.',
        image: '/images/home/background.png',
        likes: 55,
      },
    ],
    4: [
      {
        id: 'update-5',
        authorName: 'جمعية الرحمة',
        authorAvatar: '/images/home/background.png',
        verified: true,
        timeLabel: 'قبل 5 أيام',
        title: 'تأمين الدفعة الأولى من الأدوية',
        description: 'تم توفير أدوية الغسيل الكلوي للمرضى المسجلين.',
        image: '/images/home/background.png',
        likes: 77,
      },
    ],
    5: [
      {
        id: 'update-6',
        authorName: 'مؤسسة التعليم',
        authorAvatar: '/images/home/background.png',
        verified: false,
        timeLabel: 'قبل 4 أيام',
        title: 'تجهيز الحقائب المدرسية',
        description: 'تم تجهيز دفعة جديدة من الحقائب والقرطاسية.',
        image: '/images/home/background.png',
        likes: 33,
      },
    ],
    6: [
      {
        id: 'update-7',
        authorName: 'بيئة مستدامة',
        authorAvatar: '/images/home/background.png',
        verified: true,
        timeLabel: 'قبل 6 أيام',
        title: 'حملة تنظيف الشاطئ',
        description: 'شارك المتطوعون في إزالة النفايات من المناطق الحساسة.',
        image: '/images/home/background.png',
        likes: 41,
      },
    ],
    7: [
      {
        id: 'update-8',
        authorName: 'فريق الإنقاذ',
        authorAvatar: '/images/home/background.png',
        verified: false,
        timeLabel: 'قبل 3 أيام',
        title: 'إنقاذ حيوان مصاب',
        description: 'تم تقديم الرعاية البيطرية وإتمام عملية التأهيل.',
        image: '/images/home/background.png',
        likes: 29,
      },
    ],
    8: [
      {
        id: 'update-9',
        authorName: 'مبادرة التعليم الآمن',
        authorAvatar: '/images/home/background.png',
        verified: true,
        timeLabel: 'قبل أسبوعين',
        title: 'اكتمال الترميم',
        description: 'تم افتتاح المدرسة بعد استكمال أعمال الصيانة.',
        image: '/images/home/background.png',
        likes: 210,
      },
    ],
  };

  const campaign = useMemo(() => {
    if (!campaignId) return null;
    const numericId = Number(campaignId);
    return (
      CAMPAIGNS.find((item) =>
        Number.isNaN(numericId)
          ? String(item.id) === campaignId
          : item.id === numericId
      ) ?? null
    );
  }, [campaignId]);

  const updates = campaign ? updatesByCampaign[campaign.id] ?? [] : [];

  if (!campaign) {
    return (
      <main className="min-h-screen bg-slate-50">
        <div className="container mx-auto px-4 pb-20 pt-10 max-w-[1300px] text-center text-slate-500">
          الحملة غير موجودة
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 pb-20 pt-10 max-w-[1300px]">
        <Breadcrumbs
          className="mb-6"
          currentLabel={campaign.title}
          labelMap={{
            campaigns: 'استكشاف الحملات',
          }}
        />

        <div className="text-right">
          <h1 className="font-['Tajawal'] text-[32px] font-bold leading-[140%] tracking-[0] text-slate-900">
            {campaign.title}
          </h1>
          <p
            className="mt-2 font-['Tajawal'] text-[18px] font-normal leading-[160%] tracking-[0] text-slate-500 text-right"
            style={{
              fontFamily: "Tajawal",
              fontWeight: 400,
              fontStyle: "normal",
              fontSize: "18px",
              lineHeight: "160%",
              letterSpacing: "0%",
              textAlign: "right",
              color: "#000000",
            }}
          >
            {campaign.description}
          </p>
        </div>

        <div className="mt-10 w-full max-w-[1488px] mx-auto overflow-hidden rounded-[16px] bg-white shadow-sm">
          <div className="relative h-[260px] md:h-[420px] lg:h-[560px] xl:h-[729px]">
            <Image
              src={campaign.image}
              alt={campaign.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse gap-8 lg:flex-row-reverse">
          <div className="lg:w-[320px]">
            <DonationSidebar
              campaignId={campaign.id}
              raised={campaign.raised}
              goal={campaign.goal}
              daysLeft={campaign.daysLeft}
            />
          </div>

          <div className="flex-1 space-y-6">
            <InfoCard className="rounded-[28px] px-8 py-6">
              <div className="flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 overflow-hidden rounded-full">
                    <Image
                      src="/images/home/background.png"
                      alt="المنشئ"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                      {campaign.creatorName ?? 'المنشئ'}
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-xs">
                        ✓
                      </span>
                    </div>
                    <div className="text-sm text-slate-400">
                      {campaign.location ?? 'الموقع غير محدد'}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsFollowing((prev) => !prev)}
                  className={cn(
                    'flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold shadow-sm transition-all duration-300',
                    'active:scale-95',
                    isFollowing
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  )}
                >
                  {!isFollowing && (
                    <Bell className="h-4 w-4" aria-hidden="true" />
                  )}
                  <span
                    className={cn(
                      'inline-block transition-transform duration-300',
                      isFollowing && 'scale-110'
                    )}
                  >
                    {isFollowing ? 'متابع' : 'متابعة'}
                  </span>
                </button>
              </div>
            </InfoCard>

            <InfoCard className="px-6 py-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="order-2 flex items-center gap-3">
                  <CampaignShareButton
                    campaignId={campaign.id}
                    campaignTitle={campaign.title}
                    className="h-11 w-11 rounded-full border border-slate-100 bg-white p-2 text-blue-600 shadow-sm hover:bg-slate-50"
                    iconClassName="h-[18px] w-[18px]"
                  />
                  <CampaignLikeButton
                    campaignId={campaign.id}
                    className="h-11 w-11 rounded-full border border-slate-100 bg-white p-2 text-rose-500 shadow-sm hover:bg-rose-50"
                    iconClassName="h-[18px] w-[18px]"
                  />
                </div>
                <div className="order-1 flex flex-1">
                  <SegmentedTabs
                    tabs={tabs}
                    activeId={activeTab}
                    onChange={setActiveTab}
                    className="mx-auto w-full max-w-[720px]"
                    tabClassName="text-base"
                  />
                </div>
              </div>
            </InfoCard>

            {activeTab === 'overview' ? (
              <InfoCard className="overflow-hidden p-0">
                <OverviewContent campaign={campaign} />
              </InfoCard>
            ) : (
              <div className="space-y-6">
                {updates.length ? (
                  updates.map((update) => (
                    <UpdateCard
                      key={update.id}
                      authorName={update.authorName}
                      authorAvatar={update.authorAvatar}
                      verified={update.verified}
                      timeLabel={update.timeLabel}
                      title={update.title}
                      description={update.description}
                      image={update.image}
                      likes={update.likes}
                      likeId={update.id}
                    />
                  ))
                ) : (
                  <InfoCard title="آخر التحديثات">
                    <div className="text-right text-sm text-slate-500">
                      لا توجد تحديثات حتى الآن.
                    </div>
                  </InfoCard>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CampaignDetailsPage;
