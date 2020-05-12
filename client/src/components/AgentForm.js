import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

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

export default function AgentForm(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
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
            // value={props.firstName}
            defaultValue={props.firstName}
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="lastName"
            label="Last Name"
            value={props.lastName}
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            value={props.email}
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="phone"
            label="Phone"
            value={props.phone}
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="avatar"
            label="Avatar"
            value={props.avatar}
            type="text"
            fullWidth
          />          
        </form>
        {/* <Typography variant="body2" component="p">
          {`Name: ${props.firstName} ${props.lastName}`}
        </Typography>
        <Typography variant="body2" component="p">
          {`Email: ${props.email}`}
        </Typography>
        <Typography variant="body2" component="p">
          {`Phone: ${props.phone}`}
        </Typography>
        <Typography variant="body2" component="p">
          {`Username: ${props.username}`}
        </Typography> */}
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
  );
}