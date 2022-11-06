const signUp = require("./signUp");
const login = require("./login");
const logout = require("./logout");
const verify = require("./verify");
const resendEmail= require('./resendEmail')
module.exports = {
  signUp,
  login,
  logout,
  verify,
  resendEmail,
};
