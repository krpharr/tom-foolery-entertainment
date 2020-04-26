import React from "react";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import bandAPI from '../utils/bandAPI';

bandAPI.getAll().then(res => {
  const lstorage = res.data.map(band => {
    return {id: band._id, name: band.name};
  });
  localStorage.setItem("bands",JSON.stringify(lstorage));
});

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
    top: "76vh",
    bottom: "40px",
    display: "flex",
    justifyContent: "space-around"
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
             <img src="assets/images/logo.1.png" className={classes.logo} alt={"logo"}></img>
         </Grid>
      </Grid>
    </Container>      
  );
};

export default Home;