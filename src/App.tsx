import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginPage from 'features/auth/pages/LoginPage';
import { AdminLayout } from 'components/Layout';
import { NotFound, PrivateRoute } from 'components/Common';

function App() {

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
