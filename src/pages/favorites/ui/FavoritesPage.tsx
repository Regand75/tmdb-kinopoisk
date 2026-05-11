import { useAppSelector } from '@/app/hooks/hooks';
import { MovieCard } from '@/entities/movie';
import styles from './FavoritesPage.module.css'
import { FavoriteButton } from '@/features/toggle-favorite';
import { Link } from 'react-router';

const FavoritesPage = () => {
  const favoriteMovies = useAppSelector((state) => state.favorites.items);

  return (
    <main className='container'>
      <h1 className={styles.title}>Favorites</h1>

      {favoriteMovies.length > 0 ? (
        <div className={styles.grid}>
          {favoriteMovies.map((movie) => {
            const isFavorite = favoriteMovies.some((fav) => fav.id === movie.id);

            return (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFavorite={isFavorite}
                favoriteSlot={<FavoriteButton movie={movie} />}
              />
            );
          })}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p>Вы еще не добавили ни одного фильма в избранное.</p>
          <Link to="/" className={styles.backLink}>Вернуться на главную</Link>
        </div>
      )}
    </main>
  );
};

export default FavoritesPage;
