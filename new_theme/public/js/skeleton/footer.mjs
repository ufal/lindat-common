class LindatFooter extends HTMLElement {

  connectedCallback(){
    let shadow = this.attachShadow({mode: 'open'})
    shadow.innerHTML = HTML
    const linkElement = document.createElement('link')
    linkElement.setAttribute('rel', 'stylesheet')
    //linkElement.setAttribute('href', 'https://lindat.mff.cuni.cz/common/new_theme/public/css/lindat-dark.css')
    linkElement.setAttribute('href', '/new_theme/public/css/lindat-dark.css')
    shadow.appendChild(linkElement)
  }
}

export {LindatFooter}
