import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Bands from "./pages/Bands";
import ContactUs from "./pages/ContactUs";
import StickyFooter from "./components/StickyFooter";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  }
}));

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
            <Route exact path="/contactus" component={ContactUs} />
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
