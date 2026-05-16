import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { API_CONFIG } from '@/shared/config';

const API_TOKEN = API_CONFIG.TOKEN;

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_CONFIG.BASE_URL,
  prepareHeaders: (headers) => {
    if (API_TOKEN) {
      headers.set('Authorization', `Bearer ${API_TOKEN}`);
    }
    headers.set('accept', 'application/json');
    return headers;
  },
});

export const baseQueryWithDelay: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // TODO: потом удалить искусственную задержку
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return rawBaseQuery(args, api, extraOptions);
};