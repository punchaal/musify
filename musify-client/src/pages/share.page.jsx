import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import MusifyAppBar from "../components/musifyappbar.component";
import SearchBar from "material-ui-search-bar";
import SharePost from "../components/share/share-post.component";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    background: "#ffffff",
  },
  marginBox: {
    margin: theme.spacing(5),
  },
  search: { margin: "0 auto", maxWidth: 800, height: theme.spacing(8) },
}));

export default function SharePage() {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    searchVal: "",
  });
  const [error, setError] = useState({
    error: false,
    msg: "",
  });
  const { searchVal } = formData;

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
        <Grid item xs={12}>
          <SearchBar
            name="search"
            onChange={(newValue) => setFormData({ searchVal: newValue })}
            onRequestSearch={() => console.log("onRequestSearch")}
            onCancelSearch={() => setFormData({ searchVal: "" })}
            className={classes.search}
            value={searchVal}
          />
        </Grid>

        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.marginBox}
        ></Grid>
        <SharePost />
      </Grid>
    </Grid>
  );
}
