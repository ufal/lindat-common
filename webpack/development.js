var path = require('path');
var merge = require('webpack-merge');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (options) {

  var common = require('./common')(options);

  var development = merge(common.config, {
    entry: path.join(options.src, 'index-dev.js'),
    output: {
      path: options.pages,
      publicPath: options.publicPath,
      filename: path.join('public', 'js', 'lindat.js')
    },
    module: {
      loaders: common.extractLoaders
    },
    plugins: [new HtmlWebpackPlugin({
      filename: '/index.html',
      template: '!!swig!' + path.join(options.src, 'index.html'),
      inject: true,
      minify: false
    }), new ExtractTextPlugin(path.join('public', 'css', 'lindat.css'), {
      allChunks: true
    })]
  });

  var developmentAngular = merge(common.config, {
    entry: [path.join(options.src, 'angular-dev.js')],
    output: {
      path: options.pages,
      publicPath: options.publicPath,
      filename: path.join('public', 'js', 'angular-lindat.js')
    },
    module: {
      loaders: common.styleLoaders
    },
    plugins: [new HtmlWebpackPlugin({
      filename: '/angular.html',
      template: '!!swig!' + path.join(options.src, 'angular.html'),
      inject: true,
      minify: false
    })]
  });

  return [development, developmentAngular];
};
