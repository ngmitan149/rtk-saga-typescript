import { Button, CircularProgress, Paper, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import * as React from 'react';
import { selectIsLogging } from '../authSlice';
import { authActions } from '../authSlice';

// const useStyles = makeStyles((theme: Theme) => ({
//   root: {
//     display: 'flex',
//     flexFlow: 'row nowrap',
//     justifyContent: 'center',
//     alignItems: 'center',
//     minHeight: '100vh',
//   },

//   box: {
//     padding: theme.spacing(3),
//   },
// }));

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const isLogging = useAppSelector(selectIsLogging);

  const handleLoginClick = () => {
    // TODO: Get username + pwd from login form
    dispatch(
      authActions.login({
        username: '',
        password: '',
      })
    );
  };

  return (
    <LoginWrapper>
      <CustomizedPaper elevation={1}>
        <Typography variant="h5" component="h1">
          Student Management
        </Typography>

        <Box mt={4}>
          <Button fullWidth variant="contained" color="primary" onClick={handleLoginClick}>
            {isLogging && <CircularProgress size={20} color="secondary" />} &nbsp; Fake Login
          </Button>
        </Box>
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
