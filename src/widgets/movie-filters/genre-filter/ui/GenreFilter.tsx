import { Button } from '@/shared/ui';
import styles from './GenreFilter.module.css';

type Genre = {
  id: number;
  name: string;
};

type Props = {
  genres: Genre[];
  selectedGenres: number[];

  onToggle: (id: number) => void;
};

export const GenreFilter = ({
                              genres,
                              selectedGenres,
                              onToggle
                            }: Props) => {
  return (
    <div className={styles.group}>
      <label className={styles.label}>
        Genres
      </label>

      <div className={styles.grid}>
        {genres.map((genre) => {
          const isActive =
            selectedGenres.includes(genre.id);

          return (
            <Button
              key={genre.id}
              onClick={() => onToggle(genre.id)}
              className={`${styles.genreBtn} ${
                isActive ? styles.active : ''
              }`}
            >
              {genre.name}
            </Button>
          );
        })}
      </div>
    </div>
  );
};