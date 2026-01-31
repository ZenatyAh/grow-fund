import { mergeClasses as cn, type Step, type VerticalStepperProps, type StepCardProps } from '@/lib/utils';
import { Check } from 'lucide-react';

function StepCard({ step, index, isActive, isCompleted, isClickable, onStepClick }: StepCardProps) {
    const stepNumber = index + 1;

    const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
        if (isClickable) {
            onStepClick?.(index);
        }
    };

    return (
        <div
            className={cn(
                "relative flex items-center gap-4 group min-h-[4rem] transition-opacity duration-300",
                isClickable ? "cursor-pointer" : "cursor-default opacity-50"
            )}
            onClick={handleClick}
            role={isClickable ? "button" : undefined}
            tabIndex={isClickable ? 0 : undefined}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handleClick(e);
                }
            }}
        >
            <div className="flex flex-col items-center z-10">
                <div
                    className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full text-base font-bold border-2 transition-all duration-300",
                        isActive
                            ? "bg-[var(--default,#2563EB)] border-[var(--default,#2563EB)] text-white"
                            : isCompleted
                                ? "bg-[var(--default,#2563EB)] border-[var(--default,#2563EB)] text-white"
                                : "bg-[var(--caption-hint,#64748B)] border-transparent text-white"
                    )}
                >
                    {isCompleted ? <Check className="w-6 h-6 text-white" /> : stepNumber}
                </div>
            </div>

            <div className="flex flex-col flex-1">
                <span
                    className={cn(
                        "transition-colors duration-300",
                        (isActive || isCompleted) ? "text-[var(--default,#2563EB)]" : "text-[var(--caption-hint,#64748B)]"
                    )}
                    style={{
                        fontFamily: 'Tajawal, sans-serif',
                        fontWeight: 700,
                        fontSize: '20px',
                        lineHeight: '150%',
                        letterSpacing: '0%'
                    }}
                >
                    {step.label}
                </span>
            </div>

        </div>
    );
}

export function VerticalStepper({ steps, currentStep, onStepClick }: VerticalStepperProps) {
    return (
        <div className={cn("flex flex-col justify-center h-full ")}>
            {steps.map((step, index) => (
                <StepCard
                    key={step.id}
                    step={step}
                    index={index}
                    isActive={index === currentStep}
                    isCompleted={index < currentStep}
                    isClickable={!!onStepClick && index <= currentStep}
                    onStepClick={onStepClick}
                />
            ))}
        </div >
    );
}
