import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import NavBar from "../../shared/components/NavBar";
import Container from '@material-ui/core/Container';
import Layout from "../../shared/components/Layout";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import StickyFooter from "../../shared/components/StickyFooter";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  }
}));

function Main(){
  
  const classes = useStyles();

  return(
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
      <Container component="main" className={classes.main} maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
          Landing Page
        </Typography>
      </Container>      
      <StickyFooter />
    </div>
  );
};


export default Main;