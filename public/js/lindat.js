import {LindatHeader} from './header.mjs';
import {LindatFooter} from './footer.mjs';

customElements.define('lindat-footer', LindatFooter);
customElements.define('lindat-header', LindatHeader);

    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    // main LINDAT/CLARIAH-CZ tracker
    ga('create', 'UA-27008245-2', 'cuni.cz');
    ga('send', 'pageview');
      
    var _paq = _paq || [];
    _paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
    _paq.push(["setCookieDomain", "*.mff.cuni.cz"]);
    _paq.push(["setDomains", ["*.mff.cuni.cz"]]);
    _paq.push(['setCustomVariable', 1, "source", "common-theme", "page"]);
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);
    (function() {
      var u='//lindat.mff.cuni.cz/piwik/';
      _paq.push(['setTrackerUrl', u+'piwik.php']);
      _paq.push(['setSiteId', 2]);
      var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
      g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
    })();
      