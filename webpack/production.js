var _ = require('lodash');
var path = require('path');
var merge = require('webpack-merge');
var webpack = require('webpack');
var I18nPlugin = require("i18n-webpack-plugin");
var languages = {
   "en": null,
   "cs": require("../src/refbox/lang/cs.json"),
   "sl": require("../src/refbox/lang/sl.json")
};


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
                loaders: common.styleLoaders
              },
              plugins: [new I18nPlugin(languages[language]), uglifyPlugin]
         });
  });

  var angular = merge(productionCommon, {
    entry: [path.join(options.src, 'angular.js')],
    externals: {
      jquery: 'jQuery',
      angular: 'angular'
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
    plugins: [new I18nPlugin(null)/*keep the default language*/, uglifyPlugin]
  });


  return [].concat(css, refbox, angular);
};
