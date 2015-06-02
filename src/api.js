'use strict';

let endPoint = '';

export function init(endpoint = null, socket = null) {
  if (!endpoint) {
    throw new Error('No endpoint provided');
  }
  endPoint = endpoint;

  if (socket) {
    console.log('Setting up socket');
    // TODO set up socket

  }
}
