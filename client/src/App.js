import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Bands from "./pages/Bands";
import Band from "./pages/Band";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import ClientPage from "./pages/Client";
import Bandleader from "./pages/Bandleader";
import StickyFooter from "./components/StickyFooter";
import userAPI from "./utils/userAPI";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  }
}));

const userAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    userAPI.auth().then(res => {
      console.log(res.data.user);
      userAuth.result(res.data, cb);
    });
  },
  signout(cb) {
    userAPI.logout().then(res => {
      console.log(res.data.user);
      userAuth.result(res.data, cb);
    });
  },
  result(res, cb) {
    console.log("result",res);
    userAuth.isAuthenticated = res.user ?  true : false;     
    userAuth.user = res;
    cb({authenticated: userAuth.isAuthenticated, user: userAuth.user});
  },
  user: {
    username: "",
    type: ""
  },
  setUser(username, type) {
    this.user = {
      username: username,
      type: type
    }
  }
};

userAuth.signout((res)=>{
  console.log("logged in: ", res);
});

// userAuth.authenticate((res)=>{
//   console.log("logged in: ", res);
// });

function App() {

  const classes = useStyles();

  return (
     <Router>
        <div className={classes.root}>
          <CssBaseline />
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/events" component={Events} />
            <Route exact path="/bands" component={Bands} />
            <Route exact path="/band" component={Band} />
            <Route exact path="/contactus" component={ContactUs} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/client" component={ClientPage} />
            <Route exact path="/bandleader" component={Bandleader} />
            {/* <Route exact path="/search" component={Search} />
            <Route exact path="/saved" component={Saved} />
            <NoMatch /> */}
          </Switch>
          <StickyFooter />
        </div>
      </Router>

  );
}

export default App;
