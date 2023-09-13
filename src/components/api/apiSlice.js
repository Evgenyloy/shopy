import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (arg) => ({
        url: `/products`,
        params: {
          apikey: '',
          plot: 'full',
        },
      }),
    }),
    getASingleProduct: builder.query({
      query: (arg) => ({
        url: `/products/${arg}`,
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetASingleProductQuery } = apiSlice;
