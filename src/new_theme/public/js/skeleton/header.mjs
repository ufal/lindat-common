class LindatHeader extends HTMLElement {


  connectedCallback(){
    let shadow = this.attachShadow({mode: 'open'})
    shadow.innerHTML = HTML
    const linkElement = document.createElement('link')
    linkElement.setAttribute('rel', 'stylesheet')
    linkElement.setAttribute('href', `${PUBLICPATH}public/css/lindat.css`)

    shadow.appendChild(linkElement)
  }
}

export {LindatHeader}
