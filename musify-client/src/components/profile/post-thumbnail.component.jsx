import React from "react";
import { makeStyles, Card, CardActionArea, CardMedia } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.spacing(30),
    height: theme.spacing(30),
    margin: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      width: "90vw",
      height: theme.spacing(30),
      margin: theme.spacing(1),
    },
  },
  media: {
    height: theme.spacing(30),
  },
}));

export default function PostThumbnail({ post, loader }) {
  const classes = useStyles();
  return loader ? (
    <Skeleton variant="rect" className={classes.root} animation="wave" />
  ) : (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={post.song_image}
          title="Song Post"
        />
      </CardActionArea>
    </Card>
  );
}
