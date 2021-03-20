'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

module.exports.addUser = function addUser (req, res, next) {
  var username = req.swagger.params['username'].value;
  var password = req.swagger.params['password'].value;
  User.addUser(username,password)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.loginUser = function loginUser (req, res, next) {
  var username = req.swagger.params['username'].value;
  var password = req.swagger.params['password'].value;
  User.loginUser(username,password)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.logoutUser = function logoutUser (req, res, next) {
  User.logoutUser()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
