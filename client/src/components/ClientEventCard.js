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
import formatUtil from "../utils/formatUtil";

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

// const formatter = new Intl.NumberFormat('en-US', {
//   maximumFractionDigits: 0, 
//   minimumFractionDigits: 0, 
//   style: 'currency',
//   currency: 'USD',
// });


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
          {`Phone: ${formatUtil.formatPhoneNumber(agent.phone)}`}
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
          {`Phone: ${formatUtil.formatPhoneNumber(client.phone)}`}
        </Typography>      
      </div>  
    );
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="body2" component="p">
          {`Event date: ${moment(props.date).format("MM-DD-YYYY")}`}
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
          {`Start time: ${moment(props.startTime).format("hh:mma")}`}
        </Typography>
        <Typography variant="body2" component="p">
          {`End time: ${moment(props.endTime).format("hh:mma")}`}
        </Typography>
        <Typography variant="body2" component="p">
          {`Event location: ${props.location}`}
        </Typography>
        <Typography variant="body2" component="p">
          {`Total Price: ${formatUtil.formatCurrency(props.totalPrice)}`}
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
