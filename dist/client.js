'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = PopSuggest;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _lodash = require('lodash');

/**
 * Retrieves data from the webservice based on the parameters given
 *
 * @param {Object} params Parameters for the request
 * @param {string} service
 * @return {Promise}
 */
function sendRequest(uri, qs) {
  return new Promise(function (resolve, reject) {
    _request2['default'].get({ uri: uri, qs: qs }, function (err, response, body) {
      if (err) {
        reject(err);
      } else if (response.statusCode !== 200) {
        reject(response);
      } else {
        var data = JSON.parse(body);
        resolve(data);
      }
    });
  });
}

/**
 * Constructs the objects of parameters for this type of request.
 * As the query is expected to be an array it is possible to make multiple
 * requests at once, each returned as a Promise.
 *
 * @param {Object} config
 * @param {Object} params
 *
 * @return {Promise} A promise is returned
 */
function getPopSuggestions(config, params) {
  var index = params.index && params.index + ':' || '';
  var filter = params.filter || config.filter;
  var qs = {
    query: '' + index + params.query + '*',
    rows: params.rows || 100,
    fields: params.fields && params.fields.toString() || null,
    filter: filter.toString() || null,
    start: params.start || 0
  };
  return sendRequest(config.uri, qs);
}

/**
 * Initializes client and return api functions
 *
 * @param {Object} config Requires endpoint and port
 * @returns {{getPopSuggestions}}
 */

function PopSuggest(config) {
  if (!config) {
    throw new Error('no config object provided');
  }

  ['endpoint', 'port'].forEach(function (key) {
    if (!config[key]) {
      throw new Error('no ' + key + ' provided in config');
    }
  });

  var uri = config.endpoint + ':' + config.port + '/suggest';
  var filter = config.profile && ['rec.collectionIdentifier:' + config.profile] || [];

  return {
    getPopSuggestions: (0, _lodash.curry)(getPopSuggestions)({ uri: uri, filter: filter })
  };
}

module.exports = exports['default'];