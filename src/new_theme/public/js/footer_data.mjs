class FooterData {
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
                {'content': 'Mission Statement', 'url': 'https://lindat.cz/files/mission-en.pdf'},
                {'content': 'Advisory Board', 'url': 'https://lindat.cz/ab'},
                {'content': 'Events', 'url': 'https://lindat.cz/events'},
                {'content': 'CLARIN Participation', 'url': 'https://www.clarin.eu/'},
                {'content': 'DARIAH Participation', 'url': 'https://www.dariah.eu/', 'space_after': true},
                {'content': 'FAQ', 'url': 'https://lindat.cz/faq-repository'},
                {'content': 'Helpdesk', 'url': 'mailto:lindat-help@ufal.mff.cuni.cz'},
                {'content': 'User Feedback Form', 'url': 'https://lindat.cz/user_feedback', 'space_after': true},
                {'content': 'Hosting Institution', 'url': 'https://ufal.mff.cuni.cz/grants/lindatclariah-cz/en'},
                {'content': 'Acknowledge LINDAT/CLARIAH-CZ', 'url': 'https://lindat.cz/acknowledgement'},
            ]
        },
        {
            'id': 'about-partners',
            'heading': {
                'content': 'Partners',
                'url': 'https://lindat.cz/partners'
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
                  'tagline': 'Terezín',
                  'list': [
                    {'content': 'Terezín Initiative Institute', 'url': 'https://lindat.cz/partners/iti'},
                    {'content': 'Terezín Memorial', 'url': 'https://lindat.cz/partners/pt'},
                  ]
                },
                {
                    'tagline': 'Czech Academy of Sciences',
                    'list': [
                        {'content': 'Czech Language Institute', 'url': 'https://lindat.cz/partners/ujc'},
                        {'content': 'Library <i>of</i> Academy', 'url': 'https://lindat.cz/partners/knav'},
                        {'content': 'Institute <i>of</i> History', 'url': 'https://lindat.cz/partners/hu'},
                        {'content': 'Institute <i>of</i> Philosophy', 'url': 'https://lindat.cz/partners/flu'},
                        {'content': 'Masaryk Institute <i>and</i> Archives', 'url': 'https://lindat.cz/partners/mua'},
                    ]
                },
                {
                    'tagline': 'Archives, Libraries and Galleries',
                    'list': [
                        {
                            'content': 'National Library <i>of the Czech Republic</i>',
                            'url': 'https://lindat.cz/partners/nk'
                        },
                        {'content': 'Moravian Library <i>in Brno</i>', 'url': 'https://lindat.cz/partners/mzk'},
                        {'content': 'National Gallery Prague', 'url': 'https://lindat.cz/partners/ng'},
                        {'content': 'National Film Archive', 'url': 'https://lindat.cz/partners/nfa'},
                        {'content': 'National Archives', 'url': 'https://lindat.cz/partners/na'},
                    ]
                },
            ]
        },
        {
            'id': 'about-website',
            'heading': {'content': 'Services', 'url': 'https://lindat.cz/services'},
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

    static about2html(about_obj) {
        let list_items = FooterData.list2html(about_obj);
        return `
      <div id="${about_obj.id}">
        <h4><a href="${about_obj.heading.url}">${about_obj.heading.content}</a></h4>
        <ul>
          ${list_items}
        </ul>
      </div>
      `
    }

    static list2html(about_obj) {
        if (about_obj.list) {
            return FooterData.processList(about_obj.list)
        } else {
            let out = '';
            for (const li_obj of about_obj.nestedList) {
                out += `
            <li>${li_obj.tagline}
                <ul>
                    ${FooterData.processList(li_obj.list)}
                </ul>
            </li>
          `
            }
            return out;
        }
    }

    static processList(list) {
        let out = ''
        for (const li of list) {
            out += `
          <li><a href="${li.url}">${li.content}</a></li>
          `
          if(li.space_after){
            out += '<br/>'
          }
        }
        return out;
    }

    static getGaTrackingScript(GA_TRACKING_CODE){
      return `
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    // main LINDAT/CLARIAH-CZ tracker
    ga('create', '${GA_TRACKING_CODE}', 'cuni.cz');
    ga('send', 'pageview');
      `
    }

    static getPiwikTrackingScript(PIWIK_URL){
      return `
    var _paq = _paq || [];
    _paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
    _paq.push(["setCookieDomain", "*.mff.cuni.cz"]);
    _paq.push(["setDomains", ["*.mff.cuni.cz"]]);
    _paq.push(['setCustomVariable', 1, "source", "common-theme", "page"]);
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);
    (function() {
      var u='${PIWIK_URL}';
      _paq.push(['setTrackerUrl', u+'piwik.php']);
      _paq.push(['setSiteId', 2]);
      var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
      g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
    })();
      `
    }

    static buildTrackingHtml(options){
      const ga_script = FooterData.getGaTrackingScript(options.GA_TRACKING_CODE)
      const PIWIK_URL = options.PIWIK_URL;
      const piwik_script = FooterData.getPiwikTrackingScript(PIWIK_URL)
      if(options.angular){
        return `
        <ngp-piwik ngp-set-js-url="${PIWIK_URL}piwik.js"> </ngp-piwik>
        `
      }
      return `
  <!-- TRACKING CODE -->

  <script type="text/javascript">
    //<![CDATA[
    ${ga_script}
    //]]>
  </script>

  <!-- Piwik LINDAT/CLARIAH-CZ tracker -->
  <script type="text/javascript">
    //<![CDATA[
    ${piwik_script}
    //]]>
  </script>
  <noscript><p><img src="${PIWIK_URL}piwik.php?idsite=2" style="border:0;" alt="" /></p></noscript>
  <!-- End Piwik Code -->
  <!-- End TRACKING CODE -->
      `
    }

    static buildHtml(options, lang) {
        console.log(`The lang option "${lang}" is ignored on footer`);
        const version = options.VERSION
        const build = options.REV
        const tracking = options.tracking
        let trackingScripts = ''

        if(tracking){
          trackingScripts = FooterData.buildTrackingHtml(options)
        }

        let about = '';
        for (const about_item of FooterData.footer_about_columns) {
            about += FooterData.about2html(about_item);
        }
        return `
<div class="lindat-common2 lindat-common-footer">
 <footer data-version="${version}" data-build="${build}">
    ${about}

    <div id="badges-a">
        <a href="https://www.clarin.eu/content/certified-centres"><img src="https://lindat.mff.cuni.cz/images/b-centre.png" alt="CLARIN CENTRE B" /></a>
        <a href="https://www.clarin.eu/content/knowledge-centres"><img src="https://lindat.mff.cuni.cz/images/k-centre.png" alt="CLARIN CENTRE K" style="filter:brightness(0.88)" /></a>
        <a href="https://www.coretrustseal.org/wp-content/uploads/2019/08/LINDAT-CLARIN.pdf"><img src="https://lindat.mff.cuni.cz/images/core-trust-seal-mono.png" alt="CoreTrustSeal Certification" /></a>
    </div>

    <div id="badges-b">
        <a href="https://twitter.com/lindatclariahcz">Follow us on Twitter <img src="https://lindat.mff.cuni.cz/images/twitter-circular.svg" alt="Link to Profile" /></a>
        <a href="https://lindat.cz/user/login"><img src="https://lindat.mff.cuni.cz/sites/default/files/LINDAT-CLARIAH-cz-gray_0.svg" alt="Home Page" /></a>
    </div>

    <div id="ack-msmt">
        THE LINDAT/CLARIAH-CZ PROJECT (LM2023062; formerly LM2010013, LM2015071, LM2018101) IS FULLY SUPPORTED BY THE MINISTRY OF EDUCATION, SPORTS AND YOUTH OF THE CZECH REPUBLIC UNDER THE&#160;PROGRAMME LM OF "LARGE INFRASTRUCTURES"
    </div>
    <div id="ack-freepik">Icons ©  Smashicons and Freepik from flaticon.com licensed by <a href="https://creativecommons.org/licenses/by/3.0/">CC 3.0 BY</a></div>
    <div id="ack-ufal">website © 2023 by <a href="https://ufal.mff.cuni.cz/">ÚFAL</a></div>
    ${trackingScripts}
</footer>
</div>
    `
    }

}

export {FooterData};
