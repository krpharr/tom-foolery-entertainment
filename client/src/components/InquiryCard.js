import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
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

export default function InquiryCard(props) {
  const classes = useStyles();

  const [read, setRead] = React.useState(props.read);
  const [deleted, setDeleted] = React.useState(props.deleted);
  const [agent, setAgent] = React.useState(props.agentId);

  const handleReadChange = (event) => {
    const check = read ? false : true;
    setRead(check);
    console.log(event.target.id, read);
    inquiryAPI.update(event.target.id, {read: check}).then(res => {
      console.log(res.data);
    });
  }; 

  const handleDeletedChange = (event) => {
    const check = deleted ? false : true;
    setDeleted(check);
    console.log(event.target.id, deleted);
    inquiryAPI.update(event.target.id, {deleted: check}).then(res => {
      console.log(res.data);
    });
  }; 

  const handleAgentChange = (event) => {
    setAgent(event.target.value);
    inquiryAPI.update(props._id, {agentId: event.target.value}).then(res => {
      console.log(res.data);
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
          {`${props.firstName} ${props.lastName}`}
        </Typography>
        <Typography variant="body2" component="p">
          {props.email}
        </Typography>
        <Typography variant="body2" component="p">
          {props.phone}
        </Typography>
        <Typography variant="body2" component="p">
          {props.date}
        </Typography>
        <Typography variant="body2" component="p">
          {props.startTime}
        </Typography>
        <Typography variant="body2" component="p">
          {props.location}
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
