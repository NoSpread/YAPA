'use strict';


/**
 * Get the current news about a topic
 *
 * topic String The topic you want to have news about
 * returns News
 **/
exports.news = function(topic) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "totalResults" : 0,
  "articles" : [ "{}", "{}" ],
  "status" : "status"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get the current headlines about a topic
 *
 * topic String The topic you want to have news about
 * returns News
 **/
exports.newsHeadlines = function(topic) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "totalResults" : 0,
  "articles" : [ "{}", "{}" ],
  "status" : "status"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

