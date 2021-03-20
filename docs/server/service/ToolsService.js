'use strict';


/**
 * Get the current stock prices
 *
 * symbol String The symbol you want to have updates about
 * returns Stock
 **/
exports.stock = function(symbol) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "c" : "c",
  "pc" : "pc",
  "t" : "t",
  "h" : "h",
  "l" : "l",
  "o" : "o"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get a translation
 *
 * query String The text you want to translate
 * source String The source language
 * target String The target language
 * returns Translation
 **/
exports.translate = function(query,source,target) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "output" : "output",
  "input" : "input"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

