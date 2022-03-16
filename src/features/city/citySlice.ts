import { createSelector, createSlice, PayloadAction, createEntityAdapter, EntityState } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { City, ListResponse } from 'models';


export interface CityState extends EntityState<City> {
  loading: boolean;

  [key: string]: any;
}

export const cityAdapter = createEntityAdapter<City>({
  selectId: city => city.code,
});

const initialState: CityState = cityAdapter.getInitialState({ loading: false });

const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    fetchCityList(state) {
      state.loading = true;
    },
    fetchCityListSuccess(state, action: PayloadAction<ListResponse<City>>) {
      state.loading = false;
      cityAdapter.setAll(state, action.payload.data)
    },
    fetchCityListFailed(state) {
      state.loading = false;
    },
  },
});

// Actions
export const cityActions = citySlice.actions;

// Selectors
export const {
  selectById: selectCityById,
  selectIds: selectCityIds,
  selectEntities: selectCityEntities,
  selectAll: selectCityList,
  selectTotal: selectTotalCities
} = cityAdapter.getSelectors((state: RootState) => state.city);

export const selectCityOptions = createSelector(selectCityList, (cityList) =>
  cityList.map((city) => ({
    label: city.name,
    value: city.code,
  }))
);

// Reducer
const cityReducer = citySlice.reducer;
export default cityReducer;
