import styles from './MovieCard.module.css';
import type { Movie } from '@/entities/movie';
import { getImageUrl } from '@/shared/config/images';

type Props = {
  movie: Movie;
}

export const MovieCard = ({ movie }: Props) => {
  const { id, title, poster_path, vote_average } = movie;

  const getRatingClass = (rating: number) => {
    if (rating >= 7) return styles.positive;
    if (rating >= 5) return styles.neutral;
    return styles.negative;
  };

  const rating = vote_average.toFixed(1);

  return (
    <article className={styles.card}>
      <div className={styles.posterFrame}>
        <a href={`/movie/${id}`} className={styles.posterLink}>
          <img
            src={getImageUrl(poster_path, 'w185')}
            alt={title}
            className={styles.poster}
            loading="lazy"
          />
          <span className={`${styles.ratingBadge} ${styles.badge} ${getRatingClass(vote_average)}`}
                aria-label={`Rating: ${rating}`}>
            {rating}
          </span>
        </a>
      </div>
      <a href={`/movie/${id}`} className={styles.cardTitleLink}>
        <h3 className={styles.cardTitle} title={title}>{title}</h3>
      </a>
    </article>
  );
};
