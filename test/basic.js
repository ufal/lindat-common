describe('Lindat Common', function() {
  var header = element(by.css('.lindat-header'));
  var footer = element(by.css('.lindat-footer'));
  var body = element(by.tagName('body'));
  var EC = protractor.ExpectedConditions;
  var waitingTime = 5000;
  var sleepTime = 3000;

  beforeEach(function() {
    jasmine.addMatchers({
      toBeTransparent: function (util, customEqualityTesters) {
        return {
          compare: function (actual) {
            var result = {};
            result.pass = util.equals(actual, 'transparent', customEqualityTesters) ||
              util.equals(actual, 'rgba(0, 0, 0, 0)', customEqualityTesters);
            if (result.pass) {
              result.message = 'Expected ' + actual + ' not to be transparent';
            } else {
              result.message = 'Expected ' + actual + ' to be transparent';
            }

            return result;
          }
        };
      }
    });

    browser.get('index.html');
  });

  afterEach(function() {
    browser.executeScript('window.sessionStorage.clear(); window.localStorage.clear();');
  });

  it('should load', function() {
    browser.wait(EC.presenceOf(footer), waitingTime);
    browser.wait(EC.presenceOf(header), waitingTime);

    expect(browser.getTitle()).toEqual('LINDAT/CLARIN Research Infrastructure');
  });

  it('should have Lindat header', function () {
    browser.wait(EC.presenceOf(header), waitingTime);

    var menu = element(by.css('.lindat-menu'));
    expect(menu.getCssValue('height')).toBe('56px');
    var menuItems = element.all(by.css('.lindat-menu li'));
    expect(menuItems.count()).toEqual(8);
  });
});
