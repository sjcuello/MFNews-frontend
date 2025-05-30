import { useState } from "react";
import { Article } from "../../interfaces";
import { Box, IconButton, Typography } from "@mui/material";
import styles from "./styles.module.css";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import ImageContainer from "../news/imageContainer";

interface CarouselProps {
  articles: Article[];
}

const Carousel = ({
  articles
}: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const filteredArticles = articles.filter(article => !article.markAsDeleted);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === filteredArticles.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? filteredArticles.length - 1 : prevIndex - 1
    );
  };

  if (filteredArticles.length === 0) return null;

  const visibleCount = 3;
  const visibleArticles = filteredArticles.slice(currentIndex, currentIndex + visibleCount);

  if (visibleArticles.length < visibleCount) {
    visibleArticles.push(...filteredArticles.slice(0, visibleCount - visibleArticles.length));
  }

  return (
      <Box className={styles.carouselContainer}>
        <Box className={styles.carousel}>
          <IconButton
            onClick={handlePrev}
            className={styles.carouselArrow}
            aria-label="Previous article"
          >
            <ArrowBackIos />
          </IconButton>

          <Box className={styles.carouselContent}>
            {visibleArticles.map((article, index) => (
              <Box key={index} className={styles.carouselItem}>
                <ImageContainer imageUrl={article.imageUrl} title={article.title} horizontalMargin={0}/>
                <Box padding={2}>
                  <Typography variant="h5" className={styles.carouselCategory} fontWeight={800}>
                  {article.category}
                </Typography>
                <Typography variant="h4" marginTop={1} fontWeight={600}>
                  {article.title}
                </Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <IconButton
            onClick={handleNext}
            className={styles.carouselArrow}
            aria-label="Next article"
          >
            <ArrowForwardIos />
          </IconButton>
        </Box>

        <Box className={styles.carouselIndicators}>
          {filteredArticles.map((_, index) => (
            <Box
              key={index}
              className={`${styles.indicator} ${index === currentIndex ? styles.activeIndicator : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </Box>
      </Box>
  );
};

export default Carousel