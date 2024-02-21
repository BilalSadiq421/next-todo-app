import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import { makeStyles } from "@material-ui/core";
import { isUserAuthenticated } from "@/utils/helper";

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    flexGrow: 1,
  },
  navLink: {
    marginRight: theme.spacing(2),
    textDecoration: "none",
    color: "white",
  },
}));

const Navbar = () => {
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(()=>{
    setAuthenticated(isUserAuthenticated())
  }, [])
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Next Todo App
            </Typography>
            <nav>
              <Link href="/" passHref>
                <Button color="inherit" className={classes.navLink}>
                  Home
                </Button>
              </Link>
              {authenticated ? (
                  <Button color="inherit" className={classes.navLink} onClick={()=> localStorage.removeItem('userAuthData')} >
                    Signout
                  </Button>
              ) : (
                <Link href="/login" passHref>
                  <Button color="inherit" className={classes.navLink}>
                    Login
                  </Button>
                </Link>
              )}
            </nav>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Navbar;
