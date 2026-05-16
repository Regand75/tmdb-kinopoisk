import { getImageUrl } from '@/shared/config/images';
import styles from './CastList.module.css';
import type { CastMember } from '@/entities/credit/types';

type Props = {
  cast: CastMember[];
};

export const CastList = ({ cast }: Props) => {
  return (
    <section className={styles.casts}>
      <h2 className={styles.sectionTitle}>Cast</h2>

      <div className={styles.castGrid}>
        {cast.map((actor) => (
          <div
            key={actor.cast_id}
            className={styles.castCard}
          >
            <img
              src={getImageUrl(actor.profile_path, 'w185')}
              alt={actor.name}
            />

            <p className={styles.actorName}>
              {actor.name}
            </p>

            <p className={styles.characterName}>
              {actor.character}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};