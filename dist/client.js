'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.test = test;
exports.init = init;
exports.getSuggestions = getSuggestions;

function test() {
  console.log('hest');
}

function init(config) {
  console.log('init: ', config);
}

function getSuggestions() {
  var query = arguments[0] === undefined ? {} : arguments[0];

  console.log(' ');
  console.log('getSuggestions');
  console.log('query: ', query);
  console.log(' ');

  return { response: 'testhest' };
}