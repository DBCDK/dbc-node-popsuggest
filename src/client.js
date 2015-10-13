'use strict';

import {Promise} from 'es6-promise';
import {Client} from 'node-rest-client';
var client = new Client();

let endpoint = null;
let profile = null;
let libraryType = null;
let popSuggestWebService = '';
let entitySuggestWebService = '';
let Logger = null;

/**
 * Retrieves data from the webservice based on the parameters given
 *
 * @param {Object} params Parameters for the request
 * @param {string} service
 * @return {Promise}
 */
function sendRequest(params, service) {
  return new Promise((resolve, reject) => {
    if (Logger) {
      Logger.info('suggest client request with params', params);
    }

    client.get(service, params, (data, response) => {
      if (Logger) {
        Logger.info('suggest client responded with data', {path: response.req.path, params: params, data: data});
      }

      if (response.statusCode === 200) {
        data.params = params;
        resolve(data);
      }
      else {
        if (Logger) {
          Logger.error('suggest client responded with an error', {path: response.req.path, params: params, statusCode: response.statusCode});
        }

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
  const query = '${method}?query=${index}:${query}*';
  const fields = '&fields=${fields}';
  const profileParam = profile ? ' and rec.collectionIdentifier:' + profile : '';
  const port = ':' + servicePort + '/';

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
export function getPopSuggestions(value) {
  const params = {
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
  const query = '${method}/${index}?query=${query}&lt=' + libraryType;
  const port = ':' + servicePort + '/';

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
export function getEntitySuggestions(value) {
  const params = {
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
export function init(config) {

  if (!config || !config.endpoint) {
    throw new Error('Expected config object but got null or no endpoint provided');
  }

  if (config.profile) {
    profile = config.profile;
  }

  if (config.logger) {
    Logger = config.logger;
  }

  endpoint = config.endpoint;
  libraryType = config.libraryType || 'folkebibliotek';
  popSuggestWebService = setPopSuggestURL(config.popsuggestPort);
  entitySuggestWebService = setEntitySuggestURL(config.entitySuggestPort);

  return {getPopSuggestions, getEntitySuggestions};
}

export const METHODS = {
  getPopSuggestions: getPopSuggestions,
  getEntitySuggestions: getEntitySuggestions
};
