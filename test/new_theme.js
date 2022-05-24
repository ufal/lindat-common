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
    await browser.get('/dist/example/index.html');
    await browser.wait(EC.presenceOf(element(headerLocator)), waitingTime)
    await browser.wait(EC.presenceOf(element(footerLocator)), waitingTime)
  });

  it('should load', async function() {
    expect(await browser.getTitle()).toEqual('LINDAT/CLARIAH-CZ Research Infrastructure');
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

  let epected_nav_items, expected_dropdown_items, expected_links, expected_footer_anchors_count, expected_cs_header_links;

  beforeAll(async function(){
    //drupal header
    await browser.get('https://lindat.cz');
    let menu = await element(by.css(".block--clariah-theme-main-menu"))
    await browser.wait(EC.presenceOf(menu), waitingTime)
    expected_nav_items = await menu.all(by.css(".nav-item")).count()
    expected_dropdown_items = await menu.all(by.css(".nav-item .dropdown-item")).count()

    //drupal footer
    let footer = await element(by.css("footer"))
    await browser.wait(EC.presenceOf(footer), waitingTime)
    let expected_footer_anchors = footer.all(by.css("a"));

    expected_links = [];
    await expected_footer_anchors.each(async function (e, index){
      let link = await e.getAttribute('href');
      let parent = await e.element(by.xpath('..'));
      let parent_id = await parent.getAttribute('id');
      // The drupal footer adds `under <a href="https://creativecommons.org/licenses/by/4.0/">CC 4.0 BY</a></div>`
      // it would be confusing if repo or services had this statement too
      if (parent_id === 'ack-ufal' && link.includes('creativecommons.org')){
        ;
      }else {
        expected_links.push(link.replace('http:', 'https:'));
      }
    expected_footer_anchors_count = expected_links.length;
    });

    //drupal cs header
    expected_cs_header_links = [];
    await browser.get('https://lindat.cz/cs');
    let cs_menu = await element(by.css(".block--clariah-theme-main-menu"));
    await browser.wait(EC.presenceOf(cs_menu), waitingTime);
    let expected_cs_header_anchors = cs_menu.all(by.css("a"));
    await expected_cs_header_anchors.each(async function (e, index){
      let link = await e.getAttribute('href');
      expected_cs_header_links.push(link);

    });


    await browser.get('/dist/example/index.html');
  })

  it('common header should have the same number of items as lindat.cz', async function(){
    expect(expected_nav_items).toBeDefined()

    let header = await element(headerLocator)
    await browser.wait(EC.presenceOf(header), waitingTime)
    let real_nav_items = await header.all(by.css(".lindat-block--clariah-theme-main-menu .lindat-nav-item")).count()
    let real_dropdown_items = await header.all(by.css(".lindat-block--clariah-theme-main-menu .lindat-nav-item .lindat-dropdown-item")).count()
    expect(real_nav_items).toBe(expected_nav_items);
    //console.log(`========= ${real_nav_items}=${expected_nav_items}`)
    expect(real_dropdown_items).toBe(expected_dropdown_items);
  });

  it('footer should have the same number of links as lindat.cz', async function(){
    expect(expected_footer_anchors_count).toBeDefined()

    let common_footer = await element(footerLocator)
    let real_footer_anchors = await common_footer.all(by.css("a")).count()

    expect(real_footer_anchors).toBe(expected_footer_anchors_count);
  });

  it('footer links should be the same on lindat.cz', async function(){
    expect(expected_footer_anchors_count).toBeDefined()

    let common_footer = await element(footerLocator)
    let real_footer_anchors = common_footer.all(by.css("a"))
    let real_links = [];
    await real_footer_anchors.each(async function (e, index){
      let link = await e.getAttribute('href');
      real_links.push(link);
    });
    expect(real_links.sort()).toEqual(expected_links.sort());

  })

  it('cs header links should match', async function(){
    await browser.get('/dist/cs/header-services-standalone.htm');
    expect(expected_cs_header_links).toBeDefined();

    let common_header = await element(by.css(".lindat-block--clariah-theme-main-menu"));
    let real_header_anchors = common_header.all(by.css("a"))
    let real_links = [];
    await real_header_anchors.each(async function (e, index){
      let link = await e.getAttribute('href');
      real_links.push(link);
    });
    expect(real_links.sort()).toEqual(expected_cs_header_links.sort());

  });

});
