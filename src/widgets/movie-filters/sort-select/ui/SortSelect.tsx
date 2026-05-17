import styles from './SortSelect.module.css';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const SortSelect = ({
                             value,
                             onChange
                           }: Props) => {
  return (
    <div className={styles.group}>
      <label className={styles.label}>
        Sort by
      </label>

      <select
        className={styles.select}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="popularity.desc">Popularity ↓</option>
        <option value="popularity.asc">Popularity ↑</option>
        <option value="vote_average.desc">Rating ↓</option>
        <option value="vote_average.asc">Rating ↑</option>
        <option value="primary_release_date.desc">Release Date ↓</option>
        <option value="primary_release_date.asc">Release Date ↑</option>
        <option value="title.asc">Title A-Z</option>
        <option value="title.desc">Title Z-A</option>
      </select>
    </div>
  );
};