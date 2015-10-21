var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var yaml = require('js-yaml');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var swigLoader = require('swig-loader');

module.exports = function (options) {

  // This will load corresponding yaml files based on language
  swigLoader.resourceQueryCustomizer(function (resourceQuery, resourcePath) {
    if (!resourceQuery.lang) { return; }
    var filePath = resourceQuery.includeFile ? resourceQuery.includeFile : resourcePath;
    var dirname = path.dirname(filePath);
    var ymlFile = path.join(dirname, path.basename(filePath, '.html') + '.' + resourceQuery.lang + '.yml');
    if (fs.existsSync(ymlFile)) {
      _.extend(resourceQuery, yaml.safeLoad(fs.readFileSync(ymlFile, 'utf8')));
    }
    // Include constants in templates
    _.extend(resourceQuery, options.config);
  });

  function cartesianProduct(a) { // a = array of array
    var i, j, l, m, a1, o = [];
    if (!a || a.length === 0) { return a; }

    a1 = a.splice(0,1);
    a = cartesianProduct(a);
    for (i = 0, l = a1[0].length; i < l; i++) {
      if (a && a.length) {
        for (j = 0, m = a.length; j < m; j++) {
          o.push([a1[0][i]].concat(a[j]));
        }
      } else {
        o.push([a1[0][i]]);
      }
    }
    return o;
  }

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
      filename: '/' + filename,
      template: '!!swig!' + template + '?' + JSON.stringify(params),
      inject: false,
      chunks: ['main'],
      minify: false
    });
  }

  // Generates files for all partials and combinations
  // Header and footer in standalone and not and in English, Czech and default English :)
  var partialsPlugins = cartesianProduct([['header', 'footer'], [false, true], [false, 'en', 'cs']])
    .map(function (args) {
      return generatePartial(args[0], args[1], args[2]);
    });

  return {
    config: {
      module: {
        loaders: [
          {test: /\.js$/, loaders: ['ng-annotate'], include: path.join(options.src, 'angular')},
          {test: /\.yml/, loader: 'json!yaml'},
          {test: /\.html/, loaders: ['html-loader?-attrs', 'swig-loader?raw']},
          {test: /\.ico$/, loaders: ['url-loader']},
          {test: /\.(png|jpg)$/, loader: 'url-loader', query: {name: 'public/img/[name].[ext]', limit: 10000 }}, // inline base64 URLs for <=8k images, direct URLs for the rest
          {test: /\.(woff|woff2)$/, loader: 'url?limit=10000&mimetype=application/font-woff&prefix=fonts'},
          {test: /\.ttf$/, loader: 'url?limit=10000&mimetype=application/octet-stream&prefix=fonts'},
          {test: /\.eot$/, loader: 'url?limit=10000&mimetype=application/vnd.ms-fontobject&prefix=fonts'},
          {test: /\.svg$/, loader: 'url?limit=10000&mimetype=image/svg+xml&prefix=fonts'}
        ],
        noParse: [/\.php$/]
      },
      plugins: [
        new webpack.DefinePlugin(_.mapValues(options.config, JSON.stringify))
      ]
    },
    partials: partialsPlugins,
    extractLoaders: [
      {test: /\.less$/, loader: ExtractTextPlugin.extract('css!autoprefixer!less', {publicPath: options.publicPath})},
      {test: /\.css$/, loader: ExtractTextPlugin.extract('css!autoprefixer', {publicPath: options.publicPath})}
    ],
    styleLoaders: [
      {test: /\.less$/, loader: 'style!css!autoprefixer!less'},
      {test: /\.css$/, loader: 'style!autoprefixer!css'}
    ]
  };
};
