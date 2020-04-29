import React, { useState, useEffect } from "react";
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


function AgentCRUD() {

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
      setAgents(res.data);
    });
  }, [update]);

  const mapAgents = () => {
    if(agents === undefined)return;
    const agentsMap = agents.map(agent => {
      return(
        <Grid item key={agent._id} >
          <AgentCard {...agent} />
        </Grid>
      );
    });
    return agentsMap;
  };
  

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        New Agent
      </Button>
      <Container>
         {mapAgents()}
      </Container>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <form 
          noValidate 
          onSubmit={(event) => handleSubmit(event)}
        >
          <DialogTitle id="form-dialog-title">Create New User</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="firstName"
              label="First Name"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="lastName"
              label="Last Name"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="phone"
              label="Phone"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="avatar"
              label="Avatar"
              type="text"
              fullWidth
            />
            {/* <TextField
              autoFocus
              margin="dense"
              id="username"
              label="Username"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="type"
              label="User type"
              type="text"
              fullWidth
            /> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default AgentCRUD;