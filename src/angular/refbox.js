var RefBox = require('../refbox/main');

/* @ngInject */
module.exports = function LindatRefboxDirective(refboxRestAPI) {

  function linkFn($scope, $element) {
    var refbox;

    $scope.$watchGroup(['handle', 'title'], function (attrs) {
      if (!attrs) {
        return;
      }

      refbox = new RefBox($element, {
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
};
