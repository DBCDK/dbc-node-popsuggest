'use strict';

var watch = require('node-watch');
var exec = require('child_process').exec;

watch('./src/', {recursive: true, followSymLinks: true}, function(filename) {
  //console.log(filename, ' changed.');
  exec("rm -rf ./dist && broccoli build ./dist", function() {
    console.log(arguments);
  });
});
