export const MOVIE_CATEGORIES = [
  { id: 'popular', label: 'Popular Movies' },
  { id: 'top_rated', label: 'Top Rated Movies' },
  { id: 'upcoming', label: 'Upcoming Movies' },
  { id: 'now_playing', label: 'Now Playing Movies' },
] as const;

export type MovieCategory = (typeof MOVIE_CATEGORIES)[number]['id'];

export const VALID_CATEGORY_IDS = MOVIE_CATEGORIES.map(cat => cat.id) as readonly string[];