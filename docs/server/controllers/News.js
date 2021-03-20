'use strict';

var utils = require('../utils/writer.js');
var News = require('../service/NewsService');

module.exports.news = function news (req, res, next) {
  var topic = req.swagger.params['topic'].value;
  News.news(topic)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.newsHeadlines = function newsHeadlines (req, res, next) {
  var topic = req.swagger.params['topic'].value;
  News.newsHeadlines(topic)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
