'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var fs = require('fs');
var argv = require('yargs').argv;

var files = ['./package.json', './bower.json'];

function getPackageJson() {
  return JSON.parse(fs.readFileSync('./package.json', 'utf8'));
}

module.exports = function(options) {

  function versioning() {
    if (argv.minor || argv.feature) {
      return 'minor';
    }
    if (argv.major) {
      return 'major';
    }
    return 'patch';
  }

  gulp.task('bump', function() {
    return gulp.src(files)
      .pipe($.bump({type: versioning()}))
      .pipe(gulp.dest('.'));
  });

  //gulp.task('add:dist', ['build'], function() {
  //  return gulp.src( options.dist + '/**')
  //    .pipe($.git.add({args: '--all -f'}));
  //});

  gulp.task('add', ['bump'], function() {
    return gulp.src(files)
      .pipe($.git.add());
  });

  //gulp.task('add', ['add:dist', 'add:version']);

  gulp.task('tag', ['add'], function() {
    return gulp.src('./package.json')
      .pipe($.tagVersion());
  });

  gulp.task('commit', ['tag'], function() {
    var pkg = getPackageJson();
    return gulp.src('.')
      .pipe($.git.commit('Releasing version ' + pkg.version));
  });

  gulp.task('release', ['commit'], function(done) {
    $.git.push('origin', 'master', {args: '--follow-tags'}, done);
  });
};
