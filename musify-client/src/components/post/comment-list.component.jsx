import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: '10px',
    maxHeight: '240px',
    overflowY: 'auto',
    flexGrow: 1,
  },
  inline: {
    display: 'inline',
  },
  listItem: {
    width: 'auto',
    maxWidth: '450px',
  },
}));

export default function CommentList(props) {
  const classes = useStyles();

  const commentList = props.comments;

  if (commentList && commentList.length > 0) {
    return (
      <List className={classes.root}>
        {commentList.map((comment) => {
          return (
            <div key={comment._id} className={classes.listItem}>
              <ListItem alignItems='flex-start' className={classes.listItem}>
                <ListItemAvatar>
                  <Avatar
                    alt='Post Picture'
                    src={comment.profile.profile_image}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={`${comment.user.first_name} ${comment.user.last_name}`}
                  secondary={<React.Fragment>{comment.text}</React.Fragment>}
                />
              </ListItem>
              <Divider
                variant='inset'
                component='li'
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
