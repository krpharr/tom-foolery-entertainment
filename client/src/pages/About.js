import React from "react";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const Background = "assets/images/marcela-laskoski-YrtFlrLo2DQ-unsplash.jpg";


const useStyles = makeStyles((theme) => ({
  main: {
    // marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
    height: "100vh",
    backgroundImage: `url(${Background})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  gridContainer: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),

  },
  aboutText: {
    color: "white"
  }

}));

function About(){
  
  const classes = useStyles();

  return(
    <Container component="main" className={classes.main} maxWidth="xl">
      <Grid container className={classes.gridContainer}>
        <Grid item xs={12}>
        <Typography className={classes.aboutText} variant="h4" component="h1" gutterBottom>
          About Us 
        </Typography>
        <Typography className={classes.aboutText}  component="p" gutterBottom>      
            Tom Foolery Entertainment is dedicated to providing the best musical entertainment for weddings, corporate events, 
            lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti doloribus, error quaerat sed maiores debitis ipsa 
            id dolorem delectus non recusandae natus incidunt eos dolore unde eaque provident voluptas corporis!       
        </Typography>
        <img src="https://pbs.twimg.com/profile_images/1237550450/mstom_400x400.jpg" width="100px"></img>
        </Grid>
      </Grid>
    </Container>      
  );
};

export default About;