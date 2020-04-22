import axios from "axios";

export default {
  getAll: function() {
    return axios.get("api/event");
  },
  create: function(eventObj) {
    return axios.post("api/event", eventObj);
  }
};