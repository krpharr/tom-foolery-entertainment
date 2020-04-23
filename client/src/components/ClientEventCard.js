import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import agentAPI from "../utils/agentAPI";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import inquiryAPI from "../utils/inquiryAPI";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}));

export default function ClientEventCard(props) {
  const classes = useStyles();

  const [agent, setAgent] = useState();
  
  useEffect(() => {
    agentAPI.getById(props.agentId).then(agent => {
      setAgent(agent.data); 
    });
  }, []);   

  const agentContainer = () => {
    if(agent === undefined)return;
    return(
      <div>
        <Typography variant="body2" component="p">
          {`Agent: ${agent.firstName} ${agent.lastName}`}
        </Typography>
        <Typography variant="body2" component="p">
          {`Email: ${agent.email}`}
        </Typography>
        <Typography variant="body2" component="p">
          {`Phone: ${agent.phone}`}
        </Typography>      
      </div>  
    );
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="body2" component="p">
          {`Event date: ${props.date}`}
        </Typography>
        <Typography variant="body2" component="p">
          {`Event: ${props.type}`}
        </Typography>
        {agentContainer()}
        <Typography variant="body2" component="p">
          {`Band: ${props.bands[0]}`}
        </Typography>
        <Typography variant="body2" component="p">
          {`Start time: ${props.startTime}`}
        </Typography>
        <Typography variant="body2" component="p">
          {`End time: ${props.endTime}`}
        </Typography>
        <Typography variant="body2" component="p">
          {`Event location: ${props.location}`}
        </Typography>
        <Typography variant="body2" component="p">
          {`Total Price: ${props.totalPrice}`}
        </Typography>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
  );
}
