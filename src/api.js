'use strict';

import OpenSuggest from '';
import Dispatcher from './dispatcher.js';


let endPoint = '';
let dispatcher = null;

function setUpSocket(socket) {
  dispatcher = Dispatcher();
  dispatcher.init(socket);
  dispatcher.listen('getSuggestions', OpenSuggest.getSuggestions); //TODO implement method for retreiving suggestions
}

export function init(endpoint = null, socket = null) {
  if (!endpoint) {
    throw new Error('No endpoint provided');
  }
  endPoint = endpoint;

  if (socket) {
    console.log('Setting up socket');
    setUpSocket(socket);
  }
}
