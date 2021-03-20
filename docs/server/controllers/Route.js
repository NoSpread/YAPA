'use strict';

var utils = require('../utils/writer.js');
var Route = require('../service/RouteService');

module.exports.routeDriving = function routeDriving (req, res, next) {
  var start = req.swagger.params['start'].value;
  var end = req.swagger.params['end'].value;
  Route.routeDriving(start,end)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.routeTransit = function routeTransit (req, res, next) {
  var start = req.swagger.params['start'].value;
  var end = req.swagger.params['end'].value;
  var timetype = req.swagger.params['timetype'].value;
  var time = req.swagger.params['time'].value;
  Route.routeTransit(start,end,timetype,time)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.routeWalking = function routeWalking (req, res, next) {
  var start = req.swagger.params['start'].value;
  var end = req.swagger.params['end'].value;
  Route.routeWalking(start,end)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
