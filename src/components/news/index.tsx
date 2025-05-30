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

const News = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const { data, status } = useSelector(selectArticleList);

  const handleDrawerToggle = () => {
    dispatch(switchDrawer());
  };

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllArticles());
    }
  }, [status, dispatch]);

  return (
    <Box className={styles.container}>
      {
        status === 'succeeded' && data.length > 0 && data.some(item => !item.markAsDeleted) ? (<>
          <NewsContainer articles={data} />
          <Carousel articles={data} />
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