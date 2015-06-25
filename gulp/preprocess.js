'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var yaml = require('js-yaml');
var through = require('through');

var $ = require('gulp-load-plugins')();

module.exports = function(options) {
  var htmlSources = [
    options.inject + '/**/*.html'
  ];

  var messages = {};

  function swigLocals(lang, angular) {
    var locale = messages[lang] || {};
    return {
      localize: function (tag, text, attributes) {
        var attrs = '';
        if (!attributes) {
          attributes = {};
        }

        var localizedText = _.property(text)(locale);
        if (localizedText) {
          if (!angular) {
            attributes['data-localize'] = text;
          }
          text = localizedText;
        }

        for (var attr in attributes) {
          attrs += ' ' + attr + '="' + attributes[attr] + '"';
        }

        return '<' + tag + attrs + '>' + text + '</' + tag + '>';
      }
    };
  }

  function preprocess(dest, lang, angular) {
    return gulp.src(htmlSources)
      .pipe($.data(function (file) {
        var data = {lang: lang, angular: !!angular};

        var ymlFile = options.src + '/partials/' + path.basename(file.path, '.html') + '.' + lang + '.yml';
        if (fs.existsSync(ymlFile)) {
          _.extend(data, yaml.safeLoad(fs.readFileSync(ymlFile, 'utf8')));
        }

        return data;
      }))
      .pipe($.swig({data: swigLocals(lang, angular)}))
      .pipe(gulp.dest(dest))
      .pipe(browserSync.reload({ stream: true }));
  }

  gulp.task('load:locales', function () {
    return gulp.src(options.src + '/locale/messages-*.json')
      .pipe(through(function (file) {
        var lang = /messages-(.+)\.json$/.exec(file.path)[1];
        messages[lang] = JSON.parse(file.contents.toString());
      }));
  });

  gulp.task('preprocess:cs', ['inject', 'load:locales'], function () {
    return preprocess(options.tmp + '/serve-cs/', 'cs', false);
  });

  gulp.task('preprocess:en', ['inject', 'load:locales'], function () {
    return preprocess(options.tmp + '/serve-en/', 'en', false);
  });

  gulp.task('preprocess:angular', ['inject', 'load:locales'], function () {
    return preprocess(options.tmp + '/serve-angular/', 'en', true);
  });

  gulp.task('preprocess', ['preprocess:cs', 'preprocess:en', 'preprocess:angular']);
};
