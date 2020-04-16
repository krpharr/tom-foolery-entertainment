import axios from "axios";

export default {
  login: function(username, password) {
    return axios.post("api/user/login", { username: username, password: password });
  }
};