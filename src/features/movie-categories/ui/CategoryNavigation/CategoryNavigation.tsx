import { MOVIE_CATEGORIES } from '@/shared/config/movies';
import styles from './CategoryNavigation.module.css';
import { NavLink } from 'react-router';
import { getRouteCategory } from '@/shared/config/router';

export const CategoryNavigation = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.categoryButtons}>
        {MOVIE_CATEGORIES.map((cat) => (
          <NavLink
            key={cat.id}
            to={getRouteCategory(cat.id)}
            className={({ isActive }) =>
              `${styles.link} ${isActive ? styles.active : ''}`
            }
          >
            {cat.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};