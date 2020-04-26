import React, { useState } from "react";
import { makeStyles, Grid, Typography, IconButton } from "@material-ui/core";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import LibraryMusicOutlinedIcon from "@material-ui/icons/LibraryMusicOutlined";

const useStyles = makeStyles((theme) => ({
  cover: {
    display: "flex",
    margin: theme.spacing(1),
  },
  content: {
    margin: theme.spacing(1, 0),
  },
  noteIcon: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: 30,
  },
}));

export default function Likes(props) {
  const classes = useStyles();
  const [likeToggle, setLikeToggle] = useState(false);

  const toggleLike = () => {
    !likeToggle ? setLikeToggle(true) : setLikeToggle(false);
  };

  return (
    <Grid container className={classes.cover}>
      <Grid item>
        <IconButton
          color="primary"
          aria-label="likes"
          component="span"
          onClick={toggleLike}
        >
          {" "}
          {likeToggle ? <LibraryMusicIcon /> : <LibraryMusicOutlinedIcon />}
        </IconButton>

        <Typography component="subtitle1" variant="subtitle1">
          <b>800 </b> <i>Musifiez</i>
        </Typography>
      </Grid>
    </Grid>
  );
}
