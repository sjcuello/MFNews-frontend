import { Article, ArticleForm } from "../interfaces";

const BASE_URL = process.env.BASE_URL + '/article';

export const getArticles = async () => {
  const response = await fetch(`${BASE_URL}`);
  if (!response.ok) {
    throw new Error('Failed to fetch articles');
  }
  return response.json();
};

export const getArticleById = async (articleId: number) => {
  const response = await fetch(`${BASE_URL}/${articleId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch article');
  }
  return response.json();
};

export const createArticle = async (articleData: ArticleForm) => {
  const response = await fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(articleData),
  });
  if (!response.ok) {
    throw new Error('Failed to create the article');
  }
  return response.json();
};

export const deleteArticle = async (articleId: number) => {
  const response = await fetch(`${BASE_URL}/${articleId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete article');
  }
  return response.json();
};

export const deleteArticles = async (articleIds: number[]) => {
  const response = await fetch(`${BASE_URL}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ articleIds }),
  });
  if (!response.ok) {
    throw new Error('Failed to delete articles');
  }
  return response.json();
};

export const updateArticle = async (updateData: Article) => {
  const response = await fetch(`${BASE_URL}/${updateData.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  });
  if (!response.ok) {
    throw new Error('Failed to update article');
  }
  return response.json();
};
