import React from "react";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import EventCard from "../components/EventCard";
import events from "../data/events";

const Background = "assets/images/dylan-nolte-Vfd_WzJN6Zg-unsplash.jpg";


const useStyles = makeStyles((theme) => ({
  main: {
    // marginTop: theme.spacing(8),
    // marginBottom: theme.spacing(2),
    //  height: "100%",
    backgroundImage: `url(${Background})`,
    backgroundSize: "cover",
    // backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(8),
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  headerTxt: {
    color: "white",
    paddingTop: theme.spacing(8),
    textAlign: "center"
  }
}));

function Events(){
  
  const classes = useStyles();

  return(
    <Container component="main" className={classes.main} maxWidth="xl">
      <Typography className={classes.headerTxt} variant="h4" component="h1" gutterBottom>
        Events  
      </Typography>
      <Container className={classes.cardGrid} maxWidth="lg">
        <Grid container spacing={4}>
          {events.map((event, index) => {
            return(
              <Grid item key={index} xs={12} sm={12} md={6} lg={4} xl={3}>
                <EventCard className={classes.card} {...event}/>
              </Grid>             
            );
          })}
        </Grid>
      </Container>   
    </Container>      
  );
};


export default Events;