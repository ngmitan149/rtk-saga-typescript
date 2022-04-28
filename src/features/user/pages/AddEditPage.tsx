import { ChevronLeft } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import userApi from 'api/userApi';
import { User } from 'models';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserForm from '../components/UserForm';

export interface AddEditPageProps {
}

export default function AddEditPage (props: AddEditPageProps) {
  const history = useHistory();
  const { userId } = useParams<{ userId: string }>();
  const isEdit = Boolean(userId);
  const [user, setUser] = useState<User>();


  useEffect(() => {
    if (!userId) return;

    // IFFE
    (async () => {
      try {
        const data: User = await userApi.getById(userId);
        setUser(data);
      } catch (error) {
        console.log('Failed to fetch user details', error);
      }
    })();
  }, [userId]);

  const handleUserFormSubmit = async (formValues: User) => {
    // TODO: Handle submit here, call API  to add/update user
    if (isEdit) {
      await userApi.update(formValues);
    } else {
      await userApi.add(formValues);
    }

    // Toast success
    toast.success('Save user successfully!');

    // Redirect back to user list
    history.push('/admin/users');
  };

  const initialValues: User = {
    username: '',
    email: '',
    password: '',
    role: '',
    ...user,
  } as User;

  return (
    <Box>
      <Link to="/admin/users">
        <Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }}>
          <ChevronLeft /> Back to user list
        </Typography>
      </Link>

      <Typography variant="h4">{isEdit ? 'Update user info' : 'Add new user'}</Typography>

      {((!isEdit) || Boolean(user)) && (
        <Box mt={3}>
          <UserForm initialValues={initialValues} onSubmit={handleUserFormSubmit}/>
        </Box>
      )}
    </Box>
  );
}
