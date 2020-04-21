import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InquiryCRUD from '../components/InquiryCRUD';
import UserCRUD from "../components/UserCRUD";


const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: theme.spacing(8),
    // marginBottom: theme.spacing(2),
  },
  crudWindow: {
    height: "50vh",
    overflow: "scroll"
  }
}));

function Admin(){
  
  const classes = useStyles();

  return(
    <Container component="main" className={classes.main} maxWidth="xl">
      <Typography variant="h2" component="h1" gutterBottom>
        Admin Page 
      </Typography>
      <Grid container>
        <Grid item xs={12} md={6}>
          <InquiryCRUD />
        </Grid>
        {/* <Grid item xs={12} md={6}>
          <UserCRUD />
        </Grid> */}
      </Grid>
    </Container>      
  );
};

export default Admin;