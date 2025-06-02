import { useState } from "react";
import { Article } from "../../interfaces";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import styles from "./styles.module.css";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import ImageContainer from "../news/imageContainer";
import { useNavigate } from "react-router-dom";
import useIsMobile from "../../hooks/useIsMobile";

interface CarouselProps {
  articles: Article[];
}

const Carousel = ({ articles }: CarouselProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(0);
  const filteredArticles = articles.filter(article => !article.markAsDeleted);
  const total = filteredArticles.length;

  if (total === 0) return null;

  const visibleCount = 3;

  const visibleArticles = Array.from({ length: visibleCount }, (_, i) => 
    filteredArticles[(currentIndex + i) % total]
  );

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % total);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + total) % total);
  const handleClick = (id: number) => navigate(`/${id}`);

  const PrevButton = (
    <IconButton
      onClick={handlePrev}
      className={isMobile ? styles.carouselArrowMobile : styles.carouselArrow}
      aria-label="Previous article"
      size={isMobile ? "large" : "medium"}
    >
      <ArrowBackIos fontSize={isMobile ? "large" : "medium"} />
    </IconButton>
  );

  const NextButton = (
    <IconButton
      onClick={handleNext}
      className={isMobile ? styles.carouselArrowMobile : styles.carouselArrow}
      aria-label="Next article"
      size={isMobile ? "large" : "medium"}
    >
      <ArrowForwardIos fontSize={isMobile ? "large" : "medium"} />
    </IconButton>
  );

  return (
    <Box className={styles.carouselContainer}>
      <Box className={styles.carousel}>
        {!isMobile && PrevButton}
        <Box className={styles.carouselContent}>
          {visibleArticles.map((article) => (
            <Box
              key={article.id}
              className={styles.carouselItem}
              onClick={() => handleClick(article.id)}
            >
              <ImageContainer imageUrl={article.imageUrl} title={article.title} />
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
        {!isMobile && NextButton}
      </Box>

      <Box className={styles.carouselIndicators}>
        {isMobile && PrevButton}
        <Stack direction="row" spacing={1} alignItems="center">
          {filteredArticles.map((_, index) => (
            <Box
              key={index}
              className={`${styles.indicator} ${index === currentIndex ? styles.activeIndicator : ""}`}
              onClick={() => setCurrentIndex(index)}
              sx={{ cursor: "pointer" }}
            />
          ))}
        </Stack>
        {isMobile && NextButton}
      </Box>
    </Box>
  );
};

export default Carousel;
