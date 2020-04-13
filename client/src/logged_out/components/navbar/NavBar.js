import React from 'react';
import PropTypes from "prop-types";
import {AppBar, Toolbar, IconButton, Typography, Button} from '@material-ui/core';
import MenuIcon from "@material-ui/icons/Menu";


function NavBar(props){

  const {
    classes
  } = props;

  return(
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start"  color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">
          Public Page
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;


