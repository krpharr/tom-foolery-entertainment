import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import agentAPI from "../utils/agentAPI";
import eventAPI from "../utils/eventAPI";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import clientAPI from "../utils/clientAPI";
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

  const today = moment();

  const [agent, setAgent] = useState();
  const [client, setClient] = useState();
  const [review, setReview] = useState();
  const [updated, setUpdated] = useState(false);
  
  useEffect(() => {

    agentAPI.getById(props.agentId).then(agent => {
      setAgent(agent.data); 
    });

    clientAPI.getById(props.clientId).then(res => {
      setClient(res.data);
    });

    setReview(props.review);
  }, []);   

  const handleReviewChange = (event) => {
    setReview(event.target.value);
    setUpdated(false);
  };

  const handleSetReview = (event) => {
    eventAPI.update(props._id, {review: review}).then(res => {
      setUpdated(true);
    });
  };

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

  const clientContainer = () => {
    if(client === undefined)return;
    return(
      <div>
        <Typography variant="body2" component="p">
          {`Client: ${client.firstName} ${client.lastName}`}
        </Typography>
        <Typography variant="body2" component="p">
          {`Email: ${client.email}`}
        </Typography>
        <Typography variant="body2" component="p">
          {`Phone: ${client.phone}`}
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
        {clientContainer()}
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
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            // id="review"
            label="Client Review"
            name="review"
            type="text"
            value={review ? review : ""}
            disabled={moment(today).isBefore(moment(props.date))}
            onChange={handleReviewChange}
          />
      </CardContent>
      <CardActions>
      <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSetReview}
            disabled={moment(today).isBefore(moment(props.date)) || updated}
           >
            Update
          </Button>
 
      </CardActions>
    </Card>
  );
}
