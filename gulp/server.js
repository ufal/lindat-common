'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var definedBrowser = process.env.BROWSER;

module.exports = function(options) {

  function browserSyncInit(baseDir, angular) {
    var browser = definedBrowser ? definedBrowser : undefined;

    browserSync.instance = browserSync.init({
      startPath: '/',
      browser: browser,
      server: {
        baseDir: baseDir,
        index: angular ? 'angular-index.html' : 'index.html',
        routes : {
          '/bower_components': 'bower_components',
          '/en': options.tmp + '/serve-en',
          '/cs': options.tmp + '/serve-cs'
        }
      }
    });
  }

  gulp.task('serve', ['watch'], function () {
    browserSyncInit([options.tmp + '/serve', options.inject, options.src]);
  });

  gulp.task('serve:angular', ['watch'], function () {
    browserSyncInit([options.tmp + '/serve-angular', options.tmp + '/serve', options.src], true);
  });

  gulp.task('serve:dist', ['build'], function () {
    browserSyncInit(options.dist);
  });
};
