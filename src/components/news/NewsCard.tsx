import { Card, CardContent, CardMedia, Typography, Grid, Chip, Skeleton, Box, CardActionArea } from '@mui/material';
import { NewsType } from '../../types/NewsType';

const NewsCard = ({ title, description, url, urlToImage, publishedAt }: NewsType) => {
  return (
    <Card variant='outlined'>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={urlToImage}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default NewsCard