var angular = require('angular');

angular.module('lindat-common', [require('./angular')])
  .controller('HomeController', function ($scope) {
    var vm = this;

    vm.handle = '11858/00-097C-0000-0023-1AAF-3';
    vm.title = 'Prague Dependency Treebank 3.0';

    vm.testingHandles = [
      { handle: 'non_existing', title: 'Non existing handle' },
      { handle: '11234/1-1508', title: 'HamleDT 3.0' },
      { handle: '11858/00-097C-0000-0023-1AAF-3', title: 'Prague Dependency Treebank 3.0' }
    ];

    vm.changeHandle = function (handle, title) {
      vm.handle = handle;
      vm.title = title;
    };

    vm.destroy = function () {
      $scope.$destroy();
    };
  });
