import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  minPrice: 0,
  maxPrice: 1000,
};

const rangeFilterSlice = createSlice({
  name: 'priceFilter',
  initialState,
  reducers: {
    minPriceFilterChanged: (state, action) => {
      state.minPrice = action.payload;
    },
    maxPriceFilterChanged: (state, action) => {
      state.maxPrice = action.payload;
    },
  },
});

const { actions, reducer } = rangeFilterSlice;
export default reducer;
export const { minPriceFilterChanged, maxPriceFilterChanged } = actions;
