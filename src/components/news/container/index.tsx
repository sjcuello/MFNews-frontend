import { Box } from '@mui/material';
import { Article } from '../../../interfaces';
import styles from './styles.module.css';
import MainArticle from '../mainArticle';
import SideArticle from '../sideArticle';

interface NewsContainerProps {
  mainArticle: Article;
  sideArticles: Article[];
}

const NewsContainer = ({ mainArticle, sideArticles }: NewsContainerProps) => {
  return (
    <Box className={styles.content}>
      <MainArticle article={mainArticle} />
      <Box className={styles.sideArticles}>
        {sideArticles.map((article) => (
          <SideArticle key={article.id} {...article} />
        ))}
      </Box>
    </Box>
  );
}

export default NewsContainer;






