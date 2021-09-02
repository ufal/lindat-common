var angular = require('angular');
var header = require('../../.build/header.json');

/* @ngInject */
module.exports = function LindatHeaderDirective() {

  function linkFn($scope, $element) {
    var button = $element[0].querySelector('.lindat-navbar-toggler'),
      menu = $element[0].querySelector('.lindat-navbar-toggler+div.lindat-collapse.lindat-navbar-collapse');
    if (button) {
      angular.element(button).on('click', function() {
        angular.element(menu).toggleClass('lindat-show');
      });
    }
  }

  return {
    restrict: 'AE',
    template: header.template,
    link: linkFn
  };
};
