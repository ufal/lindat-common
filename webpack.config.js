var path = require('path');
var nodeExternals = require('webpack-node-externals');
var merge = require('webpack-merge');

var getPlugins = require('./webpack/plugins');
var getLoaders = require('./webpack/loaders');


var root = path.resolve(__dirname);
var src  = path.join(root, 'src');

var globals = {
  REV: JSON.stringify(function () {
    var rev = 'DEV';
    try{
      var exec = require('child_process').execSync;
      rev = exec('git rev-parse HEAD', {cwd: __dirname});
      rev = rev.toString().trim();
    } catch(e){
      console.error('Executing "git rev-parse HEAD" failed...');
    }
    return rev;
  }()),
  VERSION: JSON.stringify(require('./package.json').version),
  GA_TRACKING_CODE: JSON.stringify('UA-27008245-2'),
  PIWIK_URL: JSON.stringify('//lindat.mff.cuni.cz/piwik/'), // include trailing slash
  REST_API: JSON.stringify('https://lindat.mff.cuni.cz/repository/rest'),
  DEV_REST_API: JSON.stringify('https://ufal-point-dev.ms.mff.cuni.cz/repository/rest'),
}

//TODO maybe I don't need globals injected in swing as they are in DefinePlugin

module.exports = function(env, argv){
  var debug = true === argv.debug;
  var pages = true === argv.pages;
  var publicPath = debug ? '/' :
                  (pages ? 'https://ufal.github.io/lindat-common/' :
                           'https://lindat.mff.cuni.cz/common/');
  globals.DEBUG = JSON.stringify(debug);
  var config = {
    entry: {
      main: path.join(src, 'angular-dev.js')
      //main: path.join(src, 'index.js')
      //'index-dev': path.join(src, 'index-dev.js')
    },
    output: {
      path: path.join(root, 'dist'),
      library: 'AngularLindat',
      libraryTarget: 'umd',
      //TODO languages
      filename: path.join('public', 'js', 'angular-lindat.js')
      /*filename: function(chunkData){
          switch (chunkData.chunk.name) {
            default: return '[name].js';
          }
      }*/
    },
    externals: [
      /*nodeExternals(),
      {
        jquery: 'jQuery',
        angular: 'angular'
      }*/
    ],
    module: getLoaders(src),
    plugins: getPlugins(src, globals)
  };
  config.output.publicPath = publicPath;
  return config;
};
