import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InquiryCRUD from '../components/InquiryCRUD';
import UserCRUD from "../components/UserCRUD";
import AdminTabs from "../components/AdminTabs";
import Button from '@material-ui/core/Button';
import InquiryCard from "../components/InquiryCard";
import inquiryAPI from "../utils/inquiryAPI";
import agentAPI from "../utils/agentAPI";
import userAuth from "../utils/userAuth";

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: theme.spacing(8),
    // marginBottom: theme.spacing(2),
  },
  crudWindow: {
    height: "50vh",
    overflow: "scroll"
  }
}));

function Admin(){
  
  const classes = useStyles();

  const [inquiries, setInquiries] = useState();
  const [read, setRead] = useState();
  const [unread, setUnread] = useState();
  const [agents, setAgents] = useState();
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    agentAPI.getAll().then(res => {
      console.log(res.data);
      setAgents(res.data);
    });
    inquiryAPI.getAll().then(res => {
      console.log(res.data);
      const unread = res.data.filter(inquiry => {
        return inquiry.deleted === false && inquiry.read === false;
      });
      const read = res.data.filter(inquiry => {
        return inquiry.deleted === false && inquiry.read === true;
      });
      setInquiries(res.data);
      setRead(read);
      setUnread(unread);
    });
  }, [update]);

  const mapInquiries = (inqArray) => {
    if(agents === undefined)return;
    const inquiriesMap = inqArray.map(inquiry => {
      return(
        <Grid item key={inquiry._id} >
          <InquiryCard {...inquiry} agents={agents}/>
        </Grid>
      );
    });
    return inquiriesMap;
  };
  
  const tabDisplay = () =>{
    if(unread === undefined || read === undefined)return;
    const props = {
      unread: mapInquiries(unread),
      read: mapInquiries(read),
    };
    return(
      <AdminTabs {...props}/>
    );
  };

  const handleRefresh = () => {
    // setEvents(undefined);
    setUpdate(update + 1);
  }


  return(
    <Container component="main" className={classes.main} maxWidth="xl">
      <Typography variant="h2" component="h1" gutterBottom>
        Admin Page - {` ${userAuth.user.user}`}
      </Typography>
      <Grid container>
        <Grid item xs={12}>
          <Button className={classes.refreshButton} onClick={handleRefresh}variant="contained" color="primary">
            Refresh
          </Button>
        </Grid>
        <Grid item xs={12}>
          {tabDisplay()}
        </Grid>
        <Grid item xs={12} md={6}>
          <UserCRUD />
        </Grid>
      </Grid>
    </Container>      
  );
};

export default Admin;