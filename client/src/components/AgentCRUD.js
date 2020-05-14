import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import userAPI from "../utils/userAPI";
import agentAPI from "../utils/agentAPI";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SelectedAgentListItem from '../components/SelectedAgentListItem';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  acContainer: {
    border: "1px blue solid",
    padding: "8px",
    margin: "0 16px"
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
  },
  inactive: {
    opacity: "50%",
    color: "red",
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modalBtnBar: {
    display: "flex",
    justifyContent: "space-around"
  },
  modalAlert: {
    color: "red"
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
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const newAgentObj = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    avatar: ""
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
          <TextField
            autoFocus
            margin="dense"
            id="firstName"
            label="First Name"
            value={firstName}
            onChange={handleInputChange}
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

  const validation = () => {
    let str = "";
    if(firstName.trim() === '' || firstName.length < 2)str += "firstName invalid\n";
    if(lastName.trim() === '' || lastName.length < 2)str += "lastName invalid\n";
    if(email.trim() === '' || !email.includes('@'))str += "invalid email\n";
    if(phone.trim() === '' || phone.length < 10)str += "invalid phone number\n";
    if(avatar.trim() === '')str += "invalid avatar";
    return str;
  };


  const createNewAgent = (cb) => {
    //validation
    let valid = validation();
    if(valid !== '')return cb(valid);

    const username = email.split("@")[0];
    const password = "password";
    const type = "agent";

    const userObj = {
      username: username,
      password: password,
      type: type
    }
    
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
            setUpdate(update + 1);
            return cb("Agent created!")
          });
        });
      }else{
        return cb("Error creating user for new Agent.")
      }
    });    
  };

  const setAgentForm= (agentObj) => {
    setFirstName(agentObj.firstName);
    setLastName(agentObj.lastName);
    setEmail(agentObj.email);
    setPhone(agentObj.phone);
    setAvatar(agentObj.avatar);    
  };

  const handleListItemSelect = (selection) => {
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

  const updateAgentDB = (cb) => {
    let valid = validation();
    if(valid !== '')return cb(valid);
    const agentObj = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      avatar: avatar,
    };
    agentAPI.update(agent._id, agentObj).then(res => {
      let msg;
      if(res.status !== 200){
        msg = "Error updating agent."
      }else{
        return cb("Agent Updated!")
      }
    });
  };

  const updateAgent = () => {
    if(edit){
      createNewAgent(msg =>{
        console.log(msg);
        setEdit(false);
      });
    }else{
      updateAgentDB(msg=>{
        console.log(msg);
        setUpdate(update + 1);
      });
    }
  };

  const deleteAgentDB = () => {
    userAPI.delete(agent.userId).then(res => {
      if(res.status !== 200){
        console.log('Error deleting user:', res)
      }else {
        console.log("User deleted.");
      }
    });
    agentAPI.delete(agent._id).then(res => {
      if(res.status !== 200){
        console.log('Error deleting agent:', res)
      }else {
        console.log("Agent deleted.");
      }
      setUpdate(update + 1);
    });
  };

  const deleteAgent = () => {
    handleOpen();
  };

  //modal functions
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    handleClose();
    deleteAgentDB();
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h3 className={classes.modalAlert}>! Delete Agent</h3>
          <p>Are you sure you want to remove agent?</p>
          <div className={classes.modalBtnBar}>
            <Button variant="outlined" color="primary" onClick={handleClose}>Cancel</Button>
            <Button variant="outlined" color="primary" onClick={handleDelete}>Yes</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AgentCRUD;