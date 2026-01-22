'use client';
import React from 'react';
import { Controller } from 'react-hook-form';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from './select';
import { SingleSelectProps } from '@/interfaces';

const SingleSelect: React.FC<SingleSelectProps> = ({
  name,
  control,
  options,
  placeholder = 'Choose',
  className,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          value={field.value != null ? String(field.value) : ''}
          onValueChange={field.onChange}
        >
          <SelectTrigger className={className}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt.id} value={opt.value ?? opt.id ?? opt.name}>
                {opt.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
};

export default SingleSelect;
