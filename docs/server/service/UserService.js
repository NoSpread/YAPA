'use strict';


/**
 * Add a new user to the db
 *
 * username String Username of the new user
 * password String Password of the new user
 * no response value expected for this operation
 **/
exports.addUser = function(username,password) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Login as a user
 *
 * username String Username of the user
 * password String Password of the user
 * returns LoginResponse
 **/
exports.loginUser = function(username,password) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "id" : 0,
  "api" : "api",
  "username" : "username"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Logout as a user
 *
 * no response value expected for this operation
 **/
exports.logoutUser = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

