'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'del']
});
var through = require('through');
var path = require('path');

module.exports = function(options) {
  gulp.task('css', ['styles'], function () {
    return gulp.src(options.tmp + '/serve/lindat-common.css')
      .pipe($.replace('images/', '../images/'))
      .pipe($.rename('lindat.css'))
      .pipe(gulp.dest(options.public + '/css/'))
      .pipe($.csso(true /* structureMinimization: true */))
      .pipe($.rename('lindat.min.css'))
      .pipe(gulp.dest(options.public + '/css/'));
  });

  function processHtml(dest, lang) {
    return gulp.src(options.tmp + '/serve-' + lang + '/partials/*.html')
      //.pipe($.minifyHtml({
      //  empty: true,
      //  spare: true,
      //  quotes: true,
      //  conditionals: true
      //}))
      .pipe(gulp.dest(dest))
      .pipe(through(function (file, enc, cb) {
        if (file.isNull()) {
          return cb(null, file);
        }

        gulp.src(options.src + '/standalone-template.html')
          .pipe($.swig({data: {file: file.path}}))
          .pipe($.rename(function (filePath) {
            filePath.basename = path.basename(file.path, '.html') + '-services-standalone';
          }))
          .pipe(gulp.dest(dest));
      }));
  }

  gulp.task('html:cs', ['preprocess'], function () {
    return processHtml(options.dist + '/cs/', 'cs');
  });

  gulp.task('html:en', ['preprocess'], function () {
    return processHtml(options.dist + '/', 'en');
  });

  gulp.task('html', ['html:cs', 'html:en']);

  gulp.task('angular:templates', ['preprocess'], function () {
    return gulp.src([
      options.tmp + '/serve-angular/partials/*.html'
    ])
      .pipe($.minifyHtml({
        empty: true,
        spare: true,
        quotes: true
      }))
      .pipe($.angularTemplatecache('templateCacheHtml.js', {
        module: 'lindat',
        root: 'partials/',
        standalone: false
      }))
      .pipe(gulp.dest(options.tmp + '/serve/scripts/'));
  });

  gulp.task('angular:scripts', ['scripts', 'angular:templates'], function () {
   return gulp.src([
     options.src + '/angular/*.js',
     options.tmp + '/serve/scripts/templateCacheHtml.js'
    ])
     .pipe($.angularFilesort()).on('error', options.errorHandler('AngularFilesort'))
     .pipe($.ngAnnotate())
     .pipe($.concat('angular-lindat.js'))
     .pipe($.wrap(options.iifeTemplate))
     .pipe(gulp.dest(options.public + '/js/'))
     .pipe($.uglify()).on('error', options.errorHandler('Uglify'))
     .pipe($.rename('angular-lindat.min.js'))
     .pipe(gulp.dest(options.public + '/js/'));
  });

  gulp.task('angular', ['angular:scripts']);

  gulp.task('images', function () {
    return gulp.src([options.src + '/images/**/*.+(png|jpg|gif|jpeg)'])
      .pipe($.imageOptimization({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
      }))
      .pipe(gulp.dest(options.public + '/images/'));
  });

  gulp.task('clean', function (done) {
    $.del([options.dist + '/', options.tmp + '/'], done);
  });

  gulp.task('assemble', ['images', 'html', 'css', 'angular']);

  gulp.task('build', ['clean'], function () {
    gulp.start('assemble');
  });
};
