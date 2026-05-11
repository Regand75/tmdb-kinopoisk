import type { Movie } from '@/entities/movie';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface FavoriteState {
  items: Movie[];
}

const initialState: FavoriteState = {
  items: JSON.parse(localStorage.getItem('favorites') || '[]'),
};

export const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Movie>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);

      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }

      localStorage.setItem('favorites', JSON.stringify(state.items));
    },
  },
});

export const { toggleFavorite } = favoriteSlice.actions;
export const favoriteReducer = favoriteSlice.reducer;