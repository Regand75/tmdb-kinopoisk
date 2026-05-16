import type { Movie } from '@/entities/movie';
import { MovieCard } from '@/entities/movie';
import { FavoriteButton } from '@/features/toggle-favorite';
import styles from './SimilarMovies.module.css';

type Props = {
  movies: Movie[];
};

export const SimilarMovies = ({ movies }: Props) => {
  return (
    <section className={styles.similar}>
      <h2 className={styles.sectionTitle}>
        Similar Movies
      </h2>

      <div className={styles.similarGrid}>
        {movies.map((movie) => {
          const isFavorite = movies.some(
            (fav) => fav.id === movie.id
          );

          return (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={isFavorite}
              favoriteSlot={
                <FavoriteButton movie={movie} />
              }
            />
          );
        })}
      </div>
    </section>
  );
};