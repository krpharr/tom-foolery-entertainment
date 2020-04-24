import React, {useState, useEffect} from 'react';
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
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import inquiryAPI from "../utils/inquiryAPI";
import moment from "moment";
import userAPI from "../utils/userAPI";
import eventAPI from "../utils/eventAPI";
import clientAPI from "../utils/clientAPI";

const bands = JSON.parse(localStorage.getItem("bands"));

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

  const email = `mailto:${props.email}`;
  const phone = `tel:${props.phone}`;
  const date = moment(`${props.date} ${props.startTime}`);
  const start = date.format("h:mm a MM-DD-YYYY")
  const end = date.add(5, "hours").format("h:mm a MM-DD-YYYY");
  const clientUsername = props.email.split("@")[0];


  const [band, setBand] = useState(props.band);
  const [price, setPrice] = useState(1500);
  const [user, setUser] = useState();
  const [client, setClient] = useState();
  const [event, setEvent] = useState();

  useEffect(() => {
    if(user === undefined){
      userAPI.getAll().then(res =>{
        console.log("getAll()",res.data);
        let users = res.data.filter(u => {
          return u.username === clientUsername;
        });
        console.log("search for existing first", users[0])
        setUser(users[0]);
      });      
    }else{

    }
    if(client === undefined){
      clientAPI.getAll().then(res =>{
        console.log("getAll()",res.data);
        let clients = res.data.filter(c => {
          return c.email === props.email;
        });
        console.log("search for existing clients first", clients[0])
        setClient(clients[0]);
      });      
    }

  }, [user]);  

  const mapBands = () => {
    const bandMap = bands.map((band, index) => {
      return(
        <MenuItem key={index} value={band.name}>{band.name}</MenuItem>
      );
    });
    return bandMap;
  };

  const handleBandChange = (event) => {
    setBand(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleCreateClient = () => {
    if(user === undefined)return;


    const clientObj = {
      firstName: props.firstName,
      lastName: props.lastName,
      email: props.email,
      phone: props.phone,
      events: [],
      userId: user._id,
      username: clientUsername
    }

    console.log("clientObj", clientObj);

    clientAPI.create(clientObj).then(res => {
       console.log(res);
      setClient(res.data);
    });

  };

  const handleCreateUser = () => {
    //return userId //async
    const password = "heroku";
    const userObj = {
      username: clientUsername,
      password: password,
      type: "client"
    }
    userAPI.create(userObj).then(res => {
      console.log(res);
      if(res.status === 200){
        userAPI.getAll().then(res =>{
          console.log("getAll()",res.data);
          let users = res.data.filter(u => {
            return u.username === clientUsername;
          });
          setUser(users[0]);
        });
      }
    });
  };

  const handleCreateEvent = (event) => {
  if(client === undefined)return;
    const eventObj = {
      date: props.date,
      type: props.eventType,
      clientId: client._id,
      clientUsername: clientUsername,
      agentId: props.agentId,
      bands: [band],
      totalPrice: price,
      location: props.location,
      startTime: start,
      endTime: end
    };
    eventAPI.create(eventObj).then(res => {
      console.log(res);
      setEvent(res.data);
      inquiryAPI.update(props._id, {deleted: true}).then(res =>{
        console.log(props._id, "marked deleted")
      });
    }); 
  };

  const createPassword = () => {
    const lower = "abcdefghijklmnopqrstuvwxyz";
    let password = "";
    for(let i = 0; i < 8; i++){
      password += lower.charAt(Math.floor(Math.random() * lower.length));
    }
    return password;
  };

  return (
    <div>
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
          {/* <Typography variant="body2" component="p">
            {`Band: ${props.band}`}
          </Typography> */}
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
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            type="number"
            name="totalPrice"
            label="Total Price"
            id="totalPrice"
            value={price}
            onChange={handlePriceChange}
          />
        </CardContent>
        <CardActions>
          <Button onClick={handleCreateUser} disabled={user ? true : false}>
              Create User
          </Button>
          <Button onClick={handleCreateClient} disabled={client && user ? true : false}>
              Create Client
          </Button>
          <Button onClick={handleCreateEvent} disabled={client && user && event ? true : false}>
              Create Event
          </Button>
        </CardActions>
      </Card>
    </div> 
  );
}
