(function(){
angular.module('lindat', ['piwik', 'angular-google-analytics'])
  .constant('piwikUrl', '//ufal.mff.cuni.cz/piwik/')
  .config(["AnalyticsProvider", function(AnalyticsProvider) {
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
  }])
  .run(["Analytics", "Piwik", "piwikUrl", function (Analytics, Piwik, piwikUrl) {
    // Analytics
    // In case you are relying on automatic page tracking, you need to inject Analytics
    // at least once in your application (for example in the main run() block)

    Piwik.setCookieDomain('*.mff.cuni.cz');
    Piwik.setDomains(['*.mff.cuni.cz']);
    Piwik.setCustomVariable(1, 'source', 'common-theme', 'page');
    Piwik.enableLinkTracking();
    Piwik.setTrackerUrl(piwikUrl + 'piwik.php');
    Piwik.setSiteId(2);
  }]);

angular.module("lindat").run(["$templateCache", function($templateCache) {$templateCache.put("partials/footer.htm","<div class=\"lindat-common lindat-footer\"><div class=\"lindat-footer-main\"><div class=\"lindat-footer-content lindat-container\"><div class=\"lindat-footer-left\"><a class=\"lindat-clarinb-logo\" href=\"http://hdl.handle.net/1839/00-DOCS.CLARIN.EU-99\" title=\"Clarin B Center\"></a> <a class=\"lindat-dsa-logo\" href=\"https://assessment.datasealofapproval.org/assessment_92/seal/html\" title=\"Data Seal of Approval\"></a></div><div class=\"lindat-footer-text\"><div class=\"lindat-footer-text1\"><h1>Partners, Coordination, Funding</h1><ul><li><a href=\"http://www.kky.zcu.cz/en\">Dept. of Cybernetics, Univ. of West Bohemia</a></li><li><a href=\"http://ufal.mff.cuni.cz\">Institute of Formal and Applied Linguistics (Prague)</a></li><li><a href=\"http://www.ujc.cas.cz\">Institute of Czech Language (Prague)</a></li><li><a href=\"http://nlp.fi.muni.cz\">NLP Centre, Masaryk University (Brno)</a></li><li><a href=\"http://www.msmt.cz\">Ministry of Education, Sports and Youth of the Czech Republic</a></li></ul></div><div class=\"lindat-footer-text2\"><h1>Repository</h1><ul><li><a href=\"https://lindat.mff.cuni.cz/repository/xmlui/\">Main page</a></li><li><a href=\"https://lindat.mff.cuni.cz/en/about-lindat-clarin\">Contact</a></li><li><a href=\"https://lindat.mff.cuni.cz/repository/xmlui/page/item-lifecycle\">Submission Lifecycle</a></li><li><a href=\"https://lindat.mff.cuni.cz/repository/xmlui/page/faq\">FAQ</a></li><li><a href=\"https://lindat.mff.cuni.cz/repository/xmlui/page/about\">About and Policies</a></li></ul></div><div class=\"lindat-footer-text3\"><h1>More</h1><ul><li><a href=\"http://www.clarin.eu/\">CLARIN</a></li><li><a href=\"http://www.meta-net.eu/\">META-Net</a></li><li><a href=\"https://lindat.mff.cuni.cz/en/monitoring\">Service Status</a></li><li><a href=\"https://lindat.mff.cuni.cz/en/blocked-idps\">Authentication</a></li></ul></div></div><div class=\"lindat-footer-right\"><a class=\"lindat-logo-mono\" href=\"http://lindat.mff.cuni.cz/lindat/\" title=\"LINDAT/CLARIN\"></a> <a class=\"lindat-msmt-logo\" href=\"http://www.msmt.cz/\" title=\"MŠMT\"></a></div></div></div><div class=\"lindat-copyright\"><p><strong><span>THE LINDAT/CLARIN PROJECT (LM2010013) IS FULLY SUPPORTED BY THE MINISTRY OF EDUCATION, SPORTS</span><br><span>AND YOUTH OF THE CZECH REPUBLIC UNDER THE PROGRAMME LM OF &quot;LARGE INFRASTRUCTURES&quot;.</span></strong></p><p>Copyright (c) 2015 UFAL MFF UK. All rights reserved.</p></div><ngp-piwik ngp-set-js-url=\"//ufal.mff.cuni.cz/piwik/piwik.js\"></ngp-piwik></div>");
$templateCache.put("partials/header.htm","<nav class=\"lindat-header lindat-common\" role=\"navigation\"><button type=\"button\" class=\"lindat-menu-btn\"><span class=\"lindat-menu-icon\"><span class=\"lindat-icon-bar\"></span> <span class=\"lindat-icon-bar\"></span> <span class=\"lindat-icon-bar\"></span></span></button><ul class=\"lindat-menu\"><li class=\"lindat-home-item\"><a href=\"http://lindat.mff.cuni.cz/\" class=\"lindat-logo\"><span>Home</span></a></li><li class=\"lindat-repository-item\"><a href=\"https://lindat.mff.cuni.cz/repository/xmlui/\"><span>Repository</span></a></li><li class=\"lindat-pmltq-item\"><a href=\"https://lindat.mff.cuni.cz/services/pmltq/\"><span>TreeQuery</span></a></li><li class=\"lindat-treex-item\"><a href=\"https://lindat.mff.cuni.cz/services/treex-web/run/\"><span>Treex</span></a></li><li class=\"lindat-tools-item\"><a href=\"https://lindat.mff.cuni.cz/services\"><span>More Apps</span></a></li><li class=\"lindat-events-item\"><a href=\"https://lindat.mff.cuni.cz/en/events\"><span>Events</span></a></li><li class=\"lindat-about-item\"><a href=\"https://lindat.mff.cuni.cz/en/about-lindat-clarin\"><span>About</span></a></li><li class=\"lindat-clarin-menu\"><a href=\"http://www.clarin.eu\" class=\"clarin-logo\"><span>CLARIN</span></a></li></ul></nav>");}]);
/* ngInject */
function LindatHeaderDirective() {

  function linkFn($scope, $element) {
    var button = $element[0].querySelector('.lindat-menu-btn'),
      menu = $element[0].querySelector('.lindat-menu');
    if (button) {
      angular.element(button).on('click', function() {
        angular.element(menu).toggleClass('lindat-open');
      });
    }
  }

  return {
    restrict: 'AE',
    templateUrl: 'partials/header.htm',
    link: linkFn
  };
}

angular.module('lindat')
  .directive('lindatHeader', LindatHeaderDirective);

/* ngInject */
function LindatFooterDirective() {
  return {
    restrict: 'AE',
    templateUrl: 'partials/footer.htm'
  };
}

angular.module('lindat')
  .directive('lindatFooter', LindatFooterDirective);

}());