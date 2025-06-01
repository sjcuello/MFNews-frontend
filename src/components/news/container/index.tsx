import { Box } from '@mui/material';
import { Article } from '../../../interfaces';
import styles from './styles.module.css';
import MainArticle from '../mainArticle';
import SideArticle from '../sideArticle';

interface NewsContainerProps {
  mainArticle: Article;
  sideArticles: Article[];
  isFullArticle?: boolean;
}

const NewsContainer = ({ mainArticle, sideArticles, isFullArticle }: NewsContainerProps) => {
  return (
    <Box className={styles.content}>
      <MainArticle article={mainArticle} hasSubtitle={isFullArticle} />
      <Box className={styles.sideArticles}>
        {sideArticles.map((article) => (
          <SideArticle key={article.id} {...article} />
        ))}
      </Box>
    </Box>
  );
}

export default NewsContainer;






