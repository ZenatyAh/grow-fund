import { InputTypes } from '@/utils/types';
import { UseFormRegister } from 'react-hook-form';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { ActionButtonConfig, DonationRecord, ProfileType } from '@/lib/utils';

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
  passwordStrengthLevel?: number;
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

export interface TitleWithIconProps {
  otherClassName?: string;
  title: string;
  description?: React.ReactNode;
  Icon?: React.ElementType;
  iconWrapperClassName?: string;
  iconSize?: number;
  iconClassName?: string;
  handleClick?: () => void;
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

export interface ProfileCardProps {
  type?: ProfileType;
  name?: string;
  location?: string;
  typeLabel?: string;
  profileStrength?: number;
  imageUrl?: string;
  isDonor?: boolean;
  activeItemId?: string;
  onMenuItemClick?: (id: string, label: string) => void;
  className?: string;
}

export interface InfoWarCardProps {
  variant?: 'info' | 'warning';
  title?: string;
  message: string;
  isCompact?: boolean;
  className?: string;
}

export interface DonationHistoryProps {
  donations?: DonationRecord[];
  onExploreClick?: () => void;
}

export interface NotificationSettingItemProps {
  id: string;
  title: string;
  description: string;
  isEnabled: boolean;
  onToggle: (id: string) => void;
}

export interface NotificationGroupProps {
  title: string;
  items: Array<{
    id: string;
    title: string;
    description: string;
  }>;
  state: Record<string, boolean>;
  onToggle: (id: string) => void;
}

export interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (method: 'phone' | 'email') => void;
}

export interface VerificationCodeInputProps {
  method: 'phone' | 'email';
  onVerify: () => void;
  onCancel: () => void;
}

export interface AuthMethod {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface TwoFactorWizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}
