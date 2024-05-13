import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { NewsType } from '../../types/NewsType';
import { boxStyle, textStyle } from '../../commonStyles';

const SpotlightNews = ({ title, description, url, urlToImage, publishedAt }: NewsType) => {
  return (
    <Card variant="outlined" sx={{...boxStyle, width: '99%'}}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography gutterBottom variant="h5" noWrap sx={textStyle}>
            <a href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
              {title}
            </a>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
        </Box>
      </Box>
      <Box display={'flex'} justifyContent={'flex-end'}>
        <CardMedia
          component="img"
          image={urlToImage}
          alt="News Image"
          height="400"
          sx={{ width: '70%'}}
        />
      </Box>
    </Card>
  );
};

export default SpotlightNews