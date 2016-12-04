"use strict";

module.exports = {
  fn: function(gulp, basePath, callback) {
    gulp.watch( basePath + 'src/**/*.ts', [ 'server:restart' ] );
  }
}