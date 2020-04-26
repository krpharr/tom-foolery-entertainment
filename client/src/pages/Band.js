import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import bandAPI from "../utils/bandAPI";
import eventsAPI from "../utils/eventAPI";

const Background = "assets/images/aditya-chinchure-ZhQCZjr9fHo-unsplash.jpg";

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundImage: `url(${Background})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    display: "flex",
    justifyContent: "space-around"
  },
  bandPaper: {
    marginTop: theme.spacing(10),
    paddingBottom: "16px",
    marginBottom: "16px",
    maxWidth: "690px"
  },
  bandInfo: {
    padding: "0 16px"
  }
}));

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

function Band(){
  
  const classes = useStyles();

  const [info, setInfo] = useState();
  const [reviews, setReviews] = useState();

  let query = useQuery();
  let id = query.get("id");

  useEffect(() => {

    if(info === undefined){
      bandAPI.getById(id).then(res => {
        setInfo(res.data);
      });
    }else{
      eventsAPI.getAll().then(res => {
        const filtered = res.data.filter(event => {
          return event.bands[0] === info.name && event.review;
        });      
        const reviewArray = filtered.map(event => {
          return `${event.review} - ${event.clientUsername}`;
        });
        setReviews(reviewArray);
      }); 
    }

  }, [info]);

  const displayInfo = () => {
    if(info === undefined || reviews === undefined)return;
    return(
      <Paper className={classes.bandPaper}>
        <Grid container>
          <Grid item xs={12}>
            <img width="100%" src={info.images[0]} alt={info.name}></img>
          </Grid>
          <Grid item xs={10} className={classes.bandInfo}>
            <h1>{info.name}</h1>
            <p>{info.genres.map(genre => {return `${genre} `})}</p>
            <p>Price range: {info.priceRange[0]} {info.priceRange[1]}</p>
            <p>{info.description}</p>
          </Grid>
          <Grid item xs={12} sm={8} md={6}>
            <iframe width="100%" height="300px"
              src={info.videos[0]}>
            </iframe> 
          </Grid>
          <Grid item xs={12}>
            <ul>{reviews.map((review, index) => {
                return(
                  <li key={index}>
                    <p>{review}</p>
                  </li>
                );
              })}
            </ul>
          </Grid>
        </Grid>        
      </Paper>
    );
 }; 

  return(
    <Container component="main" className={classes.main} maxWidth="xl">
      {displayInfo()}
    </Container>      
  );
};

export default Band;