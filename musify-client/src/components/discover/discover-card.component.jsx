import React from "react";
import {
  makeStyles,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Avatar,
  Box,
} from "@material-ui/core";
import TestImage from "../../assets/turntable1.jpg";
import Likes from "../post/likes.component";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    maxHeight: 460,
    margin: theme.spacing(1),
  },
  description: {
    display: "block",
    color: "#999",
    fontSize: 14,
    marginBottom: 20,
  },
  overline: {
    display: "block",
    color: "#9e9e9e",
    fontSize: 15,
    marginBottom: 10,
  },
  heading: {
    fontSize: 20,
    lineHeight: 1.5,
    fontWeight: 300,
    fontFamily:
      // eslint-disable-next-line max-len
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  },
  body: {
    fontSize: 14,
    color: "#222",
    lineHeight: 1.75,
    width: "88%",
    margin: "0 auto",
  },
}));

export default function DiscoverCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Grid container className={classes.cover}>
            <Grid item sm={2}>
              <Avatar className={classes.avatar} src={TestImage} />
            </Grid>
            <Grid item sm={8}>
              <Box className={classes.content}>
                <Typography component="h6" variant="h6">
                  Person Naam
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Now
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
        <CardMedia
          component="img"
          alt="Song"
          height="200"
          image={TestImage}
          title="Song"
        />
        <CardContent>
          <Typography className={classes.heading}>Song nu Naam</Typography>
          <Typography className={classes.overline}>Artist nu Naam</Typography>
          {/* insert <like> component here */}
          <Typography className={classes.description}>
            Song nu description aiyan avse. Ek ke be line avse pachi ....
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
