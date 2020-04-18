import React from "react";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const Background = "assets/images/aditya-chinchure-ZhQCZjr9fHo-unsplash.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
  },
  main: {
    marginTop: theme.spacing(7),
    marginBottom: theme.spacing(2),
    height: "100vh",
    backgroundImage: `url(${Background})`,
    backgroundSize: "cover",
    backgroundPosition: "center"
  }
}));

function Home(){
  
  const classes = useStyles();

  return(
    <Container component="main" className={classes.main} maxWidth="xl">
      <Typography variant="h2" component="h1" gutterBottom>
        Landing Page (Home)
      </Typography>
    </Container>      
  );
};

export default Home;