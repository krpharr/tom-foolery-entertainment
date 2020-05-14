import axios from "axios";

export default {
  getAll: function() {
    return axios.get("api/agent");
  },
  getById: function(id) {
    return axios.get(`api/agent/${id}`);
  },
  post: function(agentObj) {
    return axios.post("api/agent", agentObj);
  },
  update: function(id, agentObj) {
    return axios.put(`api/agent/${id}`, agentObj);
  },
  create: function(agentObj) {
    return axios.post("api/agent", agentObj);
  },
  delete: function(id) {
    return axios.delete(`api/agent/${id}`);
  }
};