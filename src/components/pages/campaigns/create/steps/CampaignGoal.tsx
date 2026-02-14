'use client';
import { CampaignGoalStepProps } from '@/interfaces';
import InfoText from '@/shared/ui/components/InfoText';
import Input from '@/shared/ui/components/Input';
import { Progress } from '@/shared/ui/components/progress';
import { Star } from 'lucide-react';
import { FaExclamationCircle } from 'react-icons/fa';
import { format, addDays } from 'date-fns';
import { useState } from 'react';
import { campaignsDurations } from '@/shared/config/CampaignData';
import ProgressTracked from '@/shared/ui/components/ProgressTracked';

const CampaignGoalStep = ({
  startDate,
  setValue,
  register,
  errors,
}: CampaignGoalStepProps) => {
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);

  const handleDurationClick = (days: number) => {
    if (!startDate) return;
    setSelectedDuration(days);
    const end = addDays(new Date(startDate), days);
    setValue('endDate', format(end, 'yyyy-MM-dd'), { shouldValidate: true });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl text-(--text-third) font-bold">مدة الحملة</h2>
        <div className="flex items-center gap-4 flex-wrap mt-2">
          {campaignsDurations.map((item) => {
            const { id, duration } = item;
            return (
              <div
                key={id}
                onClick={() => handleDurationClick(duration)}
                className={`flex items-center gap-4 text-lg py-2 px-8 rounded-xl border-2 cursor-pointer transition
                ${
                  selectedDuration === duration
                    ? 'bg-(--bg-bold-blue) text-white border-(--bg-bold-blue)'
                    : 'text-(--brand-primary) border-(--bg-slate-100)'
                }`}
              >
                <span>{duration} يوماً</span>
              </div>
            );
          })}
          <div className="flex-1">
            <Input
              type="date"
              inputName="startDate"
              placeholder="تحديد تاريخ بدء الحملة"
              register={register}
              variant="secondary"
              otherClassName={`rounded-xl! w-full cursor-pointer ${
                errors.startDate ? 'border border-red-500' : ''
              }`}
              inputClassName="cursor-pointer"
              onChange={(e) =>
                setValue('startDate', e.target.value, {
                  shouldValidate: true,
                })
              }
            />
            {errors && errors?.['startDate'] && (
              <p className="text-base text-red-500 mt-1">
                {errors?.startDate.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Campaign end date */}
      <div>
        <div>
          <Input
            type="date"
            label="تاريخ انتهاء الحملة"
            inputName="endDate"
            placeholder=" تاريخ انتهاء الحملة"
            register={register}
            variant="secondary"
            otherClassName={`rounded-xl! w-full cursor-pointer ${
              errors.endDate ? 'border border-red-500' : ''
            }`}
            inputClassName="cursor-pointer"
            onChange={(e) =>
              setValue('endDate', e.target.value, {
                shouldValidate: true,
              })
            }
          />
          {errors && errors?.['endDate'] && (
            <p className="text-base text-red-500 mt-1">
              {errors?.endDate.message}
            </p>
          )}
        </div>
        <InfoText
          Icon={FaExclamationCircle}
          text="يمكنك تمديد المدة لاحقًا إذا لزم الأمر."
        />
      </div>

      {/* How is progress tracked? */}
      <ProgressTracked />
    </div>
  );
};

export default CampaignGoalStep;
