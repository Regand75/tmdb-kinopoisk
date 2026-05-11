import { useEffect, useState } from 'react';
import { useGetMoviesByCategoryQuery } from '@/entities/movie';
import { getImageUrl } from '@/shared/config/images';
import styles from './Hero.module.css';
import { SearchForm } from '@/features/search-movies';
import { LinearProgress } from '@/shared/ui';

export const Hero = () => {
  const { data, isLoading } = useGetMoviesByCategoryQuery({ category: 'popular' });
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!data?.results?.length) return;
    const moviesWithBackdrop = data.results.filter(m => m.backdrop_path);
    if (!moviesWithBackdrop.length) return;

    const randomIndex = Math.floor(Math.random() * moviesWithBackdrop.length);
    const url = getImageUrl(moviesWithBackdrop[randomIndex].backdrop_path, 'original');
// eslint-disable-next-line react-hooks/set-state-in-effect
    setImageUrl(url);
  }, [data]);

  return (
    <>
      {isLoading && <LinearProgress />}
      {isLoading || !imageUrl ? (
        <div className={styles.placeholder} />
      ) : (
        <section className={styles.hero} style={{ backgroundImage: `url(${imageUrl})` }}>
          <div className={styles.overlay}>
            <div className={styles.content}>
              <h1 className={styles.title}>WELCOME</h1>
              <h2 className={styles.subtitle}>Browse highlighted titles from TMDB</h2>
              <div className={styles.formWrapper}>
                <SearchForm />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
