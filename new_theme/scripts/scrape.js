const fs = require('fs');
const path = require('path');
const outFile = path.resolve(__dirname, '../public/js/header.json');

var EC = protractor.ExpectedConditions;
var waitingTime = 5000;
describe("scrape",() => {
  it('scrapes header', async () => {
    let result = {}
    for(const lang of ["en", "cs"]) {
      let scraped = [];
      result[lang] = scraped
      //drupal header
      await browser.get(`https://lindat.cz/${lang}`);
      let menu = await element(by.css(".block--clariah-theme-main-menu"))
      await browser.wait(EC.presenceOf(menu), waitingTime)
      let navLinks = await menu.all(by.css("li.nav-item a.nav-link"));
      for (const navLink of navLinks) {
        let name = await navLink.getText();
        let url = await navLink.getAttribute('href');
        let classes = (await navLink.getAttribute('class')).split(/\s+/);
        let dropdown = classes.includes("dropdown-toggle");
        let obj = {
          'name': name,
          'url': url,
        }
        scraped.push(obj);
        if (dropdown) {
          await navLink.click();
          let dropdownItems = []
          obj['dropdown'] = dropdownItems;
          let parent = await navLink.element(by.xpath(".."));
          let dropdownElements = await parent.all(by.css("div.dropdown-menu a.dropdown-item"));
          for (const el of dropdownElements) {
            let name = await el.getText();
            let url = await el.getAttribute('href');
            dropdownItems.push({
              'name': name,
              'url': url,
            });
          }
        }
      }
    }
    fs.writeFileSync(outFile, JSON.stringify(result, null, 2))
    console.log(`Written header data to ${outFile}`)
  });
});


