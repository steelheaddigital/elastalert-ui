"use strict";

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const gulp = require('gulp');
const gulpRequireTasks = require('gulp-require-tasks');
gulpRequireTasks({
  arguments: ['./']
});

gulp.task( 'default', ['server:watch', 'server:start']);