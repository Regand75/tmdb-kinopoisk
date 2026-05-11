import type { MovieCategory } from '@/shared/config/movies';
import { MovieCard, MovieCardSkeleton, useGetMoviesByCategoryQuery } from '@/entities/movie';
import styles from './MovieSection.module.css';
import { useNavigate } from 'react-router';
import { getRouteCategory } from '@/shared/config/router';
import { Button } from '@/shared/ui';
import { FavoriteButton } from '@/features/toggle-favorite';
import { useAppSelector } from '@/app/hooks/hooks';

type Props = {
  category: MovieCategory;
  label: string;
}

export const MovieSection = ({ category, label }: Props) => {
  const { data, isLoading } = useGetMoviesByCategoryQuery({ category });
  const navigate = useNavigate();
  const moviesPreview = data?.results.slice(0, 6) || [];
  const favoriteItems = useAppSelector((state) => state.favorites.items);

  const handleViewMore = () => {
    navigate(getRouteCategory(category));
  };

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <h2 className={styles.categoryTitle}>{label}</h2>
        <Button className={styles.button} onClick={handleViewMore}
                type="button">View more
        </Button>
      </div>
      <div className={styles.grid}>
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))
          : moviesPreview.map((movie) => {
            const isFavorite = favoriteItems.some(
              (fav) => fav.id === movie.id
            );

            return (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFavorite={isFavorite}
                favoriteSlot={<FavoriteButton movie={movie} />}
              />
            );
          })}
      </div>
    </section>
  );
};