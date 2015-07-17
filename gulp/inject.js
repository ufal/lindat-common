'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;

module.exports = function(options) {
  gulp.task('inject', ['styles', 'scripts'], function () {

    var injectStyles = gulp.src([
      options.tmp + '/serve/**/*.css'
    ], { read: false });


    var injectScripts = $.merge(gulp.src([
        options.src + '/angular/*.js'
      ])
        .pipe($.angularFilesort()).on('error', options.errorHandler('AngularFilesort')),
      gulp.src([options.src + '/citation/*.js', options.tmp + '/serve/citation/citationHtml.js'], { read: false})
    );

    var injectOptions = {
      ignorePath: [options.src, options.tmp + '/serve'],
      addRootSlash: false
    };

    var wiredepOptions = {
      directory: 'bower_components',
      ignorePath: '../',
      exclude: [/bootstrap\.(css|js)/]
    };

    return gulp.src(options.src + '/**/*.html')
      .pipe($.inject(injectStyles, injectOptions))
      .pipe($.inject(injectScripts, injectOptions))
      .pipe(wiredep(wiredepOptions))
      .pipe(gulp.dest(options.inject + '/'));
  });
};
