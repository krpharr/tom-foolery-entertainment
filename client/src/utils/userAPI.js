import axios from "axios";

export default {
  getAll: function() {
    return axios.get("api/user");
  },
  login: function(username, password) {
    return axios.post("api/user/login", { username: username, password: password });
  }
};