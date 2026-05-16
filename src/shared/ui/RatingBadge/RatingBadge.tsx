import styles from './RatingBadge.module.css';

type Props = {
  rating: number;
  className?: string;
};

export const RatingBadge = ({ rating, className = '' }: Props) => {
  const getRatingClass = (value: number) => {
    if (value >= 7) return styles.positive;
    if (value >= 5) return styles.neutral;
    return styles.negative;
  };

  const formattedRating = rating.toFixed(1);

  return (
    <span
      className={`${styles.badge} ${getRatingClass(rating)} ${className}`}
      aria-label={`Rating: ${formattedRating}`}
    >
      {formattedRating}
    </span>
  );
};