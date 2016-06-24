'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeReducer = exports.today = exports.env = undefined;

var _env2 = require('./env');

var _env3 = _interopRequireDefault(_env2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var env = exports.env = _env3.default;
// Creates current time in tsheets format
var today = exports.today = function today() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; // January is 0
  var yyyy = today.getFullYear();
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  return yyyy + '-' + mm + '-' + dd;
};

var typeReducer = exports.typeReducer = function typeReducer(endpoint, types, methods, name) {
  return types.reduce(function (returnedMethods, type) {
    var method = {};
    if (typeof methods[type] === 'undefined') {
      throw Error(type + ' is not a valid ' + (name ? 'method of ' + name : 'method'));
    }
    method[type] = methods[type].call(undefined, endpoint);
    return Object.assign({}, returnedMethods, method);
  }, {});
};

exports.default = Object.assign({}, { today: today, typeReducer: typeReducer });