'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.test = test;
exports.getSuggestions = getSuggestions;

function test() {
  console.log('hest');
}

function getSuggestions() {
  var query = arguments[0] === undefined ? {} : arguments[0];

  console.log(' ');
  console.log('getSuggestions');
  console.log('query: ', query);
  console.log(' ');
}