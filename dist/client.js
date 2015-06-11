'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.init = init;
exports.getSuggestions = getSuggestions;

var _es6Promise = require('es6-promise');

var _nodeRestClient = require('node-rest-client');

var client = new _nodeRestClient.Client();

var endpoint = null; // eslint-disable-line no-process-env

/**
 * Retrieves data from the webservice based on the parameters given
 *
 * @param {Object} params Parameters for the request
 * @return {Promise}
 */
function sendRequest(params) {
  return new _es6Promise.Promise(function (resolve, reject) {
    client.get(endpoint + '${method}?query="${index}:${query}*"&fields=${fields}"', params, function (data, response) {
      if (response.statusCode === 200) {
        resolve(data);
      } else {
        reject({
          type: 'Error',
          statusCode: response.statusCode,
          statusMessage: response.statusMessage,
          response: response
        });
      }
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

function init() {
  var config = arguments[0] === undefined ? null : arguments[0];

  if (!config || !config.endpoint) {
    throw new Error('Expected config object but got null or no endpoint provided');
  }

  endpoint = config.endpoint;
}

/**
 * Constructs the objects of parameters for this type of request.
 * As the query is expected to be an array it is possible to make multiple
 * requests at once, each returned as a Promise.
 *
 * @param {Array} query Array of parameter-objects each representing a request
 * @return {Array} An array of promises is returned
 */

function getSuggestions() {
  var query = arguments[0] === undefined ? [] : arguments[0];

  var requests = [];
  query.forEach(function (value) {

    var params = {
      path: {
        method: 'suggest',
        index: value.index,
        query: value.query,
        fields: value.fields.toString()
      }
    };

    requests.push(sendRequest(params));
  });

  return requests;
}