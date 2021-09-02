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
            beforeEach(async function () {
              await browser.get('dist/example/' + obj.index);
              await browser.wait(EC.presenceOf(refbox), waitingTime);
              await browser.wait(async function (){
                return !!await refbox.element(by.css('.lindat-icon-share+h3')).getText();
              }, waitingTime)
            });

            it('should load', async function () {
              expect(await browser.getTitle()).toEqual('LINDAT/CLARIAH-CZ Research Infrastructure');
            });

            it('should be translated', async function () {
              var testKey = "Share:";
              var testString = languages[obj.lang] ? languages[obj.lang][testKey] : obj.lang === 'en' ? testKey : undefined;
              expect(testString).toBeDefined();

              const shareHeaderText = await refbox.element(by.css('.lindat-icon-share+h3')).getText();
              expect(shareHeaderText).toEqual(testString);
            });
          });
    });
  });
});
