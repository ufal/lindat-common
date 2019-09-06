var path = require('path');
var webpack = require('webpack');

var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
var I18nPlugin = require('i18n-webpack-plugin');

module.exports = function(src, globals){
  var languages = require(path.join(src, 'refbox', 'languages.js'));
  return [
    // TODO minimize https://github.com/webpack-contrib/mini-css-extract-plugin#minimizing-for-production
    // TODO how does this work with the loader
    new MiniCssExtractPlugin({
      filename: path.join('public', 'css', 'lindat.css')
    }),
    new HtmlWebpackPlugin({
      filename: 'angular.html',
      template: '!!swig-loader!' + path.join(src, 'angular.html'),
      inject: true,
      minify: false
    }),
    //Global constants
    new webpack.DefinePlugin(globals),
    // remove ./dist on build
    new CleanWebpackPlugin(),
    new I18nPlugin(languages['en'])
  ];
};
