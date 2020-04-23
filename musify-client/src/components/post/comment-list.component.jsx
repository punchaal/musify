import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { store } from "../../store/store.js";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    padding: "10px",
    maxHeight: "350px",
    overflowY: "auto",
  },
  inline: {
    display: "inline",
  },
  listItem: {
    width: "auto",
    maxWidth: "450px",
  },
}));

export default function CommentList(props) {
  const globalState = useContext(store);
  const classes = useStyles();

  if (props.post.comments && props.post.comments.length > 0) {
    return (
      <List className={classes.root}>
        {props.post.comments.map((comment) => {
          return (
            <div key={comment._id} className={classes.listItem}>
              <ListItem alignItems="flex-start" className={classes.listItem}>
                <ListItemAvatar>
                  <Avatar
                    alt="Remy Sharp"
                    src={globalState.state.profile_image}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={`${comment.first_name} ${comment.last_name}`}
                  secondary={<React.Fragment>{comment.text}</React.Fragment>}
                />
              </ListItem>
              <Divider
                variant="inset"
                component="li"
                className={classes.listItem}
              />
            </div>
          );
        })}
      </List>
    );
  } else {
    return <div>No comments yet</div>;
  }
}
