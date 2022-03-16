import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material';
import React from 'react';
import { Control, useController } from 'react-hook-form';

export interface RadioOption {
  label: string,
  value: string | number
}

export interface RadioFieldProps {
  className?: string,
  name: string;
  control: Control<any>;
  label?: string,
  disabled?: boolean,
  options: RadioOption[]
}

export function RadioField ({ className, label, name, control, disabled, options }: RadioFieldProps) {

  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error }
  } = useController({
    name,
    control
  })

  return (
    <FormControl className={className} disabled={disabled} error={invalid} size="small">
      <FormLabel id={`${name}-group-label`}>{label}</FormLabel>

      <RadioGroup
        aria-labelledby={`${name}-group-label`}
        value={value}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
      >
        {options.map(item => (
          <FormControlLabel key={item.value} value={item.value} control={<Radio />} label={item.label} />
        ))}
      </RadioGroup>

      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
