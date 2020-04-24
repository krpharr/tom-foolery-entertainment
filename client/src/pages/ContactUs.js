import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import InfoIcon from '@material-ui/icons/Info';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import inquiryAPI from "../utils/inquiryAPI";
import bandAPI from "../utils/bandAPI";
import { useHistory } from "react-router-dom";
import moment from "moment";
import events from "../data/events";

const bands = JSON.parse(localStorage.getItem("bands"));
const lengths = [2,2.5,3,3.5,4,4.5,5,5.5,6];

const Background = "assets/images/jens-thekkeveettil-dBWvUqBoOU8-unsplash.jpg";

const useStyles = makeStyles((theme) => ({
  main: {
    // marginBottom: theme.spacing(2),
    // height: "100vh",
    backgroundImage: `url(${Background})`,
    // backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: "white",
    padding: "8px",
    borderRadius: "10px"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  }
}));

export default function ContactUs() {

  const classes = useStyles();

  const history = useHistory();

  const [eventType, setEvent] = useState("");
  const [band, setBand] = useState("");
  const [length, setLength] = useState(4);

  const handleSubmit = (event) =>{
    event.preventDefault();
    const inquiryObj = {
      firstName: event.target.firstname.value,
      lastName: event.target.lastname.value,
      email: event.target.email.value,
      phone: event.target.phone.value,
      eventType: eventType,
      band: band,
      date: event.target.date.value,
      startTime: event.target.time.value,
      numHours: length,
      location: event.target.location.value
    }
    console.log(inquiryObj);
    contactAPI(inquiryObj);
  };

  const contactAPI = (inquiryObj) => {
    inquiryAPI.post(inquiryObj).then(res => {
      console.log(res);
      // redirect to thank you page
      history.push("/thankyou");
    });
  };

  const mapEvents = () => {
    const eventMap = events.map((event, index) => {
      return(
        <MenuItem key={index} value={event.singular}>{event.singular}</MenuItem>
      );
    });
    return eventMap;
  };
  
  const mapBands = () => {
    const bandMap = bands.map((band, index) => {
      return(
        <MenuItem key={index} value={band.name}>{band.name}</MenuItem>
      );
    });
    return bandMap;
  };

  const mapHours = () => {
    const lengthMap = lengths.map((l, index) => {
      return(
        <MenuItem key={index} value={l}>{l}</MenuItem>
      );
    });
    return lengthMap;
  };

  const handleEventChange = (event) => {
    console.log(event.target.value);
    setEvent(event.target.value);
  };

  const handleBandChange = (event) => {
    setBand(event.target.value);
  };

  const handleLengthChange = (event) => {
    setLength(event.target.value);
  };


  return (
    <Container component="main" className={classes.main} maxWidth="xl">
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <InfoIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Contact Us!
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstname"
            label="First Name"
            name="firstname"
            autoComplete="firstname"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastname"
            label="Last Name"
            name="lastname"
            autoComplete="lastname"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="phone"
            label="Phone"
            id="phone"
            autoComplete="phone"
          />
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel id="event-select-label">Event Type</InputLabel>
            <Select
              labelId="event-select-label"
              id="event"
              value={eventType}
              onChange={handleEventChange}
            >
              {mapEvents()}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel id="band-select-label">Select Band</InputLabel>
            <Select
              labelId="band-select-label"
              id="band"
              value={band}
              onChange={handleBandChange}
            >
              {mapBands()}
            </Select>
          </FormControl>
          <TextField
            id="date"
            label="Date of Event"
            type="date"
            required
            // defaultValue={moment().add(2, 'days').format("YYYY-MM-DD")}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="time"
            label="Start Time"
            type="time"
            required
            // defaultValue="20:00"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
          />
          <FormControl className={classes.formControl} fullWidth>
            <InputLabel id="length-select-label">Length of Event (hours)</InputLabel>
            <Select
              labelId="length-select-label"
              id="length"
              value={length}
              onChange={handleLengthChange}
            >
              {mapHours()}
            </Select>
          </FormControl>                    
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="location"
            required
            label="Address of Event"
            id="location"
            autoComplete="location"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </div>
      </Container>
    </Container>
  
  );
}