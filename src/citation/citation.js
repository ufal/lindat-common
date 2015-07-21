var EXPORT_FORMATS = [ 'bibtex', 'cmdi' ];

var shareButtons = [
  {
    name: 'facebook',
    popup: {
      url: 'http://www.facebook.com/sharer/sharer.php?u={uri}',
      width: 600,
      height: 500
    }
  },
  {
    name: 'twitter',
    popup: {
      url: 'http://twitter.com/intent/tweet?url={uri}&text={title}',
      width: 600,
      height: 450
    }
  },
  {
    name: 'google-plus',
    popup: {
      url: 'https://plus.google.com/share?url={uri}',
      width: 700,
      height: 500
    }
  }
];

/**
 * @param {String} url
 * @param {Object} context
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
    return $('<a></a>')
      .attr('href', citationBox.oai + '/cite?metadataPrefix=' + format + '&handle=' + citationBox.handle)
      .on('click', function (e) {
        e.preventDefault();
        citationBox.request(format)
          .done(function(data) {
            if ($.type(data) !== 'string') {
              data = data[0].documentElement.outerHTML;
            } else {
              data = $.trim(data);
            }
            citationBox.modal(citationBox.title, data);
          });
      })
      .text(format);
  });

  var shares = shareButtons.map(function (social) {
    var popup = social.popup,
      url = makeUrl(popup.url, citationBox);

    return $('<a></a>')
      .attr('class', 'lindat-icon lindat-icon-' + social.name + ' lindat-share-' + social.name)
      .attr('href', url)
      .on('click', function (e) {
        e.preventDefault();
        window.open(url, citationBox.title,
          'height:' + popup.height + ',width:' + popup.width);
      });
  });

  var tpl = citationBox.body = $(CitationBox.template);
  tpl.find('[citation-box-formats]').append(formats);
  tpl.find('[citation-box-shares]').append(shares);

  citationBox.text = tpl.find('[citation-box-text]');
  citationBox.copyButton = tpl.find('[citation-box-copy-button]');

  $(container).empty().append(tpl);
  citationBox.init();
}

CitationBox.prototype.init = function() {
  var citationBox = this,
    textNode = citationBox.text,
    copyButton = citationBox.copyButton;

  function handleFailure() {
    textNode.empty().html("<a href='" + citationBox.uri + "'>" +  citationBox.uri + "</a>");
  }

  citationBox.request('html')
    .done(function(data) {
      textNode.empty().append(data);
      copyButton.on('click', function (e) {
        e.preventDefault();
        citationBox.modal(citationBox.title, data);
      });
      citationBox.body.removeClass('lindat-loading');
    })
    .fail(handleFailure);
};

/**
 * Fetches metadata in specified format
 * @param {String} format
 * @return {Deferred}
 */
CitationBox.prototype.request = function(format) {
  var url = this.oai + '/cite?metadataPrefix=' + format + '&handle=' + this.handle,
    deferred = $.Deferred();

    $.ajax(url, {dataType: 'xml', cache: true})
      .done(function (data) {
        data = $(data);
        var error = data.find('error');
        if (error.length) {
          deferred.reject();
        } else {
          var content = data.find(format);
          deferred.resolve(content.length ? content.html() : data);
        }
      })
      .fail(deferred.reject);

  return deferred;
};

/**
 * Creates super simple modal window
 *
 * TODO: refactor to class (maybe)
 * @param {String} title
 * @param {String} content
 * @return {Function}
 */
CitationBox.prototype.modal = function (title, content) {
  var overlay, modal, btn, modalClicked, textarea, openClass = 'lindat-modal-open';

  var html = $('html');
  if (html.hasClass(openClass)) {
    return;
  }

  html.addClass(openClass);

  function destroy() {
    if (modalClicked) {
      modalClicked = false;
      return;
    }
    html.removeClass(openClass);
    overlay.remove();
    $(document).off('.lindat');
    $(window).off('.lindat');
  }

  function selectText() {
    textarea.focus().select();
  }

  overlay = $('<div class="lindat-overlay"></div>')
    .on('click', destroy)
    .appendTo(document.body);

  modal = $('<div class="lindat-modal" role="dialog"></div>')
    .on('click', function () {
      modalClicked = true;
    })
    .appendTo(overlay);

  btn = $('<div class="lindat-modal-close-button">&#xD7;</div>')
    .on('click', destroy);

  $('<div class="lindat-modal-header"></div>')
    .append($('<h3></h3>').text(title).append($('<p>Press <kbd>ctrl + c</kbd> to copy</p>')))
    .append(btn)
    .appendTo(modal);

  textarea = $('<textarea readonly="readonly"></textarea>')
    .on('mouseover', selectText)
    .text(content);

  $('<div class="lindat-modal-body"></div>').append(textarea).appendTo(modal);

  selectText();

  // Handles the keydown event
  $(document).on('keydown.lindat', function(e) {
    if (e.keyCode === 27) {
      destroy();
    }
  });

  // Handles the hashchange event
  $(window).on('hashchange.lindat', destroy);
};

window.LindatCitationBox = CitationBox;
