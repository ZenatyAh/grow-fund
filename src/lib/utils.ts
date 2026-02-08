import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import React from 'react';

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

export type ButtonVariant = 'primary' | 'subtle';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

export interface MenuItemProps {
  id: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: (id: string, label: string) => void;
}

export type ProfileType = 'individual' | 'institution';

export interface ProfileCardProps {
  type?: ProfileType;
  name?: string;
  location?: string;
  typeLabel?: string;
  profileStrength?: number;
  imageUrl?: string;
  activeItemId?: string;
  onMenuItemClick?: (id: string, label: string) => void;
  className?: string;
}
export interface InfoWarCardProps {
  variant?: 'info' | 'warning';
  title?: string;
  message: string;
  className?: string;
}

export interface ActionButtonConfig {
  label: string;
  icon?: React.ReactNode;
  variant?: ButtonVariant;
  onClick?: () => void;
}

export interface CampaignSummaryCardProps {
  amount: number | string;
  amountIcon?: React.ReactNode;
  title: string;
  date: string;
  imageUrl: string;
  imageAlt?: string;
  isCompleted?: boolean;
  progressValue?: number;
  goalLabel?: string;
  indicatorValue?: string | number;
  indicatorIcon?: React.ReactNode;
  completedMessage?: string;
  completedIcon?: React.ReactNode;
  buttons?: ActionButtonConfig[];
  className?: string;
}

export interface VerificationFormData {
  fullName?: string;
  identityNumber?: string;
  identityType?: string;
  institutionName?: string;
  registrationNumber?: string;
  foundationDate?: string;
  files: {
    [key: string]: File | null;
  };
}

export interface IdentityVerificationFormProps {
  type: ProfileType;
  onSubmit?: (data: VerificationFormData) => void;
  className?: string;
}
