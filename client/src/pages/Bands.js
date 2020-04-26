import React, { useState, useEffect } from "react";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import BandCard from "../components/BandCard";
import bandAPI from "../utils/bandAPI";

const Background = "assets/images/mahdi-b7gjIMzLJZc-unsplash.jpg";

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundImage: `url(${Background})`,
    backgroundSize: "cover",
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

function Bands(){
  const classes = useStyles();

  const [bands, setBands] = useState();

  useEffect(() => {
    bandAPI.getAll().then(res => {
      setBands(res.data);
    });
  }, []);
  
  const mapBands = () => {
    if(bands === undefined)return;
    const bandsMap = bands.map(band => {
      return(
        <Grid item key={band._id} xs={12} sm={12} md={6} lg={4} xl={3}>
          <BandCard {...band} className={classes.card} />
        </Grid>
      );
    });
    return bandsMap;
  };
  
  return(
    <Container component="main" className={classes.main} maxWidth="xl">
      <Typography className={classes.headerTxt}  variant="h4" component="h1" gutterBottom>
        Our Bands 
      </Typography>
      <Container className={classes.cardGrid} maxWidth="lg">
        <Grid container spacing={4}>
          {mapBands()}
        </Grid>
      </Container>      
    </Container>      
  );
};

export default Bands;