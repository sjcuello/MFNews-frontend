import { Box } from "@mui/material";

interface ImageContainerProps {
  imageUrl: string;
  title: string;
}

const ImageContainer = ({ imageUrl, title }: ImageContainerProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        aspectRatio: '4/3',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
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