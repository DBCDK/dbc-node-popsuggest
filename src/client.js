'use strict';

import {Promise} from 'es6-promise';
import {Client} from 'node-rest-client';
var client = new Client();

let endpoint = null; // eslint-disable-line no-process-env

/**
 * Retrieves data from the webservice based on the parameters given
 *
 * @param {Object} params Parameters for the request
 * @return {Promise}
 */
function sendRequest(params) {
  return new Promise((resolve, reject) => {
    client.get(endpoint + '${method}?query="${index}:${query}*"&fields=${fields}"', params, (data, response) => {
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
export function getSuggestions(query = []) {
  let requests = [];
  query.forEach((value) => {

    const params = {
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
