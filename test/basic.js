describe('Lindat Common', function() {
  var header = element(by.css('.lindat-header'));
  var footer = element(by.css('.lindat-footer'));
  var EC = protractor.ExpectedConditions;
  var waitingTime = 5000;

  beforeEach(function() {
    browser.get('index.html');
  });

  it('should load', function() {
    browser.wait(EC.presenceOf(footer), waitingTime);
    browser.wait(EC.presenceOf(header), waitingTime);

    expect(browser.getTitle()).toEqual('LINDAT/CLARIN Research Infrastructure');
  });

  it('should have Lindat header', function () {
    browser.wait(EC.presenceOf(header), waitingTime);

    var menu = element(by.css('.lindat-menu'));
    expect(menu.getCssValue('height')).toBe('53px');
    var menuItems = element.all(by.css('.lindat-menu li'));
    expect(menuItems.count()).toEqual(7);
  });
});
