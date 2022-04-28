import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button, CircularProgress, styled } from '@mui/material';
import { Box } from '@mui/system';
import { useAppSelector } from 'app/hooks';
import { InputField, SelectField } from 'components/FormFields';
import { Auth } from 'models';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { selectIsLogging } from '../userSlice';


export interface LoginFormProps {
  initialValues?: Auth;
  onSubmit?: (formValues: Auth) => void
}

const schema = yup.object().shape({
  username: yup
    .string()
    .required('Please enter username.'),
  password: yup
    .string()
    .required('Please enter password.')
});

export default function LoginForm ({ initialValues, onSubmit }: LoginFormProps) {
  const { control, handleSubmit, formState: { isSubmitting } } = useForm<Auth>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  })
  const isLogging = useAppSelector(selectIsLogging);

  const [error, setError] = useState<string>('');


  const handleFormSubmit = async (formValues: Auth) => {
    try {
      // Clear previous submission error
      setError('');

      await onSubmit?.(formValues);
    } catch (error: any) {
      setError(error.message);
    }
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="username" control={control} label="Username" />
        <InputField name="password" type='password' control={control} label="Password" />

        {error && <Alert severity="error">{error}</Alert>}

        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting || isLogging}>
            {(isSubmitting || isLogging) && <CircularProgress size={16} color="primary" />}
            &nbsp;Login
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
