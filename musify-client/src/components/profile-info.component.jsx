import React, { useRef, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import ProfileUploadAvatar from "./photo-upload-avatar.component";
import { store } from "../store/store.js";

const useStyles = makeStyles((theme) => ({
  cover: {
    display: "flex",
    margin: theme.spacing(1),
  },
  content: {
    margin: theme.spacing(2, 2),
  },
}));

export default function ProfileInfo() {
  const classes = useStyles();

  //getting the global state for user info
  const globalState = useContext(store);
  console.log(globalState);
  return (
    <Grid container className={classes.cover}>
      <Grid item sm={3}>
        <ProfileUploadAvatar />
      </Grid>
      <Grid item sm={9}>
        <Box className={classes.content}>
          <Typography component="h5" variant="h5">
            {`${globalState.state.profile.first_name} ${globalState.state.profile.last_name}`}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {globalState.state.profile.first_name}
          </Typography>
        </Box>
        <Typography variant="subtitle2" color="textSecondary">
          <Grid container direction="row">
            <Box fontWeight="fontWeightBold" m={2}>
              120k followers
            </Box>
            <Box fontWeight="fontWeightBold" m={2}>
              20k following
            </Box>
          </Grid>
        </Typography>
      </Grid>
    </Grid>
  );
}
