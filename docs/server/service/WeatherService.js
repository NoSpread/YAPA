'use strict';


/**
 * Get the future weather for your location
 *
 * loc String The location you are requesting the weather from
 * days Long The location you are requesting the weather from
 * returns WeatherForecast
 **/
exports.weatherForcast = function(loc,days) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "weather" : "{}",
  "location" : "{}",
  "forecast" : [ "{}", "{}" ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get the current weather for your location
 *
 * loc String The location you are requesting the weather from
 * returns WeatherNow
 **/
exports.weatherNow = function(loc) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "weather" : "{}",
  "location" : "{}"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

