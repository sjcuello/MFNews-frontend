import { useParams } from "react-router-dom";
import NewsContainer from "../news/container";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllArticles, fetchArticleById } from "../../redux/articles/thunk";
import { useEffect, useState } from "react";
import { selectArticleList } from "../../redux/articles";
import Loading from "../loading";
import { Article as ArticleType } from "../../interfaces";

const Article = () => {
  const { id } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const { data, status } = useSelector(selectArticleList);
  const [article, setArticle] = useState<ArticleType>();
  const sideArticles = data.filter((item) => item.id !== Number(id) && !item.markAsDeleted).slice(0, 3);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllArticles());
    }

    const tempArticle = data.find((item) => item.id === Number(id));
    setArticle(tempArticle);
    if (!article && !tempArticle) {
      dispatch(fetchArticleById(Number(id)));
    }

  }, [status, article, dispatch, id]);


  return (
    <>
      {status === 'pending' ? (
        <Loading />) :
        status === 'succeeded' && article ?
          <NewsContainer mainArticle={article!} sideArticles={sideArticles} isFullArticle /> : <></>}
    </>
  );
};

export default Article;