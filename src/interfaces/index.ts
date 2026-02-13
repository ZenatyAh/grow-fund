import { InputTypes } from '@/utils/types';
import { UseFormRegister } from 'react-hook-form';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { Variants } from 'framer-motion';
import { ReactNode } from 'react';

export interface InputProps extends React.HTMLAttributes<HTMLElement> {
  type?: InputTypes | string;
  placeholder?: string;
  variant?: 'primary' | 'secondary';
  otherClassName?: string;
  inputClassName?: string;
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
  uploadIconClassName?: string;
  uploadTitle?: string;
  uploadSubTitle?: string;
  RadioIcon?: React.ElementType;
  radioValue?: string;
  radioLabel?: string;
  isRequired?: boolean;
  textareaClassName?: string;
  showPassStrength?: boolean;
  passwordStrengthLevel?: number;
  bars?: number;
  onChange?: (e: React.ChangeEvent<any>) => void;
  onFileChange?: (files: File[]) => void;
  file?: File | Blob | null;
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
  uploadIconClassName?: string;
  uploadTitle?: string;
  uploadSubTitle?: string;
  onFileChange?: (files: File[]) => void;
  accept?: string | any;
  maxSize?: number;
  disabled?: boolean;
  file: any;
}

export interface FileUploadProps {
  onChange?: (files: File[]) => void;
  children: React.ReactNode;
  uploadClassName: string;
  emptyStateClassName: string;
  accept?: string | any;
  maxSize?: number;
  disabled?: boolean;
  file: any;
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
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
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

export interface TitleWithIconProps extends ReactHookFormProps {
  otherClassName?: string;
  title: string;
  description?: React.ReactNode;
  Icon?: React.ElementType;
  iconWrapperClassName?: string;
  iconSize?: number;
  iconClassName?: string;
  handleClick?: () => void;
  inputType: string;
  inputName: string;
}

export interface DataTableBodyProps {
  columns: any[];
  data: any[];
  onEdit?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
  searchTerm?: string;
  showEdit?: boolean;
  showActionsColumn?: boolean;
  onRowPatched?: (id: string | number, patch: Partial<any>) => void;
  deleteLocation?: string;
}

export interface TableProps extends DataTableBodyProps {
  title: string;
}

export interface ReactHookFormValuesProps {
  title: string;
  motivationMessage: string;
  category: string;
  goal: number;
  description: string;
  file: any;
  startDate: string;
  endDate: string;
  checkbox: string;
}

export interface ReactHookFormProps {
  register?: UseFormRegister<any>;
  setValue?: any;
  control?: any;
  errors?: any;
  values?: ReactHookFormValuesProps | any;
}

export interface BasicCampaignInfoStepProps extends ReactHookFormProps {
  category: string;
}

export interface CampaignGoalStepProps extends ReactHookFormProps {
  startDate: string;
}

export interface InfoTextProps {
  Icon?: React.ElementType;
  text: string;
  iconSize?: number;
  className?: string;
  iconWrapper?: string;
  iconClassName?: string;
}

export interface AnimatedWrapperProps {
  children: ReactNode;
  custom?: number;
  variants?: Variants;
  direction?: 'x' | 'y';
  distance?: number;
  duration?: number;
}
