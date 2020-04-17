import axios from "axios";

export default {
  getAll: function() {
    return axios.get("api/band");
  },
  getById: function(id) {
    return axios.get(`api/band/${id}`);
  }
};