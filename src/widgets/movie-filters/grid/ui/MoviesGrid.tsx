import {
  MovieCard,
  MovieCardSkeleton,
  type Movie
} from '@/entities/movie';
import styles from './MoviesGrid.module.css';
import { FavoriteButton } from '@/features/toggle-favorite';

type Props = {
  movies: Movie[];
  isLoading: boolean;
  favoriteItems: Movie[];
};

export const MoviesGrid = ({
                             movies,
                             isLoading,
                             favoriteItems
                           }: Props) => {
  return (
    <div className={styles.grid}>
      {isLoading ? (
        Array.from({ length: 20 }).map((_, index) => (
          <MovieCardSkeleton key={index} />
        ))
      ) : movies.length > 0 ? (
        movies.map((movie) => {
          // 4. Проверяем, находится ли текущий фильм в списке избранного
          const isFavorite = favoriteItems.some((fav) => fav.id === movie.id);

          return (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={isFavorite} // 5. Прокидываем статус
              favoriteSlot={<FavoriteButton movie={movie} />} // 6. Прокидываем слот кнопки
            />
          );
        })
      ) : (
        <div className={styles.empty}>
          No films found.
        </div>
      )}
    </div>
  );
};