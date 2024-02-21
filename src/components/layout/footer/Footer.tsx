import React from 'react';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.root}>
      <Container>
        <Toolbar disableGutters>
          <Typography variant="body1">
            &copy; {new Date().getFullYear()} next todo app. All rights reserved.
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;
