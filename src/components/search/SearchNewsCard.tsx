import { Card, CardContent, CardActions, Typography, Button, CardMedia, Grid, Chip, Box } from '@mui/material';
import { NewsType } from '../../types/NewsType';
import { textStyle } from '../../commonStyles';
import { truncateText } from '../../utils';

const SearchNewsCard = ({ title, description, url, urlToImage, publishedAt }: NewsType) => {
  return (
    <Card>
      <Grid container>
        <Grid item xs={12} md={4}>
          <CardMedia component="img" height="140" image={urlToImage} alt={title} />
        </Grid>
        <Grid item xs={12} md={8}>
          <CardContent>
            {title && <Typography sx={textStyle} variant="h5" component="h2">
              {truncateText(title, 50)}
            </Typography>}
            <Box sx={{ py: 1 }}>
              <Chip sx={{ height: '20px' }} label={publishedAt} color="primary" />
            </Box>
           {description && <Typography sx={textStyle} variant="body2" component="p">
              {truncateText(description, 200)}
            </Typography>}
          </CardContent>
          <CardActions>
            <Button size="small" href={url} target="_blank" rel="noopener noreferrer">
              Read More
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
};

export default SearchNewsCard;
