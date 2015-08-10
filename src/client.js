'use strict';

import {Promise} from 'es6-promise';
import {Client} from 'node-rest-client';
var client = new Client();

let endpoint = null;
let profile = null;
let serviceCallback = '';

/**
 * Retrieves data from the webservice based on the parameters given
 *
 * @param {Object} params Parameters for the request
 * @return {Promise}
 */
function sendRequest(params) {
  return new Promise((resolve, reject) => {
    client.get(serviceCallback, params, (data, response) => {
      if (response.statusCode === 200) {
        resolve(data);
      }
      else {
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
  const query = '${method}?query=${index}:${query}*';
  const fields = '&fields=${fields}';
  const profileParam = profile ? ' and rec.collectionIdentifier:' + profile : '';

  return endpoint + query + profileParam + fields + '&rows=100';
}

/**
 * Constructs the objects of parameters for this type of request.
 * As the query is expected to be an array it is possible to make multiple
 * requests at once, each returned as a Promise.
 *
 * @param {Array} query Array of parameter-objects each representing a request
 * @return {Array} An array of promises is returned
 */
export function getSuggestions(value) {
  const params = {
    path: {
      method: 'suggest',
      index: value.index,
      query: value.query,
      fields: value.fields.toString()
    }
  };

  return sendRequest(params);
}

/**
 * Setting the necessary paramerters for the client to be usable.
 * The endpoint is only set if endpoint is null to allow setting it through
 * environment variables.
 *
 * @param {Object} config Config object with the necessary parameters to use
 * the webservice
 */
export function init(config = null) {
  if (!config || !config.endpoint) {
    throw new Error('Expected config object but got null or no endpoint provided');
  }

  if (config.profile) {
    profile = config.profile;
  }

  endpoint = config.endpoint;
  serviceCallback = setServiceCallback();

  return {getSuggestions};
}

export const METHODS = {
  getSuggestions: getSuggestions
};
