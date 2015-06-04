'use strict';

export function test() {
  console.log('hest');
}

export function init(config) {
  console.log('init: ', config);
}

export function getSuggestions(query = {}) {
  console.log(' ');
  console.log('getSuggestions');
  console.log('query: ', query);
  console.log(' ');

  return {response: 'testhest'};
}
