'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var spawn = require('child_process').spawn;
var path = require('path');

function getProtractorBinary(binaryName){
  var pkgPath = require.resolve('protractor');
  var protractorDir = path.resolve(path.join(path.dirname(pkgPath), '..', 'bin'));
  return path.join(protractorDir, '/' + binaryName);
}

module.exports = function() {

  gulp.task('protractor:install', function(done){
    spawn(getProtractorBinary('webdriver-manager'), ['update', '--standalone', '--chrome'], {
      stdio: 'inherit'
    }).once('close', done);
  });

  gulp.task('protractor:run', ['protractor:install', 'serve:pages'], function (done) {
    var protractorSpawn = spawn(getProtractorBinary('protractor'), ['protractor.conf.js'], {
      stdio: 'inherit',
      env: process.env
    }).on('exit', function(code) {
      if (protractorSpawn) {
        protractorSpawn.kill(0);
      }
      process.exit(code);
      done();
    });
  });

  gulp.task('test', ['protractor:run']);
};
