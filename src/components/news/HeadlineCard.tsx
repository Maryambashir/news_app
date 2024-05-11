import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { NewsType } from '../../types/NewsType';

const HeadlineCard = ({ title, description, url, urlToImage, publishedAt }: NewsType) => {
    
    const truncateTitle = (title: string, maxLength: number) => {
        if (title.length > maxLength) {
            return title.substring(0, maxLength) + '...';
        }
    return title;
  };

  return (
    <Card variant='outlined'>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {truncateTitle(title, 50)} {/* Truncate title to 50 characters */}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default HeadlineCard;
