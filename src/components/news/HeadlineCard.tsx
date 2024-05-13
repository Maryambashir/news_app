import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { NewsType } from '../../types/NewsType';
import ExternalLink from './ExternalLink';
import { Box, Chip } from '@mui/material';
import { boxStyle, textStyle } from '../../commonStyles';
import { formattedDate, truncateText } from '../../utils';

const HeadlineCard = ({ title, url, publishedAt }: any) => {
  return (
    <Card variant='outlined' sx={boxStyle}>
      <CardContent>
        <Typography sx={textStyle} gutterBottom component="div">
          {truncateText(title, 50)}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Chip sx={{height: '20px'}}label={formattedDate(publishedAt)} color="primary" />
          <ExternalLink URL={url} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default HeadlineCard;
