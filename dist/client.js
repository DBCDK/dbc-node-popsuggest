'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getPopSuggestions = getPopSuggestions;
exports.getEntitySuggestions = getEntitySuggestions;
exports.init = init;

var _es6Promise = require('es6-promise');

var _nodeRestClient = require('node-rest-client');

var client = new _nodeRestClient.Client();

var endpoint = null;
var profile = null;
var popSuggestWebService = '';
var entitySuggestWebService = '';

/**
 * Retrieves data from the webservice based on the parameters given
 *
 * @param {Object} params Parameters for the request
 * @param {string} service
 * @return {Promise}
 */
function sendRequest(params, service) {
  return new _es6Promise.Promise(function (resolve, reject) {
    client.get(service, params, function (data, response) {
      if (response.statusCode === 200) {
        data.params = params;
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

function setPopSuggestURL(servicePort) {
  var query = '${method}?query=${index}:${query}*';
  var fields = '&fields=${fields}';
  var profileParam = profile ? ' and rec.collectionIdentifier:' + profile : '';
  var port = ':' + servicePort + '/';

  return endpoint + port + query + profileParam + fields + '&rows=100';
}

/**
 * Constructs the objects of parameters for this type of request.
 * As the query is expected to be an array it is possible to make multiple
 * requests at once, each returned as a Promise.
 *
 * @param {array} value Array of parameter-objects each representing a request
 * @return {Promise} A promise is returned
 */

function getPopSuggestions(value) {
  var params = {
    path: {
      method: 'suggest',
      index: value.index,
      query: value.query,
      fields: value.fields.toString()
    }
  };

  return sendRequest(params, popSuggestWebService);
}

function setEntitySuggestURL(servicePort) {
  var query = '${method}/${index}?query=${query}&lt=folkebibliotek';
  // const profileParam = profile ? ' and rec.collectionIdentifier:' + profile : '';
  var port = ':' + servicePort + '/';

  return endpoint + port + query;
}

/**
 * Constructs the objects of parameters for this type of request.
 * As the query is expected to be an array it is possible to make multiple
 * requests at once, each returned as a Promise.
 *
 * @param {array} value Array of parameter-objects each representing a request
 * @return {Promise} A promise is returned
 */

function getEntitySuggestions(value) {
  var params = {
    path: {
      method: 'entity-suggest',
      query: value.query,
      index: value.index
    }
  };

  return sendRequest(params, entitySuggestWebService);
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
  var config = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

  if (!config || !config.endpoint) {
    throw new Error('Expected config object but got null or no endpoint provided');
  }

  if (config.profile) {
    profile = config.profile;
  }

  endpoint = config.endpoint;
  popSuggestWebService = setPopSuggestURL(config.popsuggestPort);
  entitySuggestWebService = setEntitySuggestURL(config.entitySuggestPort);

  return { getPopSuggestions: getPopSuggestions, getEntitySuggestions: getEntitySuggestions };
}

var METHODS = {
  getPopSuggestions: getPopSuggestions,
  getEntitySuggestions: getEntitySuggestions
};
exports.METHODS = METHODS;