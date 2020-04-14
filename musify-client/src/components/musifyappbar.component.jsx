import React, { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';
import TokenService from '../services/token-service';
import Avatar from '@material-ui/core/Avatar';
import ProfileImage from '../assets/turntable1.jpg';
import { store } from '../store/store.js';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  root: {
    color: '#ffffff',
    background: 'linear-gradient(to right, #1d976c, #93f9b9);',
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },

  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },

  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function MusifyAppBar() {
  const classes = useStyles();
  const history = useHistory();
  const globalState = useContext(store);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogOut = () => {
    TokenService.clearAuthToken();
    history.push('/');
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>
        <Link to='/profile-page' className={classes.link}>
          Profile{' '}
        </Link>{' '}
      </MenuItem>
      <MenuItem onClick={handleLogOut}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem component={Link} to='/share'>
        Share
      </MenuItem>
      <MenuItem component={Link} to='/discover'>
        Discover
      </MenuItem>
      <MenuItem component={Link} to='/message'>
        Messages
      </MenuItem>
      <MenuItem onClick={handleLogOut}>
        <p>Logout</p>
      </MenuItem>
      <MenuItem>
        <Link to='/profile-page' className={classes.link} color='primary'>
          {' '}
          <IconButton
            aria-label='account of current user'
            aria-controls='primary-search-account-menu'
            aria-haspopup='true'
            color='inherit'
          >
            <Avatar alt='Remy Sharp' src={ProfileImage} />
          </IconButton>
        </Link>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position='static' className={classes.root}>
        <Toolbar>
          <Typography className={classes.title} variant='h3' noWrap>
            Musify
          </Typography>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Button variant='outlined' component={Link} to='/share'>
              Share Music
            </Button>
            <Button component={Link} to='/discover'>
              {' '}
              Discover
            </Button>
            <Button component={Link} to='/message'>
              {' '}
              Messages
            </Button>

            <IconButton
              edge='end'
              aria-label='account of current user'
              aria-controls={menuId}
              aria-haspopup='true'
              onClick={handleProfileMenuOpen}
              color='inherit'
            >
              <Avatar alt='Remy Sharp' src={globalState.state.profile_image} />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
