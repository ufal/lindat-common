/* ngInject */
function LindatHeaderDirective() {

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
    templateUrl: 'partials/header.html',
    link: linkFn
  };
}

angular.module('lindat')
  .directive('lindatHeader', LindatHeaderDirective);
