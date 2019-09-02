var path = require('path');
var merge = require('webpack-merge');
var I18nPlugin = require("i18n-webpack-plugin");
var languages = require("../src/refbox/languages.js");

var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (options) {

  var common = require('./common')(options);

  var development = Object.keys(languages).map(function(language) {
    var lang_dir = language === 'en' ? '' : language;
    return merge(common.config, {
      entry: path.join(options.src, 'index-dev.js'),
      output: {
        path: options.pages,
        publicPath: options.publicPath,
        filename: path.join('public', 'js', lang_dir, 'lindat.js')
      },
      module: {
        loaders: common.extractLoaders
      },
      plugins: [new HtmlWebpackPlugin({
        filename: language === 'en' ? 'index.html' : 'index_'+language+'.html',
        template: '!!swig!' + path.join(options.src, 'index.html'),
        inject: true,
        minify: false
      }), new MiniCssExtractPlugin(path.join('public', 'css', 'lindat.css'), {
        allChunks: true
      }),
        new I18nPlugin(languages[language])]
    });
    });

  var developmentAngular = Object.keys(languages).map(function(language) {
    var lang_dir = language === 'en' ? '' : language;
    return merge(common.config, {
      entry: [path.join(options.src, 'angular-dev.js')],
      output: {
        path: options.pages,
        publicPath: options.publicPath,
        filename: path.join('public', 'js', lang_dir, 'angular-lindat.js')
      },
      module: {
        loaders: common.styleLoaders
      },
      plugins: [new HtmlWebpackPlugin({
        filename: language === 'en' ? 'angular.html' : 'angular_' + language + '.html',
        template: '!!swig!' + path.join(options.src, 'angular.html'),
        inject: true,
        minify: false
      }),
        new I18nPlugin(languages[language])]
    });
  });


  return [].concat(development, developmentAngular);
};
