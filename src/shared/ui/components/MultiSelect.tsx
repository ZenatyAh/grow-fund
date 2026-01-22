'use client';
import React from 'react';
import ReactSelect from 'react-select';
import makeAnimated from 'react-select/animated';
import { Controller } from 'react-hook-form';
import { MultiSelectProps } from '@/interfaces';

const animatedComponents = makeAnimated();

const MultiSelect: React.FC<MultiSelectProps> = ({
  name,
  control,
  options,
  placeholder = 'Select...',
  disabled = false,
}) => {
  const selectOptions = options.map((opt) => ({
    label: opt.name,
    value: opt.id,
  }));

  const primaryColor = 'var(--text-primary)';
  const brandPrimaryColor = 'var(--brand-primary)';
  const grayMediumColor = 'var(--gray-medium)';
  const bgSectionColor = 'var(--bg-section)';
  const bgSoftBlueColor = 'var(--bg-soft-blue)';

  const multiSelectStyles = React.useMemo(
    () => ({
      control: (base: any, state: any) => ({
        ...base,
        minWidth: '400px',
        padding: '8px 15px 8px',
        minHeight: '30px',
        color: primaryColor,
        backgroundColor: bgSoftBlueColor,
        borderColor: state.isFocused ? brandPrimaryColor : base.borderColor,
        borderRadius: '16px',
        cursor: 'pointer',
        '&:hover': { borderColor: brandPrimaryColor },
        // dark mode
        '@media (prefers-color-scheme: dark)': {
          backgroundColor: bgSectionColor,
          color: grayMediumColor,
          borderColor: state.isFocused ? brandPrimaryColor : base.borderColor,
        },
      }),
      menu: (base: any) => ({
        ...base,
        backgroundColor: bgSoftBlueColor,
        color: primaryColor,
        zIndex: 9999,
        '@media (prefers-color-scheme: dark)': {
          backgroundColor: bgSectionColor,
          color: grayMediumColor,
        },
      }),
      option: (base: any, state: any) => ({
        ...base,
        cursor: 'pointer',
        backgroundColor: state.isFocused ? primaryColor : bgSoftBlueColor,
        color: state.isFocused ? 'white' : primaryColor,
        '@media (prefers-color-scheme: dark)': {
          backgroundColor: state.isFocused ? brandPrimaryColor : bgSectionColor,
          color: state.isFocused ? 'white' : grayMediumColor,
        },
      }),
      multiValue: (base: any) => ({
        ...base,
        backgroundColor: 'white',
        color: primaryColor,
        borderRadius: '20px',
        '@media (prefers-color-scheme: dark)': {
          backgroundColor: grayMediumColor,
          color: bgSectionColor,
        },
      }),
      multiValueLabel: (base: any) => ({
        ...base,
        color: primaryColor,
        '@media (prefers-color-scheme: dark)': {
          color: 'white',
        },
      }),
      multiValueRemove: (base: any) => ({
        ...base,
        cursor: 'pointer',
        color: primaryColor,
        borderRadius: '20px',
        ':hover': {
          backgroundColor: primaryColor,
          color: 'white',
        },
        '@media (prefers-color-scheme: dark)': {
          color: bgSectionColor,
          ':hover': {
            backgroundColor: 'white',
            color: 'black',
          },
        },
      }),
    }),
    []
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <ReactSelect
          closeMenuOnSelect={false}
          components={animatedComponents}
          isMulti
          options={selectOptions}
          value={selectOptions.filter((opt) =>
            Array.isArray(field.value) ? field.value.includes(opt.value) : false
          )}
          onChange={(selected: any) =>
            field.onChange(
              selected ? selected.map((sel: any) => sel.value) : []
            )
          }
          placeholder={placeholder}
          isDisabled={disabled}
          classNamePrefix="custom"
          className="border-none!"
          styles={multiSelectStyles}
          menuPlacement="auto"
          maxMenuHeight={240}
        />
      )}
    />
  );
};

export default MultiSelect;
