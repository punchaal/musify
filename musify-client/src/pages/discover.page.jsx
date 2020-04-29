import React from "react";
import { makeStyles, Grid, CssBaseline } from "@material-ui/core";
import DiscoverCard from "../components/discover/discover-card.component";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    background: "#ffffff",
  },
  marginBox: {
    margin: theme.spacing(5),
  },
}));

export default function DiscoverPage() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.marginBox}
      >
<<<<<<< HEAD
        <DiscoverCard />
        <DiscoverCard />
        <DiscoverCard />
        <DiscoverCard />
        <DiscoverCard />
        <DiscoverCard />
=======
        If this works I am going to shit balls!
>>>>>>> 6ab76571551f95464895545a713c49b45ff9c715
      </Grid>
    </Grid>
  );
}
