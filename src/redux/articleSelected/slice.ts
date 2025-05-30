import { createSlice } from '@reduxjs/toolkit';
import { Article } from '../../interfaces';

const initialState: Article = {
  id: 0,
  title: '',
  subtitle: '',
  description: '',
  imageUrl: '',
  author: '',
  markAsDeleted: false,
  isChecked: false
}

export const articleSelectedSlice = createSlice({
  name: 'articleSelected',
  initialState,
  reducers: {
    setItemSelected: (state, action) => {
      state.id = action.payload.id;
      state.title = action.payload.title;
      state.subtitle = action.payload.subtitle;
      state.description = action.payload.description;
      state.imageUrl = action.payload.imageUrl;
      state.author = action.payload.author;
      state.markAsDeleted = action.payload.markAsDeleted;
      state.isChecked = action.payload.isChecked;
    },
    setClear: () => initialState,
  },
});

export const {
  setItemSelected,
  setClear
} = articleSelectedSlice.actions;

export const selectArticleSelected = (state: { itemSelected: Article; }) => state.itemSelected;
export const isArticleSelectedEmpty = (state: { itemSelected: Article; }) => {
  return state.itemSelected.id === 0;
}

export default articleSelectedSlice.reducer;
