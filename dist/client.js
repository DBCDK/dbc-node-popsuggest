'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.init = init;

var _es6Promise = require('es6-promise');

var _nodeRestClient = require('node-rest-client');

var client = new _nodeRestClient.Client();

var endpoint = null;
var profile = null;
var serviceCallback = '';

/**
 * Retrieves data from the webservice based on the parameters given
 *
 * @param {Object} params Parameters for the request
 * @return {Promise}
 */
function sendRequest(params) {
  return new _es6Promise.Promise(function (resolve, reject) {
    client.get(serviceCallback, params, function (data, response) {
      if (response.statusCode === 200) {
        resolve(data);
      } else {
        console.log('adsf');
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

function setServiceCallback() {
  var query = '${method}?query=${index}:${query}*';
  var fields = '&fields=${fields}';
  var profileParam = profile ? ' and rec.collectionIdentifier:' + profile : '';

  return endpoint + query + profileParam + fields + '&rows=100';
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

  if (config.profile) {
    profile = config.profile;
  }

  endpoint = config.endpoint;
  serviceCallback = setServiceCallback();
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

var METHODS = {
  getSuggestions: getSuggestions
};
exports.METHODS = METHODS;