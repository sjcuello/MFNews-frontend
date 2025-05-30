import { Box } from "@mui/material";

interface ImageContainerProps {
  imageUrl: string;
  title: string;
  horizontalMargin?: number;
}

const ImageContainer = ({ imageUrl, title, horizontalMargin = 2 }: ImageContainerProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        aspectRatio: '4/3',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        my: horizontalMargin
      }}
    >
      <Box
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

export default ImageContainer;