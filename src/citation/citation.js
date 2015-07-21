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
    return $('<a></a>')
      .attr('href', citationBox.oai + "/cite?metadataPrefix=" + format + "&handle=" + citationBox.handle)
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

  var tpl = $(CitationBox.template);
  tpl.find('[citation-box-formats]').append(formats);
  tpl.find('[citation-box-shares]').append(shares);

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
