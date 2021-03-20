'use strict';


/**
 * Get an activity
 *
 * returns Activity
 **/
exports.activity = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "activity" : "activity",
  "accessibility" : 5.962134,
  "price" : 6,
  "link" : "link",
  "type" : "type",
  "key" : 1,
  "participants" : 0
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get a fortune
 *
 * returns Fortune
 **/
exports.fortune = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = { };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get a joke
 *
 * returns Joke
 **/
exports.joke = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "delivery" : "delivery",
  "flags" : "{}",
  "safe" : true,
  "setup" : "setup",
  "id" : 0,
  "error" : true,
  "category" : "category",
  "type" : "type",
  "lang" : "lang",
  "joke" : "joke"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get some questions and answers
 *
 * amount Long The amount of questions you want to receive
 * returns Quiz
 **/
exports.quiz = function(amount) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "response_code" : 0,
  "results" : [ "{}", "{}" ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get some sightseeing in a radius
 *
 * city String The city you want to look up
 * radius String The search radius
 * returns Sightseeing
 **/
exports.sightseeing = function(city,radius) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "xid" : "xid",
  "rate" : 6,
  "name" : "name",
  "osm" : "osm",
  "dist" : 0.8008282,
  "kinds" : "kinds",
  "wikidata" : "wikidata",
  "point" : "{}"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

