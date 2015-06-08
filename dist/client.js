'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.init = init;
exports.getSuggestions = getSuggestions;

var _es6Promise = require('es6-promise');

var _nodeRestClient = require('node-rest-client');

var client = new _nodeRestClient.Client();

var endpoint = process.env.POPSUGGEST_ENDPOINT || null; // eslint-disable-line no-process-env

/**
 * Retrieves data from the webservice based on the parameters given
 *
 * @param {Object} params Parameters for the request
 * @return {Promise}
 */
function sendRequest(params) {
  return new _es6Promise.Promise(function (resolve, reject) {
    client.get(endpoint + '${method}?query=${index}&fields=${fields}', params, function (data, response) {
      resolve(data);
    });
  });
}

/**
 * Setting the necessary paramerters for the client to be usable.
 * The endpoint is only set if endpoint is null to allow setting it through
 * environment variables.
 *
 * @param {Object} config Config object with the necessary parameters to use
 * the webservice
 */

function init(config) {
  console.log('init: ', config);
  if (!endpoint) {
    endpoint = config.endpoint;
  }
}

/**
 * Constructs the objects of parameters for this type of request.
 *
 * @param {Object} query Parameters for the request
 * @return {Promise}
 */

function getSuggestions() {
  var query = arguments[0] === undefined ? {} : arguments[0];

  var params = {
    path: {
      method: 'suggest'
    },
    parameters: {
      index: query.index,
      fields: query.fields.toString()
    }
  };

  return sendRequest(params);
}