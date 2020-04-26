import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import userAPI from "../utils/userAPI";
import { useHistory } from "react-router-dom";
import userAuth from "../utils/userAuth";

const Background = "assets/images/jens-thekkeveettil-dBWvUqBoOU8-unsplash.jpg";

const useStyles = makeStyles((theme) => ({
  main: {
    height: "100vh",
    backgroundImage: `url(${Background})`,
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "8px"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {

  const classes = useStyles();

  const history = useHistory();

  const handleLoginSubmit = (event) =>{
    event.preventDefault();
    loginAPI(event.target.username.value, event.target.password.value);
  };

  const loginAPI = (username, password) => {
    userAPI.login(username, password).then(res => {
      const {type} = res.data;
      userAuth.authenticate(res => {
        const str = `/${type}`;
        history.push(str);
      });
    });
  };

  return (
    <Container component="main" className={classes.main} maxWidth="xl">
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleLoginSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
      </Container>
    </Container>
  
  );
}