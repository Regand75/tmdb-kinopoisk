export const getRouteMain = () => '/';
export const getRouteCategory = (id: string = 'popular') => `/movies/${id}`;
export const getRouteFilters = () => '/filtered-movies';
export const getRouteSearch = () => '/search';
export const getRouteFavorites = () => '/favorites';