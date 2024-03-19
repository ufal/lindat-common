/* jshint node: true */
/* global browser */

var config = {
  SELENIUM_PROMISE_MANAGER: false,
  framework: 'jasmine2',
  specs: [
    'test/*.js'
  ],
  multiCapabilities: [{
          browserName: 'chrome',
          chromeOptions: {
                  'args': ['--headless']
          }
  },
  {
    browserName: 'firefox'
  }],
  jasmineNodeOpts: {
    isVerbose: true,
    showTiming: true,
    defaultTimeoutInterval: 90000,
    showColors: true,
    includeStackTrace: true
  },
  baseUrl: 'http://localhost:' + (process.env.PORT || 8080) + '/',
  // Up the timeouts for the slower browsers (IE, Safari).
  allScriptsTimeout: 30000,
  getPageTimeout: 30000,
  onPrepare: function () {
    browser.ignoreSynchronization = true;
    var _get = browser.get;
    var sleepInterval = process.env.TRAVIS ? 14000 : 8000;
    browser.get = function () {
      var result = _get.apply(this, arguments);
      browser.sleep(sleepInterval);
      return result;
    };
  }
};

if (process.env.TRAVIS) {
  config.sauceUser = process.env.SAUCE_USERNAME;
  config.sauceKey = process.env.SAUCE_ACCESS_KEY;
  config.multiCapabilities = [{
    browserName: 'MicrosoftEdge',
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    build: process.env.TRAVIS_BUILD_NUMBER,
    name: 'Lindat Common build ' + process.env.TRAVIS_BUILD_NUMBER
  }, {
    // For some reason Firefox doesn't work very well in SauceLabs (or I can't use it)
    // SEE:
    //  - https://github.com/angular/protractor/issues/480
    //  - http://stackoverflow.com/questions/26740123/protractor-click-then-failing-in-firefox
    browserName: 'firefox',
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    build: process.env.TRAVIS_BUILD_NUMBER,
    name: 'Lindat Common build ' + process.env.TRAVIS_BUILD_NUMBER
  }, {
    browserName: 'chrome',
    'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
    build: process.env.TRAVIS_BUILD_NUMBER,
    name: 'Lindat Common build ' + process.env.TRAVIS_BUILD_NUMBER
  }
  ];
} else {
  var glob = require('glob');
  glob('./node_modules/protractor/node_modules/webdriver-manager/selenium/selenium-server-standalone-*.jar', function (err, files) {
    if(err){
      throw err;
    }else{
      config.seleniumServerJar = files[files.length - 1];
    }
  });
}

exports.config = config;
