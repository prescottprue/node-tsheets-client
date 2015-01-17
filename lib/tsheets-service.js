'use strict';

var joi = require('joi');

var api_service = require('./tsheets-api.js'),
    validator = require('./validator.js');

var internals = {
  report_time_validation_schema: joi.object().required().keys({
    api_token: joi.string().required(),
    user_id: joi.number().required(),
    jobcode_id: joi.number().required(),
    duration_seconds: joi.number().required(),
    date: joi.string().required()
  })
};


/**
 * Reports time for a user in a job code.
 *
 * @type {Function}
 * @param {Object} params To be validated: api_token, jobcode_id, user_id, duration_seconds, date.
 * @param {Function} callback Invoked with [err, result].
 */
exports.reportTime = function(params, callback) {
  var validated_params,
      req_params;

  try {
    validated_params = internals.validateReportTimeParams(params);
  }
  catch (e) {
    setImmediate(callback, e);
    return;
  }

  req_params = internals.createReportTimeRequestParams(validated_params);
  api_service.makeRequest(req_params, callback);
};


internals.validateReportTimeParams = function(params) {
  return validator.validateParams(params, internals.report_time_validation_schema);
};


internals.createReportTimeRequestParams = function(valid_params) {
  return {
    api_token: valid_params.api_token,
    method: 'post',
    endpoint: '/timesheets',
    body_params: [
      {
        type: 'manual',
        jobcode_id: valid_params.jobcode_id,
        user_id: valid_params.user_id,
        duration: valid_params.duration_seconds,
        date: valid_params.date
      }
    ]
  };
};


/* istanbul ignore else */
if (process.env.NODE_ENV === 'test') {
  /** @type Object */
  exports.internals = internals;
}
