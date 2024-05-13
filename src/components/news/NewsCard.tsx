import { Card, CardContent, CardMedia, Typography, Grid, Chip, Skeleton, Box, CardActionArea } from '@mui/material';
import { NewsType } from '../../types/NewsType';
import { boxStyle, textStyle } from '../../commonStyles';
import { formattedDate, truncateText } from '../../utils';
import ExternalLink from './ExternalLink';

const NewsCard = ({ title, description, url, urlToImage, publishedAt }: NewsType) => {
  return (
    <Card variant='outlined' sx={{ ...boxStyle, minHeight: '350px' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={urlToImage}
          alt="green iguana"
        />
        <CardContent>
          <Box sx={{ minHeight: '150px'}}>
            <Typography sx={textStyle} gutterBottom variant="h5" component="div">
              {truncateText(title, 50)}
            </Typography>
            {description && <Typography sx={textStyle} variant="body2" color="text.secondary">
              {truncateText(description, 200)}
            </Typography>}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
            <Chip sx={{ height: '20px' }} label={formattedDate(publishedAt)} color="primary" />
            <ExternalLink URL={url} />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default NewsCard