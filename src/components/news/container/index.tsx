import { Box } from '@mui/material';
import { Article } from '../../../interfaces';
import styles from './styles.module.css';
import MainArticle from '../mainArticle';
import SideArticle from '../sideArticle';

const NewsContainer = ({ articles }: { articles: Article[] }) => {
  return (
    <Box className={styles.content}>
      <MainArticle article={articles[0]}/>
      <Box className={styles.sideArticles}>
        {articles.slice(1, 4).map((article) => (
          <SideArticle key={article.id} {...article} />
        ))}
      </Box>
    </Box>
  );
}

export default NewsContainer;






