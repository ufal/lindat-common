'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');

module.exports = function(options) {

  var jsSources = [options.src + '/**/*.js'];

  gulp.task('scripts', ['scripts:generate'], function () {
    return gulp.src(jsSources)
      .pipe($.jshint())
      .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
      .pipe($.wrap(options.iifeTemplate))
      .pipe(gulp.dest(options.tmp + '/serve/'))
      .pipe(browserSync.reload({ stream: true }));
  });

  gulp.task('scripts:generate', function () {
    return gulp.src(options.src + '/refbox/refbox.html')
      .pipe($.minifyHtml({
        empty: true,
        spare: true,
        quotes: true
      }))
      .pipe($.angularTemplatecache('refboxHtml.js', {
        templateHeader: '\n',
        templateBody: 'window.LindatRefBox.template = "<%= contents %>";',
        templateFooter: '\n'
      }))
      .pipe(gulp.dest(options.tmp + '/serve/refbox/'));
  });
};
