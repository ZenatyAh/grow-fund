'use client';
import { ReactHookFormProps } from '@/interfaces';
import { GetCampaignInfo } from '@/shared/constants/getCampaignInfo';
import AnimatedWrapper from '@/shared/ui/components/FramerMotion/AnimatedWrapper';
import InfoText from '@/shared/ui/components/InfoText';
import Input from '@/shared/ui/components/Input';
import TitleWithIcon from '@/shared/ui/components/TitleWithIcon';
import Image from 'next/image';
import { FaExclamationCircle, FaStar } from 'react-icons/fa';

const CampaignReviewStep = ({
  control,
  register,
  errors,
  values,
  setValue,
}: ReactHookFormProps) => {
  /*
    - UTC is a unified global time.
    - It means one common time for the whole world, without country differences.
    This:
      ✔ Relies on the user's device time
      ✔ Does not factor into the timezone calculation
      ✔ Returns a constant number (milliseconds from 1970)
  */
  const toUTC = (date: string) => {
    const [year, month, day] = date.split('-').map(Number); // Ex: [2026, 02, 23]
    return Date.UTC(year, month - 1, day);
  };

  if (!values?.startDate || !values?.endDate) return 0;

  const startUTC = toUTC(values?.startDate);
  const endUTC = toUTC(values?.endDate);
  const days = Math.ceil((endUTC - startUTC) / (1000 * 60 * 60 * 24));

  const campaignInfo = GetCampaignInfo(values, days);

  return (
    <div>
      <div className="space-y-2">
        <AnimatedWrapper>
          <h1 className="text-[40px] text-(--text-third) font-bold">
            مراجعة الحملة قبل النشر
          </h1>
        </AnimatedWrapper>
        <AnimatedWrapper>
          <p className="text-base text-(--text-slate-400)">
            تأكد من صحة التفاصيل قبل نشر حملتك يمكنك التعديل لاحقا
          </p>
        </AnimatedWrapper>
      </div>
      <div className="bg-white border border-(--bg-slate-100) rounded-2xl overflow-hidden mt-6">
        <AnimatedWrapper>
          <div className="relative w-full h-92.5">
            <Image
              src="/images/campaign.png"
              alt="campaign image"
              className="object-cover"
              fill
            />
          </div>
        </AnimatedWrapper>
        <div className="space-y-2 p-3">
          {campaignInfo.slice(0, 2).map((item, index) => (
            <AnimatedWrapper key={item.id} custom={index}>
              <TitleWithIcon
                title={item.title}
                description={item.description}
                Icon={item.Icon}
                otherClassName="border-b !border-t-0 !border-l-0 !border-r-0 rounded-none"
                inputType={item.type}
                inputName={item.name}
                setValue={setValue}
                register={register}
                errors={errors}
                values={values}
              />
            </AnimatedWrapper>
          ))}
          <div className="grid grid-cols-2 gap-4">
            {campaignInfo.slice(2).map((item, index) => (
              <AnimatedWrapper key={item.id} custom={index}>
                <TitleWithIcon
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
                  inputType={item.type}
                  inputName={item.name}
                  setValue={setValue}
                  register={register}
                  errors={errors}
                  values={values}
                />
              </AnimatedWrapper>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-2 mt-6">
        <AnimatedWrapper>
          <h2 className="text-xl text-(-text-third) font-bold">
            كيف يتم تتبّع التقدّم؟
          </h2>
        </AnimatedWrapper>
        <AnimatedWrapper>
          <InfoText
            className="bg-white border border-(--bg-slate-100) rounded-3xl p-4"
            iconWrapper="flex items-center justify-center w-10 h-10 bg-(--bg-light-blue) rounded-full"
            Icon={FaExclamationCircle}
            text="ستظهر هذه المعلومات للمتبرعين كما هي , يرجى التأكد من خلوها من الأخطاء الإملائية"
          />
        </AnimatedWrapper>
      </div>
      <div className="mt-9">
        <AnimatedWrapper>
          <Input
            type="checkbox"
            placeholder="أؤكد أن المعلومات المقدّمة صحيحة، وأن الحملة تهدف لأثر إنساني حقيقي."
            inputName="checkbox"
            control={control}
            variant="secondary"
          />
        </AnimatedWrapper>
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
