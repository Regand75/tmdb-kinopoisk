import styles from './ThemeSwitcher.module.css';
import { SunIcon, MoonIcon } from '@/shared/assets/icons';
import { useTheme } from '@/app/providers/ThemeProvider/lib/useTheme';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={styles.switcher}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <MoonIcon className={styles.icon} />
      ) : (
        <SunIcon className={styles.icon} />
      )}
    </button>
  );
};
