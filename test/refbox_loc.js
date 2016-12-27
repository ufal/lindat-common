var languages = require("../src/refbox/languages.js");
describe('Refbox localizations ', function() {
  var EC = protractor.ExpectedConditions;
  var waitingTime = 5000;

  ['index', 'angular'].forEach(function (filePrefix) {
      Object.keys(languages).map(function(lang) {
          if (lang === 'en') {
            return {lang: 'en', index: filePrefix + '.html'};
          } else {
            return {lang: lang, index: filePrefix + '_' + lang + '.html'};
          }
      }).forEach(function (obj) {
          describe(obj.index, function () {
            var refbox = element(by.css('.lindat-refbox-footer'));
            beforeEach(function () {
              browser.get(obj.index);
            });

            it('should load', function () {
              browser.wait(EC.presenceOf(refbox), waitingTime);

              expect(browser.getTitle()).toEqual('LINDAT/CLARIN Research Infrastructure');
            });

            it('should be translated', function () {
              browser.wait(EC.presenceOf(refbox), waitingTime);
              var testKey = "Share:";
              var testString = languages[obj.lang] ? languages[obj.lang][testKey] : obj.lang === 'en' ? testKey : undefined;
              expect(testString).toBeDefined();

              var shareHeader = element.all(by.css('.lindat-refbox-footer h3')).last();
              expect(shareHeader.getText()).toEqual(testString);
            });
          });
    });
  });
});
