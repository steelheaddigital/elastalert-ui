"use strict";

const del = require('del');

module.exports = function(gulp, basePath, callback){
  return del([basePath + 'build/**/*']);
}