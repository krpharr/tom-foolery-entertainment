import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import AgentCard from "./AgentCard";
import userAPI from "../utils/userAPI";
import agentAPI from "../utils/agentAPI";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AgentForm from '../components/AgentForm';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import SelectedAgentListItem from '../components/SelectedAgentListItem';
import { FormHelperText } from "@material-ui/core";



const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  acContainer: {
    border: "1px blue solid",
    padding: "8px"
  },
  acListContainer: {
    padding: "8px"
  },
  acFormComtainer: {
    padding: "8px"
  },
  acBtnContainer: {
    borderTop: "solid blue 1px",
    padding: "8px",
    display: "flex",
    justifyContent: "space-around"
  }
}));

function AgentCRUD() {
  const classes = useStyles();

  const [agent, setAgent] = useState();
  const [agents, setAgents] = useState();
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(0);

  const newAgentObj = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    avatar: ""
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event) => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = event.target.email.value.split("@")[0];
    const password = "password";
    const type = "agent";
    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;
    const avatar = event.target.avatar.value;

    const userObj = {
      username: username,
      password: password,
      type: type
    }
    console.log(userObj);
    
    userAPI.create(userObj).then(res => {
      if(res.status === 200){
        userAPI.getAll().then(res =>{
          let users = res.data.filter(u => {
            return u.username === username;
          });

          const agentObj = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            avatar: avatar,
            username: username,
            userId: users[0]._id
          };

          agentAPI.create(agentObj).then(res => {
            handleClose();
            setUpdate(update + 1);
          });
        });
      }

    });
    
  };

  useEffect(() => {
    agentAPI.getAll().then(res => {
      if(agent === undefined){
        setAgent(res.data[0]);
      };
      setAgents(res.data);
    });
  }, [update]);

  const mapAgents = () => {
    if(agents === undefined)return;
    // const agentsMap = agents.map(a => {
    //   return(
    //     <Grid item key={a._id} >
    //       <AgentCard {...a} />
    //     </Grid>
    //   );
    // });
    const agentsMap = agents.map(a => {
      return <option key={a._id} value={a._id}>{`${a.firstName} ${a.lastName}`}</option>;
    });
    return agentsMap;
  };

  const displayAgentCrud = () =>{
    if(agent === undefined)return;
    return (
      <div>
        <form>
          {/* <label for="firstName">First Name:</label>
          <input 
            type="text" 
            id="firstName" 
            name="firstName">
            value={props.firstName}  
          </input> */}
          <TextField
            autoFocus
            margin="dense"
            id="firstName"
            label="First Name"
            value={agent.firstName}
            // defaultValue={agent.firstName}
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="lastName"
            label="Last Name"
            value={agent.lastName}
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            value={agent.email}
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            label="Phone"
            value={agent.phone}
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="avatar"
            label="Avatar"
            value={agent.avatar}
            type="text"
            fullWidth
          />          
        </form>         

      </div>
    );
  };

  const handleListItemSelect = (selection) => {
    console.log(selection);
    setAgent(agents[selection]);
  };

  const displayAgentList = () => {
    if(agents === undefined)return;
    return <SelectedAgentListItem agents={agents} handleListItemSelect={handleListItemSelect}/>;
  };
  
  const handleChange = (event) => {
    setAgent(agents[event.target.value]);
    console.log("agent index: ", event.target.value);
  };

  const newAgent = () => {
    setAgent(newAgentObj);
  };

  const updateAgent = () => {

  };

  const deleteAgent = () => {

  };

  return (
    <div>
       <Grid container className={classes.acContainer}>
        <Grid item className={classes.acListContainer} xs={12} sm={4}>
          {displayAgentList()}    
        </Grid>
        <Grid item className={classes.acFormContainer} xs={12} sm={8}>
        {displayAgentCrud()} 
        </Grid>
        <Grid item xs={12} className={classes.acBtnContainer}>
          <Button variant="outlined" color="primary" onClick={newAgent}>
            New 
          </Button>
          <Button variant="outlined" color="primary" onClick={updateAgent}>
            Update
          </Button>
          <Button variant="outlined" color="primary" onClick={deleteAgent}>
            Remove
          </Button>
        </Grid>
      </Grid>
 
    </div>
  );
};

export default AgentCRUD;