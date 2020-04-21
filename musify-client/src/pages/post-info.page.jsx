import React, { useState } from "react";
import { makeStyles, CssBaseline, Grid } from "@material-ui/core";
import MusifyAppBar from "../components/musifyappbar.component";
import CommentList from "../components/post/comment-list.component";
import CommentSubmit from "../components/post/comment-submit.component";
import PostDetails from "../components/post/post-details.component";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    background: "#ffffff",
  },
}));

export default function PostInfoPage() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <MusifyAppBar />
      <CssBaseline />
      <Grid container direction="columns" className={classes.marginBox}>
        <Grid item sm={6}>
          put image and spotify player
        </Grid>

        <Grid item sm={6}>
          <PostDetails />
          <CommentList />
          <CommentSubmit />
        </Grid>
      </Grid>
    </Grid>
  );
}
