import { Box, Typography } from "@mui/material";
import { Article } from "../../../interfaces";
import ImageContainer from "../imageContainer";
import styles from "./styles.module.css";

interface MainArticleProps {
  article: Article;
  hasSubtitle?: boolean;
}

const MainArticle = ({ article, hasSubtitle }: MainArticleProps) => {
  const {
    title,
    subtitle,
    content,
    author,
    description,
    imageUrl,
    category
  } = article;
  return (
    <Box className={styles.mainArticle}>
      <Typography
        variant='h5'
        fontWeight={800}
        className={styles.category}
      >
        {category}
      </Typography>
      <Typography variant='h1' marginY={1} fontWeight={600}>{title}</Typography>
      {
        subtitle && hasSubtitle ? (
          <Typography variant='h3' marginBottom={1} fontWeight={500}>{subtitle}</Typography>
        ) : null
      }

      <ImageContainer imageUrl={imageUrl} title={title} />
      <Box className={styles.articleDetails}>
        <Typography>{content}</Typography>
        <Typography><strong>Author: </strong>{author}</Typography>
      </Box>
      <Typography variant='body1'>{description}</Typography>
    </Box>
  );
}

export default MainArticle;