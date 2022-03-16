import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button, CircularProgress, styled } from '@mui/material';
import { Box } from '@mui/system';
import { useAppSelector } from 'app/hooks';
import { InputField, RadioField, RadioOption, SelectField, SelectOption } from 'components/FormFields';
import { selectCityOptions } from 'features/city/citySlice';
import { Student } from 'models';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';


export interface StudentFormProps {
  initialValues?: Student;
  onSubmit?: (formValues: Student) => void
}

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Please enter name.')
    .test('two-words', 'Please enter at least two words', (value) => {
      if (!value) return true;

      const parts = value?.split(' ') || [];
      return parts.filter((x) => Boolean(x)).length >= 2;
    }),
  age: yup
    .number()
    .positive('Please enter a positive number.')
    .min(18, 'Min is 18')
    .max(60, 'Max is 60')
    .integer('Please enter an integer.')
    .required('Please enter age.')
    .typeError('Please enter a valid number.'),
  mark: yup
    .number()
    .min(0, 'Min is 0')
    .max(10, 'Max is 10')
    .required('Please enter mark.')
    .typeError('Please enter a valid number.'),
  gender: yup
    .string()
    .oneOf(['male', 'female'], 'Please select either male or female.')
    .required('Please select gender.'),
  city: yup.string().required('Please select city.'),
});

export default function StudentForm ({ initialValues, onSubmit }: StudentFormProps) {
  const cityOptions: SelectOption[] = useAppSelector(selectCityOptions)

  const { control, handleSubmit, formState: { isSubmitting } } = useForm<Student>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  })

  const [error, setError] = useState<string>('');


  const handleFormSubmit = async (formValues: Student) => {
    try {
      // Clear previous submission error
      setError('');

      await onSubmit?.(formValues);
    } catch (error: any) {
      setError(error.message);
    }
  }

  const genderOptions: RadioOption[] = [
    {
      label: 'Male',
      value: 'male'
    },
    {
      label: 'Female',
      value: 'female'
    }
  ]

  return (
    <Box>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="name" control={control} label="Full name" />
        <InputField name="age" control={control} label="Age" />
        <RadioField name="gender" control={control} label="Gender" options={genderOptions} />
        <InputField name="mark" control={control} label="Mark" />
        {Array.isArray(cityOptions) && cityOptions.length > 0 && (
          <SelectField name="city" control={control} label="City" options={cityOptions} />
        )}

        {error && <Alert severity="error">{error}</Alert>}

        <Box mt={3}>
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
