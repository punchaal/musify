import React, { useContext } from "react";
import { makeStyles, Box, Grid, Typography } from "@material-ui/core";
import { store } from "../../store/store.js";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  cover: {
    display: "flex",
    margin: theme.spacing(2),
  },
  content: {
    margin: theme.spacing(2, 2),
  },
  avatar: {
    marginTop: theme.spacing(2),
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));

export default function PostDetails() {
  const classes = useStyles();

  return (
    <Grid container className={classes.cover}>
      <Grid item sm={1}>
        <Avatar className={classes.avatar} />
      </Grid>
      <Grid item sm={9}>
        <Box className={classes.content}>
          <Typography component="h5" variant="h5">
            Kenneth J
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Check out this hot new song
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            15 mins ago
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
