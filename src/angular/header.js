var angular = require('angular');

/* @ngInject */
module.exports = function LindatHeaderDirective() {

  function linkFn($scope, $element) {
    var button = $element[0].querySelector('.lindat-menu-btn'),
      menu = $element[0].querySelector('.lindat-menu');
    if (button) {
      angular.element(button).on('click', function() {
        angular.element(menu).toggleClass('lindat-open');
      });
    }
  }

  return {
    restrict: 'AE',
    template: require('../partials/header.html?{lang: "en", angular: true}'),
    link: linkFn
  };
};
