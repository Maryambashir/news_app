import { Card, CardContent, CardActions, Typography, Button, CardMedia, Grid } from '@mui/material';
import { NewsType } from '../../types/NewsType';

const SearchNewsCard = ({ title, description, url, urlToImage, publishedAt }: NewsType) => {
  return (
    <Card>
      <Grid container>
        <Grid item xs={12} md={4}>
          <CardMedia component="img" height="140" image={urlToImage} alt={title} />
        </Grid>
        <Grid item xs={12} md={8}>
          <CardContent>
            <Typography variant="h5" component="h2">
              {title}
            </Typography>s
            <Typography color="textSecondary" gutterBottom>
              {publishedAt}
            </Typography>
            <Typography variant="body2" component="p">
              {description}
            </Typography>
            {/* <Typography variant="body2" color="textSecondary">
              {}
            </Typography> */}
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
