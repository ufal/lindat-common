var angular = require('angular');

require('./lindat.less');

var lindatModule = angular.module('lindat', ['piwik', 'angular-google-analytics'])
  .constant('piwikUrl', PIWIK_URL)
  .constant('refboxRestAPI', DEBUG ? DEV_REST_API : REST_API)
  .directive({
    lindatRefbox: require('./angular/refbox'),
    lindatHeader: require('./angular/header'),
    lindatFooter: require('./angular/footer')
  })
  .config(function(AnalyticsProvider) {
    AnalyticsProvider.setAccount(GA_TRACKING_CODE);
    // using multiple tracking objects (analytics.js only)
    // AnalyticsProvider.setAccount([
    //   { tracker: 'UA-12345-12', name: "tracker1" },
    //   { tracker: 'UA-12345-34', name: "tracker2" }
    // ]);

    // Optional set domain (Use 'none' for testing on localhost)
    AnalyticsProvider.setDomainName('cuni.cz');
    AnalyticsProvider.trackPages(true);

    AnalyticsProvider.setPageEvent('$stateChangeSuccess');
  })
  .run(function (Analytics, Piwik, piwikUrl) {
    // Analytics
    // In case you are relying on automatic page tracking, you need to inject Analytics
    // at least once in your application (for example in the main run() block)

    Piwik.setCookieDomain('*.mff.cuni.cz');
    Piwik.setDomains(['*.mff.cuni.cz']);
    Piwik.setCustomVariable(1, 'source', 'common-theme', 'page');
    Piwik.enableLinkTracking();
    Piwik.setTrackerUrl(piwikUrl + 'piwik.php');
    Piwik.setSiteId(2);
  });

if ( typeof module === "object" && typeof module.exports === "object" ) {
  // require externals if in CommonJS env
  require('angular-piwik');
  require('angular-google-analytics');

  module.exports = lindatModule.name;
}
