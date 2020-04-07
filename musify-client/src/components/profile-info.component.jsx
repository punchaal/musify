import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import ProfileImage from '../assets/turntable1.jpg';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: theme.spacing(5, 5),
    height: 'auto',
  },
  details: {
    display: 'flex',
  },
  avatar: {
    display: 'flex',
    margin: theme.spacing(5, 5),
  },
  content: {
    flex: '1 0 auto',
    padding: theme.spacing(5),
  },
  cover: {
    width: 151,
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

export default function ProfileInfo() {
  const classes = useStyles();

  return (

    <Card className={classes.root}>
        <CardMedia className={classes.avatar}>
            <Avatar alt="Remy Sharp" src={ProfileImage} className={classes.large}/>
       </CardMedia>
       <div className={classes.details}>
         <CardContent className={classes.content}>
           <Typography component="h5" variant="h5">
             Live From Space
           </Typography>
           <Typography variant="subtitle1" color="textSecondary">
             Mac Miller
           </Typography>
         </CardContent>
        
       </div>
      
     </Card>

  
 
  );
}