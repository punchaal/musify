import React from "react";
import { makeStyles, Card, CardActionArea, CardMedia } from "@material-ui/core";

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

export default function PostThumbnail({ post }) {
  const classes = useStyles();

  return (
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
