import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import InfoIcon from '@material-ui/icons/Info';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import userAPI from "../utils/userAPI";
import { useHistory } from "react-router-dom";

const Background = "assets/images/jens-thekkeveettil-dBWvUqBoOU8-unsplash.jpg";

const useStyles = makeStyles((theme) => ({
  main: {
    marginBottom: theme.spacing(2),
    // height: "100vh",
    backgroundImage: `url(${Background})`,
    // backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: "white",
    padding: "8px",
    borderRadius: "10px"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ContactUs() {

  const classes = useStyles();

  const history = useHistory();

  const handleSubmit = (event) =>{
    event.preventDefault();
    // contactAPI(event.target.username.value, event.target.password.value);
  };

  const contactAPI = (username, password) => {
    // userAPI.login(username, password).then(res => {
    //   const {username, type} = res.data;
    //   console.log(username, type);
    //   const str = `/${type}`;
    //   history.push(str);
    // });
  };

  return (
    <Container component="main" className={classes.main} maxWidth="xl">
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <InfoIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Contact Us!
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="firstname"
            label="First Name"
            name="firstname"
            autoComplete="firstname"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastname"
            label="Last Name"
            name="lastname"
            autoComplete="lastname"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="phone"
            label="Phone"
            type="phone"
            id="phone"
            autoComplete="phone"
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="date"
            label="Event Date"
            type="date"
            id="date"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
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
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      </Container>
    </Container>
  
  );
}