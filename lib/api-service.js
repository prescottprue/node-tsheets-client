'use strict';

var internals = {
  API_BASE_URI: 'https://rest.tsheets.com/api/v1'
};

exports.makeRequest = makeRequest;


/**
 * Makes a request to the TSheets API.
 * @param token
 * @param endpoint
 * @param method
 * @param params
 * @param callback
 */
function makeRequest(token, endpoint, method, params, callback) {
  // TODO: add token as header (Authorization: Bearer <token>)
  // TODO: wrap params in body
  // TODO: make actual request
}
