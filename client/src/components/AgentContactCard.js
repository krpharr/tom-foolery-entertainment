import React from 'react';
// import {Link} from 'react-router-dom';
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

export default function AgentContactCard(props) {
  const classes = useStyles();

  const email = `mailto:rpharr@richmond.edu`;
  const phone = `tel:8042409121`;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="body2" component="p">
          {`Name: ${props.firstName} ${props.lastName}`}
        </Typography>
        <Typography variant="body2" component="p">
          {`Email: `}<a href={email}>{props.email}</a>
        </Typography>
        <Typography variant="body2" component="p">
          {`Phone: `}<a href={phone}>{props.phone}</a>
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
          {`Start time: ${props.startTime}`}
        </Typography>
        <Typography variant="body2" component="p">
          {`Event length (hours) ${props.numHours}`}
        </Typography>
        <Typography variant="body2" component="p">
          {`Event location: ${props.location}`}
        </Typography>
      </CardContent>
      <CardActions>

      </CardActions>
    </Card>
  );
}
