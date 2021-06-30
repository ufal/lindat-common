class HeaderData{

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
  static nav_items(){
    let out = ''
    for(const item of HeaderData.header_nav_items){
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

  static buildHtml(options){
    const version = options.VERSION
    const build = options.REV
    return `
<header data-version="${version}" data-build="${build}">
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
                        ${HeaderData.nav_items()}
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
</header>
    `
  }

}

export {HeaderData}
