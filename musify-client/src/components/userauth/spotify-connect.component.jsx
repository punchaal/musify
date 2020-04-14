import React from "react";
import Avatar from "@material-ui/core/Avatar";
import GradientButton from "../gradient-button.component";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(25, 15),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: theme.palette.contrastText,
  },
  link: {
    color: theme.palette.primary.dark,
  },
}));
export default function SpotifyConnect() {
  const classes = useStyles();
  const onClick = (e) => {
    window.location = "http://localhost:8000/api/spotify-login";
  };
  return (
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <Grid container direction={"column"} spacing={0}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <CheckCircleRoundedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Success!
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            Congratulations on your new Musify account. We are glad to have you
            with us. In order to use our app, you will need to sign in with your
            Spotify account.
          </Typography>
          <GradientButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => onClick()}
          >
            {" "}
            Connect with Spotify{" "}
          </GradientButton>
        </div>
      </Grid>
    </Grid>
  );
}
