(function($){
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

function dropdownToggle(dropdownList) {
  var isOpened = false;

  function closeDropdown() {
    if (!isOpened) {
      return;
    }

    isOpened = false;
    dropdownList.hide();
    $(document).off('click.refbox');
  }

  return $('<button></button>')
    .addClass('lindat-button lindat-dropdown-toggle')
    .attr('type', 'button')
    .append($('<span></span>').addClass('lindat-dropdown-caret'))
    .click(function () {
      if (isOpened) {
        closeDropdown();
      } else {
        setTimeout(function () {
          $(document).on('click.refbox', closeDropdown);
        });
        dropdownList.show();
        isOpened = true;
      }
    });
}

/**
 * @constructor
 * @param {HTMLElement} container
 * @param {Object} options
 */
function RefBox(container, options) {
  var refbox = this;

  if (!options) {
    options = {};
  }

  if (!(refbox instanceof RefBox)) {
    return new RefBox(container, options);
  }

  // Init all options from the container element or options object
  ['handle', 'title'].forEach(function (name) {
    var opt = container.getAttribute(name);
    container.removeAttribute(name);
    if (!opt) {
      throw new Error("RefBox: Option '" + name + "' not specified.");
    }
    refbox[name] = opt;
  });

  var tpl = refbox.body = $(RefBox.template);
  refbox.formatsContainer = tpl.find('[refbox-formats]');
  refbox.sharesContainer = tpl.find('[refbox-shares]');
  refbox.integrationContainer = tpl.find('[refbox-integrations]');
  Object.keys(options).forEach(function (name) {
    refbox[name] = options[name];
  });

  //should be used only as failsafe when rest does not return anything.
  refbox['uri'] = 'http://hdl.handle.net/' + refbox['handle'];

  refbox.text = tpl.find('[refbox-text]');
  refbox.copyButton = tpl.find('[refbox-copy-button]');

  $(container).empty().append(tpl);
  refbox.init();
}

RefBox.prototype.init = function () {
  var refbox = this,
    textNode = refbox.text,
    copyButton = refbox.copyButton;

  function handleFailure() {
    textNode.empty().html("<a href='" + refbox.uri + "'>" + refbox.uri + "</a>");
  }

  refbox.fetchInitial().
    done(function (data) {
      if (data.title) {
        refbox.title = data.title;
      }

      var exportFormats = data.exportFormats.exportFormat;
      if (exportFormats && exportFormats.length > 0) {
        exportFormats.forEach(function (format) {
          var el = $('<a></a>')
            .attr('href', format.url)
            .on('click', function (e) {
              e.preventDefault();
              refbox.request(format)
                .done(function (data) {
                  refbox.modal(refbox.title, data, format.name);
                });
            })
            .text(format.name);
          refbox.formatsContainer.append(el);
        });
      }
      if (data.displayText) {
        textNode.empty().append(data.displayText);
        copyButton.on('click', function (e) {
          e.preventDefault();
          refbox.modal(refbox.title, textNode.text());
        });
        refbox.body.removeClass('lindat-loading');
      }

      var featuredServices = data.featuredServices.featuredService;
      if (featuredServices && featuredServices.length > 0) {
        var servicesContainer = refbox.integrationContainer.find('[refbox-services]');
        featuredServices.forEach(function (service) {
          var links = service.links,
            serviceLink = $('<a></a>')
              .addClass('lindat-button')
              .attr('target', '_blank')
              .attr('title', service.description)
              .attr('href', service.url)
              .text(service.name);

          if (links && links.entry.length > 0) {
            var list = $('<ul></ul>')
                .addClass('lindat-dropdown-menu'),
              container = $('<div></div>')
                .addClass('lindat-dropdown')
                .append(serviceLink)
                .append(dropdownToggle(list))
                .append(list);

            links.entry.forEach(function (link) {
              list.append($('<li></li>').append(
                $('<a></a>')
                  .attr('target', '_blank')
                  .attr('href', link.value)
                  .text(link.key))
              );
            });

            servicesContainer.append(container);
          } else {
            servicesContainer.append(serviceLink);
          }
        });
      } else {
        refbox.integrationContainer.remove();
      }

      shareButtons.forEach(function (social) {
        var popup = social.popup,
          url = makeUrl(popup.url, refbox);

        var el = $('<a></a>')
          .attr('class', 'lindat-icon lindat-icon-' + social.name + ' lindat-share-' + social.name)
          .attr('href', url)
          .on('click', function (e) {
            e.preventDefault();
            window.open(url, refbox.title,
              'height:' + popup.height + ',width:' + popup.width);
          });
        refbox.sharesContainer.append(el);
      });

    })
    .fail(handleFailure);
};

/**
 * Fetches metadata in specified format
 * @param {Object} format
 * @return {Deferred}
 */
RefBox.prototype.request = function (format) {
  var deferred = $.Deferred();

  $.ajax(format.url, {dataType: format.dataType, cache: true})
    .done(function (data) {
      if (format.dataType === 'xml') {
        var jData = $(data);
        var error = jData.find('error');
        if (error.length) {
          deferred.reject();
        } else {
          var content = jData.find(format.name);
          deferred.resolve(content.length ? content.html() : jData);
        }
      } else {
        deferred.resolve(data.value);
      }
    })
    .fail(deferred.reject);

  return deferred;
};

/**
 * Fetches initial data object (display text, export formats, services,...)
 * @return {Deferred}
 */
RefBox.prototype.fetchInitial = function () {
  var url = this.rest + '/handle/' + this.handle + '/refbox';
  return $.getJSON(url);
};

/**
 * Creates super simple modal window
 *
 * TODO: refactor to class (maybe)
 * @param {String} title
 * @param {String} content
 * @param {String=} format
 */
RefBox.prototype.modal = function (title, content, format) {
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

  if (format) {
    $('<div class="lindat-modal-footer"></div>').text(format).appendTo(modal);
  }

  selectText();

  // Handles the keydown event
  $(document).on('keydown.lindat', function (e) {
    if (e.keyCode === 27) {
      destroy();
    }
  });

  // Handles the hashchange event
  $(window).on('hashchange.lindat', destroy);
};

window.LindatRefBox = RefBox;

$.fn.lindatRefBox = function (opts) {
  var options = $.extend({}, {
    //defaults
    rest: 'https://ufal-point-dev.ms.mff.cuni.cz/repository/rest'
  }, opts);
  var DATA_KEY = 'lindat-refbox';
  this.each(function () {
    var el = $(this), box = el.data(DATA_KEY);
    if (!box) {
      el.data(DATA_KEY, new RefBox(this, options));
    }
  });
  return this;
};

$(document).ready(function () {
  if (!window.LindatRefBoxConfig) {
    window.LindatRefBoxConfig = {};
  }
  $(".refbox").lindatRefBox(window.LindatRefBoxConfig);
});


window.LindatRefBox.template = "<div class=\"lindat-refbox lindat-loading\"><div class=\"lindat-refbox-top\"><div class=\"lindat-refbox-header\"><div class=\"lindat-icon lindat-header-icon lindat-icon-quote\"></div><h3>Please use the following text to cite this item or export to a predefined format:</h3><div class=\"lindat-refbox-formats\" refbox-formats=\"\"></div></div><div class=\"lindat-refbox-body\"><div class=\"lindat-refbox-text\" refbox-text=\"\"><div class=\"lindat-loader\"><div></div><div></div><div></div></div></div><div><button class=\"lindat-refbox-copy lindat-icon lindat-icon-copy\" refbox-copy-button=\"\"></button></div></div></div><div class=\"lindat-refbox-footer\"><div class=\"lindat-refbox-integration\" refbox-integrations=\"\"><div class=\"lindat-refbox-header\"><div class=\"lindat-icon lindat-header-icon lindat-icon-puzzle\"></div><h3>This resource is also integrated in following services:</h3></div><div class=\"lindat-refbox-services\" refbox-services=\"\"></div></div><div class=\"lindat-refbox-header\"><div class=\"lindat-icon lindat-header-icon lindat-icon-share\"></div><h3>Share:</h3><div class=\"lindat-refbox-shares\" refbox-shares=\"\"></div></div></div></div>";

}(jQuery));