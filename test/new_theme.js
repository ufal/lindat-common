describe('Lindat Common new_theme', function() {
  var headerLocator = by.js(function(){
    return document.querySelector('lindat-header').shadowRoot.querySelector('header');
  })
  var footerLocator = by.js(function(){
    return document.querySelector('lindat-footer').shadowRoot.querySelector('footer');
  })
  var EC = protractor.ExpectedConditions;
  var waitingTime = 5000;

  async function attributePresent(elementLocator, attrName){
    let e = await element(elementLocator)
    let attr = await e.getAttribute(attrName)
    expect(attr).not.toBe(null);
    expect(attr).toMatch(/^.+$/)
  }

  beforeEach(async function() {
    browser.get('/new_theme/index.html');
    await browser.wait(EC.presenceOf(element(headerLocator)), waitingTime)
    await browser.wait(EC.presenceOf(element(footerLocator)), waitingTime)
  });

  /*    it('should load', function() {
        expect(browser.getTitle()).toEqual('Test page title');
      });

      it('should have Lindat header', async function () {
        let header = await browser.driver.findElement(headerLocator)

        var menu = header.findElement(By.css('.lindat-menu'));
        expect(menu.getCssValue('height')).toBe('53px');
        var menuItems = header.findElements(By.css('.lindat-menu li'));
        expect(menuItems.count()).toEqual(8);
      });*/

  it('footer should have data-version', async function (){
    await attributePresent(footerLocator, "data-version")
  });

  it('footer should have data-build', async function (){
    await attributePresent(footerLocator, "data-build")
  });
  /*
  */
});
