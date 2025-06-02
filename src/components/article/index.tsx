import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { AppDispatch, RootState } from "../../redux/store";
import NewsContainer from "../news/container";
import Loading from "../loading";
import { fetchAllArticles } from "../../redux/articles/thunk";
import { selectArticleById, selectArticleList } from "../../redux/articles";
import { Stack, Typography } from "@mui/material";

const Article = () => {
  const { id } = useParams();
  const articleId = Number(id);
  const dispatch = useDispatch<AppDispatch>();
  const { data, status } = useSelector(selectArticleList);
  const article = useSelector((state: RootState) =>
      selectArticleById(state, Number(id))
    )!;
  
  const sideArticles = useMemo(
    () => data.filter(item => item.id !== articleId && !item.markAsDeleted).slice(0, 3),
    [data, articleId]
  );

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllArticles());
    }
  }, [status, dispatch, data]);

  if (status === 'pending') return <Loading />;

  if (status === 'succeeded' && article) {
    return (
      <Stack>
        <NewsContainer
          mainArticle={article}
          sideArticles={sideArticles}
          isFullArticle
        />
        <Typography variant="body2" padding={2} width={{ xs: '100%', md: '50vw' }}>
          {article.content}
        </Typography>

      </Stack>
    );
  }

  return null;
};

export default Article;
