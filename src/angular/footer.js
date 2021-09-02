var footer = require('../../.build/footer.json');

/* @ngInject */
module.exports = function LindatFooterDirective() {
  return {
    restrict: 'AE',
    template: footer.template
  };
};
