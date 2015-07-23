'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var fs = require('fs');
var _ = require('lodash');
var yaml = require('js-yaml');

var $ = require('gulp-load-plugins')();

module.exports = function(options) {
  var htmlSources = [options.inject + '/**/*.html', '!'+ options.inject +'/standalone.html'];

  function preprocess(dest, lang, angular) {
    return gulp.src(htmlSources)
      .pipe($.data(function (file) {
        var data = {lang: lang, angular: !!angular};

        var ymlFile = options.src + '/' + file.relative.substr(0, file.relative.length - 5) + '.' + lang + '.yml';
        if (fs.existsSync(ymlFile)) {
          _.extend(data, yaml.safeLoad(fs.readFileSync(ymlFile, 'utf8')));
        }

        return data;
      }))
      .pipe($.swig()).on('error', options.errorHandler('Swig'))
      .pipe(gulp.dest(dest))
      .pipe(browserSync.reload({ stream: true }));
  }

  gulp.task('preprocess:cs', ['inject'], function () {
    return preprocess(options.tmp + '/serve-cs/', 'cs', false);
  });

  gulp.task('preprocess:en', ['inject'], function () {
    return preprocess(options.tmp + '/serve-en/', 'en', false);
  });

  gulp.task('preprocess:angular', ['inject'], function () {
    return preprocess(options.tmp + '/serve-angular/', 'en', true);
  });

  gulp.task('preprocess', ['preprocess:cs', 'preprocess:en', 'preprocess:angular']);
};
