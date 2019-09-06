var path = require('path');
var webpack = require('webpack');

var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;

module.exports = function(src, globals){
  var stringifiedGlobals = {};
  for (var key in globals){
    if(globals.hasOwnProperty(key)){
      stringifiedGlobals[key] = JSON.stringify(globals[key]);
    }
  }
  return [
    // TODO minimize https://github.com/webpack-contrib/mini-css-extract-plugin#minimizing-for-production
    new MiniCssExtractPlugin({
      filename: path.join('public', 'css', 'lindat.css')
    }),
    //Global constants
    new webpack.DefinePlugin(stringifiedGlobals),
    // remove ./dist on build
    new CleanWebpackPlugin()
  ];
};
