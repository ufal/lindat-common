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
    return gulp.src(options.src + '/citation/citation.html')
      .pipe($.angularTemplatecache('citationHtml.js', {
        templateHeader: '(function(lcb) {',
        templateBody: 'lcb.template = "<%= contents %>";',
        templateFooter: '})(LindatCitationBox);'
      }))
      .pipe(gulp.dest(options.tmp + '/serve/citation/'));
  });
};
