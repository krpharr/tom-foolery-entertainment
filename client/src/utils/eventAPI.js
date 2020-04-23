import axios from "axios";

export default {
  getAll: function() {
    return axios.get("api/event");
  },
  create: function(eventObj) {
    return axios.post("api/event", eventObj);
  },
  update: function(id, eventObj) {
    return axios.put(`api/event/${id}`, eventObj);
  }
};