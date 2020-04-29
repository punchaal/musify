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
        <DiscoverCard />
        <DiscoverCard />
        <DiscoverCard />
        <DiscoverCard />
        <DiscoverCard />
        <DiscoverCard />
      </Grid>
    </Grid>
  );
}
