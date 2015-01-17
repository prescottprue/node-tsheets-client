'use strict';

var should = require('chai').should();
var api = require('../lib/tsheets-api.js');
var internals = { VALID_API_TOKEN: process.env.NODE_TSHEETS_API_CLIENT_TOKEN };

describe(__filename, function() {

  describe('makeRequest', function() {

    describe('GET /current_user', function() {

      describe('with valid token', function() {
        var params;

        beforeEach(function() {
          params = internals.createReportTimeParams();
        });

        it('should return a response object', function(done) {
          api.makeRequest(params, function(err, result) {
            should.not.exist(err);
            should.exist(result);
            done();
          });
        });

      });

      describe('with invalid api_token', function() {
        var params;

        beforeEach(function() {
          params = internals.createReportTimeParams();
          params.api_token = 'foo';
        });

        it('should callback with an error', function(done) {
          api.makeRequest(params, function(err, result) {
            should.exist(err);
            should.not.exist(result);
            done();
          });
        });

      });

    });

  });


  describe('internals.validateReportTimeParams', function() {
    var params_to_test = ['api_token', 'endpoint', 'method', 'body_params'];

    params_to_test.forEach(function(param_name) {
      describe('with missing ' + param_name, function() {

        it('should throw error', function() {
          internals.assertMissingParamFailsValidation(param_name);
        });

      });
    });

  });


  describe('internals.getRequestOptions', function() {

    describe('with GET /current_user', function() {
      var params;

      beforeEach(function() {
        params = internals.createReportTimeParams();
        params.body_params = {
          foo: 'bar'
        };
      });

      it('should return a valid request params object', function() {
        var opts = api.internals.getRequestOptions(params);

        opts.should.eql({
          method: params.method,
          url: 'https://rest.tsheets.com/api/v1/current_user',
          headers: {
            'Authorization': 'Bearer ' + params.api_token
          },
          json: {
            data: params.body_params
          }
        });
      });

    });

  });

});


internals.createReportTimeParams = function() {
  return {
    endpoint: '/current_user',
    method: 'get',
    body_params: {},
    api_token: internals.VALID_API_TOKEN
  };
};


internals.assertMissingParamFailsValidation = function(param_name) {
  var params = internals.createReportTimeParams();
  delete params[param_name];

  (function() {
    api.internals.validateReportTimeParams(params);
  }).should.throw();
};
