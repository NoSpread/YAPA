'use strict';

var utils = require('../utils/writer.js');
var Weather = require('../service/WeatherService');

module.exports.weatherForcast = function weatherForcast (req, res, next) {
  var loc = req.swagger.params['loc'].value;
  var days = req.swagger.params['days'].value;
  Weather.weatherForcast(loc,days)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.weatherNow = function weatherNow (req, res, next) {
  var loc = req.swagger.params['loc'].value;
  Weather.weatherNow(loc)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
