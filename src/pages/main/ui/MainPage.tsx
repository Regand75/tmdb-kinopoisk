import styles from './MainPage.module.css';
import { MOVIE_CATEGORIES } from '@/shared/config/movies';
import { MovieSection } from '@/widgets/movie-list';
import { Hero } from '@/widgets/hero';

const MainPage = () => {
  return (
    <section className={styles.main}>
      <div className={styles.imageWrapper}>
        <Hero />
      </div>
      <div className={`container ${styles.categoriesWrapper}`}>
        {MOVIE_CATEGORIES.map((cat) => (
          <MovieSection
            key={cat.id}
            category={cat.id}
            label={cat.label}
          />
        ))}
      </div>
    </section>
  );
};

export default MainPage;
