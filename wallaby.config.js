'use strict';
let babel = require('babel');

module.exports = function(wallaby) {
  return {
    files: [
      {pattern: 'node_modules/babel/node_modules/babel-core/browser-polyfill.js', instrument: false},
      {pattern: 'src/*.js'}
    ],

    tests: [
      {pattern: 'src/**/*.test.js'}
    ],

    preprocessors: {
      '**/*.js': [
          file => babel.transform(file.content, {sourceMaps: true})
      ]
    },

    env: {
      type: 'node',
      runner: 'node'
    },

    testFramework: 'mocha@2.1.0',
    compilers: {
      '**/*.js': wallaby.compilers.babel({
        babel: babel,
        // https://babeljs.io/docs/usage/experimental/
        stage: 0
      })
    }
  };
};
