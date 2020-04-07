import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import ProfileImage from "../assets/turntable1.jpg";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  cover: {
    display: "flex",
    margin: theme.spacing(1),
  },
  avatar: {
    margin: theme.spacing(2, 2),
  },
  content: {
    margin: theme.spacing(1, 1),
  },

  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    [theme.breakpoints.down("md")]: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    },
  },
}));

export default function ProfileInfo() {
  const classes = useStyles();

  return (
    <Grid container className={classes.cover}>
      <Grid item sm={3}>
        <Avatar alt="Remy Sharp" src={ProfileImage} className={classes.large} />
      </Grid>
      <Grid item sm={9}>
        <Box className={classes.content}>
          <Typography component="h5" variant="h5">
            Live From Space
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Mac Miller
          </Typography>
        </Box>
        <Typography variant="subtitle2" color="textSecondary">
          <Grid container direction="row" justify="left">
            <Box fontWeight="fontWeightBold" m={1}>
              120k followers
            </Box>
            <Box fontWeight="fontWeightBold" m={1}>
              20k following
            </Box>
          </Grid>
        </Typography>
      </Grid>
    </Grid>
  );
}
