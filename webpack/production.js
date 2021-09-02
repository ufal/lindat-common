var path = require('path');
var merge = require('webpack-merge');
var I18nPlugin = require("i18n-webpack-plugin");
var getCommonLoaders = require('./loaders');
var getCommonPlugins = require('./plugins');
var languages = require("../src/refbox/languages.js");

module.exports = function (env, argv) {
  var options = require('./config')(env, argv);
  return [].concat(localizedRefboxConfigs(options), localizedAngularConfigs(options));
};

function getCommon(options, generateStyleSheetFile) {
  return {
    externals: {jquery: 'jQuery'},
    output: {publicPath: options.publicPath},
    module: getCommonLoaders(options.src, options.globals, generateStyleSheetFile),
    plugins: getCommonPlugins(options.src, options.globals, generateStyleSheetFile)
  }
}

function localizedRefboxConfigs(options) {
  return Object.keys(languages).map(function (language) {
    var lang_dir = language === 'en' ? '' : language;
    return merge(getCommon(options), {
      entry: path.join(options.src, 'refbox.js'),
      output: {
        library: 'LindatRefBox',
        libraryTarget: 'umd',
        path: options.dist,
        filename: path.join('public', 'js', lang_dir, 'lindat-refbox.js')
      },
      plugins: [new I18nPlugin(languages[language])]
    });
  });
}

function localizedAngularConfigs(options) {
  return Object.keys(languages).map(function (language) {
    var lang_dir = language === 'en' ? '' : language;
    return merge(getCommon(options), {
      entry: path.join(options.src, 'angular.js'),
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
      plugins: [new I18nPlugin(languages[language])]
    });
  });
}
