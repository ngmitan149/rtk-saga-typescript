import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import userReducer from 'features/user/userSlice';
import cityReducer from 'features/city/citySlice';
import studentReducer from 'features/students/studentSlice';
import createSagaMiddleware from 'redux-saga';
import counterReducer from '../features/counter/counterSlice';
import { dashboardReducers } from './../features/dashboard/dashboardSlice';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    dashboard: dashboardReducers,
    student: studentReducer,
    city: cityReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
