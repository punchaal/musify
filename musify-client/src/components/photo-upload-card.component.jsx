import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SongImage from "../assets/turntable1.jpg";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function PhotoUploadCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="300"
          image={SongImage}
          title="Contemplative Reptile"
        />
 
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" >
          Upload another picture
        </Button>
        
      </CardActions>
    </Card>
  );
}
