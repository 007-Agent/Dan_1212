import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import cart from './slices/cartSlice';

export const store = configureStore({
  // хранилище Redux
  reducer: {
    filter,
    cart,
  },
});
