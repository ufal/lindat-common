/* ngInject */
function LindatFooterDirective() {
  return {
    restrict: 'AE',
    templateUrl: 'partials/footer.htm'
  };
}

angular.module('lindat')
  .directive('lindatFooter', LindatFooterDirective);
