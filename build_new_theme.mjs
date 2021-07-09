import * as fs from 'fs'
import * as path from 'path'
import less from 'less';
import minimist from 'minimist';
import config from "./webpack/config.js"
import {FooterData} from "./new_theme/public/js/footer_data.mjs";
import {standaloneHtml} from "./new_theme/public/js/standalone_data.mjs";
import {HeaderData} from "./new_theme/public/js/header_data.mjs";

const options = config(process.env, minimist(process.argv.slice(2)))
//console.log("============" + JSON.stringify(process.env))
//console.log("============" + JSON.stringify(options))
const outdir = path.join(options.dist, 'new_theme')
let publicPath = options.publicPath;
if (publicPath === '/' ){
  publicPath += 'dist/new_theme/'
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
  const out = path.join(outdir, 'js')
  fs.mkdirSync(out, {recursive: true})
  const opts = Object.assign({}, options.globals)
  const htmlContent = {
    // TODO web components currently english only
    footer: FooterData.buildHtml(opts,'en'),
    header: HeaderData.buildHtml(opts, 'en')
  };
  ['header', 'footer'].forEach(function (file){
    const out_file = path.join(out, file + ".mjs")
    fs.copyFileSync(path.join('./new_theme/public/js/skeleton/', file + ".mjs"), out_file)
    fs.appendFileSync(out_file, "\nconst HTML = `\n"+ htmlContent[file] +"\n`;")
    fs.appendFileSync(out_file, "\nconst PUBLICPATH = \"" + publicPath +"\";")
  })

  const lindat_js_out = path.join(out, 'lindat.js')
  fs.copyFileSync('./new_theme/public/js/skeleton/lindat.js', lindat_js_out)
  fs.appendFileSync(lindat_js_out, FooterData.getGaTrackingScript(opts.GA_TRACKING_CODE))
  fs.appendFileSync(lindat_js_out, FooterData.getPiwikTrackingScript(opts.PIWIK_URL))
}

function copyExample(){
  const out = path.join(outdir, 'example')
  fs.mkdirSync(out, {recursive: true})
  const out_file = path.join(out, "index.html")
  fs.copyFileSync('./new_theme/example/index.html', out_file)
}

async function compileCss(){
  const out = path.join(outdir, 'public/css');
  fs.mkdirSync(out, {recursive: true})
  const out_file = path.join(out, "lindat.css");
  let inLess = fs.readFileSync('./new_theme/public/less/lindat.less', 'utf-8');
  //fs.copyFileSync('./new_theme/public/css/lindat.less', out_file)
  let lessOut = await less.render(inLess, {math: 'strict'});
  fs.writeFileSync(out_file, lessOut.css)
}

fs.mkdirSync(outdir, {recursive: true})

buildDist()
buildWebComponents()
copyExample()
compileCss()
