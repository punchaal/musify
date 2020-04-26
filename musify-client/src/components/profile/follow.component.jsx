import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button } from '@material-ui/core';

export default function Follow() {
  return (
    <Fragment>
      <Box m={2}>
        <Button type='submit' fullWidth variant='contained' color='primary'>
          Follow
        </Button>
      </Box>
      <Box m={2}>
        <Button
          component={Link}
          to='/signup'
          variant='outlined'
          color='primary'
        >
          Message
        </Button>
      </Box>
    </Fragment>
  );
}
