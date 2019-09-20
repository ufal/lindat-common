var path = require('path');
var merge = require('webpack-merge');
var I18nPlugin = require("i18n-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var getCommonLoaders = require('./loaders');
var getCommonPlugins = require('./plugins');
var languages = require("../src/refbox/languages.js");

module.exports = function (env, argv) {
  var options = require('./config')(env, argv);
  return [].concat(stylesheetConfig(options), localizedRefboxConfigs(options), localizedAngularConfigs(options));
};

function getCommon(options, generateStyleSheetFile) {
  return {
    externals: {jquery: 'jQuery'},
    output: {publicPath: options.publicPath},
    module: getCommonLoaders(options.src, options.globals, generateStyleSheetFile),
    plugins: getCommonPlugins(options.src, options.globals, generateStyleSheetFile)
  }
}

function stylesheetConfig(options){
  // We just need to hang partials (header/footer) generation somewhere, so we hang it on refbox
  function generatePartial(file, standalone, language) {
    var inputFilename = file + '.html';
    var outputFilename = standalone ? (file + '-services-standalone.htm') : (file + '.htm');
    var filename = language ? path.join(language, outputFilename) : outputFilename;
    language = language || 'en';
    var params = {
      lang: language
    };

    if (standalone) {
      params.includeFile = path.join(options.partials, inputFilename);
    }

    var template = standalone ?
      path.join(options.src, 'standalone.html') : path.join(options.partials, inputFilename);

    return new HtmlWebpackPlugin({
      filename: filename,
      // swig-loader should not be needed explicitly, but without that, HtmlWebpackPlugin
      // breaks the template path on windows, but we add the options from loaders.js
      template: 'swig-loader!' + template + '?' + JSON.stringify(merge(params, _getSwigLoaderOptions(options))),
      inject: false,
      chunks: ['main'],
      minify: false
    });
  }

  var partialsPlugins = [];
  ['header', 'footer'].forEach(function (file) {
    [false, true].forEach(function (standalone) {
      [false, 'en', 'cs'].forEach(function (language) {
        partialsPlugins.push(generatePartial(file, standalone, language))
      });
    });
  });

  //lindat.css config
  return merge(getCommon(options, true),{
    entry: {
      "lindat.css": path.join(options.src, 'lindat.less')
    },
    output: {
      path: options.dist,
    },
    //attach the partial plugins
    plugins: partialsPlugins
  });
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

function _getSwigLoaderOptions(options) {
  var swigLoaderRule = getCommonLoaders(options.src, options.globals).rules.filter(function (rulesObj) {
    var testRegex = rulesObj.test;
    return testRegex.toString().includes('html');
  })[0];
  return swigLoaderRule.use.filter(function (loader) {
    return typeof loader === 'object' && loader.loader === 'swig-loader'
  })[0].options;
}
