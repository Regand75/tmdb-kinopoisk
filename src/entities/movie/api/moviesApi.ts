import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { MoviesResponse } from '@/entities/movie/model/types';
import type { MovieCategory } from '@/shared/config/movies';
import { API_CONFIG } from '@/shared/config';

const API_TOKEN = API_CONFIG.TOKEN;

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_CONFIG.BASE_URL,
    prepareHeaders: (headers) => {
      if (API_TOKEN) {
        headers.set('Authorization', `Bearer ${API_TOKEN}`);
      }
      headers.set('accept', 'application/json');
      return headers;
    },
  }),
  endpoints: (build) => ({
    getMoviesByCategory: build.query<MoviesResponse, {category: MovieCategory, page?: number }>({
      query: ({ category, page = 1 }) => ({
        url: `/movie/${category}`,
        params: {
          page,
          language: 'en-US'
        }
      })
    })
  })
});

export const {useGetMoviesByCategoryQuery} = moviesApi