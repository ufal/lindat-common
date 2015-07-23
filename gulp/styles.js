'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

module.exports = function(options) {
  gulp.task('styles', function () {
    var lessOptions = {
      options: [
        'bower_components',
        options.src
      ]
    };

    var injectFiles = gulp.src([
      options.src + '/**/*.less',
      '!' + options.src + '/lindat.less'
    ], { read: false });

    var injectOptions = {
      transform: function(filePath) {
        return '@import \'' + filePath + '\';';
      },
      starttag: '// injector',
      endtag: '// endinjector',
      addRootSlash: false
    };

    var indexFilter = $.filter('lindat.less');

    return gulp.src([
      options.src + '/*.less',
      options.src + '/**/*.less'
    ])
    .pipe($.preprocess())
    .pipe(indexFilter)
    .pipe($.inject(injectFiles, injectOptions))
    .pipe(indexFilter.restore())
    .pipe($.sourcemaps.init())
    .pipe($.less(lessOptions)).on('error', options.errorHandler('Less'))
    .pipe($.autoprefixer()).on('error', options.errorHandler('Autoprefixer'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(options.tmp + '/serve/'))
    .pipe(browserSync.reload({ stream: true }));
  });
};
