import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 450,
    margin: theme.spacing(3),
  },
}));

export default function SongPhotoUpload(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component='img'
          alt='Contemplative Reptile'
          height='400'
          image={props.image}
          title='Contemplative Reptile'
        />
      </CardActionArea>
      <CardActions>
        <Button size='small' color='primary'>
          Upload another picture
        </Button>
      </CardActions>
    </Card>
  );
}
