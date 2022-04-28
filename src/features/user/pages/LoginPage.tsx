import { Button, CircularProgress, Paper, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Auth } from 'models';
import * as React from 'react';
import { selectIsLogging } from '../userSlice';
import { userActions } from '../userSlice';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  const dispatch = useAppDispatch();

  const handleLoginClick = (formValues: Auth) => {
    // TODO: Get username + pwd from login form
    dispatch(
      userActions.login(formValues)
    );
  };

  const loginFormValues: Auth = {
    username: '',
    password: ''
  }


  return (
    <LoginWrapper>
      <CustomizedPaper elevation={1}>
        <Typography variant="h5" component="h1">
          Student Management
        </Typography>

        <LoginForm
          initialValues={loginFormValues}
          onSubmit={handleLoginClick}
        />
      </CustomizedPaper>
    </LoginWrapper>
  );
}

const LoginWrapper = styled('div')`
  display: flex;
  flex-grow: row nowrap;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const CustomizedPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
}));
