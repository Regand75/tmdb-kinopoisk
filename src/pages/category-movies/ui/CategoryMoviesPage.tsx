import { useSearchParams, useParams, Navigate } from 'react-router';
import { MovieCard, useGetMoviesByCategoryQuery } from '@/entities/movie';
import { MOVIE_CATEGORIES, type MovieCategory } from '@/shared/config/movies';
import { getRouteCategory } from '@/shared/config/router';
import { CategoryNavigation } from '@/features/movie-categories';
import { FavoriteButton } from '@/features/toggle-favorite';
import { useAppSelector } from '@/app/hooks/hooks';
import { Pagination } from '@/shared/ui/Pagination/Pagination';
import styles from './CategoryMoviesPage.module.css';
import { LinearProgress } from '@/shared/ui';

const CategoryMoviesPage = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;

  const favoriteItems = useAppSelector((state) => state.favorites.items);

  const isValid = id && MOVIE_CATEGORIES.some(cat => cat.id === id);
  const currentCategory = (id as MovieCategory) || 'popular';

  const { data, isLoading, isFetching } = useGetMoviesByCategoryQuery(
    {
      category: currentCategory,
      page: currentPage
    },
    { skip: !isValid }
  );

  const handlePageChange = (page: number) => {
    setSearchParams({ page: String(page) });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isValid && id !== undefined) {
    return <Navigate to={getRouteCategory('popular')} replace />;
  }

  return (
    <div className={styles.page}>
      {(isLoading || isFetching) && <LinearProgress />}
      <CategoryNavigation />

      <main className="container">
        <h1 className={styles.title}>
          {currentCategory.replace('_', ' ')} Movies
        </h1>

        {(isLoading || isFetching) ? (
          <div className={styles.loader}>
            Loading titles...
          </div>
        ) : (
          <>
            <div className={styles.grid}>
              {data?.results.map((movie) => {
                const isFavorite = favoriteItems.some((fav) => fav.id === movie.id);

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

            {data && data.total_pages > 1 && (
              <Pagination
                currentPage={currentPage}
                pagesCount={data.total_pages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default CategoryMoviesPage;

