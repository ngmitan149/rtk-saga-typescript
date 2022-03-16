import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';
import { Control, useController } from 'react-hook-form';

export interface SelectOption {
  label: string,
  value: string | number
}

export interface SelectFieldProps {
  className?: string,
  name: string;
  control: Control<any>;
  label?: string,
  disabled?: boolean,
  options: SelectOption[]
}

export function SelectField ({ className, label, name, control, disabled, options }: SelectFieldProps) {

  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error }
  } = useController({
    name,
    control
  })

  return (
    <FormControl className={className} disabled={disabled} error={invalid} size="small" fullWidth>
      <InputLabel id={`${name}-select-field`}>{label}</InputLabel>
      <Select
        labelId={`${name}-select-field`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        label={label}
      >
        {options.map(item => (
          <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
        ))}
      </Select>

      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
