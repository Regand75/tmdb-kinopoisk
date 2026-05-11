import { configureStore } from '@reduxjs/toolkit';
import { moviesApi } from '@/entities/movie/api/moviesApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { favoriteReducer } from '@/entities/movie';

export const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
    favorites: favoriteReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApi.middleware)
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
setupListeners((store.dispatch));