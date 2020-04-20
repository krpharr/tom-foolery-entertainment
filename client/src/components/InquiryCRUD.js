import React, { useState, useEffect } from "react";
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import InquiryCard from "./InquiryCard";
import inquiryAPI from "../utils/inquiryAPI";
import agentAPI from "../utils/agentAPI";

const useStyles = makeStyles((theme) => ({

}));

function InquiryCRUD() {

  const classes = useStyles();

  const [inquiries, setInquiries] = useState();
  const [agents, setAgents] = useState();

  useEffect(() => {
    agentAPI.getAll().then(res => {
      console.log(res.data);
      setAgents(res.data);
    });
    inquiryAPI.getAll().then(res => {
      console.log(res.data);
      setInquiries(res.data);
    });
  }, []);

  const mapInquiries = () => {
    if(inquiries === undefined || agents === undefined)return;
    const inquiriesMap = inquiries.map(inquiry => {
      return(
        <Grid item key={inquiry._id} >
          <InquiryCard {...inquiry} agents={agents}/>
        </Grid>
      );
    });
    return inquiriesMap;
  };
  

  return (
    <Container>
      Inquiries
      {mapInquiries()}
    </Container>
  );
};

export default InquiryCRUD;