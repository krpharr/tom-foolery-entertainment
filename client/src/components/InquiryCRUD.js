import React, { useState, useEffect } from "react";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InquiryCard from "./InquiryCard";
import inquiryAPI from "../utils/inquiryAPI";
import agentAPI from "../utils/agentAPI";
import SelectedInquiryListItem from '../components/SelectedInquiryListItem';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import formatUtil from '../utils/formatUtil';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

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
  btnContainer: {
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
    marginTop: "8px",
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
  const [update, setUpdate] = useState(0);
  const [agent, setAgent] = useState();
  const [modalStyle] = useState(getModalStyle);
  const [openDelInqModal, setDelInqModalOpen] = useState(false);
  const [openAssignAgentModal, setAssignAgentModalOpen] = useState(false);
  const [selectAgent, setSelectAgent] = useState("None");

  useEffect(() => {
    agentAPI.getAll().then(res => {
      setAgents(res.data);
    });
    inquiryAPI.getAll().then(res => {
      setInquiries(res.data);
    });

  }, [update]);

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

  const mapAgent = () => {
    if(inquiry === undefined)return;
    console.log("agent: ", agent, typeof agent);
    console.log("inquiry.agentId: ", inquiry.agentId, typeof inquiry.agentId);
     
    if(inquiry.agentId === "" || inquiry.agentId === undefined){
      return (
        <Typography variant="body2" component="p">
          Agent: none
      </Typography>        
    );
    } else{
      if(agent === undefined)return;
      return (
        <div>
          <Typography variant="body2" component="p">
            {`Agent: ${agent.firstName} ${agent.lastName}`}
          </Typography>        
        </div>
      );
    }
  };

  const handleListItemSelect = (selection) => {
    // setEdit(false);
    console.log(inquiries[selection]);
    setInquiry(inquiries[selection]);
    if(inquiries[selection].agentId === undefined){
      setAgent(undefined);
    }else {
      agentAPI.getById(inquiries[selection].agentId).then(res => {
        if(res.status !== 200){
          console.log("Error locating agent in database");
        }else {
          console.log(res.data);
          setAgent(res.data);
        }
      });
    }
  };
  
  const displayInquiryList = () => {
    if(inquiries === undefined)return;
    return <SelectedInquiryListItem inquiries={inquiries} handleListItemSelect={handleListItemSelect}/>;
  };

  const displayInquiryUD = () => {
    if(inquiry === undefined)return;
    const startTime = moment(inquiry.startTime, 'HH:mm').format('hh:mm a');
  
    console.log("agentId: ",inquiry.agentId);
    // return <InquiryCard {...inquiry} agents={agents} updateInquiry={updateInquiry}/>
    return (
      <div>
        <Typography variant="body2" component="p">
          {`Name: ${inquiry.firstName} ${inquiry.lastName}`}
        </Typography>
        <Typography variant="body2" component="p">
          {`Email: ${inquiry.email}`}
        </Typography>
        <Typography variant="body2" component="p">
          {`Phone: ${formatUtil.formatPhoneNumber(inquiry.phone)}`}
        </Typography>
        <Typography variant="body2" component="p">
          {`Event: ${inquiry.eventType}`}
        </Typography>
        <Typography variant="body2" component="p">
          {`Band: ${inquiry.band}`}
        </Typography>
        <Typography variant="body2" component="p">
          {`Event date: ${inquiry.date}`}
        </Typography>
        <Typography variant="body2" component="p">
          {`Start time: ${startTime}`}
        </Typography>
        <Typography variant="body2" component="p">
          {`Event length (hours) ${inquiry.numHours}`}
        </Typography>
        <Typography variant="body2" component="p">
          {`Event location: ${inquiry.location}`}
        </Typography>
        {/* <Typography variant="body2" component="p">
          {`Agent ID: ${inquiry.agentId}`}
        </Typography> */}
        {mapAgent()}
      </div>
    );
  };

  const updateInquiry = () => {
    setUpdate(update + 1);
  };

  const handleAssignAgent = () => {

  };

  const deleteInquiryDB = () => {
    inquiryAPI.delete(inquiry._id).then(res => {
      if(res.status !== 200){
        console.log("Error deleteing inquiry.");
      }else {
        console.log("Inquiry deleted.",res);
        setUpdate(update +1);
      }
    });
  };

  //modal functions
  const handleDelInqModalOpen = () => {
    setDelInqModalOpen(true);
  };

  const handleDelInqModalClose = () => {
    setDelInqModalOpen(false);
  };

  const handleDelInqModalDelete = () => {
    handleDelInqModalClose();
    deleteInquiryDB();
  };

  const handleAssignAgentModalOpen = () => {
    setAssignAgentModalOpen(true);
  };

  const handleAssignAgentModalClose = () => {
    setAssignAgentModalOpen(false);
    setSelectAgent("None")
  };

  const handleAssignAgentModalOk = () => {
    handleAssignAgentModalClose();
    let str = selectAgent === "None" ? "" : selectAgent;
    inquiryAPI.update(inquiry._id, {agentId: str}).then(res => {
      if(res.status !== 200){
        console.log("Error updating inquiry agentId");
      }else {
        console.log("Inquiry agent updated!",res);
        agentAPI.getById(selectAgent).then(res => {
          if(res.status !== 200){
            console.log("Error locating agent in database");
          }else {
            console.log(res.data);
            setAgent(res.data);
          }
        });
        //setUpdate(update + 1);
      }
    });
  };

  const mapAgents = () => {
    if(agents === undefined)return;
    const agentMap = agents.map((agent, index) => {
      return(
        <MenuItem key={index} value={agent._id}>{`${agent.firstName} ${agent.lastName}`}</MenuItem>
      );
    });
    return agentMap;
  };

  const handleAgentChange = (event) => {
    console.log('handleAgentChange', event.target.value);
    setSelectAgent(event.target.value);
    //setAgent(event.target.value);

  };

 
  return (
    <Grid container className={classes.icContainer}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h2">
            Inquiry Panel
        </Typography>
       </Grid>
      {/* Inquiries
      {mapInquiries()} */}
      <Grid item xs={12} sm={4} className={classes.listContainer}>
        {displayInquiryList()}
      </Grid>
      <Grid item xs={12} sm={8} className={classes.listContainer}>
        {displayInquiryUD()}
      </Grid>
      <Grid item xs={12} className={classes.btnContainer}>
        <Button variant="outlined" color="primary" onClick={handleAssignAgentModalOpen}>Assign Agent</Button>
        <Button variant="outlined" color="primary" onClick={handleDelInqModalOpen}>Delete</Button>
      </Grid>
      <Modal
        open={openDelInqModal}
        onClose={handleDelInqModalClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h3 className={classes.modalAlert}>! Delete Inquiry</h3>
          <p>Are you sure you want to remove inquiry?</p>
          <div className={classes.modalBtnBar}>
            <Button variant="outlined" color="primary" onClick={handleDelInqModalClose}>Cancel</Button>
            <Button variant="outlined" color="primary" onClick={handleDelInqModalDelete}>Yes</Button>
          </div>
        </div>
      </Modal>
      <Modal
        open={openAssignAgentModal}
        onClose={handleAssignAgentModalClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h3 className={classes.modalAlert}>Assign Agent</h3>
          <p>Select agent to take call.</p>
          <FormControl className={classes.formControl}>
          <InputLabel id="agent-select-label">Set Agent</InputLabel>
          <Select
            labelId="agent-select-label"
            className="agent-select"
            defaultValue="None"
            displayEmpty
            value={selectAgent}
            onChange={handleAgentChange}
          >
            <MenuItem key={-1} value="None">
            <em>None</em>
          </MenuItem>
            {mapAgents()}
          </Select>
        </FormControl>
          <div className={classes.modalBtnBar}>
            <Button variant="outlined" color="primary" onClick={handleAssignAgentModalClose}>Cancel</Button>
            <Button variant="outlined" color="primary" onClick={handleAssignAgentModalOk}>Ok</Button>
          </div>
        </div>
      </Modal>
    </Grid>
  );
};

export default InquiryCRUD;