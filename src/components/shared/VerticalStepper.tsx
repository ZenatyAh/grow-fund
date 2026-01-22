import React from 'react';
import { mergeClasses as cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface Step {
    id: string | number;
    label: string;
    subLabel?: string;
}

interface VerticalStepperProps {
    steps: Step[];
    currentStep: number;
    onStepClick?: (stepIndex: number) => void;
    className?: string;
}

interface StepCardProps {
    step: Step;
    index: number;
    isActive: boolean;
    isCompleted: boolean;
    isClickable: boolean;
    onStepClick?: (stepIndex: number) => void;
}

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
                            ? "bg-amber-500 border-amber-500 text-white"
                            : isCompleted
                                ? "bg-amber-500 border-amber-500 text-white"
                                : "bg-[var(--text-muted,#8A97A8)] border-transparent text-white [.dark_&]:shadow-[0px_0px_4px_0px_#00000040]"
                    )}
                >
                    {isCompleted ? <Check className="w-6 h-6 text-white" /> : stepNumber}
                </div>
            </div>

            <div className="flex flex-col flex-1">
                <span
                    className={cn(
                        "transition-colors duration-300 text-black [.dark_&]:text-[#EDEDED]"
                    )}
                    style={{
                        fontFamily: 'Almarai, sans-serif',
                        fontWeight: 400,
                        fontSize: '16px',
                        lineHeight: '32px',
                        letterSpacing: '0%'
                    }}
                >
                    {step.label}
                </span>
            </div>

        </div>
    );
}

export function VerticalStepper({ steps, currentStep, onStepClick, className }: VerticalStepperProps) {
    return (
        <div className={cn("flex flex-col justify-center h-full w-full", className)}>
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
