import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { AppDispatch } from "../../redux/store";

import NewsContainer from "../news/container";
import Loading from "../loading";
import { fetchAllArticles, fetchArticleById } from "../../redux/articles/thunk";
import { selectArticleList } from "../../redux/articles";
import { Article as ArticleType } from "../../interfaces";

const Article = () => {
  const { id } = useParams();
  const articleId = Number(id);
  const dispatch = useDispatch<AppDispatch>();

  const { data, status } = useSelector(selectArticleList);
  const [article, setArticle] = useState<ArticleType | undefined>();

  const sideArticles = useMemo(
    () => data.filter(item => item.id !== articleId && !item.markAsDeleted).slice(0, 3),
    [data, articleId]
  );

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllArticles());
    }

    const foundArticle = data.find(item => item.id === articleId);
    setArticle(foundArticle);

    if (!foundArticle) {
      dispatch(fetchArticleById(articleId));
    }
  }, [status, dispatch, data, articleId]);

  if (status === 'pending') return <Loading />;

  if (status === 'succeeded' && article) {
    return (
      <NewsContainer
        mainArticle={article}
        sideArticles={sideArticles}
        isFullArticle
      />
    );
  }

  return null;
};

export default Article;
