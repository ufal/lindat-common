'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

module.exports = function(options) {
  var htmlSources = [
    options.inject + '/**/*.html'
  ];

  gulp.task('preprocess:none', ['inject'], function () {
    return gulp.src(htmlSources)
      .pipe($.preprocess())
      .pipe(gulp.dest(options.tmp + '/serve/'))
      .pipe(browserSync.reload({ stream: true }));
  });

  gulp.task('preprocess:angular', ['inject'], function () {
    return gulp.src(htmlSources)
      .pipe($.preprocess({context: {ANGULAR: true}}))
      .pipe(gulp.dest(options.tmp + '/serve-angular/'))
      .pipe(browserSync.reload({ stream: true }));
  });

  gulp.task('preprocess', ['preprocess:none', 'preprocess:angular']);
};
