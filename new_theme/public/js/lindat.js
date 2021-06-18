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
    // [
    //   {
    //     'id': '',
    //     'heading': {'content': '', 'url': ''},
    //     'list': [{'content': '', 'url': ''}] | 'nestedList' : [{'tagline': '', 'list': [...]}]
    //   }
    //   ]

    static footer_about_columns = [
      {
        'id': 'about-lindat',
        'heading': {
          'content': 'LINDAT/CLARIAH-CZ',
          'url': 'https://lindat.cz/sites/default/files/2021-01/lindat_clariah_flyer.pdf'
        },
        'list': [
          {'content': 'Mission Statement', 'url': '/files/mission-en.pdf'},
          {'content': 'Events', 'url': 'http://lindat.cz/events'},
          {'content': 'Helpdesk', 'url': 'mailto:lindat-help@ufal.mff.cuni.cz'},
          {'content': 'User Feedback Form', 'url': '/user_feedback'},
          {'content': 'CLARIN Participation', 'url': 'https://www.clarin.eu/'},
          {'content': 'DARIAH Participation', 'url': 'https://www.dariah.eu/'},
          {'content': 'Acknowledge LINDAT/CLARIAH-CZ', 'url': '/acknowledgement'},
        ]
      },
      {
        'id': 'about-partners',
        'heading': {
          'content': 'Partners',
          'url': '/partners'
        },
        'nestedList': [
          {
            'tagline': 'Charles University',
            'list': [
              {
                'content': 'Faculty <i>of</i> Mathematics <i>and</i> Physics',
                'url': 'https://lindat.cz/partners/mff-uk'
              },
              {'content': 'Faculty <i>of</i> Arts', 'url': 'https://lindat.cz/partners/ff-uk'},
            ]
          },
          {
            'tagline': 'Masaryk University',
            'list': [
              {'content': 'Faculty <i>of</i> Arts', 'url': 'https://lindat.cz/partners/ff-mu'},
              {'content': 'Faculty  <i>of</i> Informatics', 'url': 'https://lindat.cz/partners/fi-mu'},
            ]
          },
          {
            'tagline': 'University of West Bohemia',
            'list': [
              {'content': 'Faculty <i>of</i> Applied Sciences', 'url': 'https://lindat.cz/partners/zcu'},
            ]
          },
          {
            'tagline': 'Czech Academy of Sciences',
            'list': [
              {'content': 'Czech Language Institute', 'url': 'https://lindat.cz/partners/ujc'},
              {'content': 'Library <i>of</i> Academy', 'url': 'https://lindat.cz/partners/knav'},
              {'content': 'Institute <i>of</i> History', 'url': 'https://lindat.cz/partners/hu'},
              {'content': 'Institute <i>of</i> Philosophy', 'url': 'https://lindat.cz/partners/flu'},
            ]
          },
          {
            'tagline': 'Archives, Libraries and Galleries',
            'list': [
              {'content': 'National Library <i>of the Czech Republic</i>', 'url': 'https://lindat.cz/partners/nk'},
              {'content': 'Moravian Library <i>in Brno</i>', 'url': 'https://lindat.cz/partners/mzk'},
              {'content': 'National Gallery Prague', 'url': 'https://lindat.cz/partners/ng'},
              {'content': 'National Film Archive', 'url': 'https://lindat.cz/partners/nfa'},
            ]
          },
        ]
      },
      {
        'id': 'about-website',
        'heading': {'content': 'Services', 'url': '/services'},
        'list': [
          {'content': 'Service Status', 'url': 'https://lindat.mff.cuni.cz/en/monitoring'},
          {
            'content': 'About and Policies',
            'url': 'https://lindat.mff.cuni.cz/repository/xmlui/page/about?locale-attribute=en'
          },
          {'content': 'Terms of Use', 'url': 'https://lindat.mff.cuni.cz/en/terms-of-use'},
        ]
      },
    ];

    about2html(about_obj){
      let list_items = this.list2html(about_obj);
      return `
      <div id="${about_obj.id}">
        <h4><a href="${about_obj.heading.url}">${about_obj.heading.content}</a></h4>
        <ul>
          ${list_items}
        </ul>
      </div>
      `
    }

    list2html(about_obj){
      if(about_obj.list){
        return this.processList(about_obj.list)
      }else {
        let out = '';
        for(const li_obj of about_obj.nestedList){
          out += `
            <li>${li_obj.tagline}
                <ul>
                    ${this.processList(li_obj.list)}
                </ul>
            </li>
          `
        }
        return out;
      }
    }

    processList(list){
      let out=''
      for(const li of list){
        out += `
          <li><a href="${li.url}">${li.content}</a></li>
          `
      }
      return out;
    }

    connectedCallback(){
        let shadow = this.attachShadow({mode: 'open'})

        let about = '';
        for(const about_item of LindatFooter.footer_about_columns){
          about += this.about2html(about_item);
        }

        shadow.innerHTML = `
 <footer>
    ${about}

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

    static header_nav_items = [
      {'name': 'Search', 'url': '/#search'},
      {'name': 'Catalogue', 'url': 'https://lindat.mff.cuni.cz/repository/xmlui/?locale-attribute=en'}, //XXX
      {'name': 'Education', 'url': '/#education'},
      {'name': 'Projects', 'url': '/#projects'},
      {'name': 'Tools', 'url': '/#tools'},
      {'name': 'Services', 'url': '/en/services'}, //XXX
      {'name': 'About', 'url': '/', 'dropdown': [
          {'name': 'Partners', 'url': '/partners'},
          {'name': 'Mission Statement', 'url': '/files/mission-en.pdf'},
          {'name': 'CLARIN', 'url': 'https://www.clarin.eu/'},
          {'name': 'DARIAH', 'url': 'https://www.dariah.eu/'},
        ]}
  ];
    get nav_items(){
      let out = ''
      for(const item of LindatHeader.header_nav_items){
        /* build dropdown menu first if this item is a dropdown toggle */
        let dd = '';
        if(item.dropdown){
          dd += '<div class="dropdown-menu">'
          for(const dd_item of item.dropdown){
            dd += `
               <a href="${dd_item.url}" class="dropdown-item">${dd_item.name}</a>
            `
          }
          dd += '</div>'
        }
        /* build normal list of items */
        out += `
          <li class="nav-item ${item.dropdown ? 'dropdown' : ''}">
              <a href="${item.url}" class="nav-link ${item.dropdown ? 'dropdown-toggle' : ''}"
                                    ${item.dropdown ? ' data-toggle="dropdown"' : ''}
                                    ${item.dropdown ? ' onclick="document.querySelector(\'lindat-header\').shadowRoot.querySelector(\'ul.nav.navbar-nav li.nav-item.dropdown div.dropdown-menu\').classList.toggle(\'show\'); return false;"' : ''}
                                    >${item.name}</a>
              ${item.dropdown ? dd : ''}
          </li>
        `
      }
      return out;
    }

    connectedCallback(){
        let shadow = this.attachShadow({mode: 'open'})
        shadow.innerHTML = `
 <nav class="navbar navbar-expand-lg justify-content-between navbar-dark ">
    <div class="block block--clariah-theme-branding">
        <a href="https://lindat.mff.cuni.cz/" class="navbar-brand d-flex align-items-center " aria-label="">
            <img src="https://lindat.mff.cuni.cz/sites/default/files/LINDAT-CLARIAH-cz-gray_0.svg" width="auto" height="53" alt="LINDAT/CLARIAH-CZ logo" class="">
        </a>
    </div>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbar-collapse" aria-controls="navbar-collapse" aria-expanded="false" aria-label="Toggle navigation"
            onclick="document.querySelector('lindat-header').shadowRoot.querySelector('div.collapse.navbar-collapse').classList.toggle('show')">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse">
        <div class="mr-auto">
            <div class="block block--clariah-theme-main-menu">
                <ul class="nav navbar-nav">
                    ${this.nav_items}
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
        <slot name="languageswitcher"></slot>
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
