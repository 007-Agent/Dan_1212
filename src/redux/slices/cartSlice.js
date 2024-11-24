import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  itemPrice: 0, // начальное состояние значения!
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      //   добовляем пиццу в хранилище
      //   методы, которые изменяют значения нашего хранилища, action - значени,которое используется для передачи данных, необходимых для обновления состояния хранилища

      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      // state.itemPrice += action.payload.price; // самый простой способ
      state.itemPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0); // Посложднее способ

      //   state.items.push(action.payload); // СПОСОБ-1 Можно и такой способ, только у нас дублируется кликнутый объект(продукт)
      // state.itemPrice = state.items.reduce((sum, obj) => {
      //   return obj.price + sum;
      // }, 0);
    },

    minusCount(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.itemPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
      state.itemPrice = 0;
    },
  },
});

export const { addItem, setSort, removeItem, clearItems, minusCount } = cartSlice.actions;

export default cartSlice.reducer;
