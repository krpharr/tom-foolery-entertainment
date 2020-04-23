import axios from "axios";

export default {
  getAll: function() {
    return axios.get("api/client");
  },
  getById: function(id) {
    return axios.get(`api/client/${id}`);
  },
  create: function(clientObj) {
    return axios.post("api/client", clientObj);
  },
  update: function(id, clientObj) {
    return axios.put(`api/client/${id}`, clientObj);
  }
};