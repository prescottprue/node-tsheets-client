'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var apiUrl = exports.apiUrl = 'https://rest.tsheets.com/api/v1';
var defaults = exports.defaults = { startDate: '2014-01-01' }; // end is today by default
var tokenVarName = exports.tokenVarName = 'TSHEETS_TOKEN';
exports.default = { apiUrl: apiUrl, defaults: defaults, tokenVarName: tokenVarName };