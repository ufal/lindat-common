var _ = require('lodash');
var path = require('path');
var merge = require('webpack-merge');
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function (options) {

  var common = require('./common')(options);

  var uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  });

  var productionCommon = merge(common.config, {
    externals: {
      jquery: 'jQuery'
    },
    output: {
      publicPath: options.publicPath
    },
    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(true),
      new webpack.optimize.DedupePlugin(),
      new webpack.NoErrorsPlugin()
    ]
  });

  var css = merge(productionCommon, {
    entry: path.join(options.src, 'lindat.less'),
    output: {
      path: options.dist,
      filename: path.join('public', 'css', 'lindat.css')
    },
    module: {
      loaders: common.extractLoaders
    },
    plugins: [new ExtractTextPlugin(path.join('public', 'css', 'lindat.css'), {
      allChunks: true
    })].concat(common.partials, uglifyPlugin)
  });

  var refbox = merge(productionCommon, {
    entry: path.join(options.src, 'refbox.js'),
    output: {
      library: 'LindatRefBox',
      libraryTarget: 'umd',
      path: options.dist,
      filename: path.join('public', 'js', 'lindat-refbox.js')
    },
    module: {
      loaders: common.styleLoaders
    },
    plugins: [uglifyPlugin]
  });

  var angular = merge(productionCommon, {
    entry: [path.join(options.src, 'angular.js')],
    externals: {
      jquery: 'jQuery',
      angular: 'angular',
      'angular-piwik': 'commonjs angular-piwik',
      'angular-google-analytics': 'commonjs angular-google-analytics'
    },
    output: {
      library: 'AngularLindat',
      libraryTarget: 'umd',
      path: options.dist,
      filename: path.join('public', 'js', 'angular-lindat.js')
    },
    module: {
      loaders: common.styleLoaders
    },
    plugins: [uglifyPlugin]
  });


  return [].concat(css, refbox, angular);
};
