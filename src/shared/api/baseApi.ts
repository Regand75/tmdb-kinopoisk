import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithDelay } from './baseQuery';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithDelay,
  // tagTypes: ['Movie', 'Credit'], // Если потом понадобится инвалидация кэша
  endpoints: () => ({}),
});