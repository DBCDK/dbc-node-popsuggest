'use strict';

import request from 'request';
import {curry} from 'lodash';

/**
 * Retrieves data from the webservice based on the parameters given
 *
 * @param {Object} params Parameters for the request
 * @param {string} service
 * @return {Promise}
 */
function sendRequest(logger, uri, qs) {
  return new Promise((resolve, reject) => {
    logger.log('suggest client request with params', qs);
    request.get({uri, qs}, (err, response, body) => {
      if (err) {
        logger.error('suggest client responded with an error', {err});
        reject(err);
      }
      else if (response.statusCode !== 200) {
        logger.error('uri responds with fail statusCode', {path: uri, statusCode: response.statusCode});
        reject(response);
      }
      else {
        const data = JSON.parse(body);
        resolve(data);
        logger.info('suggest client responded with data', {path: uri, params: qs, data: data});
      }
    });
  });
}

/**
 * Constructs the objects of parameters for this type of request.
 * As the query is expected to be an array it is possible to make multiple
 * requests at once, each returned as a Promise.
 *
 * @param {array} value Array of parameter-objects each representing a request
 * @return {Promise} A promise is returned
 */
function getPopSuggestions(config, params) {
  const index = params.index && `${params.index}:` || '';
  const filter = params.filter && params.filter.concat(config.filter) || config.filter;
  const qs = {
    query: `${index}${params.query}*`,
    rows: params.rows || 100,
    fields: params.fields && params.fields.toString() || null,
    filter: filter.toString() || null,
    start: params.start || 0
  };
  return sendRequest(config.logger, config.uri, qs);
}

/**
 * Initializes client and return api functions
 *
 * @param {Object} config Requires endpoint and port
 * @returns {getPopSuggestions}
 */
export function init(config) {
  if (!config) {
    throw new Error('no config object provided');
  }

  ['endpoint', 'port'].forEach((key) => {
    if (!config[key]) {
      throw new Error(`no ${key} provided in config`);
    }
  });

  const uri = `${config.endpoint}:${config.port}/suggest`;
  const filter = config.profile && [`rec.collectionIdentifier:${config.profile}`] || [];
  const logger = config.logger || console;

  return {
    getPopSuggestions: curry(getPopSuggestions)({logger, uri, filter})
  };
}
