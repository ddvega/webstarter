import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CreateIcon from '@material-ui/icons/Create';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import Link from 'next/link';
import { Grid } from '@material-ui/core';
import { useUser } from '@auth0/nextjs-auth0';
import { Navlist } from './Navlist';
import { useStyles } from '../styles/navbarStyles';

export const Navbar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  // const { currentUser } = useAuth();
  const { user } = useUser();

  // handle opening and closing of app drawer
  const drawerOpen = () => {
    setOpen(true);
  };

  const drawerClose = () => {
    setOpen(false);
  };

  const itemsCommon = [
    {
      id: '0',
      route: '/',
      icon: <VisibilityIcon />,
      text: 'Browse',
    },
  ];

  const itemsLoggedIn = [
    {
      id: '1',
      route: '/api/auth/logout',
      icon: <AccountCircleIcon />,
      text: 'Log Out',
    },
    {
      id: '2',
      route: '/profile',
      icon: <LockOpenIcon />,
      text: 'Profile',
    },
    {
      id: '3',
      route: '/quiz/create',
      icon: <CreateIcon />,
      text: 'Create',
    },
    ...itemsCommon,
  ];

  const itemsLoggedOut = [
    {
      id: '4',
      route: '/api/auth/login',
      icon: <PersonAddIcon />,
      text: 'Sign Up',
    },
    {
      id: '5',
      route: '/api/auth/login',
      icon: <AccountCircleIcon />,
      text: 'Log In',
    },
    {
      id: '6',
      route: '/forgot-password',
      icon: <LockOpenIcon />,
      text: 'Reset Password',
    },
    ...itemsCommon,
  ];

  return (
    <>
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        className="flex items-center flex-wrap bg-green-300 p-3 "
      >
        <Toolbar className={classes.toolbar}>
          <Link href="/" style={{ paddingLeft: '1rem' }}>
            <img src="/vercel.svg" width="40px" height="40px" alt="" style={{ height: 40, width: 40 }} />
          </Link>
          <Typography className={classes.title} variant="h4" noWrap>
            AppName
          </Typography>

          {user
            ? itemsLoggedIn.map((field) => (
                <Typography key={field.id} className={classes.topLinks} noWrap>
                  <Link href={field.route} className={classes.topLinksColor}>
                    <Grid container>
                      <Grid item xs={2}>
                        {field.icon}
                      </Grid>
                      <Grid item xs={4} style={{ paddingTop: '1px' }}>
                        {` ${field.text}`}
                      </Grid>
                    </Grid>
                  </Link>
                </Typography>
              ))
            : itemsLoggedOut.map((field) => (
                <Typography key={field.id} className={classes.topLinks} noWrap>
                  <Link href={field.route} className={classes.topLinksColor}>
                    <Grid container>
                      <Grid item xs={2}>
                        {field.icon}
                      </Grid>
                      <Grid item xs={4} style={{ paddingTop: '1px' }}>
                        {` ${field.text}`}
                      </Grid>
                    </Grid>
                  </Link>
                </Typography>
              ))}

          <IconButton
            edge="end"
            color="inherit"
            aria-label="open drawer"
            onClick={drawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon fontSize="large" style={{ transform: 'scale(2)', color: '#fff' }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        variant="temporary"
        classes={{
          paper: clsx('navbar', classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={drawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />

        {user ? (
          <Navlist drawer={drawerClose} items={itemsLoggedIn} />
        ) : (
          <Navlist drawer={drawerClose} items={itemsLoggedOut} />
        )}
      </Drawer>
    </>
  );
};
