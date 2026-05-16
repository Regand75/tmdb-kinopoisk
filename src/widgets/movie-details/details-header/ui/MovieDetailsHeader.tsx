import { useNavigate } from 'react-router';
import { Button, RatingBadge } from '@/shared/ui';
import { getImageUrl } from '@/shared/config/images';
import type { MovieDetails } from '@/entities/movie/model/types';
import styles from './MovieDetailsHeader.module.css';

type Props = {
  movie: MovieDetails;
};

export const MovieDetailsHeader = ({ movie }: Props) => {
  const navigate = useNavigate();

  const formatRuntime = (mins: number) => {
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;

    return `${hours}h ${minutes}m`;
  };

  return (
    <section className={styles.hero}>
      <div className={styles.posterWrapper}>
        <img
          src={getImageUrl(movie.poster_path, 'w500')}
          alt={movie.title}
          className={styles.mainPoster}
        />
      </div>

      <div className={styles.info}>
        <div className={styles.infoHeader}>
          <h1 className={styles.title}>{movie.title}</h1>

          <Button
            className={styles.button}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </div>

        <div className={styles.meta}>
          <span>
            Release year: {new Date(movie.release_date).getFullYear()}
          </span>

          <RatingBadge rating={movie.vote_average} />

          <span>
            Runtime: {formatRuntime(movie.runtime)}
          </span>
        </div>

        <div className={styles.descriptionBlock}>
          <p>{movie.overview || 'Description missing.'}</p>
        </div>

        <div className={styles.genres}>
          <h3>Genres</h3>

          <div className={styles.genreList}>
            {movie.genres?.map((genre) => (
              <span
                key={genre.id}
                className={styles.genreTag}
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};