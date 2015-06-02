'use strict';
var api = require('./dist/api');

console.log(api.init());

module.exports = {
  init: api.init
};
