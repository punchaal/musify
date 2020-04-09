import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import MusifyAppBar from "../components/musifyappbar.component";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    background: "#ffffff",
  },
  marginBox: {
    margin: theme.spacing(2),
  },
}));

export default function SharePage() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <MusifyAppBar />
      <CssBaseline />
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.marginBox}
      >
       Helloooo lets upload some mixessss
       
       </Grid>
    </Grid>
  );
}
