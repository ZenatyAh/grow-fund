/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import { Controller } from 'react-hook-form';
import { InputProps } from '@/interfaces';
import { cn } from '@/lib/utils';
import { IconSearch } from '@tabler/icons-react';
import FileInput from './FileInput';
import { RadioCard } from './RadioCard';
import MultiSelect from './MultiSelect';
import SingleSelect from './SingleSelect';
import PasswordStrength from './PasswordStrength';
import { handleKeyboardClick } from '@/utils/handleKeyboardClick';

const Input = ({
  type = 'text',
  variant = 'primary',
  placeholder,
  otherClassName,
  inputName,
  register,
  error,
  control,
  isMulti,
  value,
  onChange,
  Icon,
  options = [],
  iconClassName = 'ml-2',
  SelectValuePlaceholder = 'select...',
  accept,
  maxSize,
  disabled,
  onIconClick,
  label,
  labelClassName = '',
  isRequired = false,
  uploadVariant = 'inline',
  uploadClassName = '',
  emptyStateClassName = '',
  uploadIconWrapperSize,
  uploadIconWrapperClassName,
  UploadIcon,
  uploadIconSize,
  uploadTitle,
  uploadSubTitle,
  RadioIcon,
  radioValue,
  radioLabel,
  textareaClassName,
  showPassStrength,
  passwordStrengthLevel,
  bars,
  onFileChange,
  ...props
}: React.PropsWithChildren<InputProps>) => {
  const inputClasses = `w-full h-13 bg-transparent outline-none transition-all duration-300`;
  const StyledInput = cn(
    `w-[400px] text-base ${type === 'search' ? 'pl-5 pr-0' : 'px-5'} outline-none transition-all duration-300`,
    variant === 'primary' &&
      `bg-(--bg-soft-blue) dark:bg-(--bg-section) text-(--text-secondary) dark:text-(--gray-medium) ${type === 'search' ? 'rounded-full' : 'rounded-2xl'}`,
    otherClassName
  );

  const ariaLabel = label || placeholder || inputName;

  return (
    <div>
      {label && (
        <label
          className={`block text-base font-bold text-(--text-primary) dark:text-white mb-2 ${labelClassName}`}
        >
          {label}
          {isRequired && <span className="text-red-500"> *</span>}
        </label>
      )}
      {type === 'textarea' ? (
        <textarea
          placeholder={placeholder}
          className={`${StyledInput} ${textareaClassName} py-2 resize-none`}
          aria-label={ariaLabel}
          {...(typeof register === 'function' ? register(inputName) : {})}
        />
      ) : type === 'file' ? (
        <FileInput
          uploadVariant={uploadVariant}
          uploadClassName={uploadClassName}
          emptyStateClassName={emptyStateClassName}
          uploadIconWrapperSize={uploadIconWrapperSize}
          uploadIconWrapperClassName={uploadIconWrapperClassName}
          UploadIcon={UploadIcon}
          uploadIconSize={uploadIconSize}
          uploadTitle={uploadTitle}
          uploadSubTitle={uploadSubTitle}
          onFileChange={onFileChange}
          accept={accept}
          maxSize={maxSize}
          disabled={disabled}
        />
      ) : type === 'radio' && control ? (
        <RadioCard
          inputName={inputName}
          control={control}
          radioValue={radioValue ?? ''}
          radioLabel={radioLabel ?? ''}
          RadioIcon={RadioIcon}
        />
      ) : type === 'select' && control ? (
        <SingleSelect
          name={inputName}
          control={control}
          options={options}
          placeholder={placeholder}
          className={StyledInput}
        />
      ) : type === 'multi-select' && isMulti && control ? (
        <MultiSelect
          name={inputName}
          control={control}
          options={options}
          placeholder={SelectValuePlaceholder}
          disabled={disabled}
        />
      ) : (
        <div>
          <div className={`flex items-center gap-1 px-3 ${StyledInput}`}>
            {control ? (
              <Controller
                name={inputName}
                control={control}
                render={({ field }) => (
                  <input
                    type={type}
                    data-slot="input"
                    autoComplete="off"
                    placeholder={placeholder}
                    aria-label={ariaLabel}
                    className={inputClasses}
                    {...props}
                    {...field}
                  />
                )}
              />
            ) : (
              <input
                type={type}
                data-slot="input"
                autoComplete="off"
                placeholder={placeholder}
                aria-label={ariaLabel}
                className={inputClasses}
                {...(typeof register === 'function' ? register(inputName) : {})}
                onChange={onChange}
                value={value}
                {...props}
              />
            )}
            {type === 'search' ? (
              <div
                role="button"
                tabIndex={0}
                aria-label="Search"
                className="flex items-center justify-center gap-2 text-sm bg-(--brand-primary) h-13 px-6 text-white rounded-full cursor-pointer"
                onClick={onIconClick}
                onKeyDown={handleKeyboardClick(onIconClick)}
              >
                <IconSearch size={15} />
                <p>search</p>
              </div>
            ) : (
              Icon && (
                <Icon
                  role="button"
                  tabIndex={0}
                  aria-label="Input action"
                  className={`${iconClassName} text-xl cursor-pointer`}
                  onClick={onIconClick}
                  onKeyDown={handleKeyboardClick(onIconClick)}
                />
              )
            )}
          </div>
          {type === 'password' && showPassStrength && (
            <PasswordStrength level={passwordStrengthLevel} bars={bars} />
          )}
        </div>
      )}
      {error && error[inputName] && (
        <p className="text-sm text-red-500 mt-1">{error[inputName].message}</p>
      )}
    </div>
  );
};

export default Input;
