'use strict';


/**
 * Get route informations between two waypoints while driving
 *
 * start String The start waypoint
 * end String The end waypoint
 * returns Route
 **/
exports.routeDriving = function(start,end) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "travelDuration" : 0,
  "travelDistance" : 1.4658129,
  "travelDurationTraffic" : 6
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get route informations between two waypoints while using transit
 *
 * start String The start waypoint
 * end String The end waypoint
 * timetype List What kind of time you are looking for
 * time String The time your searching a transit
 * returns Route
 **/
exports.routeTransit = function(start,end,timetype,time) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "travelDuration" : 0,
  "travelDistance" : 1.4658129,
  "travelDurationTraffic" : 6
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get route informations between two waypoints while walking
 *
 * start String The start waypoint
 * end String The end waypoint
 * returns Route
 **/
exports.routeWalking = function(start,end) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "travelDuration" : 0,
  "travelDistance" : 1.4658129,
  "travelDurationTraffic" : 6
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

