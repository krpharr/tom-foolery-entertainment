import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import InquiryCRUD from '../components/InquiryCRUD';

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: theme.spacing(8),
    // marginBottom: theme.spacing(2),
  }
}));

function Admin(){
  
  const classes = useStyles();

  return(
    <Container component="main" className={classes.main} maxWidth="sm">
      <Typography variant="h2" component="h1" gutterBottom>
        Admin Page 
      </Typography>
      <InquiryCRUD />
    </Container>      
  );
};

export default Admin;