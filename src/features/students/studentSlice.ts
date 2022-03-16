import { createSlice, PayloadAction, createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { ListParams, ListResponse, PaginationParams, Student } from 'models';

export interface StudentState extends EntityState<Student> {
  loading: boolean;
  filter: ListParams;
  pagination: PaginationParams;
}

export const studentAdapter = createEntityAdapter<Student>({
  selectId: student => student.id,
});

const initialState: StudentState = studentAdapter.getInitialState({
  loading: false,
  filter: {
    _page: 1,
    _limit: 15,
    name_like: undefined,
    city: undefined,
  },
  pagination: {
    _page: 1,
    _limit: 15,
    _totalRows: 15,
  },
});

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    fetchStudentList(state, action: PayloadAction<ListParams>) {
      state.loading = true;
    },
    fetchStudentListSuccess(state, action: PayloadAction<ListResponse<Student>>) {
      studentAdapter.setAll(state, action.payload.data)
      state.pagination = action.payload.pagination;
      state.loading = false;
    },
    fetchStudentListFailed(state) {
      state.loading = false;
    },

    setFilter(state, action: PayloadAction<ListParams>) {
      state.filter = action.payload;
    },

    setFilterWithDebounce(_state, _action: PayloadAction<ListParams>) {},
  },
});

// Actions
export const studentActions = studentSlice.actions;

// Selectors
export const {
  selectById: selectStudentById,
  selectIds: selectStudentIds,
  selectEntities: selectStudentEntities,
  selectAll: selectStudentList,
  selectTotal: selectTotalStudents
} = studentAdapter.getSelectors((state: RootState) => state.student);

// export const selectStudentList = (state: RootState) => state.student.list;
export const selectStudentLoading = (state: RootState) => state.student.loading;
export const selectStudentFilter = (state: RootState) => state.student.filter;
export const selectStudentPagination = (state: RootState) => state.student.pagination;

// Reducer
const studentReducer = studentSlice.reducer;
export default studentReducer;
