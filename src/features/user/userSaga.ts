import { debounce } from 'redux-saga/effects';
import { User } from 'models/user';
import { RootState } from 'app/store';
import { PayloadAction } from '@reduxjs/toolkit';
import userApi from 'api/userApi';
import jwt_decode from "jwt-decode";
import { AuthResponse } from 'models/auth';
import { call, delay, fork, put, select, take, takeLatest } from 'redux-saga/effects';
import appHistory from 'utils/appHistory';
import { userActions, LoginPayload } from './userSlice';
import { ListParams, ListResponse } from 'models';

function* handleLogin(payload: LoginPayload): any {
  try {

    yield delay(1000)
    const response = yield call(userApi.login, payload)
    yield localStorage.setItem('access_token', response.access_token)

    yield put(
      userActions.loginSuccess(jwt_decode(response.access_token) as AuthResponse)
    );

    // redirect to admin page
    const previousPath: string = yield select((state: RootState) => state.user.previousPath)
    yield call(appHistory.push, previousPath || '/admin')
  } catch (error: any) {
    yield put(userActions.loginFailed(error.response.data));
  }
}

function* handleLogout() {
  yield delay(500);
  yield put(userActions.setPreviousPath(appHistory.location.pathname || '/admin'))
  localStorage.removeItem('access_token');
  // redirect to login page
  yield call(appHistory.push, '/login')
}

function* watchLoginFlow() {
  while (true) {
    const token: string = yield localStorage.getItem('access_token') || ''
    const isLoggedIn = Boolean(token);

    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(userActions.login.type);
      yield call(handleLogin, action.payload);
    } else {
      if (appHistory.location.pathname.match(/^\/login\/*.*/g)) {
        const previousPath: string = yield select((state: RootState) => state.user.previousPath)
        yield call(appHistory.push, previousPath || '/admin')
      }
      yield take([userActions.logout.type]);
      yield call(handleLogout);
    }
  }
}

function* fetchUserList(action: PayloadAction<ListParams>) {
  try {
    const response: ListResponse<User> = yield call(userApi.getAll, action.payload)
    yield put(userActions.fetchUserListSuccess(response))
  } catch (error) {
    yield put(userActions.fetchUserListFailed())
  }
}

function* handleSearchDebounce(action: PayloadAction<ListParams>) {
  yield put(userActions.setFilter(action.payload))
}

export default function* authSaga() {
  yield fork(watchLoginFlow);

  yield takeLatest(userActions.fetchUserList, fetchUserList)

  yield debounce(500, userActions.setFilterWithDebounce, handleSearchDebounce)
}
