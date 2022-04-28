import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button, CircularProgress, styled } from '@mui/material';
import { Box } from '@mui/system';
import { InputField, SelectField, SelectOption } from 'components/FormFields';
import { User } from 'models';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';


export interface UserFormProps {
  initialValues?: User;
  onSubmit?: (formValues: User) => void
}

const schema = yup.object().shape({
  username: yup
    .string()
    .required('Please enter name.'),
  email: yup
    .string()
    .email('Email is invalid.')
    .required('Please enter email.'),
  password: yup
    .string()
    .required('Please enter password.'),
  role: yup
    .mixed()
    .oneOf([0, 1], 'Please select either Admin or Staff.')
    .required('Please select role.'),
});

export default function UserForm ({ initialValues, onSubmit }: UserFormProps) {
  const { control, handleSubmit, formState: { isSubmitting } } = useForm<User>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  })

  const [error, setError] = useState<string>('');

  const handleFormSubmit = async (formValues: User) => {
    try {
      // Clear previous submission error
      setError('');

      await onSubmit?.(formValues);
    } catch (error: any) {
      setError(error.message);
    }
  }

  const roleOptions: SelectOption[] = [
    {
      label: 'Admin',
      value: 0
    },
    {
      label: 'Staff',
      value: 1
    }
  ]

  return (
    <Box>
      <form onSubmit={handleSubmit(handleFormSubmit, (err) => {
        console.log(err)
      })}>
        <InputField name="username" control={control} label="Username" />
        <InputField name="email" type='email' control={control} label="Email" />
        <InputField name="password" type='password' control={control} label="Password" />
        {Array.isArray(roleOptions) && roleOptions.length > 0 && (
          <SelectFieldStyled name="role" control={control} label="Role" options={roleOptions} />
        )}

        {error && <Alert severity="error">{error}</Alert>}

        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            {isSubmitting && <CircularProgress size={16} color="primary" />}
            &nbsp;Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}

const SelectFieldStyled = styled(SelectField)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(1),
}))
