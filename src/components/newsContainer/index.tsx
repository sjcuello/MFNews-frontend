import { Box, Button, Typography } from '@mui/material';
import CardItem from '../cardItem';
import styles from './styles.module.css';
import { selectArticleList } from '../../redux/articles';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAllArticles } from '../../redux/articles/thunk';
import Loading from '../loading';
import { switchDrawer } from '../../redux/drawer';
import ListEmpty from '../listEmpty';

const NewsContainer = () => {
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
          <Box className={styles.titleContainer}>
            <Typography variant='h2'>Your Articles</Typography>
            <Button
              variant="contained"
              color='primary'
              className={styles.button}
              onClick={handleDrawerToggle}
            >Add article</Button>
          </Box>
          <Box className={styles.cardContainer}>
            {data.map((item, index) => {
              if (!item.markAsDeleted) {
                return <CardItem key={index} data={item} />;
              }
            })}
          </Box>
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

export default NewsContainer;
