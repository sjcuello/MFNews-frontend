import { Box } from '@mui/material';
import styles from './styles.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAllArticles } from '../../redux/articles/thunk';
import Loading from '../loading';
import ListEmpty from '../listEmpty';

import Carousel from '../carousel';
import NewsContainer from './container';
import { selectArticleList } from '../../redux/articles';
import { switchDrawer } from '../../redux/drawer';
import { AppDispatch } from '../../redux';

const News = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status } = useSelector(selectArticleList);

  const handleDrawerToggle = () => {
    dispatch(switchDrawer());
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllArticles());
    }
  }, [status, dispatch]);

  const mainArticle = data[0];
  const sideArticles = data.slice(1, 4);
  const carouselArticles = data.slice(3);

  return (
    <Box className={styles.container}>
      {
        status === 'succeeded' && data.length > 0 && data.some(item => !item.markAsDeleted) ? (<>
          <NewsContainer mainArticle={mainArticle} sideArticles={sideArticles}/>
          <Carousel articles={carouselArticles} />
        </>
        ) : status === 'pending' ? (
          <Loading />
        ) : <ListEmpty
          text="Your feed list is empty :("
          textButton="Add your first article"
          handleClick={handleDrawerToggle}
        />
      }
    </Box>
  )
}

export default News;