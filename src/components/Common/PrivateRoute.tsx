import { useAppDispatch } from 'app/hooks';
import { userActions } from 'features/user/userSlice';
import React from 'react';
import { Redirect, Route, RouteProps, useHistory } from 'react-router-dom';

export function PrivateRoute (props: RouteProps) {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const token: string = localStorage.getItem('access_token') || ''
  const isLoggedIn = Boolean(token)

  if(!isLoggedIn) {
    dispatch(userActions.setPreviousPath(history.location.pathname))
    return <Redirect to='/login'/>
  }

  return (
    <Route {...props}/>
  );
}
