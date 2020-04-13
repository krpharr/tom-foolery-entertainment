import React from "react";
import PropTypes from "prop-types";
import NavBar from "./navbar/NavBar";

function Main(){
  return(
    <NavBar />
  );
};

Main.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Main;