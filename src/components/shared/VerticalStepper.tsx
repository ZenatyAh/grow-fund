import React from 'react';
import { mergeClasses as cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface Step {
    label: string;
    subLabel?: string;
}

interface VerticalStepperProps {
    steps: Step[];
    currentStep: number;
    onStepClick?: (stepIndex: number) => void;
    className?: string;
}

export function VerticalStepper({ steps, currentStep, onStepClick, className }: VerticalStepperProps) {
    return (
        <div className={cn("flex flex-col justify-center h-full w-full", className)}>
            {steps.map((step, index) => {
                const stepNumber = index + 1;
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;
                const isClickable = !!onStepClick;

                const isLastStep = index === steps.length - 1;

                return (
                    <div
                        key={index}
                        className={cn(
                            "relative flex items-center gap-4 group min-h-[4rem]",
                            isClickable && "cursor-pointer"
                        )}
                        onClick={() => isClickable && onStepClick?.(index)}
                        role={isClickable ? "button" : undefined}
                        tabIndex={isClickable ? 0 : undefined}
                        onKeyDown={(e) => {
                            if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
                                onStepClick?.(index);
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

                        <div className="flex flex-col">
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
            })}
        </div >
    );
}
