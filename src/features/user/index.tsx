import { useAppDispatch } from 'app/hooks';
import { cityActions } from 'features/city/citySlice';
import React, { useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AddEditPage from './pages/AddEditPage';
import Listpage from './pages/ListPage';

export default function StudentFeature() {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={match.path} exact>
        <Listpage />
      </Route>

      <Route path={`${match.path}/add`}>
        <AddEditPage />
      </Route>

      <Route path={`${match.path}/edit/:userId`}>
        <AddEditPage />
      </Route>
    </Switch>
  );
}
