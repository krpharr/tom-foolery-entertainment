import React, { useState, useEffect } from "react";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import UserCard from "./UserCard";
import userAPI from "../utils/userAPI";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
  // main: {
  //   padding: "8px",
  //   border: "1px solid black",
  //   borderRadius: "10px"
  // },
  // display: {
  //   height: "50vh",
  //   overflow: "scroll"
  // }
}));

function UserCRUD() {

  const classes = useStyles();

  const [users, setUsers] = useState();
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event) => {
    // console.log(event);
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userObj = {
      username: event.target.username.value,
      password: event.target.password.value,
      type: event.target.type.value
    }
    userAPI.create(userObj).then(res => {
      console.log(res);
      handleClose();
      setUpdate(update + 1);
    });
    
  };

  useEffect(() => {
    userAPI.getAll().then(res => {
      setUsers(res.data);
    });
  }, [update]);

  const mapUsers = () => {
    if(users === undefined)return;
    const usersMap = users.map(user => {
      return(
        <Grid item key={user._id} >
          <UserCard {...user} />
        </Grid>
      );
    });
    return usersMap;
  };
  

  return (
    <div>
      users
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        New User
      </Button>
      <Container>
         {mapUsers()}
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
            />
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

export default UserCRUD;