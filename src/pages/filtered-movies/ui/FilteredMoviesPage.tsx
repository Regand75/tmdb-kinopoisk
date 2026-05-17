import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { useGetDiscoverMoviesQuery, useGetGenresQuery } from '@/entities/movie/api/moviesApi';
import { LinearProgress, Pagination } from '@/shared/ui';
import { useDebounce } from '@/shared/lib/hooks/useDebounce';
import styles from './FilteredMoviesPage.module.css';
import { FiltersSidebar } from '@/widgets/movie-filters/filter-sidebar/ui/MoviesFiltersSidebar';
import { MoviesGrid } from '@/widgets/movie-filters/grid';
import { useAppSelector } from '@/app/hooks/hooks';

const INITIAL_SORT = 'popularity.desc';
const INITIAL_RATING = [0.0, 10.0];

export const FilteredMoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const favoriteItems = useAppSelector((state) => state.favorites.items);

  const [sortBy, setSortBy] = useState(INITIAL_SORT);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  const [ratingGte, setRatingGte] = useState(INITIAL_RATING[0]);
  const [ratingLte, setRatingLte] = useState(INITIAL_RATING[1]);

  const debouncedRatingGte = useDebounce(ratingGte, 200);
  const debouncedRatingLte = useDebounce(ratingLte, 200);

  const { data: genresData } = useGetGenresQuery({
    language: 'en-US'
  });

  const {
    data: moviesData,
    isLoading,
    isFetching
  } = useGetDiscoverMoviesQuery({
    page: currentPage,
    sort_by: sortBy,
    'vote_average.gte': debouncedRatingGte,
    'vote_average.lte': debouncedRatingLte,
    with_genres:
      selectedGenres.length > 0
        ? selectedGenres.join(',')
        : undefined
  });

  const handlePageChange = (pageNumber: number) => {
    setSearchParams((prev) => {
      prev.set('page', String(pageNumber));
      return prev;
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleGenreToggle = (genreId: number) => {
    setSearchParams((prev) => {
      prev.set('page', '1');
      return prev;
    });

    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  };

  const handleResetFilters = () => {
    setSortBy(INITIAL_SORT);
    setRatingGte(INITIAL_RATING[0]);
    setRatingLte(INITIAL_RATING[1]);
    setSelectedGenres([]);

    setSearchParams((prev) => {
      prev.set('page', '1');
      return prev;
    });
  };

  return (
    <>
      {(isLoading || isFetching) && <LinearProgress />}

      <div className={`container ${styles.page}`}>
        <FiltersSidebar
          sortBy={sortBy}
          onSortChange={setSortBy}
          ratingGte={ratingGte}
          ratingLte={ratingLte}
          setRatingGte={setRatingGte}
          setRatingLte={setRatingLte}
          genres={genresData?.genres || []}
          selectedGenres={selectedGenres}
          onGenreToggle={handleGenreToggle}
          onReset={handleResetFilters}
        />

        <main className={styles.mainContent}>
          <MoviesGrid
            movies={moviesData?.results || []}
            isLoading={isLoading || isFetching}
            favoriteItems={favoriteItems}
          />

          {moviesData && moviesData.total_pages > 1 && (
            <Pagination
              currentPage={currentPage}
              pagesCount={moviesData.total_pages}
              onPageChange={handlePageChange}
            />
          )}
        </main>
      </div>
    </>
  );
};

export default FilteredMoviesPage;
