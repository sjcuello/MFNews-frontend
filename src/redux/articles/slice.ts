import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ItemsState } from '../../interfaces';
import thunk from './thunk';

const initialState: ItemsState = {
  data: [],
  status: 'idle',
  error: null
}

export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setItemList: (state, action) => {
      state.data = action.payload;
    },
    deleteItemList: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(thunk.fetchAllArticles.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(thunk.fetchAllArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(thunk.fetchAllArticles.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message || 'Failed to fetch data';
      })
      .addCase(thunk.fetchArticleById.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(thunk.fetchArticleById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const existingArticle = state.data.find((item) => item.id === action.payload.id);
        if (!existingArticle) {
          state.data.push(action.payload);
        }
      })
      .addCase(thunk.fetchArticleById.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message || 'Failed to fetch article';
      })
      .addCase(thunk.addArticle.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(thunk.addArticle.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data.push(action.payload);
      })
      .addCase(thunk.addArticle.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message || 'Failed to add article';
      })
      .addCase(thunk.editArticle.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(thunk.editArticle.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = state.data.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        });
      })
      .addCase(thunk.editArticle.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message || 'Failed to edit item';
      })
      .addCase(thunk.removeArticle.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(thunk.removeArticle.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = state.data.filter((item) => item.id !== action.payload);
      })
      .addCase(thunk.removeArticle.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message || 'Failed to remove item';
      })
  },
});

export const {
  setItemList,
  deleteItemList
} = articleSlice.actions;

export const selectArticleList = (state: RootState) => state.articles;
export const selectArticleById = (state: RootState, id: number) => state.articles.data.find((item) => item.id === id);
export const selectAllTitles = (state: RootState) => state.articles.data.map((article) => article.title);



export default articleSlice.reducer;
