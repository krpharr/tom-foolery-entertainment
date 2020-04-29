import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import inquiryAPI from "../utils/inquiryAPI";
import moment from 'moment';
import formatUtil from '../utils/formatUtil';

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

export default function InquiryCard(props) {
  const classes = useStyles();

  const [read, setRead] = React.useState(props.read);
  const [deleted, setDeleted] = React.useState(props.deleted);
  const [agent, setAgent] = React.useState(props.agentId);

  const startTime = moment(props.startTime, 'HH:mm').format('hh:mm a');
  

  const handleReadChange = (event) => {
    const check = read ? false : true;
    setRead(check);
    inquiryAPI.update(event.target.id, {read: check}).then(res => {
    
    });
  }; 

  const handleDeletedChange = (event) => {
    const check = deleted ? false : true;
    setDeleted(check);
    inquiryAPI.update(event.target.id, {deleted: check}).then(res => {
    
    });
  }; 

  const handleAgentChange = (event) => {
    setAgent(event.target.value);
    inquiryAPI.update(props._id, {agentId: event.target.value}).then(res => {
    
    });
  };

  const mapAgents = () => {
    const agentMap = props.agents.map((agent, index) => {
      return(
        <MenuItem key={index} value={agent._id}>{`${agent.firstName} ${agent.lastName}`}</MenuItem>
      );
    });
    return agentMap;
  };


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
          {`Phone: ${formatUtil.formatPhoneNumber(props.phone)}`}
        </Typography>
        <Typography variant="body2" component="p">
          {`Event: ${props.eventType}`}
        </Typography>
        <Typography variant="body2" component="p">
          {`Band: ${props.band}`}
        </Typography>
        <Typography variant="body2" component="p">
          {`Event date: ${props.date}`}
        </Typography>
        <Typography variant="body2" component="p">
          {`Start time: ${startTime}`}
        </Typography>
        <Typography variant="body2" component="p">
          {`Event length (hours) ${props.numHours}`}
        </Typography>
        <Typography variant="body2" component="p">
          {`Event location: ${props.location}`}
        </Typography>
      </CardContent>
      <CardActions>

        <FormControl className={classes.formControl}>
          <InputLabel id="agent-select-label">Set Agent</InputLabel>
          <Select
            labelId="agent-select-label"
            id="agent-select"
            value={agent}
            onChange={handleAgentChange}
          >
            {mapAgents()}
          </Select>
        </FormControl>

        <FormControlLabel
          control={<Checkbox id={props._id} checked={read} onChange={handleReadChange} inputProps={{ 'aria-label': 'primary checkbox' }} />}
          label="Mark read"
        />
        <FormControlLabel
          control={<Checkbox id={props._id} checked={deleted} onChange={handleDeletedChange} inputProps={{ 'aria-label': 'primary checkbox' }} />}
          label="Delete"
        />
      </CardActions>
    </Card>
  );
}
