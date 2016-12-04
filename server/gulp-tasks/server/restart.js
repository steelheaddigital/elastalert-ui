"use strict";

const server = require('gulp-develop-server');

module.exports = {
  dep: ['server:compile'],
  fn: function(gulp, callback) {
    return gulp.src('./build')
      .pipe(server())
  }
}
