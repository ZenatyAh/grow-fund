'use client';
import { VerticalStepper } from '@/components/shared/VerticalStepper';
import { useState } from 'react';
import BasicCampaignInfoStep from './steps/BasicCampaignInfo';
import CampaignImageStep from './steps/CampaignImage';
import CampaignGoalStep from './steps/CampaignGoal';
import CampaignReviewStep from './steps/CampaignReview';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { textOnlyRegex, textWithPunctuationRegex } from '@/utils/regex';
import Logo from '@/shared/ui/components/Logo';
import { Button } from '@/components/shared/Button';
import CampaignUnderReview from './steps/CampaignUnderReview';
import useAPI from '@/hooks/useAPI';
import { FaSpinner } from 'react-icons/fa';

export interface CampaignsCreateData {
  title: string;
  description: string;
  category: string;
  goal: number;
  startDate: string; // ISO date-time
  endDate: string; // ISO date-time
  motivationMessage: string;
  notes?: string;
  file?: File | Blob | string;
}

const STEPS = [
  { id: 'step-1', label: 'معلومات الحملة الأساسية' },
  { id: 'step-2', label: 'صورة الحملة' },
  { id: 'step-3', label: 'تفاصيل الهدف والتقدّم' },
  { id: 'step-4', label: 'مراجعة الحملة قبل النشر' },
];

const fullSchema = yup.object({
  title: yup
    .string()
    .required('عنوان الحملة مطلوب')
    .matches(
      textOnlyRegex,
      'عنوان الحملة يجب أن يحتوي على نص صحيح فقط بدون رموز غريبة'
    ),
  motivationMessage: yup.string().required('وصف الحملة مطلوب'),

  category: yup.string().required('نوع الحملة مطلوب'),
  goal: yup.number().required('عدد النجوم مطلوب'),
  file: yup.mixed().nullable().notRequired(),
  description: yup
    .string()
    .required('وصف الحملة مطلوب')
    .matches(
      textWithPunctuationRegex,
      'وصف الحملة يجب أن يحتوي على نص صحيح فقط بدون رموز غير مدعومة'
    ),
  startDate: yup.string().required('تاريخ البدء مطلوب'),
  endDate: yup.string().required('تاريخ الإنتهاء مطلوب'),
  checkbox: yup.boolean().oneOf([true, false]),
});

const stepFields = [
  ['title', 'motivationMessage', 'category', 'goal'] as const,
  ['file', 'description'] as const,
  ['startDate', 'endDate'] as const,
  ['checkbox'] as const,
];

const CampaignsCreatePage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { add, isLoading } = useAPI<FormData, any>('v1/campaign');

  const {
    handleSubmit,
    register,
    control,
    reset,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(fullSchema),
    defaultValues: {
      title: '',
      motivationMessage: '',
      category: '',
      goal: null,
      file: undefined,
      description: '',
      startDate: '',
      endDate: '',
      checkbox: false,
    },
    mode: 'all',
  });

  const category = watch('category');
  const startDate = watch('startDate');

  const handleSteps = async () => {
    const valid = await trigger(stepFields[currentStep]);
    if (!valid) return;
    setCurrentStep((prev) => prev + 1);
  };

  const onSubmit = async (data: any) => {
    console.log('SUBMIT CALLED');
    const formData = new FormData();

    formData.append('title', data.title);
    formData.append('motivationMessage', data.motivationMessage);
    formData.append('category', data.category);
    formData.append('goal', data.goal);
    formData.append('description', data.description);
    formData.append('startDate', data.startDate);
    formData.append('endDate', data.endDate);

    if (data.file) {
      formData.append('file', data.file);
    }

    if (isLoading) return;
    try {
      await add(formData);
      reset();
      setCurrentStep(4);
    } catch (e) {
      // stay on step 3
      setCurrentStep(3);
    }
  };

  const handleButtonClick = () => {
    if (currentStep < 3) {
      handleSteps(); // Steps 0-2
    } else if (currentStep === 3 && !isLoading) {
      handleSubmit(onSubmit)(); // Step 3 executes the form manually
    }
  };

  return (
    <div>
      <div className="flex gap-10 p-6 bg-gray-50 min-h-screen">
        <div className="max-w-138 bg-white rounded-[40px] border border-(--bg-slate-100) p-6">
          <VerticalStepper
            steps={STEPS}
            currentStep={currentStep}
            onStepClick={setCurrentStep}
          />
        </div>
        <div className="flex-1 bg-white rounded-[40px] border border-(--bg-slate-100) p-10">
          <Logo width={48} height={48} titleClassName="text-[32px]" />
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={currentStep !== 3 ? 'mt-20' : ' mt-4'}
          >
            {currentStep === 0 && (
              <BasicCampaignInfoStep
                category={category}
                setValue={setValue}
                register={register}
                errors={errors}
              />
            )}
            {currentStep === 1 && (
              <CampaignImageStep
                setValue={setValue}
                register={register}
                errors={errors}
              />
            )}
            {currentStep === 2 && (
              <CampaignGoalStep
                startDate={startDate}
                setValue={setValue}
                register={register}
                errors={errors}
              />
            )}
            {currentStep === 3 && (
              <CampaignReviewStep control={control} errors={errors} />
            )}
            {currentStep === 4 && <CampaignUnderReview />}
            <div
              className={`flex items-cente justify-end gap-4 ${currentStep !== 3 ? 'mt-20' : ' mt-8'}`}
            >
              <Button variant="subtle" className="text-base">
                {currentStep < 3
                  ? 'إلغاء'
                  : currentStep === 3
                    ? 'حفظ كمسودة'
                    : 'عرض تفاصيل الحملة'}
              </Button>
              <Button
                type="button"
                className="px-6 py-2 bg-blue-600 text-white text-base"
                onClick={handleButtonClick}
                disabled={isLoading}
              >
                {isLoading ? (
                  <FaSpinner className="animate-spin" size={20} />
                ) : currentStep < 3 ? (
                  'متابعة'
                ) : currentStep === 3 ? (
                  'إرسال الحملة للمراجعة'
                ) : (
                  'الانتقال إلى لوحة التحكم'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CampaignsCreatePage;
