import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { MoviesResponse } from '@/entities/movie/model/types';
import type { MovieCategory } from '@/shared/config/movies';
import { API_CONFIG } from '@/shared/config';

const API_TOKEN = API_CONFIG.TOKEN;

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: async (args, api, extraOptions) => {
    await new Promise((resolve) => setTimeout(resolve, 2000)) //todo потом удалить
    return fetchBaseQuery({
      baseUrl: API_CONFIG.BASE_URL,
      prepareHeaders: (headers) => {
        if (API_TOKEN) {
          headers.set('Authorization', `Bearer ${API_TOKEN}`);
        }
        headers.set('accept', 'application/json');
        return headers;
      }
    })(args, api, extraOptions)
  },
  endpoints: (build) => ({
    getMoviesByCategory: build.query<MoviesResponse, { category: MovieCategory, page?: number }>({
      query: ({ category, page }) => ({ url: `movie/${category}`, params: { page, language: 'en-US' } })
    }),
    searchMovies: build.query<MoviesResponse, { query: string, page?: number }>({
      query: ({query, page}) => ({ url: 'search/movie', params: { query, page, include_adult: false, language: 'en-US' } })
    })
  }),
});

export const { useGetMoviesByCategoryQuery, useSearchMoviesQuery } = moviesApi;