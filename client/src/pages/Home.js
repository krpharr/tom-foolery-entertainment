import React from "react";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const Background = "assets/images/aditya-chinchure-ZhQCZjr9fHo-unsplash.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
  },
  main: {
    // marginTop: theme.spacing(7),
    // marginBottom: theme.spacing(2),
    height: "100vh",
    backgroundImage: `url(${Background})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
    // backgroundPosition: "center"
  },
  logoGrid: {
    // paddingTop: theme.spacing(32),
    // paddingBottom: theme.spacing(8),
    position: "relative",
    top: "80vh",
    bottom: "40px"
  },
  logo: {
    width: "100%"
  }
}));

function Home(){
  
  const classes = useStyles();

  return(
    <Container component="main" className={classes.main} maxWidth="xl">
      <Grid container className={classes.logoGrid}>
        <Grid item xs={12} lg={8}>
             <img src="assets/images/logo.1.png" className={classes.logo}></img>
         </Grid>
      </Grid>
    </Container>      
  );
};

export default Home;