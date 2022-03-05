import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Student } from 'models';
import { RootState } from './../../app/store';

export interface DashboardStatistics {
  maleCount: number;
  femaleCount: number;
  highMarkCount: number;
  lowMarkCount: number;
}

export interface RankingbyCity {
  cityId: string,
  rankingList: Student[]
}

export interface DashboardState {
  loading: Boolean;
  statistics: DashboardStatistics;
  highestStudentList: Student[];
  lowestStudentLIst: Student[];
  rankingByCity: RankingbyCity[];
}

const initialState: DashboardState = {
  loading: false,
  statistics: {
    maleCount: 0,
    femaleCount: 0,
    highMarkCount: 0,
    lowMarkCount: 0,
  },
  highestStudentList: [],
  lowestStudentLIst: [],
  rankingByCity: [],
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    getData(state) {
      state.loading = true
    },
    getDataSuccess(state) {
      state.loading = false
    },
    getDataFailed(state) {
      state.loading = false
    },
    setStatistics(state, action: PayloadAction<DashboardStatistics>) {
      state.statistics = action.payload
    },
    setHighesStudentList(state, action: PayloadAction<Student[]>) {
      state.highestStudentList = action.payload
    },
    setLowestStudentList(state, action: PayloadAction<Student[]>) {
      state.lowestStudentLIst = action.payload
    },
    setRankingByCity(state, action: PayloadAction<RankingbyCity[]>) {
      state.rankingByCity = action.payload
    },
  }
})

// Actions
export const dashboardActions = dashboardSlice.actions;

// Selectors

export const selectDashboardLoading = (state: RootState) => state.dashboard.loading;
export const selectDashboardStatistics = (state: RootState) => state.dashboard.statistics;
export const selectHighestStudentList = (state: RootState) => state.dashboard.highestStudentList;
export const selectLowestStudentList = (state: RootState) => state.dashboard.lowestStudentLIst;
export const selectRankingByCity = (state: RootState) => state.dashboard.rankingByCity;


// Reducer
export const dashboardReducers = dashboardSlice.reducer;
export default dashboardReducers;
