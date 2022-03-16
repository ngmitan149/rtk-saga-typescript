import { PayloadAction } from '@reduxjs/toolkit';
import { call, delay, fork, put, take } from 'redux-saga/effects';
import { authActions, LoginPayload } from './authSlice';
import appHistory from 'utils/appHistory';

function* handleLogin(_payload: LoginPayload) {
  try {

    yield localStorage.setItem('access_token', 'fake_token')
    yield delay(1000);

    yield put(
      authActions.loginSuccess({
        id: 1,
        name: 'Easy Frontend',
      })
    );

    // redirect to admin page
    yield call(() => appHistory.push('/admin'))
  } catch (error: any) {
    yield put(authActions.loginFailed(error.message));
  }
}

function* handleLogout() {
  yield delay(500);
  localStorage.removeItem('access_token');
  // redirect to login page
  yield call(appHistory.push, '/login')
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));

    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
      yield call(handleLogin, action.payload);
    } else {
      if (appHistory.location.pathname.match(/^\/login\/*.*/g)) {
        yield call(appHistory.push, '/admin')
      }
      yield take([authActions.logout.type]);
      yield call(handleLogout);
    }
    yield delay(0)
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
