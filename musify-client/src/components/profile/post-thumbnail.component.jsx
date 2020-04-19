import React from 'react';
import { makeStyles, Card, CardActionArea, CardMedia } from '@material-ui/core';
import ThumbImage from '../../assets/turntable1.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.spacing(30),
    height: theme.spacing(30),
    margin: theme.spacing(1),
  },
  media: {
    height: theme.spacing(30),
  },
}));

export default function PostThumbnail() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={ThumbImage}
          title='Song Post'
        />
      </CardActionArea>
    </Card>
  );
}
