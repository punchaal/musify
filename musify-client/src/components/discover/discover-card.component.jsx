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
import moment from "moment";
import Likes from "../post/likes.component";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    maxHeight: 460,
    margin: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      width: "90vw",
    },
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
  truncate: {
    width: "300px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

export default function DiscoverCard(props) {
  console.log(props.post);
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Grid container className={classes.cover}>
            <Grid item sm={2}>
              <Avatar
                className={classes.avatar}
                src={props.post && props.post.profile_image}
              />
            </Grid>
            <Grid item sm={8}>
              <Box className={classes.content}>
                <Typography component="h6" variant="h6">
                  {props.post &&
                    `${props.post.first_name} ${props.post.last_name}`}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {props.post && moment(props.post.date).fromNow()}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
        <CardMedia
          component="img"
          alt="Song"
          height="200"
          image={props.post && props.post.song_image}
          title="Song"
        />
        <CardContent>
          <Typography className={`${classes.heading} ${classes.truncate}`}>
            {props.post && props.post.song_name}
          </Typography>
          <Typography className={classes.overline}>
            {props.post && props.post.artist_name}
          </Typography>
          <Likes post={props.post} />
          <Typography className={`${classes.description} ${classes.truncate}`}>
            {`${props.post && props.post.caption}`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
