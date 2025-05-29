import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getArticles,
  createArticle,
  deleteArticle,
  updateArticle

} from '../../api';
import { Article, ArticleForm } from '../../interfaces';

export const fetchAllArticles = createAsyncThunk('articles/fetchAll', async () => {
  const response = await getArticles();
  return response;
});

export const addArticle = createAsyncThunk('articles/addItem', async (data: ArticleForm) => {
  const response = await createArticle(data);
  return response;
});

export const removeArticle = createAsyncThunk('articles/removeItem', async (articleId: number) => {
  const response = await deleteArticle(articleId);
  return response;
});

export const editArticle = createAsyncThunk('articles/editItem', async (updateData: Article) => {
  const response = await updateArticle(updateData);
  return response;
});

export default {
  fetchAllArticles,
  addArticle,
  removeArticle,
  editArticle
};