import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoryId: 0, // начальное состояние значения!
  currentPage: 1,
  sort: {
    name: 'популярности',
    sortProperty: 'raiting',
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action) {
      // методы, которые изменяют значения нашего хранилища, action - значени,которое используется для передачи данных, необходимых для обновления состояния хранилища
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const { setCategoryId, setSort, setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;
