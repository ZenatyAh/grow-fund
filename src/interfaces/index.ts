import { InputTypes } from '@/utils/types';
import { FieldError, UseFormRegister } from 'react-hook-form';

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
  radioValue: string;
  radioLabel: string;
  isRequired?: boolean;
  textareaClassName?: string;
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
