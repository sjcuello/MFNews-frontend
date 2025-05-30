import { Box } from "@mui/material";

const ImageContainer = ({ imageUrl, title }: { imageUrl: string; title: string }) => {
  return (
    <Box
      sx={{
        width: '100%',
        aspectRatio: '4/3',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        marginBottom: 2,
        marginTop: 2
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