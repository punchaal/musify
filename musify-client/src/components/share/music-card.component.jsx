import React from "react";
import {
  makeStyles,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 245,
    maxHeight: 345,
    margin: theme.spacing(1),
  },
  overline: {
    display: "block",
    textAlign: "center",
    color: "#9e9e9e",
    letterSpacing: "2px",
    fontSize: 14,
    marginTop: 12,
  },
  heading: {
    textAlign: "center",
    fontSize: 25,
    lineHeight: 2,
    fontWeight: 300,
    fontFamily:
      // eslint-disable-next-line max-len
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    marginBottom: "0.72em",
    "&:after": {
      content: '""',
      width: 24,
      height: 2,
      backgroundColor: "#ddd",
      display: "block",
      margin: "8px auto",
      borderRadius: 2,
    },
  },
  body: {
    textAlign: "center",
    fontSize: 14,
    color: "#222",
    lineHeight: 1.75,
    width: "88%",
    margin: "0 auto",
  },
  truncate: {
    width: "200px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

export default function MusicCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Song Album Image"
          height="200"
          image={props.song.image}
          title="Song Album Image"
        />
        <CardContent>
          <Typography gutterBottom align="center" className={classes.overline}>
            {props.song.artist_name}
          </Typography>
          <Typography
            gutterBottom
            align="center"
            className={`${classes.heading} ${classes.truncate}`}
          >
            {props.song.song_name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
