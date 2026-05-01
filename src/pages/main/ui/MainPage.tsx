import styles from './MainPage.module.css';
import { MOVIE_CATEGORIES } from '@/shared/config/movies';
import { MovieSection } from '@/widgets/movie-list';

const MainPage = () => {
  return (
    <div className={styles.main}>
      {MOVIE_CATEGORIES.map((cat) => (
        <MovieSection
          key={cat.id}
          category={cat.id}
          label={cat.label}
        />
      ))}
    </div>
  );
};

// const MainPage = () => {
//   const {data, isLoading} = useGetMoviesByCategoryQuery({category: MOVIE_CATEGORIES[0].id});
//   const moviesPreview = data?.results.slice(0, 6);
//
//   console.log(moviesPreview);
//
//   return (
//     <div className={styles.main}>
//       <h2>{MOVIE_CATEGORIES[0].label}</h2>
//
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className={styles.grid}>
//           {moviesPreview?.map(movie => (
//             <MovieCard key={movie.id} movie={movie} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

export default MainPage
