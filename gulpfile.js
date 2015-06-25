'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var wrench = require('wrench');

require('gulp-release-tasks')(gulp);

var options = {
  src: 'src',
  dist: 'dist',
  'public': 'dist/public',
  tmp: '.tmp',
  inject: '.tmp/inject',
  iifeTemplate: '(function(){\n<%= contents %>\n}());',
  errorHandler: function(title) {
    return function(err) {
      gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
      this.emit('end');
    };
  }
};

wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file)(options);
});

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});
