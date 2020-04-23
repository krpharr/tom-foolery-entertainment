import React, {useState, useEffect} from "react";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import inquiryAPI from "../utils/inquiryAPI";
import agentAPI from "../utils/agentAPI";
import userAuth from "../utils/userAuth";
import AgentContactCard from "../components/AgentContactCard";



const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: theme.spacing(8),
    // marginBottom: theme.spacing(2),
  }
}));

function Agent(){
  
  const classes = useStyles();

  const [inquiries, setInquiries] = useState();
  const [agentId, setAgentId] = useState();

  useEffect(() => {

    agentAPI.getAll().then(res => {
      let f = res.data.filter(agent => {
        return agent.username = userAuth.user.user;
      });
      const id = f[0]._id;
      setAgentId(id);
      console.log(id);

      inquiryAPI.getAll().then(res => {
        console.log(res.data);
        console.log(id);
        const filtered = res.data.filter(inq => {
          return inq.agentId === id;
        });
        console.log(filtered);
        setInquiries(filtered);
      });
    });

  }, []);

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



  return(
    <Container component="main" className={classes.main} maxWidth="sm">
      <Typography variant="h2" component="h1" gutterBottom>
        Agent Page {` ${userAuth.user.user}`}
      </Typography>
      <Grid container>
        <Grid item xs={12} md={6}>
          {mapInquiries()}
        </Grid>
      </Grid>
    </Container>      
  );
};

export default Agent;