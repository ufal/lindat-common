(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

// main LINDAT/CLARIAH-CZ tracker
ga('create', 'UA-27008245-2', 'cuni.cz');
ga('send', 'pageview');

// Piwik LINDAT/CLARIAH-CZ tracker
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
})()

class LindatFooter extends HTMLElement {

    connectedCallback(){
        let shadow = this.attachShadow({mode: 'open'})

        shadow.innerHTML = `
            <footer>
        <div id="about-lindat">
      <h4><a href="https://lindat.cz/sites/default/files/2021-01/lindat_clariah_flyer.pdf">LINDAT/CLARIAH-CZ</a></h4>
    <ul>
      <li><a href="/files/mission-en.pdf">Mission Statement</a></li>
      <li><a href="http://lindat.cz/events">Events</a></li>
      <li><a href="mailto:lindat-help@ufal.mff.cuni.cz">Helpdesk</a></li>
      <li><a href="/user_feedback">User Feedback Form</a></li>
      <li><a href="https://www.clarin.eu/">CLARIN Participation</a></li>
      <li><a href="https://www.dariah.eu/">DARIAH Participation</a></li>
      <li><a href="/acknowledgement">Acknowledge LINDAT/CLARIAH-CZ</a></li>
    </ul>
  </div>

  <div id="about-partners">
    <h4><a href="/partners">Partners</a></h4>
    <ul>
      <li>Charles University
        <ul>
          <li><a href="https://lindat.cz/partners/mff-uk">Faculty <i>of</i> Mathematics <i>and</i> Physics</a></li>
          <li><a href="https://lindat.cz/partners/ff-uk">Faculty <i>of</i> Arts</a></li>
        </ul>
      </li>
      <li>Masaryk University
        <ul>
          <li><a href="https://lindat.cz/partners/ff-mu">Faculty <i>of</i> Arts</a></li>
          <li><a href="https://lindat.cz/partners/fi-mu">Faculty  <i>of</i> Informatics</a></li>
        </ul>
      </li>
      <li>University of West Bohemia
          <ul>
            <li><a href="https://lindat.cz/partners/zcu">Faculty <i>of</i> Applied Sciences</a></li>
          </ul>
      </li>
      <li>Czech Academy of Sciences
        <ul>
          <li><a href="https://lindat.cz/partners/ujc">Czech Language Institute</a></li>
          <li><a href="https://lindat.cz/partners/knav">Library <i>of</i> Academy</a></li>
          <li><a href="https://lindat.cz/partners/hu">Institute <i>of</i> History</a></li>
          <li><a href="https://lindat.cz/partners/flu">Institute <i>of</i> Philosophy</a></li>
        </ul>
      </li>
      <li>Archives, Libraries and Galleries
        <ul>
          <li><a href="https://lindat.cz/partners/nk">National Library <i>of the Czech Republic</i></a></li>
          <li><a href="https://lindat.cz/partners/mzk">Moravian Library <i>in Brno</i></a></li>
          <li><a href="https://lindat.cz/partners/ng">National Gallery Prague</a></li>
          <li><a href="https://lindat.cz/partners/nfa">National Film Archive</a></li>
        </ul>
      </li>
    </ul>
  </div>

  <div id="about-website">
    <h4><a href="/services">Services</a></h4>
    <ul>
      <li><a href="https://lindat.mff.cuni.cz/en/monitoring">Service Status</a></li>
      <li><a href="https://lindat.mff.cuni.cz/repository/xmlui/page/about?locale-attribute=en">About and Policies</a></li>
      <li><a href="https://lindat.mff.cuni.cz/en/terms-of-use">Terms of Use</a></li>
    </ul>
  </div>

  <div id="badges-a">
    <a href="https://www.clarin.eu/content/certified-centres"><img src="https://lindat.mff.cuni.cz/images/b-centre.png" alt="CLARIN CENTRE B"></a>
    <a href="https://www.clarin.eu/content/knowledge-centres"><img src="https://lindat.mff.cuni.cz/images/k-centre.png" alt="CLARIN CENTRE K" style="filter:brightness(0.88)"></a>
    <a href="https://www.coretrustseal.org/wp-content/uploads/2019/08/LINDAT-CLARIN.pdf"><img src="https://lindat.mff.cuni.cz/images/core-trust-seal-mono.png" alt="CoreTrustSeal Certification"></a>
  </div>

  <div id="badges-b">
    <a href="https://twitter.com/lindatclariahcz">Follow us on Twitter <img src="https://lindat.mff.cuni.cz/images/twitter-circular.svg" alt="Link to Profile"></a>
    <a href="/user/login"><img src="https://lindat.mff.cuni.cz/sites/default/files/LINDAT-CLARIAH-cz-gray_0.svg" alt="Home Page"></a>
  </div>

  <div id="ack-msmt">
    THE LINDAT/CLARIAH-CZ PROJECT (LM2018101; formerly LM2010013, LM2015071) IS FULLY SUPPORTED BY THE MINISTRY OF EDUCATION, SPORTS AND YOUTH OF THE CZECH REPUBLIC UNDER THE&nbsp;PROGRAMME LM OF "LARGE INFRASTRUCTURES"
  </div>
  <div id="ack-freepik">Icons ©  Smashicons and Freepik from flaticon.com licensed by CC 3.0 BY</div>
  <div id="ack-ufal">website © 2021 by <a href="https://ufal.mff.cuni.cz/">ÚFAL</a></div>
</footer>

`
        const linkElement = document.createElement('link')
        linkElement.setAttribute('rel', 'stylesheet')
        linkElement.setAttribute('href', 'https://lindat.mff.cuni.cz/common/new_theme/public/css/lindat-dark.css')
        shadow.appendChild(linkElement)
    }
}

class LindatHeader extends HTMLElement {
    connectedCallback(){
        let shadow = this.attachShadow({mode: 'open'})
        shadow.innerHTML = `
        <nav class="navbar navbar-expand-lg justify-content-between navbar-dark sticky-top ">
  <div class="block block--clariah-theme-branding">
  <a href="https://lindat.mff.cuni.cz/" class="navbar-brand d-flex align-items-center " aria-label="">
            <img src="https://lindat.mff.cuni.cz/sites/default/files/LINDAT-CLARIAH-cz-gray_0.svg" width="auto" height="53" alt="LINDAT/CLARIAH-CZ logo" class="">
  </a>
  </div>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbar-collapse" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse">
                  <div class="mr-auto">
  <div class="block block--clariah-theme-main-menu">
  <ul class="nav navbar-nav">
                <li class="nav-item  ">
                      <a href="/#search" class="nav-link is-active" data-drupal-link-system-path="<front>">Search</a>
                  </li>
                                      <li class="nav-item  ">
                      <a href="https://lindat.mff.cuni.cz/repository/xmlui/?locale-attribute=en" class="nav-link">Catalogue</a>
                  </li>
                                      <li class="nav-item  ">
                      <a href="/#education" class="nav-link is-active" data-drupal-link-system-path="<front>">Education</a>
                  </li>
                                      <li class="nav-item  ">
                      <a href="/#projects" class="nav-link is-active" data-drupal-link-system-path="<front>">Projects</a>
                  </li>
                                      <li class="nav-item  ">
                      <a href="/#tools" class="nav-link is-active" data-drupal-link-system-path="<front>">Tools</a>
                  </li>
                                      <li class="nav-item  ">
                      <a href="/en/services" class="nav-link" data-drupal-link-system-path="node/21">Services</a>
                  </li>
                                      <li class="nav-item  dropdown">
                      <a href="/" class="nav-link dropdown-toggle is-active" data-toggle="dropdown" data-drupal-link-system-path="<front>">About</a>
                          <div class="dropdown-menu">
          <a href="/partners" class="dropdown-item" data-drupal-link-system-path="node/2">Partners</a>
          <a href="/files/mission-en.pdf" class="dropdown-item">Mission Statement</a>
          <a href="https://www.clarin.eu/" class="dropdown-item">CLARIN</a>
          <a href="https://www.dariah.eu/" class="dropdown-item">DARIAH</a>
  </div>
                              </li>
    </ul>
  </div>
        </div>
  <div class="block block--clariah-theme-account-menu">
  <ul class="nav navbar-nav">
                                          <li class="nav-item  ">
                      <a class="nav-link nav-link-dariah" href="https://www.dariah.eu/"><img src="https://lindat.mff.cuni.cz/images/dariah-eu.png"></a>
                  </li>
                                      <li class="nav-item  ">
                      <a class="nav-link nav-link-clarin" href="https://www.clarin.eu/"><img src="https://lindat.mff.cuni.cz/images/clarin.png"></a>
                  </li>
            </ul>
  </div>
  <div class="language-switcher-language-url block block--languageswitcher" role="navigation">
  <ul class="links nav navbar-nav">
      <li class="nav-item dropdown nav-link-language">
    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">English</a>
    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
      <a href="/cs" class="language-link dropdown-item" hreflang="cs" data-drupal-link-system-path="<front>">česky</a>
    </div>
  </li>
    </ul>
  </div>
            </div>
  </nav>
        `
        const linkElement = document.createElement('link')
        linkElement.setAttribute('rel', 'stylesheet')
        linkElement.setAttribute('href', 'https://lindat.mff.cuni.cz/common/new_theme/public/css/lindat-dark.css')
        shadow.appendChild(linkElement)
    }
}
customElements.define('lindat-footer', LindatFooter)
customElements.define('lindat-header', LindatHeader)