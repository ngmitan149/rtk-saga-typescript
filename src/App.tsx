import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import LoginPage from 'features/user/pages/LoginPage';
import { AdminLayout } from 'components/Layout';
import { NotFound, PrivateRoute } from 'components/Common';
import { useAppDispatch } from 'app/hooks';
import { userActions } from 'features/user/userSlice';
import jwt_decode from "jwt-decode";


function App() {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const token: string = localStorage.getItem('access_token') || ''
  const isLoggedIn = Boolean(token)

  useEffect(() => {
    if(isLoggedIn) {
      let decodedToken: any = jwt_decode(token);
      let currentDate = new Date();

      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        dispatch(userActions.logout('Your session is expired'))
      } else {
        history.push('/admin')
      }
    }
  })

  return (
    <>
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route path='/login'>
          <LoginPage/>
        </Route>

        <PrivateRoute path='/admin'>
          <AdminLayout/>
        </PrivateRoute>

        <Route>
          <NotFound/>
        </Route>
      </Switch>
    </>
  );
}

export default App;
