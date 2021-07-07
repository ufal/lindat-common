describe('Lindat Common', function() {
  var header = element(by.css('.lindat-header'));
  var footer = element(by.css('.lindat-footer'));
  var EC = protractor.ExpectedConditions;
  var waitingTime = 5000;

  beforeEach(async function() {
    await browser.get('index.html');
  });

  it('should load', async function() {
    await browser.wait(EC.presenceOf(footer), waitingTime);
    await browser.wait(EC.presenceOf(header), waitingTime);

    expect(await browser.getTitle()).toEqual('LINDAT/CLARIAH-CZ Research Infrastructure');
  });

  it('should have Lindat header', async function () {
    await browser.wait(EC.presenceOf(header), waitingTime);

    var menu = await element(by.css('.lindat-menu'));
    expect(await menu.getCssValue('height')).toBe('53px');
    var menuItems = element.all(by.css('.lindat-menu li'));
    expect(await menuItems.count()).toEqual(8);
  });

  it('should have data-version', async function (){
    await browser.wait(EC.presenceOf(footer), waitingTime);
    expect(await footer.getAttribute('data-version')).toMatch(/^.+$/);
  });
});
