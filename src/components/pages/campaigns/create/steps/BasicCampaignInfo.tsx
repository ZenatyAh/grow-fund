import Input from '@/shared/ui/components/Input';
import { FaExclamationCircle } from 'react-icons/fa';
import { BasicCampaignInfoStepProps } from '@/interfaces';
import InfoText from '@/shared/ui/components/InfoText';
import {
  BasicCampaignInfoInputs,
  CampaignCategorys,
} from '@/shared/config/CampaignData';
import AnimatedWrapper from '@/shared/ui/components/FramerMotion/AnimatedWrapper';

const BasicCampaignInfoStep = ({
  register,
  errors,
  category,
  setValue,
}: BasicCampaignInfoStepProps) => {
  return (
    <div>
      <div className="space-y-8">
        {BasicCampaignInfoInputs.map((input, index) => {
          const { id, label, type, name, placeholder } = input;
          return (
            <AnimatedWrapper key={id} custom={index}>
              <Input
                type={type}
                label={label}
                inputName={name}
                placeholder={placeholder}
                register={register}
                error={errors}
                variant="secondary"
                textareaClassName="h-32"
                otherClassName={`rounded-xl! w-full ${
                  errors[name] ? 'border border-red-500' : ''
                }`}
              />
            </AnimatedWrapper>
          );
        })}
      </div>

      <div className="my-8">
        <AnimatedWrapper>
          <h1 className="text-xl font-bold text-(--text-third)">
            ما نوع الحملات التي تخطط لإنشائها؟
          </h1>
        </AnimatedWrapper>

        <div>
          <div className="flex items-center gap-4 flex-wrap mt-2">
            {CampaignCategorys.map((item, index) => {
              const { id, Icon, name, type } = item;
              return (
                <AnimatedWrapper key={id} custom={index}>
                  <div
                    onClick={() =>
                      setValue('category', type.toUpperCase(), {
                        shouldValidate: true,
                      })
                    }
                    className={`flex items-center gap-4 text-lg py-1.5 px-5 rounded-xl cursor-pointer transition
                ${
                  type.toUpperCase() === category
                    ? 'bg-(--bg-bold-blue) text-white'
                    : 'border border-(--bg-slate-100)'
                }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-bold">{name}</span>
                  </div>
                </AnimatedWrapper>
              );
            })}
          </div>
          {errors && errors?.['category'] && (
            <p className="text-base text-red-500 mt-1">
              {errors?.['category'].message}
            </p>
          )}
        </div>
      </div>

      <AnimatedWrapper>
        <Input
          type="number"
          label="هدف الحملة (عدد النجوم)"
          inputName="goal"
          placeholder="مثال: 5,000 نجمة"
          register={register}
          error={errors}
          variant="secondary"
          otherClassName={`rounded-xl! w-full ${
            errors.goal ? 'border border-red-500' : ''
          }`}
        />
      </AnimatedWrapper>
      <AnimatedWrapper>
        <InfoText
          Icon={FaExclamationCircle}
          text="يُستخدم عدد النجوم لقياس التقدم وليس كمبلغ مالي"
        />
      </AnimatedWrapper>
    </div>
  );
};

export default BasicCampaignInfoStep;
