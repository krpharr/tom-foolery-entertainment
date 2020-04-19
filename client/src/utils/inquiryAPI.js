import axios from "axios";

export default {
  getAll: function() {
    return axios.get("api/inquiry");
  },
  getById: function(id) {
    return axios.get(`api/inquiry/${id}`);
  },
  post: function(inquiryObj) {
    return axios.post("api/inquiry", inquiryObj);
  },
  update: function(id, inquiryObj) {
    return axios.put(`api/inquiry/${id}`, inquiryObj);
  }
};