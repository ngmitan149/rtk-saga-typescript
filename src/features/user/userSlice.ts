import { createSlice, PayloadAction, createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { ErrorResponse, PaginationParams, ListParams, ListResponse } from 'models';
import { User } from 'models/user';
import { toast } from 'react-toastify';
import { RootState } from '../../app/store';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface UserState extends EntityState<User> {
  isLoggedIn: boolean;
  logging?: boolean;
  currentUser?: User;
  previousPath: string;
  loading: boolean;
  filter: ListParams;
  pagination: PaginationParams;
}

export const userAdapter = createEntityAdapter<User>({
  selectId: user => user.id,
});

const initialState: UserState = userAdapter.getInitialState({
  isLoggedIn: false,
  logging: false,
  currentUser: undefined,
  previousPath: '',
  loading: false,
  filter: {
    _page: 1,
    _limit: 15,
    name_like: undefined,
  },
  pagination: {
    _page: 1,
    _limit: 15,
    _totalRows: 15,
  },
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.logging = true;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.isLoggedIn = true;
      state.logging = false;
      state.currentUser = action.payload;
    },
    loginFailed(state, action: PayloadAction<ErrorResponse>) {
      state.logging = false;
      toast.error(action.payload.message)
    },

    logout(state, action: PayloadAction<string | undefined>) {
      state.isLoggedIn = false;
      state.currentUser = undefined;
      if (Boolean(action)) {
        toast.error(action?.payload)
      }
    },
    setPreviousPath(state, action: PayloadAction<string>) {
      if (action.payload !== '/login') {
        state.previousPath = action.payload
      }
    },
    fetchUserList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchUserListSuccess(state, action: PayloadAction<ListResponse<User>>) {
      userAdapter.setAll(state, action.payload.data)
      state.pagination = action.payload.pagination;
      state.loading = false;
    },
    fetchUserListFailed(state) {
      state.loading = false;
    },

    setFilter(state, action: PayloadAction<ListParams>) {
      state.filter = action.payload;
    },

    setFilterWithDebounce(_state, _action: PayloadAction<ListParams>) {},
  },
});

// Actions
export const userActions = userSlice.actions;

// Selectors
export const {
  selectById: selectUserById,
  selectIds: selectUserIds,
  selectEntities: selectUserEntities,
  selectAll: selectUserList,
  selectTotal: selectTotalUsers
} = userAdapter.getSelectors((state: RootState) => state.user);
export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;
export const selectIsLogging = (state: RootState) => state.user.logging;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserFilter = (state: RootState) => state.user.filter;
export const selectUserPagination = (state: RootState) => state.user.pagination;

// Reducer
const userReducer = userSlice.reducer;
export default userReducer;
