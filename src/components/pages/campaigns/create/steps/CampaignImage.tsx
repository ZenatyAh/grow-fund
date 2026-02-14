import { ReactHookFormProps } from '@/interfaces';
import { CampaignImageStepInputs } from '@/shared/config/CampaignData';
import AnimatedWrapper from '@/shared/ui/components/FramerMotion/AnimatedWrapper';
import InfoText from '@/shared/ui/components/InfoText';
import Input from '@/shared/ui/components/Input';
import { ImagePlus } from 'lucide-react';
import { FaExclamationCircle } from 'react-icons/fa';

const CampaignImageStep = ({
  register,
  setValue,
  errors,
  values,
}: ReactHookFormProps) => {
  return (
    <div>
      <div className="space-y-8">
        {CampaignImageStepInputs.map((input, index) => {
          const { id, label, type, name, placeholder } = input;
          if (type === 'file') {
            return (
              <AnimatedWrapper key={id} custom={index}>
                <Input
                  type={type}
                  label={label}
                  inputName={name}
                  file={values?.file}
                  onFileChange={(files) =>
                    setValue(name, files[0], { shouldValidate: true })
                  }
                  accept="image/*"
                  variant="secondary"
                  UploadIcon={ImagePlus}
                  uploadVariant="stacked"
                  uploadTitle="الوجه الأمامي"
                  uploadSubTitle="PNG، JPG (بحد أقصى 5 ميجابايت)"
                  uploadIconWrapperClassName="bg-(--bg-light-blue)"
                  emptyStateClassName="bg-transparent border-3 border-(--bg-slate-200)"
                  uploadIconClassName="text-(--bg-bold-blue)!"
                  otherClassName="rounded-xl! w-full"
                />
              </AnimatedWrapper>
            );
          } else {
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
          }
        })}
      </div>
      <AnimatedWrapper>
        <InfoText
          Icon={FaExclamationCircle}
          text="هذا الوصف يظهر للمتبرعين ويساعدهم على اتخاذ القرار."
        />
      </AnimatedWrapper>
    </div>
  );
};

export default CampaignImageStep;
