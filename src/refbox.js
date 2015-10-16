var $ = require('jquery');
var RefBox = require('./refbox/main');

window.LindatRefBox = RefBox;

$.fn.lindatRefBox = function (opts) {
  var options = $.extend({}, {
    //defaults
    rest: 'https://lindat.mff.cuni.cz/repository/rest'
  }, opts);
  var DATA_KEY = 'lindat-refbox';
  this.each(function () {
    var el = $(this), box = el.data(DATA_KEY);
    if (box) {
      box.destroy();
    }

    el.data(DATA_KEY, new RefBox(this, options));
  });
  return this;
};

$(document).ready(function () {
  if (!window.LindatRefBoxConfig) {
    window.LindatRefBoxConfig = {};
  }
  $(".refbox").lindatRefBox(window.LindatRefBoxConfig);
});
