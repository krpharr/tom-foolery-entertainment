import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  openEvent: {
    color: "red"
  },
  assignedEvent: {
    color: "lightgreen"
  },
  pastEvent: {
    opacity: "50%",
    color: "grey"
  }
}));

export default function SelectedInquiryListItem(props) {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    props.handleListItemSelect(index);
  };

  const mapInquiries = () => {
    const inquiryMap = props.inquiries.map((inquiry, index) => {
      let classname = (inquiry.agentId === "" || inquiry.agentId === undefined) ? classes.openEvent : classes.assignedEvent;
      if(moment(inquiry.date).isBefore(moment())){
        classname = classes.pastEvent;
      }    
      return (
        <ListItem
          key={index}
          button
          selected={selectedIndex === index}
          onClick={(event) => handleListItemClick(event, index)}
          className={classname}
        >
          <ListItemText primary={`${inquiry.firstName[0]} ${inquiry.lastName} ${inquiry.date}`}/>
        </ListItem>      
      );
    });
    return inquiryMap;
  };
  
  return (
    <div className={classes.root}>
      <List component="nav" aria-label="Inquiries List">
        {mapInquiries()}
      </List>
    </div>
  );
}