import { baseApi } from '@/shared/api';
import type { MovieDetails, MoviesResponse, SimilarMoviesArgs } from '@/entities/movie/model/types';
import type { MovieCategory } from '@/shared/config/movies';

export const moviesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMoviesByCategory: build.query<MoviesResponse, { category: MovieCategory; page?: number }>({
      query: ({ category, page }) => ({
        url: `movie/${category}`,
        params: { page, language: 'en-US' }
      })
    }),
    searchMovies: build.query<MoviesResponse, { query: string; page?: number }>({
      query: ({ query, page }) => ({
        url: 'search/movie',
        params: { query, page, include_adult: false, language: 'en-US' }
      })
    }),
    getMovieDetails: build.query<MovieDetails, { movieId: number; language?: string }>({
      query: ({ movieId, language = 'ru-RU' }) => ({
        url: `movie/${movieId}`,
        params: { language }
      })
    }),
    getSimilarMovies: build.query<MoviesResponse, SimilarMoviesArgs>({
      query: ({ movieId, page = 1, language = 'en-US' }) => ({
        url: `movie/${movieId}/similar`,
        method: 'GET',
        params: {
          page,
          language,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetMoviesByCategoryQuery, useSearchMoviesQuery, useGetMovieDetailsQuery, useGetSimilarMoviesQuery } = moviesApi;