import { API_CONFIG } from '../../config';

export type PosterSize = 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original';

export const getImageUrl = (
  path: string | null,
  size: PosterSize = 'w500'
) => {
  if (!path) return '/placeholder-poster.png';
  return `${API_CONFIG.IMAGE_ROOT}${size}${path}`;
};