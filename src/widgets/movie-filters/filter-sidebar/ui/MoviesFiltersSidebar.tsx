import { Button } from '@/shared/ui';
import styles from './MoviesFiltersSidebar.module.css';
import { SortSelect } from '@/widgets/movie-filters/sort-select';
import { RatingSlider } from '@/widgets/movie-filters/rating-slider';
import { GenreFilter } from '@/widgets/movie-filters/genre-filter';

type Genre = {
  id: number;
  name: string;
};

type Props = {
  sortBy: string;
  onSortChange: (value: string) => void;

  ratingGte: number;
  ratingLte: number;

  setRatingGte: (value: number) => void;
  setRatingLte: (value: number) => void;

  genres: Genre[];
  selectedGenres: number[];

  onGenreToggle: (id: number) => void;
  onReset: () => void;
};

export const FiltersSidebar = ({
                                 sortBy,
                                 onSortChange,
                                 ratingGte,
                                 ratingLte,
                                 setRatingGte,
                                 setRatingLte,
                                 genres,
                                 selectedGenres,
                                 onGenreToggle,
                                 onReset
                               }: Props) => {
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.title}>Filters / Sort</h2>

      <SortSelect
        value={sortBy}
        onChange={onSortChange}
      />

      <RatingSlider
        min={ratingGte}
        max={ratingLte}
        onMinChange={setRatingGte}
        onMaxChange={setRatingLte}
      />

      <GenreFilter
        genres={genres}
        selectedGenres={selectedGenres}
        onToggle={onGenreToggle}
      />

      <Button
        className={styles.resetBtn}
        onClick={onReset}
      >
        Reset filters
      </Button>
    </aside>
  );
};