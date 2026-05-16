import type { Movie } from '@/entities/movie';
import styles from './MovieCard.module.css';
import { getImageUrl } from '@/shared/config/images';
import { Link } from 'react-router';
import { getRouteMovie } from '@/shared/config/router';
import { RatingBadge } from '@/shared/ui';

type Props = {
  movie: Movie;
  favoriteSlot?: React.ReactNode;
  isFavorite?: boolean;
};

export const MovieCard = ({ movie, favoriteSlot, isFavorite }: Props) => {
  const { id, title, poster_path, vote_average } = movie;

  return (
    <article className={styles.card}>
      <Link
        to={getRouteMovie(id)}
        className={styles.cardLink}
        aria-label={title}
      />

      <div className={styles.posterFrame}>
        <img
          src={getImageUrl(poster_path, 'w185')}
          alt={title}
          className={styles.poster}
          loading="lazy"
        />

        <RatingBadge
          rating={vote_average}
          className={styles.cardRatingBadge}
        />

        <div
          className={`${styles.favoriteSlot} ${
            isFavorite ? styles.active : ''
          }`}
        >
          {favoriteSlot}
        </div>
      </div>

      <h3 className={styles.cardTitle} title={title}>
        {title}
      </h3>
    </article>
  );
};

