import { useState } from 'react';
import styles from './SearchForm.module.css';
import { useLocation, useNavigate } from 'react-router';
import { CloseSearch } from '@/shared/assets/icons';
import { Button } from '@/shared/ui';

interface SearchFormProps {
  initialValue?: string;
  className?: string;
}

export const SearchForm = ({ initialValue = '', className = '' }: SearchFormProps) => {
  const [query, setQuery] = useState(initialValue);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim().length >= 2) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleClear = () => {
    setQuery('');
    if (location.pathname === '/search') {
      navigate('/search');
    }
  };

  const showClearIcon = query.length >= 2;

  return (
    <form className={`${styles.form} ${className}`} onSubmit={handleSubmit}>
      <div className={styles.inputWrapper}>
        <input
          className={styles.input}
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {showClearIcon && (
          <CloseSearch
            className={styles.clearIcon}
            onClick={handleClear}
          />
        )}
      </div>
      <Button
        type="submit"
        className={styles.button}
        disabled={query.trim().length < 2}
      >
        Search
      </Button>
    </form>
  );
};