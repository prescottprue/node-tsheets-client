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

    describe('exports.reportTime', function() {

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

    describe.skip('internals.validateReportTimeParams', function() {

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

  describe('getTimesheets', function() {

    describe('exports.getTimesheets', function() {

      describe('with valid params', function() {
        var params;

        beforeEach(function() {
          params = internals.createGetTimesheetsParams();
        });

        it('should invoke API without error', function(done) {
          service.getTimesheets(params, function(err, result) {
            should.not.exist(err);
            should.exist(result);
            done();
          });
        });

        it('should return an object with timesheets mapped by user', function(done) {
          service.getTimesheets(params, function(err, result) {
            should.not.exist(err);
            result.should.be.an('object');
            done();
          });
        });

      });

    });

    describe('getJobcodes', function() {

      describe('exports.getJobcodes', function() {

        describe.skip('with valid params', function() {
          var params;

          beforeEach(function() {
            params = internals.createGetJobcodeParams();
          });

          it('should invoke API without error', function(done) {
            service.getJobcodes(params, function(err, result) {
              should.not.exist(err);
              should.exist(result);
              done();
            });
          });

          it('should return an object with jobcodes mapped by user', function(done) {
            service.getJobcodes(params, function(err, result) {
              should.not.exist(err);
              result.should.be.an('object');
              done();
            });
          });

        });

      });
    });

    describe.skip('internals.validateGetTimesheetsParams', function() {

      describe('with all params valid', function() {

        it('should return validated object', function() {
          var params = internals.createGetTimesheetsParams(),
              validated = service.internals.validateGetTimesheetsParams(params);
          validated.should.have.keys([
            'api_token',
            'user_ids',
            'start_date',
            'end_date',
            'page'
          ]);
        });

      });

      describe('without page param', function() {
        var params;

        before(function() {
          params = internals.createGetTimesheetsParams();
          delete params.page;
        });

        it('should return validated object', function() {
          var validated = service.internals.validateGetTimesheetsParams(params);
          validated.should.have.keys([
            'api_token',
            'user_ids',
            'start_date',
            'end_date'
          ]);
        });

      });

      describe('with invalid params', function() {
        var params_to_test = [
          'api_token',
          'start_date',
          'end_date'
        ];

        params_to_test.forEach(function(param_name) {
          describe('with missing ' + param_name, function() {

            it('should throw error', function() {
              internals.assertMissingGetTimesheetsParamFailsValidation(param_name);
            });

          });
        });

      });

    });

    describe('internals.createGetTimesheetsRequestParams', function() {

      describe('with complete and valid params', function() {
        var params;

        beforeEach(function() {
          params = internals.createGetTimesheetsParams();
        });

        it('should return request params with GET to /timesheets', function() {
          var req_params = service.internals.createGetTimesheetsParams(params);
          req_params.should.eql({
            api_token: params.api_token,
            method: 'get',
            endpoint: '/timesheets',
            qs: {
              user_ids: params.user_ids,
              page: params.page,
              start_date: params.start_date,
              end_date: params.end_date
            }
          });
        });
      });

      describe('without user_ids', function() {
        var params;

        beforeEach(function() {
          params = internals.createGetTimesheetsParams();
          delete params.user_ids;
        });

        it('should return request params with GET to /timesheets', function() {
          var req_params = service.internals.createGetTimesheetsParams(params);
          req_params.should.eql({
            api_token: params.api_token,
            method: 'get',
            endpoint: '/timesheets',
            qs: {
              start_date: params.start_date,
              page: params.page,
              end_date: params.end_date
            }
          });
        });
      });

    });

  });

});


internals.createGetTimesheetsParams = function() {
  return {
    api_token: internals.VALID_API_TOKEN,
    user_ids: [internals.TEST_USER_ID],
    start_date: '2015-01-19',
    end_date: '2015-01-25',
    page: 1
  };
};


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


internals.assertMissingGetTimesheetsParamFailsValidation = function(param_name) {
  var params = internals.createGetTimesheetsParams();
  delete params[param_name];

  (function() {
    service.internals.validateGetTimesheetsParams(params);
  }).should.throw();
};
