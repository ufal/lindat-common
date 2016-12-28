var languages = require("../src/refbox/languages.js");
describe('Refbox localizations ', function() {
  var EC = protractor.ExpectedConditions;
  var waitingTime = 5000;

  Object.keys(languages).map(function(lang){
    if(lang === 'en'){
      return {lang:'en', index:'index.html'};
    }else{
      return {lang:lang, index:'index_'+lang+'.html'};
    }}).forEach( function(obj){
    describe(obj.index, function(){
      var refbox = element(by.css('.lindat-refbox-footer'));
      beforeEach(function() {
        browser.get(obj.index);
      });

      it('should load', function() {
        browser.wait(EC.presenceOf(refbox), waitingTime);

        expect(browser.getTitle()).toEqual('LINDAT/CLARIN Research Infrastructure');
      });

      it('should be translated', function () {
        browser.wait(EC.presenceOf(refbox), waitingTime);
        var testKey = "Share:";
        var testString = languages[obj.lang] ? languages[obj.lang][testKey] : lang === 'en' ? testKey : undefined;
        expect(testString).toBeDefined();

        var shareHeader = element(by.css('.lindat-refbox-footer h3'));
        expect(shareHeader.getText()).toEqual(testString);
      });
    });
  });
});
