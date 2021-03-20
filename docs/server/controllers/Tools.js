'use strict';

var utils = require('../utils/writer.js');
var Tools = require('../service/ToolsService');

module.exports.stock = function stock (req, res, next) {
  var symbol = req.swagger.params['symbol'].value;
  Tools.stock(symbol)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.translate = function translate (req, res, next) {
  var query = req.swagger.params['query'].value;
  var source = req.swagger.params['source'].value;
  var target = req.swagger.params['target'].value;
  Tools.translate(query,source,target)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
