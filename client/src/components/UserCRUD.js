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

}));

function UserCRUD() {

  const classes = useStyles();

  const [users, setUsers] = useState();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event) => {
    console.log(event);
    setOpen(false);
  };

  useEffect(() => {
    userAPI.getAll().then(res => {
      console.log(res.data);
      setUsers(res.data);
    });
  }, []);

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
      <Container>
        users
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          New User
        </Button>
        {mapUsers()}
      </Container>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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
          <Button onClick={handleClose} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserCRUD;