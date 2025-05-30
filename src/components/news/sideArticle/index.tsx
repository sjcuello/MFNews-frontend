import { Box, Typography } from "@mui/material";
import { Article } from "../../../interfaces";
import ImageContainer from "../imageContainer";
import styles from "./styles.module.css";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";


const getRandomPastelColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 40%, 90%)`;
};

const SideArticle = ({ title, category, imageUrl, id }: Article) => {
  const navigate = useNavigate();
  const backgroundColor = useMemo(getRandomPastelColor, []);

  const handleClick = () => {
    navigate(`/${id}`);
  };

  return (
    <Box className={styles.sideArticle} style={{ backgroundColor }} onClick={() => handleClick()}>
      <Box className={styles.sideArticleContent}>
        <Typography
          variant='h5'
          fontWeight={800}
          className={styles.category}
        >
          {category}
        </Typography>
        <Typography variant='h4'>{title}</Typography>
      </Box>
      <Box className={styles.sideArticleImage}>
        <ImageContainer imageUrl={imageUrl} title={title} />
      </Box>
    </Box>
  );
}

export default SideArticle;