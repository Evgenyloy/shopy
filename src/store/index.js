import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../components/api/apiSlice';
import radioFilter from '../components/products/aside/priceFilter/PriceFilterRadio/priceFilterRadioSlice';
import category from '../components/products/aside/categories/categoriesSlice';
import rangeFilter from '../components/products/aside/priceFilter/priceFilterRange/PriceFilterRangeSlice';
import user from '../store/slices/userSlice';

const store = configureStore({
  reducer: {
    user,
    rangeFilter,
    radioFilter,
    category,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
