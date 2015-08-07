'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'del']
});
var path = require('path');
var runSequence = require('run-sequence');

var flatten = function() {
  return $.rename(function (path) {
    path.dirname = ''; // flatten directory structure
  });
};

module.exports = function(options) {

  function processCss(src, name) {
    return gulp.src(src)
      .pipe($.replace('images/', '../images/'))
      .pipe($.replace('fonts/', '../fonts/'))
      .pipe($.concat(name + '.css'))
      .pipe(gulp.dest(options.public + '/css/'))
      .pipe($.csso(true /* structureMinimization: true */))
      .pipe($.rename({suffix: '.min'}))
      .pipe(gulp.dest(options.public + '/css/'));
  }

  gulp.task('css', ['styles'], function () {
    return processCss(options.tmp + '/serve/lindat.css', 'lindat');
  });

  function processHtml(dest, lang) {
    return gulp.src(options.tmp + '/serve-' + lang + '/partials/*.htm')
      .pipe($.tap(function (file) {
        gulp.src(options.src + '/standalone.html')
          .pipe($.swig({data: {file: file.path}})).on('error', options.errorHandler('Swig'))
          .pipe($.rename(function (filePath) {
            filePath.extname = '.htm';
            filePath.basename = path.basename(file.path, '.htm') + '-services-standalone';
          }))
          .pipe(gulp.dest(dest));
      }))
      .pipe(gulp.dest(dest));
  }

  gulp.task('html:cs', ['preprocess'], function () {
    return processHtml(options.dist + '/cs/', 'cs');
  });

  gulp.task('html:en-generate', ['preprocess'], function () {
    return processHtml(options.dist + '/en/', 'en');
  });

  gulp.task('html:en', ['html:en-generate'], function () {
    return gulp.src(options.dist + '/en/*.*')
      .pipe(gulp.dest(options.dist + '/'));
  });

  gulp.task('html', ['html:cs', 'html:en']);

  gulp.task('angular:templates', ['preprocess'], function () {
    return gulp.src([
      options.tmp + '/serve-angular/partials/*.htm'
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

  gulp.task('citation', ['scripts'], function () {
    return gulp.src([
      options.src + '/citation/*.js',
      options.tmp + '/serve/citation/citationHtml.js'
    ])
      .pipe($.concat('lindat-citation.js'))
      .pipe($.wrap(options.iifeJQueryTemplate))
      .pipe(gulp.dest(options.public + '/js/'))
      .pipe($.uglify()).on('error', options.errorHandler('Uglify'))
      .pipe($.rename('lindat-citation.min.js'))
      .pipe(gulp.dest(options.public + '/js/'));
  });

  gulp.task('images', function () {
    return gulp.src([options.src + '/images/**/*.+(png|jpg|gif|jpeg)'])
      .pipe($.imageOptimization({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
      }))
      .pipe(gulp.dest(options.public + '/images/'));
  });

  gulp.task('fonts', function () {
    return gulp.src(options.src + '/**/*.+(eot|ttf|woff)')
      .pipe(flatten())
      .pipe(gulp.dest(options.public + '/fonts/'));
  });

  gulp.task('clean', function (done) {
    $.del([options.dist + '/', options.tmp + '/', options.pages + '/'], done);
  });

  gulp.task('assemble', ['images', 'fonts', 'html', 'css', 'angular', 'citation']);

  gulp.task('build', function (cb) {
    runSequence('clean', 'assemble', cb);
  });
};
