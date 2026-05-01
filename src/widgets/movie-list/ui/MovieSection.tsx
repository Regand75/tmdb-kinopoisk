import type { MovieCategory } from '@/shared/config/movies';
import { MovieCard, useGetMoviesByCategoryQuery } from '@/entities/movie';
import styles from './MovieSection.module.css';

type Props = {
  category: MovieCategory;
  label: string;
}

export const MovieSection = ({ category, label }: Props) => {
  const { data, isLoading } = useGetMoviesByCategoryQuery({ category });
  const moviesPreview = data?.results.slice(0, 6) || [];

  if (isLoading) return <p>Loading {label}...</p>;

  return (
    <section className={styles.section}>
      <h2 className={styles.categoryTitle}>{label}</h2>
      <div className={styles.grid}>
        {moviesPreview.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};