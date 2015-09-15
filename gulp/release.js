'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var fs = require('fs');
var argv = require('yargs').argv;

var files = ['./package.json', './bower.json'];

function getPackageJson() {
  return JSON.parse(fs.readFileSync('./package.json', 'utf8'));
}

module.exports = function() {

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

  gulp.task('add-and-commit', ['bump'], function(cb) {
    var pkg = getPackageJson();
    gulp.src(files)
      .pipe($.git.add())
      .pipe($.git.commit('Releasing version ' + pkg.version))
      .on('end', function () {
        var tag = 'v'+pkg.version;
        $.git.tag(tag, 'Tagging as ' + tag, cb);
      });
  });

  gulp.task('release', ['add-and-commit'], function(cb) {
    $.git.push('origin', 'master', {args: '--follow-tags'}, cb);
  });
};
