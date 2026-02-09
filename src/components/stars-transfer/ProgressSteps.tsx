const steps = [
  'تحديد مبلغ التحويل',
  'مراجعة تفاصيل التحويل',
  'تم ارسال طلب التحويل',
];

export function ProgressSteps({ currentStep }: { currentStep: number }) {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => {
        const isDone = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div key={step} className="flex items-center gap-3">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold
                ${
                  isDone
                    ? 'bg-blue-600 text-white'
                    : isActive
                      ? 'border-2 border-blue-600 text-blue-600'
                      : 'border text-gray-400'
                }
              `}
            >
              {isDone ? '✓' : index + 1}
            </div>
            <p className="text-sm text-gray-700">{step}</p>
          </div>
        );
      })}
    </div>
  );
}
