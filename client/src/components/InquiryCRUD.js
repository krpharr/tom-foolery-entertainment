import React, { useState, useEffect } from "react";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InquiryCard from "./InquiryCard";
import inquiryAPI from "../utils/inquiryAPI";
import agentAPI from "../utils/agentAPI";
import SelectedInquiryListItem from '../components/SelectedInquiryListItem';
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
  icContainer: {
    border: "1px blue solid",
    padding: "8px",
    margin: "0 16px"
  },
  listContainer: {
    padding: "8px",
    height: "400px",
    overflowY: "scroll"
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

function InquiryCRUD() {

  const classes = useStyles();

  const [inquiries, setInquiries] = useState();
  const [inquiry, setInquiry] = useState();
  const [agents, setAgents] = useState();

  useEffect(() => {
    agentAPI.getAll().then(res => {
      setAgents(res.data);
    });
    inquiryAPI.getAll().then(res => {
      setInquiries(res.data);
    });
  }, []);

  const mapInquiries = () => {
    if(inquiries === undefined || agents === undefined)return;
    const filtered = inquiries.filter(inquiry => {
      return inquiry.deleted === false;
    });
    const inquiriesMap = filtered.map(inquiry => {
      return(
        <Grid item key={inquiry._id} >
          <InquiryCard {...inquiry} agents={agents}/>
        </Grid>
      );
    });
    return inquiriesMap;
  };

  const handleListItemSelect = (selection) => {
    // setEdit(false);
    setInquiry(inquiries[selection]);
    // setAgentForm(agents[selection]);
  };
  
  const displayInquiryList = () => {
    if(inquiries === undefined)return;
    return <SelectedInquiryListItem inquiries={inquiries} handleListItemSelect={handleListItemSelect}/>;
  };

  const displayInquiryUD = () => {
    if(inquiry === undefined)return;
    return <InquiryCard {...inquiry} agents={agents}/>
  };
 
  return (
    <Grid container className={classes.icContainer}>
      {/* Inquiries
      {mapInquiries()} */}
      <Grid item xs={4} className={classes.listContainer}>
        {displayInquiryList()}
      </Grid>
      <Grid item xs={8} className={classes.listContainer}>
        {displayInquiryUD()}
      </Grid>
      
    </Grid>
  );
};

export default InquiryCRUD;