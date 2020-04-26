import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export default function EventCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={props.type}
          height="140"
          image={props.image}
          title={props.type}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.type}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
           {props.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
