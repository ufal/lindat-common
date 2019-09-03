var _ = require('lodash');
var path = require('path');
var merge = require('webpack-merge');
var webpack = require('webpack');
var I18nPlugin = require("i18n-webpack-plugin");
var languages = require("../src/refbox/languages.js");

var MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = function (options) {

  var common = require('./common')(options);

  var productionCommon = merge(common.config, {
    externals: {
      jquery: 'jQuery'
    },
    output: {
      publicPath: options.publicPath
    },
    plugins: [
    ]
  });

  var css = merge(productionCommon, {
    entry: path.join(options.src, 'lindat.less'),
    output: {
      path: options.dist,
      filename: path.join('public', 'css', 'lindat.css')
    },
    module: {
      rules: common.extractLoaders
    },
    plugins: [new MiniCssExtractPlugin(path.join('public', 'css', 'lindat.css'), {
      allChunks: true
    })].concat(common.partials)
  });

  var refbox = Object.keys(languages).map(function(language){
    var lang_dir = language === 'en' ? '' : language;
    return merge(productionCommon, {
              entry: path.join(options.src, 'refbox.js'),
              output: {
                library: 'LindatRefBox',
                libraryTarget: 'umd',
                path: options.dist,
                filename: path.join('public', 'js', lang_dir, 'lindat-refbox.js')
              },
              module: {
                rules: common.styleLoaders
              },
              plugins: [new I18nPlugin(languages[language])]
         });
  });

  var angular = Object.keys(languages).map(function(language){
    var lang_dir = language === 'en' ? '' : language;
    return merge(productionCommon, {
      entry: [path.join(options.src, 'angular.js')],
      externals: {
        jquery: 'jQuery',
        angular: 'angular'
      },
      output: {
        library: 'AngularLindat',
        libraryTarget: 'umd',
        path: options.dist,
        filename: path.join('public', 'js', lang_dir, 'angular-lindat.js')
      },
      module: {
        rules: common.styleLoaders
      },
      plugins: [new I18nPlugin(languages[language])]
    });
  });


  return [].concat(css, refbox, angular);
};
