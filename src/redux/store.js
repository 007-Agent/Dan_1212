import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';

export const store = configureStore({
  // хранилище Redux
  reducer: {
    filter,
  },
});
