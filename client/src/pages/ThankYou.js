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
    height: "100vh",
    backgroundImage: `url(${Background})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  },
  logoGrid: {
    position: "relative",
    top: "60vh",
    bottom: "40px"
  },
  logo: {
    width: "100%"
  },
  message: {
    position: "relative",
    top: "30vh",
    color: "white"
  }
}));

function ThankYou(){
  
  const classes = useStyles();

  return(
    <Container component="main" className={classes.main} maxWidth="xl">
      <Grid container className={classes.message}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" gutterBottom>
              Thank you for your inquiry! One of our agents will contact you shortly.
          </Typography>
       </Grid>
      </Grid>
      <Grid container className={classes.logoGrid}>
         <Grid item xs={12} lg={8}>
             <img src="assets/images/logo.1.png" className={classes.logo} alt={"logo"}></img>
         </Grid>
      </Grid>
    </Container>      
  );
};

export default ThankYou;