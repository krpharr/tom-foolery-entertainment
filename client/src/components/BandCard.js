import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  bandName: {
    height: "64px"
  }
});

export default function BandCard(props) {
  const classes = useStyles();

  const history = useHistory();
  const linkPath = `/band?id=${props._id}`;

  const bandPage = () => {
    history.push(linkPath);
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={props.name}
          height="200"
          image={props.images[0]}
          title={props.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" className={classes.bandName}>
            {props.name}
          </Typography>
          <Typography gutterBottom variant="body1" color="textSecondary" component="h2">
            {props.genres[0]}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={() => bandPage()}>
          Band Page
        </Button>
        {/* <Button size="small" color="primary">
          Learn More
        </Button> */}
      </CardActions>
    </Card>
  );
}