import type { MovieCategory } from '@/shared/config/movies';
import { MovieCard, useGetMoviesByCategoryQuery } from '@/entities/movie';
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

  if (isLoading) return <p>Loading {label}...</p>;

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <h2 className={styles.categoryTitle}>{label}</h2>
        <Button className={styles.button} onClick={handleViewMore}
                type="button">View more
        </Button>
      </div>
      <div className={styles.grid}>
        {moviesPreview.map((movie) => {
          const isFavorite = favoriteItems.some((fav) => fav.id === movie.id);

          return (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={isFavorite} // Передаем флаг
              favoriteSlot={<FavoriteButton movie={movie} />}
            />
          );
        })}
      </div>
    </section>
  );
};