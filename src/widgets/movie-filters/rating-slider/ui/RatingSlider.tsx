import styles from './RatingSlider.module.css';

type Props = {
  min: number;
  max: number;

  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
};

export const RatingSlider = ({
                               min,
                               max,
                               onMinChange,
                               onMaxChange
                             }: Props) => {
  const minPercent = (min / 10) * 100;
  const maxPercent = (max / 10) * 100;

  return (
    <div className={styles.group}>
      <div className={styles.header}>
        <span>Rating</span>

        <span className={styles.valueRating}>
          {min.toFixed(1)} - {max.toFixed(1)}
        </span>
      </div>

      <div className={styles.slider}>
        <div className={styles.track} />

        <div
          className={styles.progress}
          style={{
            left: `${minPercent}%`,
            right: `${100 - maxPercent}%`
          }}
        />

        <input
          type="range"
          min="0"
          max="10"
          step="0.1"
          value={min}
          onChange={(e) =>
            onMinChange(Number(e.target.value))
          }
          className={styles.rangeInput}
        />

        <input
          type="range"
          min="0"
          max="10"
          step="0.1"
          value={max}
          onChange={(e) =>
            onMaxChange(Number(e.target.value))
          }
          className={styles.rangeInput}
        />
      </div>
    </div>
  );
};