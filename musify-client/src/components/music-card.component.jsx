import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import SongImage from "../assets/turntable1.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 245,
    margin: theme.spacing(1),
  },
  overline: {
    display: 'block',
    textAlign: 'center',
    color: '#9e9e9e',
    letterSpacing: '2px',
    fontSize: 14,
    marginTop: 12,
  },
  heading: {
    textAlign: 'center',
    fontSize: 32,
    lineHeight: 2,
    fontWeight: 300,
    fontFamily:
    // eslint-disable-next-line max-len
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    marginBottom: '0.72em',
    '&:after': {
      content: '""',
      width: 24,
      height: 2,
      backgroundColor: '#ddd',
      display: 'block',
      margin: '8px auto',
      borderRadius: 2,
    },
  },
  body: {
    textAlign: 'center',
    fontSize: 14,
    color: '#222',
    lineHeight: 1.75,
    width: '88%',
    margin: '0 auto',
  },
}));

export default function MusicCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="200"
          image={SongImage}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom align="center" className={classes.overline}>
            KESHA
          </Typography>
          <Typography gutterBottom align="center" className={classes.heading}>
            Song Sing
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p" align="center">
           Some other info here if needed. Not sure if we need this tbh. 
          </Typography>
        </CardContent>
      </CardActionArea>
      
    </Card>
  );
}
