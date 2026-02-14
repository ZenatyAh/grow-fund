import { TitleWithIconProps } from '@/interfaces';
import Input from './Input';
import { Button } from '@/components/ui/button';
import { setCampaignData } from '@/lib/indexedDB';
import { useToast } from '@/lib/toast';
import { useState } from 'react';
import { dateInputs } from '@/shared/constants/getCampaignInfo';

const TitleWithIcon = ({
  otherClassName,
  title,
  description,
  Icon,
  iconWrapperClassName,
  iconSize = 15,
  iconClassName,
  handleClick,
  inputType,
  inputName,
  register,
  errors,
  setValue,
  values,
}: TitleWithIconProps) => {
  const [editId, setEditId] = useState<string | number | null>(null);
  const { showToast } = useToast();

  const handleEdit = async () => {
    if (!values?.[inputName] || errors?.[inputName]) return;
    setEditId?.(null);

    if (inputName === 'duration') {
      setValue?.('startDate', values.startDate);
      setValue?.('endDate', values.endDate);
      await setCampaignData({ values, currentStep: 3 });
      showToast('تم تعديل المدة');
    } else {
      setValue?.(inputName, values[inputName]);
      await setCampaignData({ values, currentStep: 3 });
      showToast(`تم تعديل ${title}`);
    }
  };

  return (
    <div
      className={`w-full flex items-start justify-between gap-4 border-2 border-slate-200 p-4 rounded-lg ${otherClassName}`}
    >
      <div className="w-full">
        <h2 className="text-lg text-(--text-secondary) font-normal">{title}</h2>
        {editId === inputName ? (
          <div className="mt-3">
            {inputName === 'duration' ? (
              <div className="space-y-2">
                {dateInputs.map((input) => (
                  <Input
                    key={input.id}
                    type={input.type}
                    label={input.label}
                    inputName={input.name}
                    register={register}
                    error={errors}
                    variant="secondary"
                    otherClassName={`rounded-xl! w-full ${
                      errors[inputName] ? 'border border-red-500' : ''
                    }`}
                  />
                ))}
              </div>
            ) : (
              <Input
                type={inputType}
                inputName={inputName}
                placeholder={title}
                register={register}
                error={errors}
                variant="secondary"
                otherClassName={`rounded-xl! w-full ${
                  errors[inputName] ? 'border border-red-500' : ''
                }`}
              />
            )}
            <Button
              type="button"
              className="px-6 py-2 bg-blue-600 text-white text-base mt-3"
              onClick={handleEdit}
            >
              حفظ
            </Button>
          </div>
        ) : (
          <div className="text-2xl text-(--text-primary) font-bold mt-1.5">
            {description}
          </div>
        )}
      </div>
      {Icon && (
        <div
          className={`bg-(--brand-primary) flex items-center justify-center rounded-sm p-1 cursor-pointer ${iconWrapperClassName}`}
          // onClick={handleClick}
          onClick={() => setEditId?.(inputName)}
        >
          <Icon size={iconSize} className={`text-white ${iconClassName}`} />
        </div>
      )}
    </div>
  );
};

export default TitleWithIcon;
