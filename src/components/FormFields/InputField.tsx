import { TextField } from '@mui/material';
import React, { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';
import { string } from 'yup';

export interface IInputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string,
  name: string;
  control: Control<any>;
  label?: string
}

export function InputField ({ className, label, name, control, ...inputProps }: IInputFieldProps) {

  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error }
  } = useController({
    name,
    control
  })

  return (
    <TextField
      className={className}
      fullWidth
      size="small"
      margin="normal"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      label={label}
      variant="outlined"
      inputRef={ref}
      error={invalid}
      helperText={error?.message}
      inputProps={inputProps}
    />
  );
}
