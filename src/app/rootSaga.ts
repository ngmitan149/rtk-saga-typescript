import userSaga from 'features/user/userSaga';
import citySaga from 'features/city/citySaga';
import counterSaga from 'features/counter/counterSaga';
import { dashboardSaga } from 'features/dashboard/dashboardSaga';
import studentSaga from 'features/students/studentSaga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([counterSaga(), userSaga(), dashboardSaga(), studentSaga(), citySaga()]);
}