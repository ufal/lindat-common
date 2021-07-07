var headerLocator = by.js(function(){
  return document.querySelector('lindat-header').shadowRoot.querySelector('header');
})
var footerLocator = by.js(function(){
  return document.querySelector('lindat-footer').shadowRoot.querySelector('footer');
})
var EC = protractor.ExpectedConditions;
var waitingTime = 5000;

describe('Lindat Common new_theme', function() {

  async function attributePresent(elementLocator, attrName){
    let e = await element(elementLocator)
    let attr = await e.getAttribute(attrName)
    expect(attr).not.toBe(null);
    expect(attr).toMatch(/^.+$/)
  }

  beforeEach(async function() {
    await browser.get('/dist/new_theme/example/index.html');
    await browser.wait(EC.presenceOf(element(headerLocator)), waitingTime)
    await browser.wait(EC.presenceOf(element(footerLocator)), waitingTime)
  });

  it('should load', async function() {
    expect(await browser.getTitle()).toEqual('Test page title');
  });

  it('footer should have data-version', async function (){
    await attributePresent(footerLocator, "data-version")
  });

  it('footer should have data-build', async function (){
    await attributePresent(footerLocator, "data-build")
  });
  it('header should have data-version', async function (){
    await attributePresent(headerLocator, "data-version")
  });

  it('header should have data-build', async function (){
    await attributePresent(headerLocator, "data-build")
  });
});

describe('lindat-common matches drupal', function (){
  it('common header should have the same number of items as lindat.cz', async function(){
    //drupal header
    await browser.get('https://lindat.cz');
    let menu = await element(by.css(".block--clariah-theme-main-menu"))
    await browser.wait(EC.presenceOf(menu), waitingTime)
    let expected_nav_items = await menu.all(by.css(".nav-item")).count()
    let expected_dropdown_items = await menu.all(by.css(".nav-item .dropdown-item")).count()

    expect(expected_nav_items).toBeDefined()

    //common header
    await browser.get('/dist/new_theme/example/index.html');
    let header = await element(headerLocator)
    await browser.wait(EC.presenceOf(header), waitingTime)
    let real_nav_items = await header.all(by.css(".block--clariah-theme-main-menu .nav-item")).count()
    let real_dropdown_items = await header.all(by.css(".block--clariah-theme-main-menu .nav-item .dropdown-item")).count()
    expect(real_nav_items).toBe(expected_nav_items);
    //console.log(`========= ${real_nav_items}=${expected_nav_items}`)
    expect(real_dropdown_items).toBe(expected_dropdown_items);
  });

  it('footer should have the same number of links as lindat.cz', async function(){
    //drupal footer
    await browser.get('https://lindat.cz');
    let footer = await element(by.css("footer"))
    await browser.wait(EC.presenceOf(footer), waitingTime)
    let expected_footer_anchors = await footer.all(by.css("a")).count()
    expect(expected_footer_anchors).toBeDefined()

    await browser.get('/dist/new_theme/example/index.html');
    let common_footer = await element(footerLocator)
    let real_footer_anchors = await common_footer.all(by.css("a")).count()

    expect(real_footer_anchors).toBe(expected_footer_anchors);
  });

});
