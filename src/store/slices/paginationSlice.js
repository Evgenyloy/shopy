import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 1,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    changeCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export default paginationSlice.reducer;
export const { changeCurrentPage } = paginationSlice.actions;
