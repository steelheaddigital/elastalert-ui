"use strict";

const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const path = require('path');

function compileServer(gulp, basePath) {
  var tsProject = ts.createProject(basePath + 'tsconfig.json');
  
  return gulp.src([basePath + 'src/**/*.ts', basePath + 'typings/**.ts'])
    .pipe(plumber({
      handleError: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject))
    .pipe(sourcemaps.write({sourceRoot: function (file) {
      var sourceFile = path.join(file.cwd + '/build/', file.sourceMap.file);
      return path.relative(path.dirname(sourceFile), file.cwd) + '/src/';
    }}))
}

module.exports = {
  dep: ['server:clean'],
  fn: function(gulp, basePath, callback) {
    return compileServer(gulp, basePath)
      .pipe(gulp.dest(basePath + 'build'))
  }
}