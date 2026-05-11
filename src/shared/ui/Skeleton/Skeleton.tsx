import styles from './Skeleton.module.css';
import ReactSkeleton, {
  type SkeletonProps
} from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type Props = SkeletonProps & {
  className?: string;
};

export const Skeleton = ({
                           className = '',
                           ...props
                         }: Props) => {
  return (
    <ReactSkeleton
      // inline={false}
      className={`${styles.skeleton} ${className}`}
      baseColor="var(--color-gray-200)"
      highlightColor="var(--color-gray-400)"
      duration={1.5}
      enableAnimation={true}
      {...props}
    />
  );
};