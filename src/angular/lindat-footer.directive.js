/* ngInject */
function LindatFooterDirective() {
  return {
    restrict: 'AE',
    templateUrl: 'partials/footer.html'
  };
}

angular.module('lindat')
  .directive('lindatFooter', LindatFooterDirective);
