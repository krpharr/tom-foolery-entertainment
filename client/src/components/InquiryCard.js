import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import inquiryAPI from "../utils/inquiryAPI";
import moment from "moment";

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

export default function InquiryCard(props) {
  const classes = useStyles();

  const [checked, setChecked] = React.useState(props.read);

  const handleReadChange = (event) => {
    const check = checked ? false : true;
    setChecked(check);
    console.log(event.target.id, checked);
    inquiryAPI.update(event.target.id, {read: check}).then(res => {
      console.log(res.data);
    });
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
        <FormControlLabel
          control={<Checkbox id={props._id} checked={checked} onChange={handleReadChange} inputProps={{ 'aria-label': 'primary checkbox' }} />}
          label="Mark read"
        />
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
}
