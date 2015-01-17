'use strict';

var should = require('chai').should();
var service = require('../lib/tsheets-service.js');
var internals = {
  TEST_USER_ID: 1855621,
  TEST_JOBCODE_ID: 9812392,
  VALID_API_TOKEN: process.env.NODE_TSHEETS_API_CLIENT_TOKEN
};

describe(__filename, function() {

  describe('reportTime', function() {

    describe('with valid params', function() {
      var params;

      beforeEach(function() {
        params = internals.createReportTimeParams();
      });

      it('should invoke API without error', function(done) {
        service.reportTime(params, function(err, result) {
          should.not.exist(err);
          should.exist(result);
          done();
        });
      });

    });

  });

  describe('internals.validateReportTimeParams', function() {

    describe('with all params valid', function() {

      it('should return validated object', function() {
        var params = internals.createReportTimeParams(),
            validated = service.internals.validateReportTimeParams(params);
        validated.should.have.keys([
          'api_token',
          'user_id',
          'jobcode_id',
          'duration_seconds',
          'date'
        ]);
      });

    });

    describe('with invalid params', function() {
      var params_to_test = ['api_token', 'user_id', 'jobcode_id', 'duration_seconds', 'date'];

      params_to_test.forEach(function(param_name) {
        describe('with missing ' + param_name, function() {

          it('should throw error', function() {
            internals.assertMissingParamFailsValidation(param_name);
          });

        });
      });

    });

  });

  describe('internals.createReportTimeRequestParams', function() {

    describe('with valid params', function() {
      var params;

      beforeEach(function() {
        params = internals.createReportTimeParams();
      });

      it('should return request params with POST to /timesheets', function() {
        var req_params = service.internals.createReportTimeRequestParams(params);
        req_params.should.eql({
          api_token: params.api_token,
          method: 'post',
          endpoint: '/timesheets',
          body_params: [
            {
              user_id: params.user_id,
              jobcode_id: params.jobcode_id,
              duration: params.duration_seconds,
              date: params.date,
              type: 'manual'
            }
          ]
        });
      });

    });

  });

});


internals.createReportTimeParams = function() {
  return {
    api_token: internals.VALID_API_TOKEN,
    user_id: internals.TEST_USER_ID,
    jobcode_id: internals.TEST_JOBCODE_ID,
    duration_seconds: 2,
    date: '2015-01-17'
  };
};


internals.assertMissingParamFailsValidation = function(param_name) {
  var params = internals.createReportTimeParams();
  delete params[param_name];

  (function() {
    service.internals.validateReportTimeParams(params);
  }).should.throw();
};
