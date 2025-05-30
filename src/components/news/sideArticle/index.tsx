import { Box, Typography } from "@mui/material";
import { Article } from "../../../interfaces";
import ImageContainer from "../imageContainer";
import styles from "./styles.module.css";

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

export default SideArticle;