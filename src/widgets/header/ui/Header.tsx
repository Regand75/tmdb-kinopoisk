import styles from './Header.module.css';
import { Link, useLocation } from 'react-router';
import {
  getRouteCategory,
  getRouteFavorites,
  getRouteFilters,
  getRouteMain,
  getRouteSearch
} from '@/shared/config/router/paths';
import { ThemeSwitcher, TmdbLogo } from '@/shared/ui';

export const Header = () => {
  const { pathname } = useLocation();

  const menuItems = [
    { path: getRouteMain(), label: 'Main' },
    { path: getRouteCategory(), label: 'Category Movies' },
    { path: getRouteFilters(), label: 'Filtered Movies' },
    { path: getRouteSearch(), label: 'Search' },
    { path: getRouteFavorites(), label: 'Favorites' },
  ];

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContent}`}>
        <Link to={getRouteMain()} className={styles.logo}>
          <TmdbLogo />
        </Link>

        <nav className={styles.nav}>
          <ul className={styles.menu}>
            {menuItems.map((item) => {
              const isActive = item.path === '/'
                ? pathname === '/'
                : pathname.startsWith('/movies') && item.label === 'Category Movies'
                  ? true
                  : pathname === item.path;

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`${styles.link} ${isActive ? styles.active : ''}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <ThemeSwitcher />
      </div>
    </header>
  );
};
