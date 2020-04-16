import React from "react";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  }
}));

function About(){
  
  const classes = useStyles();

  return(
    <Container component="main" className={classes.main} maxWidth="sm">
      <Typography variant="h2" component="h1" gutterBottom>
        About Page 
      </Typography>
    </Container>      
  );
};

export default About;