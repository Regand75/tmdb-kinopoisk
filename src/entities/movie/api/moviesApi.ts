import { baseApi } from '@/shared/api';
import type {
  DiscoverMoviesArgs,
  GenresResponse,
  MovieDetails,
  MoviesResponse,
  SimilarMoviesArgs
} from '@/entities/movie/model/types';
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
    getDiscoverMovies: build.query<MoviesResponse, DiscoverMoviesArgs>({
      query: (params) => ({
        url: 'discover/movie',
        method: 'GET',
        params: {
          language: 'en-US',
          include_adult: false,
          ...params,
        },
      }),
    }),
    getGenres: build.query<GenresResponse, { language?: string }>({
      query: ({ language = 'en-US' } = {}) => ({
        url: 'genre/movie/list',
        method: 'GET',
        params: { language },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetMoviesByCategoryQuery, useSearchMoviesQuery, useGetMovieDetailsQuery, useGetSimilarMoviesQuery, useGetDiscoverMoviesQuery, useGetGenresQuery } = moviesApi;