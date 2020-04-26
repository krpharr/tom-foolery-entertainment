import React, {useState, useEffect} from "react";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import inquiryAPI from "../utils/inquiryAPI";
import agentAPI from "../utils/agentAPI";
import userAuth from "../utils/userAuth";
import AgentContactCard from "../components/AgentContactCard";
import ClientEventCard from "../components/ClientEventCard";
import Button from '@material-ui/core/Button';
import eventAPI from "../utils/eventAPI";
import AgentTabs from "../components/AgentTabs";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: theme.spacing(8),
  }
}));

function Agent(){
  
  const classes = useStyles();

  const [inquiries, setInquiries] = useState();
  const [agentId, setAgentId] = useState();
  const [events, setEvents] = useState();
  const [current, setCurrent] = useState();
  const [past, setPast]= useState();
  const [update, setUpdate] = useState(0);

  useEffect(() => {

    if(agentId === undefined){
      agentAPI.getAll().then(res => {
        let f = res.data.filter(agent => {
          return agent.username === userAuth.user.user;
        });
        const id = f[0]._id;
        setAgentId(id);
        setUpdate(update + 1);
      });
    }

    if(agentId !== undefined){

      inquiryAPI.getAll().then(res => {
        const filtered = res.data.filter(inq => {
          return inq.agentId === agentId && inq.deleted === false;
        });
        setInquiries(filtered);
      });

      eventAPI.getAll().then(res => {
        const filtered = res.data.filter(event => {
          return event.agentId === agentId;
        });
        setEvents(filtered);
        const past = filtered.filter(event => {
          return moment(event.date).isBefore(moment());
        });
        setPast(past);
        const current = filtered.filter(event => {
          return moment(event.date).isSameOrAfter(moment());
        });
        setCurrent(current);
      });
    }
  }, [update]);

  const mapEvents = (eventArray) => {
    if(events === undefined || eventArray === undefined)return;
    const eventsMap = eventArray.map((event, index) => {
      return(
          <ClientEventCard key={index} {...event}/>
      );
    });
    return eventsMap;
  };  

  const mapInquiries = () => {
    if(inquiries === undefined)return;
    const filtered = inquiries.filter(inquiry => {
      return inquiry.deleted === false;
    });
    const inquiriesMap = filtered.map(inquiry => {
      return(
        <Grid item key={inquiry._id} >
          <AgentContactCard {...inquiry} agentId={agentId}/>
        </Grid>
      );
    });
    return inquiriesMap;
  };

  const tabDisplay = () =>{
    if(events === undefined)return;
    const props = {
      new: mapInquiries(),
      current: mapEvents(current),
      past: mapEvents(past)
    };
    return(
      <AgentTabs {...props}/>
    );
  };

  const handleRefresh = () => {
    // setEvents(undefined);
    setUpdate(update + 1);
  }

  return(
    <Container component="main" className={classes.main} maxWidth="xl">
      <Typography variant="h2" component="h1" gutterBottom>
        Agent Page - {` ${userAuth.user.user}`}
      </Typography>
      <Grid container>
        <Grid item xs={12}>
          <Button className={classes.refreshButton} onClick={handleRefresh}variant="contained" color="primary">
            Refresh
          </Button>
        </Grid>
        <Grid item xs={12} md={8}>
          {tabDisplay()}
        </Grid>
      </Grid>
    </Container>      
  );
};

export default Agent;