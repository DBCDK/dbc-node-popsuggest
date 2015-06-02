'use strict';

var watch = require('node-watch');
var exec = require('child_process').exec;

watch('./src/', {recursive: true, followSymLinks: true}, function() {
  exec("npm run build", function() {
    console.log(arguments); //TODO handke actual arguments to provide better info rather than just dumping it all
  });
});
