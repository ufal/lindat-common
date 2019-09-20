var path = require('path');
var webpack = require('webpack');

var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var IgnoreAssetsPlugin = require('ignore-assets-webpack-plugin');

module.exports = function(src, globals, generateStyleSheetFile){
  var stringifiedGlobals = {};
  for (var key in globals){
    if(globals.hasOwnProperty(key)){
      stringifiedGlobals[key] = JSON.stringify(globals[key]);
    }
  }
  var plugins = [
    //Global constants
    new webpack.DefinePlugin(stringifiedGlobals)
  ];
  if(generateStyleSheetFile){
    plugins.push(
      new MiniCssExtractPlugin({
        filename: path.join('public', 'css', '[name]')
      }),
      //This is a workaround for https://github.com/webpack-contrib/mini-css-extract-plugin/issues/151
      new IgnoreAssetsPlugin({
        ignore: 'lindat.css.js'
      })
    );
  }
  return plugins;
};
