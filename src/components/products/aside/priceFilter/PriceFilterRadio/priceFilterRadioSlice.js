import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  radioFilter: '',
};

const radioFilterSlice = createSlice({
  name: 'radioFilter',
  initialState,
  reducers: {
    radioFilterChanged: (state, action) => {
      state.radioFilter = action.payload;
    },
  },
});

const { actions, reducer } = radioFilterSlice;

export default reducer;
export const { radioFilterChanged } = actions;
