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
import Typography from '@material-ui/core/Typography';



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
  },
  active: {
    opacity: "100%",
    // color: "green",
    // backgroundColor: "green"
  },
  inactive: {
    opacity: "50%",
    color: "red",
  }
}));

function AgentCRUD() {
  const classes = useStyles();

  const [agent, setAgent] = useState();
  const [agents, setAgents] = useState();
  const [edit, setEdit] = useState(true);
  const [update, setUpdate] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");

  const newAgentObj = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    avatar: ""
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
            //  handleClose();
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

  const handleInputChange = (event) => {
    switch(event.target.id) {
      case "firstName":
        setFirstName(event.target.value);
        break;
      case "lastName":
        setLastName(event.target.value);
        break;
      case "email":
        setEmail(event.target.value);
        break;
      case "phone":
        setPhone(event.target.value);
        break;
      case "avatar":
        setAvatar(event.target.value);
        break;
    }
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
            value={firstName}
            onChange={handleInputChange}
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
            value={lastName}
            onChange={handleInputChange}
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            value={email}
            onChange={handleInputChange}
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            label="Phone"
            value={phone}
            onChange={handleInputChange}
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="avatar"
            label="Avatar"
            value={avatar}
            onChange={handleInputChange}
            type="text"
            fullWidth
          />          
        </form>         

      </div>
    );
  };

  const setAgentForm= (agentObj) => {
    setFirstName(agentObj.firstName);
    setLastName(agentObj.lastName);
    setEmail(agentObj.email);
    setPhone(agentObj.phone);
    setAvatar(agentObj.avatar);    
  };

  const handleListItemSelect = (selection) => {
    console.log(selection);
    setEdit(false);
    setAgent(agents[selection]);
    setAgentForm(agents[selection]);
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
    setAgentForm(newAgentObj);
    setEdit(true);
  };

  const cancel = () => {
    setAgent(newAgentObj);
    setAgentForm(newAgentObj);
    setEdit(false);
  };

  const updateAgent = () => {

  };

  const deleteAgent = () => {

  };

  return (
    <div>
       <Grid container className={classes.acContainer}>
         <Grid item xs={12}>
          <Typography variant="h4" component="h2">
            Agent Panel
          </Typography>
        </Grid>
        <Grid item className={classes.acListContainer, edit ? classes.inactive : classes.active} xs={12} sm={4}>
          {displayAgentList()}    
        </Grid>
        <Grid item className={classes.acFormContainer} xs={12} sm={8}>
        {displayAgentCrud()} 
        </Grid>
        <Grid item xs={12} className={classes.acBtnContainer}>
          <Button variant="outlined" color="primary" onClick={newAgent} disabled={edit ? true : false}>
            New 
          </Button>
          <Button variant="outlined" color="primary" onClick={cancel} disabled={edit ? false : true}>
            Cancel 
          </Button>
          <Button variant="outlined" color="primary" onClick={updateAgent}>
            {edit ? "Save" : "Update"}
          </Button>
          <Button variant="outlined" color="primary" onClick={deleteAgent} disabled={edit ? true : false}>
            Remove
          </Button>
        </Grid>
      </Grid>
 
    </div>
  );
};

export default AgentCRUD;