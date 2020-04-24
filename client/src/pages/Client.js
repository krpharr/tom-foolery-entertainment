import React, {useState, useEffect}  from "react";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ClientEventCard from '../components/ClientEventCard';
import clientAPI from "../utils/clientAPI";
import userAPI from "../utils/userAPI";
import eventAPI from "../utils/eventAPI";
import userAuth from "../utils/userAuth";
import moment from 'moment';
import ClientTabs from "../components/ClientTabs";


const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: theme.spacing(8),
    // marginBottom: theme.spacing(2),
  },
  refreshButton: {
    margin: "0 0 8px"
  }
}));



function Client(){
  
  const classes = useStyles();

  const [client, setClient] = useState();
  const [events, setEvents] = useState();
  const [current, setCurrent] = useState();
  const [past, setPast]= useState();
  const [update, setUpdate] = useState(0);
  useEffect(() => {

    if(events === undefined){
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
    }else {
      console.log("sortEvents")
      sortEvents();
    }

  }, [events, update]);  

  const sortEvents = () => {
    // if(events === undefined || client === undefined)return;
    // const filtered = events.filter(events => {
    //   return events.deleted === false;
    // });
    const today = moment();
    const past = events.filter(event => {
      return moment(event.date).isBefore(today);
    });
    setPast(past);
    const current = events.filter(event => {
      return moment(event.date).isSameOrAfter(today);
    });
    setCurrent(current);    

    console.log("past" ,past);
    console.log("current", current);
  };

  const mapEvents = (eventArray) => {
    if(events === undefined || eventArray === undefined)return;
    const eventsMap = eventArray.map((event, index) => {
      return(
          <ClientEventCard key={index} {...event}/>
      );
    });
    return eventsMap;
  };  

  const tabDisplay = () =>{
    if(events === undefined)return;
    const props = {
      current: mapEvents(current),
      past: mapEvents(past)
    };
    return(
      <ClientTabs {...props}/>
    );
  };

 const handleRefresh = () => {
   setEvents(undefined);
   setUpdate(update + 1);
 }

  return(
    <Container component="main" className={classes.main} maxWidth="xl">
      <Typography variant="h2" component="h1" gutterBottom>
        Client Page - {` ${userAuth.user.user}`}
      </Typography>
      <Grid container >
        <Grid item>
          <Button className={classes.refreshButton} onClick={handleRefresh}variant="contained" color="primary">
           Refresh
         </Button>
        </Grid>
        <Grid item xs={12}>
         {tabDisplay()}
        </Grid>
       </Grid>     
    </Container>      
  );
};

export default Client;