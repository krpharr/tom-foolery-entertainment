import axios from "axios";

export default {
  getAll: function() {
    return axios.get("api/user");
  },
  login: function(username, password) {
    return axios.post("api/user/login", { username: username, password: password });
  },
  logout: function() {
    return axios.get("api/user/logout");
  },
  auth: function() {
    return axios.get("api/user/login");
  },
  create: function(userObj) {
    return axios.post("api/user/register", userObj);
  },
  delete: function(id) {
    return axios.delete(`api/user/${id}`);
  }
};