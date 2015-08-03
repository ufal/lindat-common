describe('Lindat Common', function() {
  var header = element(by.css('.lindat-header'));
  var footer = element(by.css('.lindat-footer'));
  var body = element(by.tagName('body'));
  var EC = protractor.ExpectedConditions;
  var waitingTime = 5000;

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
    browser.executeScript('window.sessionStorage.clear();');
    browser.executeScript('window.localStorage.clear();');
  });

  it('should load', function() {
    browser.wait(EC.presenceOf(footer), waitingTime);
    browser.wait(EC.presenceOf(header), waitingTime);

    expect(browser.getTitle()).toEqual('LINDAT/CLARIN Research Infrastructure');
  });

  it('should have Lindat header', function () {
    browser.wait(EC.presenceOf(header), waitingTime);
    expect(header.isPresent()).toBeTruthy();

    var menu = element(by.css('.lindat-menu'));
    expect(menu.getCssValue('height')).toBe('56px');
    var menuItems = element.all(by.css('.lindat-menu li'));
    expect(menuItems.count()).toEqual(8);
  });

  it('should switch projects', function () {
    browser.wait(EC.presenceOf(header), waitingTime);

    var homeItem, repositoryItem;

    element(by.css('[value="lindat-home"]')).click();
    browser.wait(EC.presenceOf(element(by.css('#lindat-home'))), waitingTime);

    homeItem = element(by.css('.lindat-home-item a'));
    repositoryItem = element(by.css('.lindat-repository-item a'));
    expect(body.getAttribute('id')).toEqual('lindat-home');
    expect(homeItem.getCssValue('border-bottom-color')).toBe('rgba(204, 171, 40, 1)');
    expect(repositoryItem.getCssValue('border-bottom-color')).toBeTransparent();

    element(by.css('[value="lindat-repository"]')).click();
    browser.wait(EC.presenceOf(element(by.css('#lindat-repository'))), waitingTime);

    homeItem = element(by.css('.lindat-home-item a'));
    repositoryItem = element(by.css('.lindat-repository-item a'));
    expect(body.getAttribute('id')).toEqual('lindat-repository');
    expect(homeItem.getCssValue('border-bottom-color')).toBeTransparent();
    expect(repositoryItem.getCssValue('border-bottom-color')).toBe('rgba(116, 121, 184, 1)');
  });

  it('should switch languages', function () {
    browser.wait(EC.presenceOf(header), waitingTime);

    var repositoryItem;

    element(by.css('[value="en"]')).click();
    repositoryItem = element(by.css('.lindat-repository-item'));
    browser.wait(EC.textToBePresentInElement(repositoryItem, 'Repository'), waitingTime);
    expect(repositoryItem.getText()).toEqual('Repository');

    element(by.css('[value="cs"]')).click();
    repositoryItem = element(by.css('.lindat-repository-item'));
    browser.wait(EC.textToBePresentInElement(repositoryItem, 'Repozitář'), waitingTime);
    expect(repositoryItem.getText()).toEqual('Repozitář');
  });
});
