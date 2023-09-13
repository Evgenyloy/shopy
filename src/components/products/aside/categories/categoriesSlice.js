import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: 'all',
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    categoryChange: (state, action) => {
      state.categories = action.payload;
    },
  },
});

const { reducer, actions } = categoriesSlice;

export default reducer;
export const { categoryChange } = actions;
