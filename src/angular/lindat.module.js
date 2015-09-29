angular.module('lindat', ['piwik', 'angular-google-analytics'])
  .constant('piwikUrl', '//ufal.mff.cuni.cz/piwik/')
  .constant('refboxRestAPI', 'https://lindat.mff.cuni.cz/repository/rest')
  .config(function(AnalyticsProvider) {
    AnalyticsProvider.setAccount('UA-27008245-2');
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
