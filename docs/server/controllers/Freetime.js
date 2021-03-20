'use strict';

var utils = require('../utils/writer.js');
var Freetime = require('../service/FreetimeService');

module.exports.activity = function activity (req, res, next) {
  Freetime.activity()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.fortune = function fortune (req, res, next) {
  Freetime.fortune()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.joke = function joke (req, res, next) {
  Freetime.joke()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.quiz = function quiz (req, res, next) {
  var amount = req.swagger.params['amount'].value;
  Freetime.quiz(amount)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.sightseeing = function sightseeing (req, res, next) {
  var city = req.swagger.params['city'].value;
  var radius = req.swagger.params['radius'].value;
  Freetime.sightseeing(city,radius)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
