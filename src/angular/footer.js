/* @ngInject */
module.exports = function LindatFooterDirective() {
  return {
    restrict: 'AE',
    template: require('../partials/footer.html?{lang: "en", angular: true}')
  };
};
