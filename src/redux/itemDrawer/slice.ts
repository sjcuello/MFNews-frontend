import { createSlice } from '@reduxjs/toolkit';
import { ArticleForm } from '../../interfaces';

const initialState: ArticleForm = {
  title: '',
  subtitle: '',
  description: '',
  imageUrl: '',
  author: '',
  category: '',
  content: ''
}

export const itemDrawerSlice = createSlice({
  name: 'itemDrawer',
  initialState,
  reducers: {
    setItemDrawer: (state, action) => {
      state.title = action.payload.title;
      state.subtitle = action.payload.subtitle;
      state.description = action.payload.description;
      state.imageUrl = action.payload.imageUrl;
      state.author = action.payload.author;
      state.category = action.payload.category;
      state.content = action.payload.content;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setSubtitle: (state, action) => {
      state.subtitle = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setImageUrl: (state, action) => {
      state.imageUrl = action.payload;
    },
    setAuthor: (state, action) => {
      state.author = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setContent: (state, action) => {
      state.content = action.payload;
    },
    setClear: () => initialState,
  },
});

export const {
  setItemDrawer,
  setTitle,
  setSubtitle,
  setDescription,
  setImageUrl,
  setAuthor,
  setClear
} = itemDrawerSlice.actions;

export const selectItemDrawer = (state: { itemDrawer: ArticleForm; }) => state.itemDrawer;
export const isItemDrawerEmpty = (state: { itemDrawer: ArticleForm; }) => {
  const { 
    author,
    description,
    imageUrl,
    subtitle,
    title   
   } = state.itemDrawer;
  return !author && !description && !imageUrl && !subtitle && !title;
}


export default itemDrawerSlice.reducer;
