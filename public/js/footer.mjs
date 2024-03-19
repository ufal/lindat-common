class LindatFooter extends HTMLElement {

  connectedCallback(){
    let shadow = this.attachShadow({mode: 'open'})
    shadow.innerHTML = HTML
    const linkElement = document.createElement('link')
    linkElement.setAttribute('rel', 'stylesheet')
    linkElement.setAttribute('href', `${PUBLICPATH}public/css/lindat.css`)
    shadow.appendChild(linkElement)
  }
}

export {LindatFooter}

const HTML = `

<div class="lindat-common2 lindat-common-footer">
 <footer data-version="3.4.1" data-build="cd5cf72c9b99a8184350885fcba6492c2c4bcef3">
    
      <div id="about-lindat">
        <h4><a href="https://lindat.cz/sites/default/files/2021-01/lindat_clariah_flyer.pdf">LINDAT/CLARIAH-CZ</a></h4>
        <ul>
          
          <li><a href="https://lindat.cz/files/mission-en.pdf">Mission Statement</a></li>
          
          <li><a href="https://lindat.cz/ab">Advisory Board</a></li>
          
          <li><a href="https://lindat.cz/events">Events</a></li>
          
          <li><a href="https://www.clarin.eu/">CLARIN Participation</a></li>
          
          <li><a href="https://www.dariah.eu/">DARIAH Participation</a></li>
          <br/>
          <li><a href="https://lindat.cz/faq-repository">FAQ</a></li>
          
          <li><a href="mailto:lindat-help@ufal.mff.cuni.cz">Helpdesk</a></li>
          
          <li><a href="https://lindat.cz/user_feedback">User Feedback Form</a></li>
          <br/>
          <li><a href="https://ufal.mff.cuni.cz/grants/lindatclariah-cz/en">Hosting Institution</a></li>
          
          <li><a href="https://lindat.cz/acknowledgement">Acknowledge LINDAT/CLARIAH-CZ</a></li>
          
        </ul>
      </div>
      
      <div id="about-partners">
        <h4><a href="https://lindat.cz/partners">Partners</a></h4>
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
          
            <li>Terezín
                <ul>
                    
          <li><a href="https://lindat.cz/partners/iti">Terezín Initiative Institute</a></li>
          
          <li><a href="https://lindat.cz/partners/pt">Terezín Memorial</a></li>
          
                </ul>
            </li>
          
            <li>Czech Academy of Sciences
                <ul>
                    
          <li><a href="https://lindat.cz/partners/ujc">Czech Language Institute</a></li>
          
          <li><a href="https://lindat.cz/partners/knav">Library <i>of</i> Academy</a></li>
          
          <li><a href="https://lindat.cz/partners/hu">Institute <i>of</i> History</a></li>
          
          <li><a href="https://lindat.cz/partners/flu">Institute <i>of</i> Philosophy</a></li>
          
          <li><a href="https://lindat.cz/partners/mua">Masaryk Institute <i>and</i> Archives</a></li>
          
                </ul>
            </li>
          
            <li>Archives, Libraries and Galleries
                <ul>
                    
          <li><a href="https://lindat.cz/partners/nk">National Library <i>of the Czech Republic</i></a></li>
          
          <li><a href="https://lindat.cz/partners/mzk">Moravian Library <i>in Brno</i></a></li>
          
          <li><a href="https://lindat.cz/partners/ng">National Gallery Prague</a></li>
          
          <li><a href="https://lindat.cz/partners/nfa">National Film Archive</a></li>
          
          <li><a href="https://lindat.cz/partners/na">National Archives</a></li>
          
                </ul>
            </li>
          
        </ul>
      </div>
      
      <div id="about-website">
        <h4><a href="https://lindat.cz/services">Services</a></h4>
        <ul>
          
          <li><a href="https://lindat.mff.cuni.cz/en/monitoring">Service Status</a></li>
          
          <li><a href="https://lindat.mff.cuni.cz/repository/xmlui/page/about?locale-attribute=en">About and Policies</a></li>
          
          <li><a href="https://lindat.mff.cuni.cz/en/terms-of-use">Terms of Use</a></li>
          
        </ul>
      </div>
      

    <div id="badges-a">
        <a href="https://www.clarin.eu/content/certified-centres"><img src="https://lindat.mff.cuni.cz/images/b-centre.png" alt="CLARIN CENTRE B" /></a>
        <a href="https://www.clarin.eu/content/knowledge-centres"><img src="https://lindat.mff.cuni.cz/images/k-centre.png" alt="CLARIN CENTRE K" style="filter:brightness(0.88)" /></a>
        <a href="https://hdl.handle.net/11234/6-CTS"><img src="https://lindat.mff.cuni.cz/images/core-trust-seal-mono.png" alt="CoreTrustSeal Certification" /></a>
    </div>

    <div id="badges-b">
        <a href="https://twitter.com/lindatclariahcz">Follow us on Twitter <img src="https://lindat.mff.cuni.cz/images/twitter-circular.svg" alt="Link to Profile" /></a>
        <a href="https://lindat.cz/user/login"><img src="https://lindat.mff.cuni.cz/sites/default/files/LINDAT-CLARIAH-cz-gray_0.svg" alt="Home Page" /></a>
    </div>

    <div id="ack-msmt">
        THE LINDAT/CLARIAH-CZ PROJECT (LM2023062; formerly LM2010013, LM2015071, LM2018101) IS FULLY SUPPORTED BY THE MINISTRY OF EDUCATION, SPORTS AND YOUTH OF THE CZECH REPUBLIC UNDER THE&#160;PROGRAMME LM OF "LARGE INFRASTRUCTURES"
    </div>
    <div id="ack-freepik">Icons ©  Smashicons and Freepik from flaticon.com licensed by <a href="https://creativecommons.org/licenses/by/3.0/">CC 3.0 BY</a></div>
    <div id="ack-ufal">website © 2024 by <a href="https://ufal.mff.cuni.cz/">ÚFAL</a></div>
    
</footer>
</div>
    
`;
const PUBLICPATH = "https://lindat.mff.cuni.cz/common/";