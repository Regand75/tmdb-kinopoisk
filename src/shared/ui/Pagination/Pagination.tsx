import { getPaginationPages } from '@/shared/lib/pagination/getPaginationPages';
import { Button } from '@/shared/ui';
import styles from './Pagination.module.css';

type Props = {
  currentPage: number;
  onPageChange: (page: number) => void;
  pagesCount: number;
};

export const Pagination = ({ currentPage, onPageChange, pagesCount }: Props) => {

  if (pagesCount <= 1) return null;

  const pages = getPaginationPages(currentPage, pagesCount);

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      {pages.map((page, idx) =>
        page === '...' ? (
          <span className={styles.ellipsis} key={`ellipsis-${idx}`}>
            ...
          </span>
        ) : (
          <Button
            key={page}
            className={styles.pageButton}
            onClick={() => onPageChange(Number(page))}
            disabled={page === currentPage}
          >
            {page}
          </Button>
        )
      )}
    </nav>
  );
};