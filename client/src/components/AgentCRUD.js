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



const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function AgentCRUD() {
  const classes = useStyles();

  const [agent, setAgent] = useState();
  const [agents, setAgents] = useState();
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(0);

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
        <FormControl className={classes.formControl}>
          {/* <InputLabel id="select-multiple-native" disableAnimation="true">Agent</InputLabel> */}
          <Select
            multiple="false"
            native
            labelId="select-multiple-native"
            value={agent._id}
            onChange={handleChange}
            inputProps={{
              id: 'select-multiple-native',
            }}
          >
            {mapAgents()}
          </Select>
        </FormControl>

      </div>
    );
  };

  const handleListItemSelect = (selection) => {
    console.log(selection);
  };

  const displayAgentList = () => {
    if(agents === undefined)return;
    return <SelectedAgentListItem agents={agents} handleListItemSelect={handleListItemSelect}/>;
  };
  
  const handleChange = (event) => {
    setAgent(event.target.value);
    console.log("agent id: ", event.target.value);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        New Agent
      </Button>
      <Container>

      {displayAgentList()}
        
         {/* {displayAgentCrud()} */}
         <form>
          {/* <label for="firstName">First Name:</label>
          <input 
            type="text" 
            id="firstName" 
            name="firstName">
            value={props.firstName}  
          </input> */}
          {/* <TextField
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
          />           */}
        </form>         
      </Container>

    </div>
  );
};

export default AgentCRUD;