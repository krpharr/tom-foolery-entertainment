import React, {useState, useEffect}  from "react";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ClientEventCard from '../components/ClientEventCard';
import clientAPI from "../utils/clientAPI";
import userAPI from "../utils/userAPI";
import eventAPI from "../utils/eventAPI";
import userAuth from "../utils/userAuth";
import moment from 'moment';


const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: theme.spacing(8),
    // marginBottom: theme.spacing(2),
  }
}));

function Client(){
  
  const classes = useStyles();

  const [client, setClient] = useState();
  const [events, setEvents] = useState();
   

  useEffect(() => {

    eventAPI.getAll().then(events => {
      clientAPI.getAll().then(res => {
        console.log("res.data", res.data);
        const clientArray = res.data.filter(client => {
          return client.email.split("@")[0] === userAuth.user.user;
        });
        setClient(clientArray[0]._id);
        const filtered = events.data.filter(event =>{
          return event.clientId === clientArray[0]._id;
        });
        console.log("filtered: ", filtered)
        setEvents(filtered);  
      })
     });
  }, []);  

  const mapEvents = () => {
    if(events === undefined || client === undefined)return;
    // const filtered = events.filter(events => {
    //   return events.deleted === false;
    // });
    const eventsMap = events.map(event => {
      return(
        <Grid item key={event._id} >
          <ClientEventCard {...event}/>
        </Grid>
      );
    });
    return eventsMap;
  };

  return(
    <Container component="main" className={classes.main} maxWidth="sm">
      <Typography variant="h2" component="h1" gutterBottom>
        Client Page {` ${userAuth.user.user}`}
      </Typography>
      <Grid container>
        <Grid item xs={12} md={6}>
          {mapEvents()}
        </Grid>
      </Grid>     
    </Container>      
  );
};

export default Client;