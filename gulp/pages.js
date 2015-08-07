'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');

var wiredep = require('wiredep');

var flatten = function() {
  return $.rename(function (path) {
    path.dirname = ''; // flatten directory structure
  });
};

module.exports = function(options) {
  gulp.task('pages:copy', ['assemble'], function () {
    return gulp.src([options.dist + '/**/*.*', '!' + options.dist + '/*.htm'])
      .pipe(gulp.dest(options.pages + '/'));
  });

  gulp.task('pages:deps', function () {
    var deps = wiredep();
    if (!deps.js) {
      return;
    }
    return gulp.src(deps.js)
      .pipe(flatten())
      .pipe(gulp.dest(options.pages + '/public/vendor/'));
  });

  function inject(file, angular) {
    var injectStyles = gulp.src([
      options.pages + '/public/css/*.min.css'
    ], { read: false });

    var sources = angular ? [
      options.pages + '/public/vendor/jquery.js',
      options.pages + '/public/vendor/angular.js',
      options.pages + '/public/vendor/angular-*.js',
      options.pages + '/public/js/angular-*.min.js'
    ] : [
      options.pages + '/public/vendor/jquery.js',
      options.pages + '/public/js/*.min.js',
      '!**/*angular*.js'
    ];
    var injectScripts = gulp.src(sources, { read: false });

    var injectOptions = {
      ignorePath: [options.pages],
      addRootSlash: false
    };

    return gulp.src(options.src + '/' + file + '.html')
      .pipe($.inject(injectStyles, injectOptions))
      .pipe($.inject(injectScripts, injectOptions))
      .pipe(gulp.dest(options.pages + '/'));
  }

  gulp.task('pages:inject:index', ['pages:copy', 'pages:deps'], function () {
    return inject('index', false);
  });

  gulp.task('pages:inject:angular', ['pages:copy', 'pages:deps'], function () {
    return inject('angular', true);
  });

  gulp.task('pages:inject', ['pages:inject:index', 'pages:inject:angular']);

  gulp.task('pages', function (cb) {
    runSequence('clean', 'pages:inject', cb);
  });
};
