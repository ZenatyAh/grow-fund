import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export { cn as mergeClasses };

export interface Step {
  id: string | number;
  label: string;
  subLabel?: string;
}

export interface VerticalStepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  className?: string;
}

export interface StepCardProps {
  step: Step;
  index: number;
  isActive: boolean;
  isCompleted: boolean;
  isClickable: boolean;
  onStepClick?: (stepIndex: number) => void;
}
