'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = exports.create = exports.add = exports.post = exports.put = exports.remove = exports.get = exports.makeRequest = undefined;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _config = require('../config');

var _env = require('./env');

var _index = require('./index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Makes an authenticated request to the TSheets API.
 * @param {Object} params Token, endpoint, method, body_params.
 * @return {Promise}
 */
var makeRequest = exports.makeRequest = function makeRequest(params) {
  var endpoint = params.endpoint;
  var method = params.method;
  var body = params.body;
  var qs = params.qs;


  var opts = {
    url: _config.apiUrl + '/' + endpoint.replace('/', ''),
    method: method,
    json: true,
    headers: {
      Authorization: 'Bearer ' + (0, _env.getVar)(_config.tokenVarName)
    }
  };

  if (body && Object.keys(body).length) opts.json = { data: body };
  if (qs) opts.qs = qs;

  return new Promise(function (resolve, reject) {
    (0, _request2.default)(opts, function (err, res, json) {
      if (err) return reject(err);
      if (res.statusCode >= 300) {
        return reject(new Error('Invalid response, statusCode=' + res.statusCode));
      }
      resolve(json);
    });
  });
};

var get = exports.get = function get(endpoint) {
  return function (qs) {
    return makeRequest({ endpoint: endpoint, method: 'get', qs: qs });
  };
};

var remove = exports.remove = function remove(endpoint) {
  return function (body, qs) {
    return makeRequest({ endpoint: endpoint, method: 'remove', body: body, qs: qs });
  };
};

var put = exports.put = function put(endpoint) {
  return function (body) {
    return makeRequest({ endpoint: endpoint, method: 'put', body: body });
  };
};

var post = exports.post = function post(endpoint) {
  return function (body) {
    return makeRequest({ endpoint: endpoint, method: 'post', body: body });
  };
};

var add = exports.add = post;
var create = exports.create = post;
var update = exports.update = put;

exports.default = function (endpoint, types) {
  var methods = {
    get: get,
    remove: remove,
    update: update,
    create: create,
    add: add
  };

  return (0, _index.typeReducer)(endpoint, types, methods, 'cruder');
};