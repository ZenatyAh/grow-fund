import { InputTypes } from '@/utils/types';
import { UseFormRegister } from 'react-hook-form';
import * as ProgressPrimitive from '@radix-ui/react-progress';

export interface InputProps extends React.HTMLAttributes<HTMLElement> {
  type?: InputTypes | string;
  placeholder?: string;
  variant?: 'primary' | 'secondary';
  otherClassName?: string;
  inputName: any;
  Icon?: React.ElementType;
  iconClassName?: string;
  onIconClick?: () => void;
  options?: any[];
  register?: UseFormRegister<any>;
  error?: any;
  control?: any;
  isMulti?: boolean;
  value?: string;
  label?: string;
  SelectValuePlaceholder?: string;
  accept?: string | any;
  maxSize?: number;
  disabled?: boolean;
  labelClassName?: string;
  uploadVariant?: 'inline' | 'stacked';
  uploadClassName?: string;
  emptyStateClassName?: string;
  uploadIconWrapperSize?: number;
  uploadIconWrapperClassName?: string;
  UploadIcon?: React.ElementType;
  uploadIconSize?: number;
  uploadTitle?: string;
  uploadSubTitle?: string;
  RadioIcon?: React.ElementType;
  radioValue?: string;
  radioLabel?: string;
  isRequired?: boolean;
  textareaClassName?: string;
  showPassStrength?: boolean;
  passwordStrengthLevel: number;
  bars?: number;
  onChange?: (e: React.ChangeEvent<any>) => void;
  onFileChange?: (files: File[]) => void;
}

export interface MultiSelectProps {
  name: string;
  control?: any;
  options: { id: string | number; name: string }[];
  placeholder?: string;
  disabled?: boolean;
}

export interface SingleSelectProps {
  name: string;
  control: any;
  options: any[];
  placeholder?: string;
  className?: string;
}

export interface FileInputProps {
  uploadVariant?: 'inline' | 'stacked';
  uploadClassName?: string;
  emptyStateClassName?: string;
  uploadIconWrapperSize?: number;
  uploadIconWrapperClassName?: string;
  UploadIcon?: React.ElementType;
  uploadIconSize?: number;
  uploadTitle?: string;
  uploadSubTitle?: string;
  onFileChange?: (files: File[]) => void;
  accept?: string | any;
  maxSize?: number;
  disabled?: boolean;
}

export interface ProgressTopInfoProps {
  value?: number | string;
  displayValue?: string;
  showValue?: boolean;
  valueLabelClassName?: string;
  label?: string;
  LabelIcon?: React.ElementType;
  labelIconSize?: number;
  labelClassName?: string;
  labelIconClassName?: string;
  showValueOutside?: boolean;
}

export interface ProgressBottomInfoProps {
  value?: number | string;
  displayValue?: string;
  showValue?: boolean;
  valueLabelClassName?: string;
  subLabel?: string;
  SubLabelIcon?: React.ElementType;
  subLabelClassName?: string;
}

export interface ProgressValueInsideProp {
  value?: number | string;
  showValueInside?: boolean;
  progressVariant?: 'percentage' | 'custom';
  customDisplay?: React.ReactNode;
}

export interface PasswordStrengthProps {
  level: number;
  bars?: number;
}

export interface ProgressProps extends React.ComponentPropsWithoutRef<
  typeof ProgressPrimitive.Root
> {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  trackColor?: string;
  indicatorColor?: string;
  topDisplayValue?: string; // Value displayed at the top
  bottomDisplayValue?: string; // Value displayed at the bottom
  showInfo?: boolean;
  label?: string; // Text under the number (e.g., "Progress Completed")
  showValueOutside?: boolean;
  showValueInside?: boolean;
  valueLabelClassName?: string;
  labelClassName?: string;
  LabelIcon?: React.ElementType;
  labelIconSize?: number;
  labelIconClassName?: string;
  showSubInfo?: boolean;
  subLabel?: string; // ← The small text under the bar
  showSubValue?: boolean;
  subLabelClassName?: string;
  SubLabelIcon?: React.ElementType;
  subLabelIconSize?: number;
  subLabelIconClassName?: string;
  progressVariant?: 'percentage' | 'custom';
  customDisplay?: React.ReactNode;
}

export interface FooterLinksProps {
  title: string;
  links: { href: string; text: string }[];
}

export interface ContactItem {
  Icon?: React.ElementType;
  text: string;
}

export interface FooterContactProps {
  title: string;
  contacts: ContactItem[];
}

export interface NotificationItemProps {
  Icon?: React.ElementType;
  title: string;
  time: string;
  description: string;
}

export interface EmptyStateProps {
  Icon: React.ElementType;
  iconSize: number;
  text: string;
  iconClassName?: string;
  textOtherClassName?: string;
}

export interface CampaignStatisticsCardProps {
  otherClassName?: string;
  Icon: React.ElementType;
  iconSize?: number;
  iconClassName?: string;
  title: string;
  count?: number;
  label: string;
}
