import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import ProfileImage from "../assets/turntable1.jpg";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import PhotoUploadCard from "../components/photo-upload-card.component";
import { TextField } from "@material-ui/core";

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

  med: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));

export default function SharePost() {
  const classes = useStyles();

  return (
    <Grid
      container
      className={classes.cover}
      direction="row"
      justify="center"
      alignItems="center"
      spacing={3}
    >
      <Grid container item sm={6} xs={12} spacing={2}>
        <Box
          display="flex"
          justifyContent="flex-start"
          boxShadow={3}
          width="100%"
          m={3}
          p={3}
        >
          <Box p={1}>
            <Avatar
              alt="Song Image"
              src={ProfileImage}
              className={classes.med}
            />
          </Box>
          <Box p={1}>
            <Box className={classes.content}>
              <Typography component="h6" variant="h6">
                So Many Words
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Pongo - So Many Words
              </Typography>
            </Box>
          </Box>
          <Box p={1}>
            <Link to="/share"> Change </Link>
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="flex-start"
          boxShadow={3}
          width="100%"
          flexDirection="column"
          m={3}
          p={3}
        >
          <Typography component="h5" variant="h5">
            Add Description:
          </Typography>
          <TextField
            id="filled-multiline-static"
            label="Write a Caption"
            multiline
            rows="8"
            fullWidth
            defaultValue=""
            variant="filled"
          />
        </Box>
      </Grid>
      <Grid item sm={6} xs={12}>
        <PhotoUploadCard />
      </Grid>
    </Grid>
  );
}
