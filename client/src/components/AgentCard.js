import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: "8px"
  },
   title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function AgentCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="body2" component="p">
          {`Name: ${props.firstName} ${props.lastName}`}
        </Typography>
        <Typography variant="body2" component="p">
          {`Email: ${props.email}`}
        </Typography>
        <Typography variant="body2" component="p">
          {`Phone: ${props.phone}`}
        </Typography>
        <Typography variant="body2" component="p">
          {`Username: ${props.username}`}
        </Typography>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
  );
}
