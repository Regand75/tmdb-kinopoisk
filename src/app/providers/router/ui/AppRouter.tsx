import {
  getRouteCategory,
  getRouteFavorites,
  getRouteFilters,
  getRouteMain,
  getRouteSearch
} from '@/shared/config/router';
import { MainLayout } from '@/widgets/layout';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { lazy } from 'react';
const MainPage = lazy(() => import('@/pages/main'));
const FavoritesPage = lazy(() => import('@/pages/favorites'));
const CategoryMoviesPage = lazy(() => import('@/pages/category-movies'));
const FilteredMoviesPage = lazy(() => import('@/pages/filtered-movies'));
const SearchPage = lazy(() => import('@/pages/search'));
const NotFoundPage = lazy(() => import('@/pages/not-found'));

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: getRouteMain(),
        element: <MainPage />,
      },
      {
        path: getRouteCategory(':id'),
        element: <CategoryMoviesPage />,
      },
      {
        path: getRouteFilters(),
        element: <FilteredMoviesPage />,
      },
      {
        path: getRouteSearch(),
        element: <SearchPage />,
      },
      {
        path: getRouteFavorites(),
        element: <FavoritesPage />,
      },
      {
        path: '*',
        element: <NotFoundPage/>,
      },
    ],
  },

]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};