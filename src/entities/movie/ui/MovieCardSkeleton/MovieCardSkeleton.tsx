import styles from './MovieCardSkeleton.module.css';
import { Skeleton } from '@/shared/ui';

export const MovieCardSkeleton = () => {
  return (
    <article className={styles.card}>
      <div className={styles.posterFrame}>
        <Skeleton className={styles.poster}/>

        <Skeleton
          circle
          width={36}
          height={36}
          className={styles.favoriteButton}
        />

        <Skeleton
          circle
          width={40}
          height={40}
          className={styles.rating}
        />
      </div>

      <div className={styles.content}>
        <Skeleton height={20} width="95%" />
        <Skeleton height={20} width="65%" />
      </div>
    </article>
  );
};