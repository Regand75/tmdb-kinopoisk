import { MovieCard, useSearchMoviesQuery } from '@/entities/movie';
import { useSearchParams } from 'react-router';
import styles from './SearchPage.module.css';
import { SearchForm } from '@/features/search-movies';
import { FavoriteButton } from '@/features/toggle-favorite';
import { useAppSelector } from '@/app/hooks/hooks';
import { LinearProgress, Pagination } from '@/shared/ui';
import { useRef } from 'react';

const SearchPage = () => {
  const topRef = useRef<HTMLHeadingElement>(null)
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('q') || '';
  const currentPage = Number(searchParams.get('page')) || 1;

  const { data, isLoading, isFetching } = useSearchMoviesQuery(
    { query, page: currentPage },
    { skip: query.length < 2 }
  );

  const hasQuery = query.length >= 2;
  const favoriteItems = useAppSelector((state) => state.favorites.items);

  const handlePageChange = (page: number) => {
    setSearchParams({ q: query, page: String(page) });
    setTimeout(() => {
      topRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 0);
  };

  return (
    <section className={`container ${styles.searchPage}`}>
      {(isLoading || isFetching) && <LinearProgress />}
      <h1 ref={topRef} className={styles.title}>Search Results</h1>

      <div className={styles.formWrapper}>
        <SearchForm initialValue={query} />
      </div>

      {(isLoading || isFetching) && <p className={styles.status}>Searching movies...</p>}

      {!hasQuery && !isLoading && (
        <div className={styles.emptyState}>
          <p>Enter a movie title to start searching.</p>
        </div>
      )}

      {hasQuery && !isFetching && data && data.results.length > 0 && (
        <>
          <div className={styles.grid}>
            {data.results.map((movie) => {
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

          {data.total_pages > 1 && (
            <Pagination
              currentPage={currentPage}
              pagesCount={data.total_pages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

      {hasQuery && !isLoading && !isFetching && data?.results.length === 0 && (
        <p className={styles.status}>No results found for "{query}"</p>
      )}
    </section>
  );

};

export default SearchPage;
