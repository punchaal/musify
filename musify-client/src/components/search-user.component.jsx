import Axios from 'axios';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import config from '../config';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    color: '#ffffff',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    margin: '0 auto',
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto',
      width: '70%',
    },
  },
}));

export default function SearchUser() {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  // eslint-disable-next-line
  const [value, setValue] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const endpoint = config.API_ENDPOINT;
  const loading = open && options.length === 0;

  const handleChange = (event, value) => {
    if (value !== null) {
      history.push(`/profile/user/${value._id}`);
      setValue('');
    }
  };

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const response = await Axios.get(`${endpoint}/profile`);

      const users = response.data;

      if (active) {
        setOptions(users.map((user) => user.user));
      }
    })();

    return () => {
      active = false;
    };
    // eslint-disable-next-line
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      id='search-user'
      style={{ width: 300 }}
      className={classes.search}
      open={open}
      onChange={(event, value) => handleChange(event, value)}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) =>
        option.first_name === value.first_name
      }
      getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
      options={options}
      loading={loading}
      size='small'
      clearOnEscape={true}
      forcePopupIcon={false}
      renderInput={(params) => (
        <TextField
          {...params}
          label='Search for a person'
          variant='outlined'
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color='inherit' size={20} />
                ) : null}
                {params.InputProps.endAdornment}
                <SearchIcon />
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
