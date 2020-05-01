import React from "react";
import { makeStyles, Card, CardActionArea, CardMedia } from "@material-ui/core";

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
          component="img"
          alt="Song Album Image"
          height="400"
          image={props.image}
          title="Song Album Image"
        />
      </CardActionArea>
    </Card>
  );
}
