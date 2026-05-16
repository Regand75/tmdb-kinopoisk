import { baseApi } from '@/shared/api';
import type { MovieCreditsArgs, MovieCreditsResponse } from '@/entities/credit/types';

export const creditsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMovieCredits: builder.query<MovieCreditsResponse, MovieCreditsArgs>({
      query: ({ movieId, language = 'en-US' }) => ({
        url: `movie/${movieId}/credits`,
        method: 'GET',
        params: { language }
      })
    })
  }),
  overrideExisting: false,
});

export const { useGetMovieCreditsQuery } = creditsApi;