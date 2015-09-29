/* ngInject */
function LindatRefboxDirective($window, refboxRestAPI) {

  function linkFn($scope, $element) {
    var refbox;

    if (!$window.LindatRefBox) {
      throw new Error('Lindat Refbox is not available');
    }

    $scope.$watchGroup(['handle', 'title'], function (attrs) {
      if (!attrs) {
        return;
      }

      refbox = new $window.LindatRefBox($element, {
        handle: attrs[0],
        title: attrs[1],
        rest: refboxRestAPI
      });
    });

    $scope.$on('$destroy', function () {
      if (refbox) {
        refbox.destroy();
      }
    });
  }

  return {
    restrict: 'AE',
    scope: {
      handle: '=',
      title: '='
    },
    link: linkFn
  };
}

angular.module('lindat')
  .directive('lindatRefbox', LindatRefboxDirective);
