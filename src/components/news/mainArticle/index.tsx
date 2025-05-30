import { Box, Typography } from "@mui/material";
import { Article } from "../../../interfaces";
import ImageContainer from "../imageContainer";
import styles from "./styles.module.css";

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

export default MainArticle;