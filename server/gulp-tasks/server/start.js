"use strict";

const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const path = require('path');
const server = require('gulp-develop-server');

module.exports = {
  dep: ['server:compile'],
  fn: function(gulp, basePath, callback) {
    return server.listen( { path: basePath + 'bin/www', execArgv: ['--debug'] } );
  }
}