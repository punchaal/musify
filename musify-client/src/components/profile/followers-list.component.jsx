import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export default function FollowersList(props) {
  const classes = useStyles();
  const history = useHistory();
  const { action, profilesList, open, onClose } = props;

  const handleClose = () => {
    onClose('');
  };

  const handleListItemClick = (value) => {
    console.log(value._id);
    history.push(`/profile/user/${value.user}`);
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby='simple-dialog-title'
      open={open}
    >
      <DialogTitle id='simple-dialog-title'>{action}</DialogTitle>
      <List>
        {profilesList &&
          profilesList.map((profile) => (
            <ListItem
              button
              onClick={() => handleListItemClick(profile)}
              key={profile._id}
            >
              <ListItemAvatar>
                <Avatar
                  className={classes.avatar}
                  src={profile.profile_image}
                />
              </ListItemAvatar>
              <ListItemText
                primary={`${profile.first_name} ${profile.last_name}`}
              />
            </ListItem>
          ))}
      </List>
    </Dialog>
  );
}

FollowersList.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  action: PropTypes.string.isRequired,
  profilesList: PropTypes.array,
};
