import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import bandAPI from "../utils/bandAPI";
import eventsAPI from "../utils/eventAPI";

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: theme.spacing(8),
    // marginBottom: theme.spacing(2),
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
        console.log(res.data);
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
      <div>
        <img src={info.images[0]} alt={info.name}></img>
        <h1>{info.name}</h1>
        <p>{info.genres.map(genre => {return `${genre} `})}</p>
        <p>Price range: {info.priceRange[0]} {info.priceRange[1]}</p>
        <p>{info.description}</p>
        <iframe width="420" height="315"
          src={info.videos[0]}>
        </iframe> 
        <ul>{reviews.map((review, index) => {
            return(
              <li key={index}>
                <p>{review}</p>
              </li>
            );
          })}
        </ul>
       </div>
    );
 }; 

  return(
    <Container component="main" className={classes.main} maxWidth="sm">
      <Typography variant="h2" component="h1" gutterBottom>
        Band Page 
      </Typography>
      {displayInfo()}
    </Container>      
  );
};

export default Band;