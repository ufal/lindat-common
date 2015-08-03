'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var definedBrowser = process.env.BROWSER;

module.exports = function(options) {

  function browserSyncInit(baseDir, angular, cb) {
    var browser = definedBrowser ? definedBrowser : undefined;

    browserSync.instance = browserSync.init({
      startPath: '/',
      browser: process.env.TRAVIS ? null : browser,
      server: {
        baseDir: baseDir,
        index: angular ? 'angular.html' : 'index.html',
        routes : {
          '/bower_components': 'bower_components',
          '/en': options.tmp + '/serve-en/partials',
          '/cs': options.tmp + '/serve-cs/partials'
        }
      }
    }, function(err, bs) {
      if (err && err.message) {
        console.error(err.message);
      }
      process.env.BASE_URL = bs.options.getIn(["urls", "local"]);
      cb();
    });
  }

  gulp.task('serve', ['watch'], function (done) {
    browserSyncInit([options.tmp + '/serve', options.inject, options.src], false, done);
  });

  gulp.task('serve:angular', ['watch'], function (done) {
    browserSyncInit([options.tmp + '/serve-angular', options.tmp + '/serve', options.src], true, done);
  });

  gulp.task('serve:pages', ['pages'], function (done) {
    browserSyncInit([options.pages], false, done);
  });
};
