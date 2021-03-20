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
  "weather" : {
    "temp" : 0.8008282,
    "update" : "2000-01-23T04:56:07.000+00:00",
    "cond" : "cond",
    "wind" : {
      "dir" : "dir",
      "speed" : 6.0274563
    }
  },
  "location" : {
    "country" : "country",
    "name" : "name",
    "region" : "region"
  },
  "forecast" : [ {
    "date" : "2000-01-23T04:56:07.000+00:00",
    "rain" : 5,
    "avg_temp" : 0.8008282,
    "snow" : 1,
    "cond" : "cond",
    "wind" : 6.0274563
  }, {
    "date" : "2000-01-23T04:56:07.000+00:00",
    "rain" : 5,
    "avg_temp" : 0.8008282,
    "snow" : 1,
    "cond" : "cond",
    "wind" : 6.0274563
  } ]
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
  "weather" : {
    "temp" : 0.8008282,
    "update" : "2000-01-23T04:56:07.000+00:00",
    "cond" : "cond",
    "wind" : {
      "dir" : "dir",
      "speed" : 6.0274563
    }
  },
  "location" : {
    "country" : "country",
    "name" : "name",
    "region" : "region"
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

