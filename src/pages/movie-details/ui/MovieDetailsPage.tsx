import { useParams } from 'react-router';
import {
  useGetMovieDetailsQuery,
  useGetSimilarMoviesQuery
} from '@/entities/movie/api/moviesApi';
import { useGetMovieCreditsQuery }
  from '@/entities/credit/api/creditsApi';
import { LinearProgress } from '@/shared/ui';
import styles from './MovieDetailsPage.module.css';
import { CastList } from '@/widgets/movie-details/cast-list';
import { MovieDetailsHeader } from '@/widgets/movie-details/details-header';
import { SimilarMovies } from '@/widgets/movie-details/similar-movies';

export const MovieDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const movieId = Number(id);

  const {
    data: movie,
    isLoading: isMovieLoading,
    isFetching: isMovieFetching
  } = useGetMovieDetailsQuery(
    { movieId, language: 'en-US' },
    { skip: !movieId }
  );

  const {
    data: credits,
    isLoading: isCreditsLoading,
    isFetching: isCreditsFetching
  } = useGetMovieCreditsQuery(
    { movieId, language: 'en-US' },
    { skip: !movieId }
  );

  const {
    data: similarMovies,
    isLoading: isSimilarLoading,
    isFetching: isSimilarFetching
  } = useGetSimilarMoviesQuery(
    { movieId, language: 'en-US' },
    { skip: !movieId }
  );

  const anyLoading =
    isMovieLoading ||
    isCreditsLoading ||
    isSimilarLoading;

  const anyFetching =
    isMovieFetching ||
    isCreditsFetching ||
    isSimilarFetching;

  const topCast =
    credits?.cast.slice(0, 6) || [];

  const similarList =
    similarMovies?.results.slice(0, 6) || [];

  return (
    <>
      {(anyLoading || anyFetching) && (
        <LinearProgress />
      )}

      <div className={styles.page}>
        {movie && (
          <MovieDetailsHeader movie={movie} />
        )}

        {!!topCast.length && (
          <CastList cast={topCast} />
        )}

        {!!similarList.length && (
          <SimilarMovies movies={similarList} />
        )}
      </div>
    </>
  );
};
