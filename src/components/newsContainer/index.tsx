import { Box, Typography } from '@mui/material';
// import CardItem from '../cardItem';
import styles from './styles.module.css';
import { selectArticleList } from '../../redux/articles';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchAllArticles } from '../../redux/articles/thunk';
import Loading from '../loading';
import { switchDrawer } from '../../redux/drawer';
import ListEmpty from '../listEmpty';
import { Article } from '../../interfaces';

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
          <NewsContent articles={data} />
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

const NewsContent = ({ articles }: { articles: Article[] }) => {
  return (
    <Box className={styles.content}>
      <MainArticle {...articles[0]} />
      <Box className={styles.sideArticles}>
        {articles.slice(1, 4).map((article) => (
          <SideArticle key={article.id} {...article} />
        ))}
      </Box>
    </Box>
  );
}

const MainArticle = ({ title, subtitle, description, imageUrl, author }: Article) => {
  return (
    <Box className={styles.mainArticle}>
      <Typography variant='h3'>TODO: category</Typography>
      <Typography variant='h2'>{title}</Typography>
      <Typography variant='h3'>{subtitle}</Typography>
      <ImageContainer imageUrl={imageUrl} title={title} />
      <Typography variant='body1'>{description}</Typography>
      <Typography variant='body2'>Author: {author}</Typography>
      <Typography variant='body2'>TODO: date</Typography>
    </Box>
  );
}

const SideArticle = ({ title, imageUrl}: Article) => {
  return (
    <Box className={styles.sideArticle}>
      <Box className={styles.sideArticleContent}>
      <Typography variant='h3'>TODO: category</Typography>
      <Typography variant='h2'>{title}</Typography>
      </Box>
      <Box className={styles.sideArticleImage}>
        <ImageContainer imageUrl={imageUrl} title={title} />
      </Box>
    </Box>
  );
}

const ImageContainer = ({ imageUrl, title }: { imageUrl: string; title: string }) => {
  return (
    <Box
      sx={{
        width: '100%',
        aspectRatio: '4/3',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        marginBottom: 2,
        marginTop: 2
      }}
    >
      <Box
        id="image-container"
        component="img"
        src={imageUrl}
        alt={title}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />
    </Box>
  );
}