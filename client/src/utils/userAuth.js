import userAPI from "./userAPI";

const userAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    userAPI.auth().then(res => {
      userAuth.result(res.data, cb);
    });
  },
  signout(cb) {
    userAPI.logout().then(res => {
      userAuth.result(res.data, cb);
    });
  },
  result(res, cb) {
    userAuth.isAuthenticated = res.user ? true : false;
    userAuth.user = res;
    cb({ authenticated: userAuth.isAuthenticated, user: userAuth.user });
  },
  user: {
    username: "",
    type: ""
  },
  setUser(username, type) {
    this.user = {
      username: username,
      type: type
    }
  }
};

export default userAuth;