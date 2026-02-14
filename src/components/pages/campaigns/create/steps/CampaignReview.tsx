import { ReactHookFormProps } from '@/interfaces';
import InfoText from '@/shared/ui/components/InfoText';
import Input from '@/shared/ui/components/Input';
import TitleWithIcon from '@/shared/ui/components/TitleWithIcon';
import { Edit, Star } from 'lucide-react';
import Image from 'next/image';
import { FaExclamationCircle, FaStar } from 'react-icons/fa';

const campaignInfo = [
  {
    id: 1,
    title: 'اسم الحملة',
    description: 'دعم تعليم الأطفال المحتاجين',
    Icon: Edit,
  },
  {
    id: 2,
    title: 'وصف الحملة',
    description:
      'تبرّع بالنجوم لدعم الحملات الإنسانية ومتابعة أثر تبرعك بكل شفافية',
    Icon: Edit,
  },
  {
    id: 3,
    title: 'الهدف',
    description: '5,000',
    Icon: Edit,
    descIcon: Star,
  },
  {
    id: 4,
    title: 'المدة',
    description: '30 يوم',
    Icon: Edit,
  },
];

const CampaignReviewStep = ({ control, errors }: ReactHookFormProps) => {
  return (
    <div>
      <div className="space-y-2">
        <h1 className="text-[40px] text-(--text-third) font-bold">
          مراجعة الحملة قبل النشر
        </h1>
        <p className="text-base text-(--text-slate-400)">
          تأكد من صحة التفاصيل قبل نشر حملتك يمكنك التعديل لاحقا
        </p>
      </div>
      <div className="bg-white border border-(--bg-slate-100) rounded-2xl overflow-hidden mt-6">
        <div className="relative w-full h-92.5">
          <Image
            src="/images/campaign.png"
            alt="campaign image"
            className="object-cover"
            fill
          />
        </div>
        <div className="space-y-2 p-3">
          {campaignInfo.slice(0, 2).map((item) => (
            <TitleWithIcon
              key={item.id}
              title={item.title}
              description={item.description}
              Icon={item.Icon}
              otherClassName="border-b !border-t-0 !border-l-0 !border-r-0 rounded-none"
            />
          ))}
          <div className="grid grid-cols-2 gap-4">
            {campaignInfo.slice(2).map((item) => (
              <TitleWithIcon
                key={item.id}
                title={item.title}
                Icon={item.Icon}
                description={
                  item.descIcon ? (
                    <div className="flex items-center gap-1.5">
                      <span>{item.description}</span>
                      <FaStar className="text-(--text-secondary)" />
                    </div>
                  ) : (
                    item.description
                  )
                }
                otherClassName="border-none"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-2 mt-6">
        <h2 className="text-xl text-(-text-third) font-bold">
          كيف يتم تتبّع التقدّم؟
        </h2>
        <InfoText
          className="bg-white border border-(--bg-slate-100) rounded-3xl p-4"
          iconWrapper="flex items-center justify-center w-10 h-10 bg-(--bg-light-blue) rounded-full"
          Icon={FaExclamationCircle}
          text="ستظهر هذه المعلومات للمتبرعين كما هي , يرجى التأكد من خلوها من الأخطاء الإملائية"
        />
      </div>
      <div className="mt-9">
        <Input
          type="checkbox"
          placeholder="أؤكد أن المعلومات المقدّمة صحيحة، وأن الحملة تهدف لأثر إنساني حقيقي."
          inputName="checkbox"
          control={control}
          variant="secondary"
        />
        {/* {errors && errors?.['checkbox'] && (
          <p className="text-base text-red-500 mt-1">
            {errors?.['checkbox'].message}
          </p>
        )} */}
      </div>
    </div>
  );
};

export default CampaignReviewStep;
