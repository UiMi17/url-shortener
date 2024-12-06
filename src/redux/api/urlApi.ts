import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export const urlApi = createApi({
  reducerPath: 'urlApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5024/api',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUrls: builder.query({
      query: () => '/url',
    }),
    addUrl: builder.mutation({
      query: (newUrl: { originalUrl: string }) => ({
        url: '/url',
        method: 'POST',
        body: newUrl,
      }),
    }),
    deleteUrl: builder.mutation({
      query: (id: string) => ({
        url: `/url/${id}`,
        method: 'DELETE',
      }),
    }),
    getUserById: builder.query({
      query: (id: string) => `/users/${id}`,
    }),
  }),
});

export const {
  useGetUrlsQuery,
  useAddUrlMutation,
  useLazyGetUserByIdQuery,
  useDeleteUrlMutation,
} = urlApi;
