import { type Movie, toggleFavorite } from '@/entities/movie';
import { useAppDispatch, useAppSelector } from '@/app/hooks/hooks';
import { Button, HeartIcon } from '@/shared/ui';
import styles from './FavoriteButton.module.css';

type Props = {
  movie: Movie;
};

export const FavoriteButton = ({ movie }: Props) => {
  const dispatch = useAppDispatch();

  const isFavorite = useAppSelector((state) =>
    state.favorites.items.some((item) => item.id === movie.id)
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    dispatch(toggleFavorite(movie));
  };

  return (
    <Button
      onClick={handleClick}
      className={`${styles.button} ${isFavorite ? styles.active : ''}`}
    >
      <HeartIcon
        filled={isFavorite}
        className={styles.heartIcon}
      />
    </Button>
  );
};