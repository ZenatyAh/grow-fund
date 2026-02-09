'use client';

import { mergeClasses as cn } from '@/lib/utils';

interface Step {
  id: string;
  label: string;
}

interface StepsProps {
  steps: Step[];
  currentStep: number;
  className?: string;
  onStepClick?: (index: number) => void;
}

export function Steps({ 
  steps, 
  currentStep, 
  className,
  onStepClick 
}: StepsProps) {
  return (
    <div className={cn('flex flex-col gap-8', className)}>
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = index === currentStep;
        const isCompleted = index < currentStep;
        
        // Design Logic:
        // Active: Blue circle, White number, Blue Label
        // Completed: Blue circle, White number (same as active based on typical UX, or maybe checkmark? Design only shows active 1)
        // Inactive: Gray circle, White number, Gray Label
        
        // Based on image:
        // Active: bg-blue-600, text-white
        // Inactive: bg-slate-400, text-white

        const isActiveOrCompleted = isActive || isCompleted;

        return (
          <div 
            key={step.id}
            className={cn(
              "flex items-center justify-end gap-4 transition-colors duration-300",
              onStepClick ? "cursor-pointer" : "cursor-default"
            )}
            onClick={() => onStepClick?.(index)}
          >
            {/* Label */}
            <span 
              className={cn(
                "text-lg font-bold transition-colors duration-300",
                isActiveOrCompleted ? "text-blue-600" : "text-slate-500"
              )}
            >
              {step.label}
            </span>

            {/* Circle Number */}
            <div 
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 shadow-sm",
                isActiveOrCompleted 
                  ? "bg-blue-600 text-white shadow-blue-200" 
                  : "bg-slate-400 text-white"
              )}
            >
              {stepNumber}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Steps;
