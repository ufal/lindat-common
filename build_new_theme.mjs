import * as fs from 'fs'
import * as path from 'path'
import less from 'less';
import minimist from 'minimist';
import config from "./webpack/config.js"
import {FooterData} from "./src/new_theme/public/js/footer_data.mjs";
import {standaloneHtml} from "./src/new_theme/public/js/standalone_data.mjs";
import {HeaderData} from "./src/new_theme/public/js/header_data.mjs";
import {default as languages} from "./src/refbox/languages.js";

const options = config(process.env, minimist(process.argv.slice(2)))
//console.log("============" + JSON.stringify(process.env))
//console.log("============" + JSON.stringify(options))
const outdir = options.dist;
let publicPath = options.publicPath;
if (publicPath === '/' ){
  publicPath += 'dist/'
}

async function buildDist(){
  const opts = Object.assign({'tracking': true}, options.globals)
  //console.log("----------------" + JSON.stringify(footerOpts))
  const htmlContent = {
    footer: FooterData.buildHtml,
    header: HeaderData.buildHtml
  }
  let promises = [];
  ['header', 'footer'].forEach(function (file) {
    [false, true].forEach(function (standalone) {
      ['', 'en', 'cs'].forEach(function (language) {
          let file_suffix = standalone ? '-services-standalone' : ''
          file_suffix += '.htm'
          let out = path.join(outdir, language)
          let actual_lang = language ? language : 'en';
          fs.mkdirSync(out, {recursive: true})
          const content = standalone ? standaloneHtml(htmlContent[file](opts, actual_lang), publicPath) : htmlContent[file](opts, actual_lang);
          promises.push(fs.writeFile(path.join(out, file + file_suffix), content, (err) => {
            if (err) throw err;
          } ))
      })
    })
  })
  return await Promise.all(promises)
}

function buildWebComponents(){
  const out = path.join(outdir, 'public/js')
  fs.mkdirSync(out, {recursive: true})
  const opts = Object.assign({}, options.globals)
  const htmlContent = {
    // TODO web components currently english only
    footer: FooterData.buildHtml(opts,'en'),
    header: HeaderData.buildHtml(opts, 'en')
  };
  ['header', 'footer'].forEach(function (file){
    const out_file = path.join(out, file + ".mjs")
    fs.copyFileSync(path.join('./src/new_theme/public/js/skeleton/', file + ".mjs"), out_file)
    fs.appendFileSync(out_file, "\nconst HTML = `\n"+ htmlContent[file] +"\n`;")
    fs.appendFileSync(out_file, "\nconst PUBLICPATH = \"" + publicPath +"\";")
  })

  const lindat_js_out = path.join(out, 'lindat.js')
  fs.copyFileSync('./src/new_theme/public/js/skeleton/lindat.js', lindat_js_out)
  fs.appendFileSync(lindat_js_out, FooterData.getGaTrackingScript(opts.GA_TRACKING_CODE))
  fs.appendFileSync(lindat_js_out, FooterData.getPiwikTrackingScript(opts.PIWIK_URL))
}

/**
 * examples are also used in tests and pages
 */
function copyExample(){
  const out = options.pages ? outdir : path.join(outdir, 'example');
  fs.mkdirSync(out, {recursive: true})

  const example_dir = './src/new_theme/example';
  fs.readdirSync(example_dir).forEach(function (file){
    const out_file = path.join(out, file)
    // generate examples with localized refbox and correct path when building pages
    if(out_file.endsWith(".html")){
      let html_content = fs.readFileSync(path.join(example_dir, file), 'utf-8');
      if(options.pages){
        html_content = html_content.replace('/dist/', publicPath);
      }
      //a copy; but might have replaced publicPath
      fs.writeFileSync(out_file, html_content);
      Object.keys(languages).forEach(function(lang){
        if(languages[lang]){
          const localized_file = file.replace('.html',  '_' + lang + '.html');
          const localized_content = html_content.replace('public/js', 'public/js/' + lang);
          fs.writeFileSync(path.join(out, localized_file), localized_content);
        }
      })
    }else{
      //copy to dist (out dir more precisely)
      fs.copyFileSync(path.join(example_dir, file), out_file)
    }
  })
}

async function compileCss(){
  const out = path.join(outdir, 'public/css');
  fs.mkdirSync(out, {recursive: true})
  const out_file = path.join(out, "lindat.css");
  let inLess = fs.readFileSync('./src/new_theme/public/less/lindat.less', 'utf-8');
  //fs.copyFileSync('./new_theme/public/css/lindat.less', out_file)
  let lessOut = await less.render(inLess, {math: 'strict'});
  fs.writeFileSync(out_file, lessOut.css)
}

function prepareAngular(){
  const out = path.normalize('./.build')
  fs.mkdirSync(out, {recursive: true});
  const opts = Object.assign({"angular": true, "tracking": true}, options.globals);
  const header = {
    template: HeaderData.buildHtml(opts, 'en')
  };
  const footer = {
    template: FooterData.buildHtml(opts, 'en')
  };
  const angular_header_template = path.join(out, 'header.json')
  const angular_footer_template = path.join(out, 'footer.json')
  fs.writeFileSync(angular_header_template, JSON.stringify(header))
  fs.writeFileSync(angular_footer_template, JSON.stringify(footer))
}

fs.mkdirSync(outdir, {recursive: true})

buildDist()
buildWebComponents()
copyExample()
compileCss()
prepareAngular()
