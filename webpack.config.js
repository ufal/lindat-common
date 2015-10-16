/* jshint node:true */

var _ = require('lodash');
var fs = require('fs');
var path = require('path');
var argv = require("optimist").argv;

var root = path.resolve(__dirname);
var gitDir = path.join('.git');
var src  = path.join(root, 'src');
var partials = path.join(src, 'partials');
var dist = path.join(root, 'dist');
var pages = path.join(root, 'pages');

var config = {
  PRODUCTION: process.env.NODE_ENV === 'production',
  REV: fs.readFileSync(path.resolve(gitDir, 'refs', 'heads', 'master'), 'utf8'),
  VERSION: require('./package.json').version,

  GA_TRACKING_CODE: 'UA-27008245-2',
  PIWIK_URL: '//ufal.mff.cuni.cz/piwik/', // include trailing slash
  REST_API: 'https://lindat.mff.cuni.cz/repository/rest',
  DEV_REST_API: 'https://ufal-point-dev.ms.mff.cuni.cz/repository/rest'
};

var options = {
  DEBUG: argv.debug,
  publicPath: argv.debug ?
    '/' : (argv.pages ? 'https://ufal.github.io/lindat-common/' : 'https://lindat.mff.cuni.cz/common-theme/'),
  config: config,
  root: root,
  src: src,
  partials: partials,
  dist: dist,
  pages: pages
};

module.exports =
  require(config.PRODUCTION ? './webpack/production' : './webpack/development')(options);
