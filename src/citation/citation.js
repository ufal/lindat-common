var EXPORT_FORMATS = [ 'bibtex', 'cmdi' ];

var shareButtons = [
  {
    name: 'facebook',
    popup: {
      url: 'http://www.facebook.com/sharer/sharer.php?u={url}',
      width: 600,
      height: 500
    }
  },
  {
    name: 'twitter',
    popup: {
      url: 'http://twitter.com/intent/tweet?url={url}&text={title}',
      width: 600,
      height: 450
    }
  },
  {
    name: 'google-plus',
    popup: {
      url: 'https://plus.google.com/share?url={url}',
      width: 700,
      height: 500
    }
  }
];

/* jqml - jQuery JSONML Plugin
* Author: Trevor Norris
* This document is licensed as free software under the terms of the
* MIT License: http://www.opensource.org/licenses/mit-license.php */
function dom(elem) {
  // generate new fragment to store all generated
  var fragment = document.createDocumentFragment(),
    i = 0, j, selector;
  // check if is an element or array of elements
  if (typeof elem[0] === 'string') {
    selector = document.createElement(elem[0]);
    i = 1;
  }
  // loop through all elements in array
  for (; i < elem.length; i++) {
    // if array create new element
    if ($.isArray(elem[i]) && elem[i].length > 0) {
      // to simplify creation of templates, check for array of elements
      if ($.isArray(elem[i][0])) {
        for (j = 0; j < elem[i].length; j++) {
          fragment.appendChild(dom(elem[i][j]));
        }
      } else {
        fragment.appendChild(dom(elem[i]));
      }
      // if object set element attributes
    } else if ($.isPlainObject(elem[i])) {
      // trick to have jQuery assign attributes without creating a new jQuery object
      $.fn.attr.call([selector], elem[i], true);
      // if string or number insert text node
    } else if (typeof elem[i] === 'number' || typeof elem[i] === 'string') {
      fragment.appendChild(document.createTextNode(elem[i]));
      // if is an element append to fragment
    } else if (elem[i].nodeType) {
      fragment.appendChild(elem[i]);
    }
  }
  // if a selector is set append children and return
  if (selector) {
    // check if fragment has children to append (thanks IE)
    if (fragment.hasChildNodes()) {
      selector.appendChild(fragment);
    }
    return selector;
  }
  // otherwise return children of fragment
  return fragment.childNodes;
}

/**
 * @param {String} url
 * @param {String} context
 * @return {String}
 */
function makeUrl(url, context) {
  return url.replace(/\{([^\}]+)\}/g, function (m, key) {
    return key in context ? encodeURIComponent(context[key]) : m;
  });
}

/**
 * @constructor
 * @param {HTMLElement} container
 * @param {Object} options
 */
function CitationBox(container, options) {
  var citationBox = this;

  if (!options) { options = {}; }

  // Init all options from the container element or options object
  ['uri', 'oai', 'handle', 'title'].forEach(function (name) {
    var opt = options[name] || container.getAttribute(name);
    container.removeAttribute(name);
    if (!opt) {
      throw new Error("CitationBox: Option '" + name + "' not specified.");
    }
    citationBox[name] = opt;
  });

  var formats = EXPORT_FORMATS.map(function (format) {
    return ['a', format, {
      href: citationBox.oai + "/cite?metadataPrefix=" + citationBox.format + "&handle=" + citationBox.handle
    }];
  });

  var shares = shareButtons.map(function (social) {
    return ['a', {
      'class': 'lindat-icon lindat-icon-' + social.name + ' lindat-share-' + social.name,
      href: '#'
    }];
  });

  var tpl = $(CitationBox.template);
  tpl.find('[citation-box-formats]').append(dom(formats));
  tpl.find('[citation-box-shares]').append(dom(shares));

  citationBox.text = tpl.find('[citation-box-text]');
  citationBox.copyButton = tpl.find('[copy-button]');

  $(container).empty().append(tpl);
  citationBox.loadText();
}

CitationBox.prototype.loadText = function() {
  var citationBox = this,
    url = citationBox.oai + "/cite?metadataPrefix=html&handle=" + citationBox.handle,
    textNode = citationBox.text;

  function handleFailure() {
    textNode.empty().html("<a href='" + citationBox.uri + "'>" +  citationBox.uri + "</a>");
  }

  $.ajax({url: url, context: document.body, dataType : 'xml'})
    .done(function(data) {
      data = $(data);
      var error = data.find('error');
      if (error.length) {
        console.log("CitationBox: LoadText error '" + error.text() + "'");
        handleFailure();
      } else {
        textNode.empty().append($(data).find('html').html());
      }
    }).fail(handleFailure);
};

window.LindatCitationBox = CitationBox;
