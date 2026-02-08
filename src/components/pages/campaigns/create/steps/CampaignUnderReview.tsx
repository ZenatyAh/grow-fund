import InfoText from '@/shared/ui/components/InfoText';
import Image from 'next/image';
import { FaShieldAlt } from 'react-icons/fa';
import { MdAccessTime } from 'react-icons/md';

export const trackingProgressData = [
  {
    id: 1,
    Icon: FaShieldAlt,
    text: 'نقوم بمراجعة الحملات للتأكد من وضوح الهدف ومصداقية المحتوى قبل نشرها.',
  },
  {
    id: 2,
    Icon: MdAccessTime,
    text: 'تستغرق المراجعة عادة من 24 إلى 48 ساعة.',
  },
];

const CampaignUnderReview = () => {
  return (
    <div className="space-y-2">
      <div className="space-y-6 text-center">
        <Image
          src="/images/campaign-under-review.png"
          alt="campaign under review image"
          width={400}
          height={400}
          className="mx-auto"
        />
        <div>
          <h1 className="text-[40px] text-(--text-third) font-bold">
            حملتك قيد المراجعة الآن
          </h1>
          <p className="text-lg text-(--text-slate-400)">
            شكرًا لك! تم إرسال حملتك لمراجعتها من قبل فريق نجومي
          </p>
        </div>
      </div>
      <div className="space-y-2 mt-6">
        <h2 className="text-xl text-(-text-third) font-bold">
          كيف يتم تتبّع التقدّم؟
        </h2>
        {trackingProgressData.map((card) => (
          <InfoText
            key={card.id}
            className="bg-white border border-(--bg-slate-100) rounded-3xl p-4"
            iconWrapper="flex items-center justify-center w-10 h-10 bg-(--bg-light-blue) rounded-full"
            Icon={card.Icon}
            text={card.text}
          />
        ))}
      </div>
    </div>
  );
};

export default CampaignUnderReview;
