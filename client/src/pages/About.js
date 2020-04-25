import React, {useState, useEffect} from "react";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import agentAPI from '../utils/agentAPI';

const Background = "assets/images/marcela-laskoski-YrtFlrLo2DQ-unsplash.jpg";


const useStyles = makeStyles((theme) => ({
  main: {
    // marginTop: theme.spacing(8),
    // marginBottom: theme.spacing(2),
    // height: "90vh",
    backgroundImage: `url(${Background})`,
    // backgroundSize: "cover",
    backgroundRepeat: "repeat-y",
    backgroundPosition: "center"
  },
  gridContainer: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),

  },
  headerText: {
    color: "white",
    // paddingTop: theme.spacing(8),
    textAlign: "center"
  },
  aboutText: {
    color: "white"
  },
  agent: {
    color: "white",
    display: "flex"
  },
  avatar: {
    width: "100px"
  }

}));

function About(){
  
  const classes = useStyles();

  const [agents, setAgents] = useState();

  useEffect(()=>{
    agentAPI.getAll().then(res => {  
      console.log(res.data);
      setAgents(res.data);
    });
  },[]);

  const mapAgents = () => {
    if(agents === undefined)return;
    console.log("mapAgents ", agents)
    const agentMap = agents.map((agent, index) => {
      return (
        <Grid container key={index}>
          <Grid item xs={12} md={8} xl={6} className={classes.agent}>
            <Grid item xs={3}>
              <img src={agent.avatar} className={classes.avatar}></img>
            </Grid>
            <Grid item xs={6}>
              <h4>{`${agent.firstName} ${agent.lastName}`}</h4>
              <h5>{agent.email}</h5>
              <h5>{agent.phone}</h5>
             </Grid>
           </Grid>
        </Grid>
      );
    });
    return agentMap;
  };

  return(
    <Container component="main" className={classes.main} maxWidth="xl">
      <Grid container className={classes.gridContainer}>
        <Grid item xs={12}>
        <Typography className={classes.headerText} variant="h4" component="h1" gutterBottom>
          About Us 
        </Typography>
        <Typography className={classes.aboutText}  component="p" gutterBottom>      
            Tom Foolery Entertainment is dedicated to providing the best musical entertainment for weddings, corporate events, 
            lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti doloribus, error quaerat sed maiores debitis ipsa 
            id dolorem delectus non recusandae natus incidunt eos dolore unde eaque provident voluptas corporis!       
        </Typography>
          <img src="https://pbs.twimg.com/profile_images/1237550450/mstom_400x400.jpg" width="100px"></img>
          {mapAgents()}
          {/* <Grid container>
              <Grid item xs={12} md={8} xl={6} className={classes.agent}>
                <Grid item xs={3}>
                  <img src="assets/images/krpharr.jpg" className={classes.avatar}></img>
                </Grid>
                <Grid item xs={6}>
                  <h4>{`Kennon Pharr`}</h4>
                  <h5>Github</h5>
                  <h5>Linked In</h5>
                </Grid>
              </Grid>
           </Grid>           */}
          </Grid>
      </Grid>
    </Container>      
  );
};

export default About;